
let question = document.getElementById("question")
let answerContainer = document.getElementById("answer-container")
let content = document.getElementById("content")
let createForm = document.getElementById("create-form")

document.getElementById("add-button").addEventListener("click", addNewAswer)
function addNewAswer(){
    let answerText = document.getElementById("new-answer").value

    let newAnswer = document.createElement("div")
    newAnswer.innerText = answerText

    answerContainer.appendChild(newAnswer)
}

document.getElementById("save-button").addEventListener("click", saveAnswer)
function saveAnswer(){
    const section = document.createElement("div")
    section.className = "section"
    content.insertBefore(section, createForm )

    const header = document.createElement("h3")
    header.innerText = question.value
    section.appendChild(header)

    const form = document.createElement("form")
    section.appendChild(form)

    const answers = answerContainer.children;
    for (let index = 0; index < answers.length; index++) {
        const element = answers[index]

        let checkbox = document.createElement("input")
        checkbox.type="radio"
        form.appendChild(checkbox)

        let label = document.createElement("label")
        label.innerText = element.innerText
        form.appendChild(label)
        
        let lineBreak = document.createElement("br")
        form.appendChild(lineBreak)
    }

}

