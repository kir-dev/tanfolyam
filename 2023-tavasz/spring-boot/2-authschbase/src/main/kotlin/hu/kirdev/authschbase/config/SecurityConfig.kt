package hu.kirdev.authschbase.config

import com.fasterxml.jackson.databind.ObjectMapper
import hu.kirdev.authschbase.authsch.ProfileResponse
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.reactive.function.client.WebClient


@Configuration
class SecurityConfig(
    private val objectMapper: ObjectMapper
) {

    var authschUserServiceClient = WebClient.builder()
        .baseUrl("https://auth.sch.bme.hu/api")
        .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
        .defaultHeader(HttpHeaders.USER_AGENT, "AuthSchKotlinAPI")
        .build()

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http.authorizeHttpRequests()
            // List of path that does not require authentication
            .requestMatchers("/", "/login/authsch", "/other").permitAll()
            // Any request that looks like /user/xy will only be available for ROLE_USER and ROLE_ADMIN users
            .requestMatchers("/user/*").hasAnyRole("USER", "ADMIN")
            // Any requests what starts with /admin will only be available for ROLE_ADMIN users
            .requestMatchers("/admin/**").hasRole("ADMIN")
            // Any other requests are denied
            .anyRequest().denyAll()

            .and()
            .oauth2Login()
            .userInfoEndpoint()
            .userService { resolveUser(it) }
            .and()

            // Path to redirect after login
            .defaultSuccessUrl("/user/profile")
        return http.build()
    }

    private fun resolveUser(request: OAuth2UserRequest): DefaultOAuth2User {
        // Generate the API request template
        val authschProfileJson: String? = authschUserServiceClient.get()
            .uri { uriBuilder ->
                uriBuilder.path("/profile/")
                    .queryParam("access_token", request.accessToken.tokenValue)
                    .build()
            }
            .retrieve()
            .bodyToMono(String::class.java)
            .block()

        // Parse the response for the user profile to a Kotlin object
        val profile = objectMapper.readerFor(ProfileResponse::class.java)
            .readValue<ProfileResponse>(authschProfileJson)!!

        // Print the profile (only for debugging purposes)
        println(profile)

        // Create a principal object, you can create yours here but make sure to implement `OAuth2User`
        return DefaultOAuth2User(
            // Add the "ROLE_" prefix to the role name it accessible via `hasRole` and `hasAnyRole.
            // You can add multiple authorities here.
            mutableListOf(SimpleGrantedAuthority("ROLE_USER")),
            // Attributes available from the user principal directly
            mapOf(
                "internal_id" to profile.internalId,
                "profile" to profile
            ),
            "internal_id"
        )
    }


}