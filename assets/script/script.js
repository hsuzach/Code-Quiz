//Assign Variables
const startButton = document.getElementById("start-button");
const startPage = document.getElementById("start-page")
let timeleft = document.getElementById("timer-count")
let seconds = 75
let timer


const quiz = document.getElementById("quiz");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
let question = document.getElementById("question");
let runningQuestion = 0;


const result = document.getElementById("result");
const recordScore = document.getElementById("save-scores");

//Create Question List
let questions = [
    {
        question : "Commonly used data types DO NOT include:",

        choiceA : "Strings",
        choiceB : "Booleans",
        choiceC : "Alerts",
        choiceD : "Numbers",
        correct : "C"
    },{
        question : "The condition if an if / else statement is enclosed within____.",

        choiceA : "Quotes",
        choiceB : "Curly Brackets",
        choiceC : "Parentheses",
        choiceD : "Square Brackets",
        correct : "C"
    },{
        question : "Arrays in JavaScript can be used to store ____.",

        choiceA : "Numbers and Strings",
        choiceB : "Other Arrays",
        choiceC : "Booleans",
        choiceD : "All of the Above",
        correct : "D"
    },{
        question : "String Values must be enclosed within ____ when being assigned to variables.",

        choiceA : "Commas",
        choiceB : "Curly Brackets",
        choiceC : "Quotes",
        choiceD : "Parentheses",
        correct : "C"
    },{
        question : "A very useful tool used during development and debugging for printing content to the ddebugger is:",

        choiceA : "JavaScript",
        choiceB : "Terminal/Bash",
        choiceC : "For Loops",
        choiceD : "console.log",
        correct : "D"
    }
];


//Start Button Begins the Quiz
startButton.addEventListener('click', startQuiz);
function startQuiz(){
  startPage.setAttribute("style", "display: none")
  quiz.setAttribute("style", "display: block")
  startTimer();
  renderQuestion();
}

//Time remaining displayed
function startTimer(){
  timer = setInterval(function() {
    
    seconds--;
    timeleft.textContent = seconds;
    
    if (seconds === 0){
      clearInterval(timer);
      endQuiz();
    }
  }, 1000)
}

//render the question and answer choices
function renderQuestion(){
  let q = questions[runningQuestion];

  question.innerHTML = "<p>"+ q.question +"</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}

//check answer if correct or incorrect
const lastQuestion = questions.length - 1;

//hides the answer result in 4 seconds
function hideresult(){
  result.textContent = " "
}

function answerIsCorrect(){
  result.textContent = "Correct";
  setTimeout(hideresult, 4000);
}

function answerIsWrong(){
  result.textContent = "Wrong";
  setTimeout(hideresult, 4000);
  //deduct 10 seconds for incorrect answer
  seconds -= 10;
}


function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    
    ;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        endQuiz();
        clearInterval(timer);
        
    }
}

function endQuiz(){
  quiz.setAttribute("style","display: none");
  recordScore.setAttribute("style", "display: block");
}
