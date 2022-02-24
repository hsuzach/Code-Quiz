//Assign Variables
const startButton = document.getElementById("start-button");
const startPage = document.getElementById("start-page")
let timeleft = document.getElementById("timer-count")
let seconds = 75
let timer
let score
let timeRemaining

const quiz = document.getElementById("quiz");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
let question = document.getElementById("question");
let runningQuestion = 0;

const result = document.getElementById("result");
let recordScore = document.getElementById("save-scores");
let playerScore = document.getElementById("player-score");
let initials = document.getElementById("initials");
const submit = document.getElementById("submit");

let highScores = document.getElementById("high-scores");
let savedInitials = document.getElementById("saved-initials");
let goBack = document.getElementById("go-back");
let resetScores = document.getElementById("reset-scores");

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
  startPage.setAttribute("style", "display: none");
  quiz.setAttribute("style", "display: block");
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

//check for last question of the quiz
const lastQuestion = questions.length - 1;

//set correct or wrong functions
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

//hides the answer result in 4 seconds
function hideresult(){
  result.textContent = " "
}

//check answer for right or wrong
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        answerIsCorrect();
    }else{
        answerIsWrong();
    };

    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    } else{
        clearInterval(timer);
        timeRemaining = seconds
        //update time shown in timer
        timeleft.textContent = seconds
        endQuiz();
    }
}

//allows user to save score
function endQuiz(){
  quiz.setAttribute("style","display: none");
  recordScore.setAttribute("style","display: block")
  score = timeRemaining
  playerScore.textContent = "Score: " + score;
}

submit.addEventListener("click", saveScore);

function saveScore(){
  
  highScores.setAttribute("style","display: block");
  recordScore.setAttribute("style","display: none");

  let quizResult = {
    score: score,
    initials: initials.value
  }
  
  //adds new scores to local storage
  if (localStorage.getItem('HighScores')){
    let storedScores = JSON.parse(localStorage.getItem('HighScores'));
    storedScores.push(quizResult);
    localStorage.setItem('HighScores', JSON.stringify(storedScores));
  }else {
    let storedScores = []
    storedScores.push(quizResult);
    localStorage.setItem('HighScores', JSON.stringify(storedScores));
  }

  //reorders list of previous scores from higest score to lowest
  let storedScores = JSON.parse(localStorage.getItem('HighScores'))
  let orderedStoredScores = storedScores.sort((a,b) =>{
    return b.score - a.score
  })

  //displays scores on high score page
  orderedStoredScores.forEach (x => {
    savedInitials.innerHTML += `
    ${x.initials}
    ${x.score}
    <hr>
    `
  })
}

//reset scores button clears local storage and resets display of scores
resetScores.addEventListener('click', clearScores)
function clearScores(){
  localStorage.clear();
  savedInitials.innerHTML = ""
}

//return to start page, reset timer as well as current question to start quiz again
goBack.addEventListener('click', returnToStart)
function returnToStart(){
  startPage.setAttribute("style", "display: block");
  highScores.setAttribute("style","display: none");
  seconds = 75
  timeleft.textContent = 75
  runningQuestion = 0;
}