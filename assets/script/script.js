const startButton = document.getElementById("start-button");
const startPage = document.getElementById("start-page")
let timeleft = document.getElementById("timer-count")
let seconds = 75
let timer

let quiz = document.getElementById("quiz")



startButton.addEventListener('click', startTimer);
startButton.addEventListener('click', startQuiz);


function startTimer(){
  timer = setInterval(function() {
    
    seconds--;
    timeleft.textContent = seconds;
    
    if (seconds === 0){
      clearInterval(timer);
      // loseGame();
    }
    
  }, 1000)
}

function startQuiz(){
  startPage.setAttribute("style", "display: none")
  quiz.setAttribute("style", "display: block")
}

