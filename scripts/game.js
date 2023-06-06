var startButton = document.getElementById("start-button");
var timerSpan = document.getElementById("time-left");
var startingTime = 75
var timeLeft = startingTime
var wrongAnswerPenalty = 10
var currentQuestionIndex = 0
var currentAnswer = ""
var questionsContainer = document.getElementById("questions-container")
var finalScoreContainer = document.getElementById("final-score-container")
var beforeStartContainer = document.getElementById("before-start")
var questionElement = document.getElementById("question")
var answerResultElement = document.getElementById("answer-result")
var gameInterval
var initialsForm = document.getElementById("initials-form");

// there's a question, an array of choices, and an answer that we'll store globally to check against (there are better ways to do this).
var quizItems = [
    { "question": "Commonly used data types do NOT include:", "choices": ["strings", "booleans", "alerts", "numbers"], "answer": "alerts" },
    { "question": "A very useful tool used durin development and debugging for printing content to the debugger is:", "choices": ["JavaScript", "terminal branch", "for loops", "console log"], "answer": "console log" },
    { "question": "Arrays in JavaScript can be used to store:", "choices": ["numbers & strings", "other arrays", "booleans", "all of the above"], "answer": "all of the above" },
    { "question": "The condition in an if/else statement is enclose with:", "choices": ["quotes", "curly brackets", "parentheses", "square brackets"], "answer": "curly brackets" },
    { "question": "String values must be enclosed with ______ when being assigned to variables:", "choices": ["quotes", "commas", "curly brackets", "parentheses"], "answer": "parentheses" },


]
// get the question buttons so you can replace them with the question text
var quizChoiceButtons = document.querySelectorAll(".choice")

function initializeGameState() {
    clearInterval(gameInterval);
    timeLeft = startingTime;
    beforeStartContainer.style.setProperty("display", "block")
    questionsContainer.style.setProperty("display", "none")
    finalScoreContainer.style.setProperty("display", "none")
    currentQuestionIndex = 0
    currentAnswer = ""
}
function startGame() {
    initializeGameState()
    initialsForm.addEventListener("submit", handleSubmit)
    beforeStartContainer.style.setProperty("display", "none")
    renderQuestions(currentQuestionIndex)
    timerSpan.textContent = timeLeft;
    gameInterval = setInterval(() => {
        timerSpan.textContent = --timeLeft;
        if (!timeLeft) {
            renderFinalAnswer();
        }
    }, 1000);
}


function handleSubmit(event) {
    // so that we can do some work on the form.
    event.preventDefault();

    let initials = document.getElementById("initials").value

    let playerScores = JSON.parse(localStorage.getItem("playerScores"))
    if (!playerScores) playerScores = []

    // push modifies the array in place
    playerScores.push({ initials, score: timeLeft })
    localStorage.setItem("playerScores", JSON.stringify(playerScores))

    // clear out the form.
    initialsForm.reset()
    window.location.href = "highscore.html";
}
function renderFinalAnswer(params) {
    clearInterval(gameInterval);

    questionsContainer.style.setProperty("display", "none")
    finalScoreContainer.style.setProperty("display", "inline-block")
    finalScore = document.getElementById("final-score")
    finalScore.innerHTML = timeLeft;
}
function checkAnswer(event) {
    answerResultElement.innerHTML = "Correct!"
    if (event.target.innerHTML != currentAnswer) {
        timeLeft -= wrongAnswerPenalty
        answerResultElement.innerHTML = "Wrong!"
    }
    answerResultElement.style.setProperty("display", "inline")

    // length is a counting number, so have to subtract 1.
    if (currentQuestionIndex < quizItems.length - 1) {
        currentQuestionIndex++
        renderQuestions(currentQuestionIndex)
    } else {
        renderFinalAnswer();
    }
}
function renderQuestions(questionIndex) {
    const numOfChoices = quizItems[questionIndex].choices.length
    questionElement.innerHTML = quizItems[questionIndex].question
    for (let index = 0; index < numOfChoices; index++) {
        quizChoiceButtons[index].innerHTML = quizItems[questionIndex].choices[index]
        quizChoiceButtons[index].addEventListener("click", checkAnswer)
    }
    questionsContainer.style.setProperty("display", "inline-block")
    currentAnswer = quizItems[questionIndex].answer
}

if (startButton)
    startButton.addEventListener("click", startGame);
