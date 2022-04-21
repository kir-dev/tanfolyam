async function submitForm(event) {

    event.preventDefault()
    let formData = new FormData(event.target)
    let postResult = await fetch('/api' + location.pathname, {
        method: 'POST',
        body: formData,
        cache: 'no-cache'
    })
    let resultJson;
    try {
        resultJson = await postResult.json()
    } catch (e) {
        window.location.pathname = '/silos'
    }
    console.log("Result: ", resultJson)
    if (postResult.ok) {
        window.location.pathname = '/silos'
    } else {
        for (let error of resultJson.errors) {
            console.log(error, document.querySelector("[name=" + error.field + "]"))
            document.querySelector("[name=" + error.field + "]").setCustomValidity(error.defaultMessage)
            document.querySelector("[name=" + error.field + "]").reportValidity()
        }
    }
}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        document.querySelectorAll("[name]").forEach(
            input => input.addEventListener(
                "input",
                inputEvent => input.setCustomValidity('')
            )
        )
    }
)

document.addEventListener(
    "submit",
    submitForm
)