Board Demo
===

This project is part of the 2023 kir-dev spring-boot course live coding action.

## Branches

 - `master`: Set to the `incomplete` branch.
 - `incomplete`: Some parts are removed in order to be rewritten during the course live action part.
 - `complete`: The complete project without the extra tasks.
 - `extra`: A branch where the extra task is solved.

## Subjects

 - Basic http endpoints
   - HTTP methods
   - Request param
   - Responses and redirects
 - HTML templates (with Thymeleaf)
 - Data Transfer Objects (DTO)
 - Kotlin basics
   - data class
   - variable declaration

## How to start

Use `./gradlew bootRun` or start the `hu.kirdev.board.main()`

## Examples

Check `hu.kirdev.board.controller.task3.ExampleController` for more examples.

## Extra Task

Solve the **Extra Task** to practice the topics you just learned.

 - Summary: Create a form (e.g. registration for an event) that users can fill in. Store the results and create an API to show the submissions.
 - Hint: You can use `FormController` and `form.html` to begin with.
 - 1.1: Create a form with some inputs.
 - 1.2: Create an endpoint for the form based on the board.
 - 1.3: Create an endpoint to save the form submissions.
 - 1.4: Create an endpoint to list the results.
 - 1.5: Optional: Validate the form responses.