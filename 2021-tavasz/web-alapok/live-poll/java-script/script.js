
let questionInput = document.getElementById("question")
let answerContainer = document.getElementById("answer-container")
let content = document.getElementById("content")
let createForm = document.getElementById("question-form")
let answerCnt = 0;

document.getElementById("add-button").addEventListener("click", addNewAswer)
function addNewAswer(){
    let newAnswerInput = document.getElementById("new-answer")
    let answerText = newAnswerInput.value

    let newAnswer = document.createElement("div")
    newAnswer.innerText = answerText

    answerContainer.appendChild(newAnswer)
    newAnswerInput.value=""
}

function getQuestions(){
    return JSON.parse(localStorage.getItem("questions")) || []
}
function saveQuestion(question){
    let questions = getQuestions()
    questions.push(question)
    localStorage.setItem("questions", JSON.stringify(questions))
}
loadQuestions()
function loadQuestions(){
    let questions = getQuestions()
    for (let index = 0; index < questions.length; index++) {
        let question = questions[index];
        renderQuestion(question)
    }
}

document.getElementById("save-button").addEventListener("click", createQuestion)
function createQuestion(){
    let question = {id: answerCnt,text: questionInput.value, answers:[]}

    const answers = answerContainer.children;
    for (let index = 0; index < answers.length; index++) {
        question.answers.push(answers[index].innerText)
    }

    saveQuestion(question)
    renderQuestion(question)
    answerCnt+=1
    
    questionInput.value = ""
    answerContainer.innerHTML=""
}

function renderQuestion(question){
   let section = document.createElement("div")
   section.className ="section"
   content.insertBefore(section,createForm)

   let header = document.createElement("h3")
   header.innerText = question.text
   section.appendChild(header)

   let form = document.createElement("form")
   section.appendChild(form)

   let answers = question.answers
   for (let index = 0; index < answers.length; index++) {
       const answer = answers[index];

       let radiobutton = document.createElement("input")
       radiobutton.type="radio"
       form.appendChild(radiobutton)

       let label = document.createElement("label")
       label.innerText = answer
       form.appendChild(label)

       let lineBreak = document.createElement("br")
       form.appendChild(lineBreak)
       
   }
}

let openButton = document.getElementById("open-button")
let questionForm = document.getElementById("question-form")

document.getElementById("cancel-button").addEventListener("click", cancelQuestion)
function cancelQuestion(){
    questionForm.style.display="none"

    openButton.style.display="inline"
}

document.getElementById("open-button").addEventListener("click",openQuestionForm)
function openQuestionForm(){
    questionForm.style.display="block"

    openButton.style.display="none"
}


document.getElementById("remove-button").addEventListener("click", deleteAll)

function deleteAll(){
    localStorage.removeItem("questions")
    content.innerHTML = ""
}