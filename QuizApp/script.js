const questions = [
    {
        question: "What is the output of 2 + 3?",
        answers: [
            {text: "4",correct:false},
            {text: "15",correct:false},
            {text: "5",correct:true},
            {text: "error",correct:false}
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "variable", correct: false },
            { text: "let", correct: true },
            { text: "define", correct: false },
            { text: "new", correct: false }
        ]
    },
     {
        question: "What is the output of typeof 'Hello'?",
        answers: [
            { text: "text", correct: false },
            { text: "string", correct: true },
            { text: "object", correct: false },
            { text: "number", correct: false }
        ]
    },
     {
        question: "Which method adds an element to the end of an array?",
        answers: [
            { text: "pop()", correct: false },
            { text: "shift()", correct: false },
            { text: "push()", correct: true },
            { text: "slice()", correct: false }
        ]
    },
    {
        question: "Which function is used to print output in the console?",
        answers: [
            { text: "print()", correct: false },
            { text: "display()", correct: false },
            { text: "console.log()", correct: true },
            { text: "output()", correct: false }
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML= "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
