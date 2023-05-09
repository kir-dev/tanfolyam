package hu.kirdev.advisor.config

import com.fasterxml.jackson.databind.ObjectMapper
import hu.kirdev.advisor.authsch.ProfileResponse
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
            .requestMatchers(
                "/",
                "/login/authsch",
                "/style.css",
                "/example/**",
                "/accommodations",
                "/accommodation/*",

                "/accommodation",
                "/accommodation/*/rate",

                "/api/**"
            ).permitAll()

            .requestMatchers(
                "/user/*",
            ).hasAnyRole("USER", "ADMIN")

//            Uncomment for h2-console:
//            .requestMatchers(AntPathRequestMatcher("/h2-console/**")).permitAll()

            .anyRequest().denyAll()

            .and()
            .oauth2Login()
            .userInfoEndpoint()
            .userService { resolveUser(it) }

            .and()
            .defaultSuccessUrl("/user/profile")

//            Uncomment for h2-console:
//            .and().headers().frameOptions().disable()
//            .and().csrf().disable()
        return http.build()
    }

    private fun resolveUser(request: OAuth2UserRequest): DefaultOAuth2User {
        val authschProfileJson: String? = authschUserServiceClient.get()
            .uri { uriBuilder ->
                uriBuilder.path("/profile/")
                    .queryParam("access_token", request.accessToken.tokenValue)
                    .build()
            }
            .retrieve()
            .bodyToMono(String::class.java)
            .block()

        val profile = objectMapper.readerFor(ProfileResponse::class.java)
            .readValue<ProfileResponse>(authschProfileJson)!!

        println(profile)

        return DefaultOAuth2User(
            mutableListOf(),
            mapOf(),
            "internal_id"
        )
    }


}