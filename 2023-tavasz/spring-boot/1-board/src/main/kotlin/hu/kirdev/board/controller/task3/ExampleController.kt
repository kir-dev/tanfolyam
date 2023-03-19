package hu.kirdev.board.controller.task3

import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.util.StringUtils
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.util.*
import kotlin.random.Random


@Controller
@RequestMapping("/example")
class ExampleController {

    data class Example3DummyDto(var status: String, var message: String, var randomNumber: Int)
    data class ItemDto(var item: String = "", var price: Int = 0)

    @GetMapping("")
    fun board(model: Model, @RequestParam(defaultValue = "") message: String): String {
        model.addAttribute("appName", "Examples")
        model.addAttribute("message", message)
        return "example"
    }

    /**
     * Example 1. Print request param
     *
     * @GetMapping("/example-1")
     * can be used to simplify:
     * @RequestMapping(method = [ RequestMethod.GET ], value = [ "/example-1" ])
     *
     * GET /example/example-1?param1=x&param2=y
     */
    @ResponseBody
    @RequestMapping(method = [ RequestMethod.GET ], value = [ "/example-1" ])
    fun requestParamExample(@RequestParam param1: String, @RequestParam("param2") differentName: String): String {
        println("Param 1: $param1")
        println("Param 2: $differentName")
        return "Endpoint called with param1=$param1 and param2=$differentName"
    }

    /**
     * Example 2. Show IP Address
     *
     * GET /example/example-2
     */
    @ResponseBody
    @GetMapping("/example-2")
    fun ipAddressExample(request: HttpServletRequest): String {
        val ipAddress = request.remoteAddr
        println("Caller IP address: $ipAddress")
        return "Your IP address is: $ipAddress"
    }

    /**
     * Example 3. Show a dummy DTO
     *
     * GET /example/example-3
     */
    @ResponseBody
    @GetMapping("/example-3")
    fun dtoExample(): Example3DummyDto {
        return Example3DummyDto("OK", "This is an example", Random.nextInt())
    }

    /**
     * Example 4. Dummy login (post params)
     *
     * POST /example/example-4
     */
    @PostMapping("/example-4")
    fun loginExample(@RequestParam username: String, @RequestParam password: String): String {
        println("Username: $username")
        println("Password: ${password.replace(Regex("."), "*")} (hidden)")
        return "redirect:/example?message=Logged%20in#example4"
    }

    /**
     * Example 5. Post form params and map to a DTO
     *
     * POST /example/example-5
     */
    @ResponseBody
    @PostMapping("/example-5")
    fun itemByForm(@ModelAttribute item: ItemDto): ItemDto {
        println("Item: ${item.item} and its price is: ${item.price}")
        return item
    }

    /**
     * Example 6. Post JSON Body
     *
     * POST /example/example-6
     */
    @ResponseBody
    @PostMapping("/example-6")
    fun itemByJsonBody(@RequestBody item: ItemDto): String {
        println("Item: ${item.item} and its price is: ${item.price}")
        return "OK (${item.item}, ${item.price})"
    }

    /**
     * Example 7. Upload an image
     *
     * POST /example/example-7
     */
    @PostMapping("/example-7")
    fun uploadImageExample(@RequestParam("file") file: MultipartFile): ResponseEntity<String> {
        var fileName = file.originalFilename
            ?: return ResponseEntity.badRequest().body("Invalid name")

        if (file.isEmpty)
            return ResponseEntity.badRequest().body("File is empty")

        fileName = StringUtils.cleanPath(fileName)
        val lastIndex = fileName.lastIndexOf('.')
        val fileExtension = if (lastIndex > 0) {
            fileName.substring(lastIndex + 1)
        } else {
            ""
        }

        if (!listOf("jpg", "jpeg", "png", "gif").contains(fileExtension.lowercase())) {
            return ResponseEntity.badRequest().body("File is not an image")
        }

        try {
            Path.of("uploads").toFile().mkdirs()
            Files.write(Path.of("uploads", fileName), file.bytes)
        } catch (e: IOException) {
            return ResponseEntity.badRequest().body("Failed to save file")
        }
        return ResponseEntity.ok("File uploaded successfully to uploads/$fileName")
    }

}