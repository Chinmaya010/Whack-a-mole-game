const holes= document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const startButton = document.getElementById('start-button');
const highestScoreDisplay = document.getElementById('highest-score');
let score = 0;
let timeLeft = 30;
let activeHole;
let moleTimer;
let countdownTimer;
let highestScore = 0;

function randomHole(){
    holes.forEach(hole => hole.classList.remove('active'));
    const randomIndex = Math.floor(Math.random() * holes.length);
    activeHole = holes[randomIndex];
    activeHole.classList.add('active');
}

function resetGame(){
    clearInterval(moleTimer);
    clearInterval(countdownTimer);
    holes.forEach(hole => hole.classList.remove('active'));
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
   
    startButton.disabled = false;

}

function startGame(){
    
    startButton.disabled =true;

    moleTimer = setInterval(randomHole, 1100);
    countdownTimer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if(timeLeft <= 0){
            clearInterval(moleTimer);
            clearInterval(countdownTimer);
            showGameOver(); 
           
            resetGame();   
        }
    }, 1000);
}
function showGameOver() {
    if (score > highestScore){
        highestScore =score;
        highestScoreDisplay.textContent = highestScore;
    }
    const gameOverMessage = document.createElement('div');
    gameOverMessage.className = 'game-over';
    gameOverMessage.textContent = `Game over ! Your score is ${score}`;
    
    document.body.appendChild(gameOverMessage);

    setTimeout(() => {
        gameOverMessage.remove();
    }, 3000);
};
holes.forEach(hole =>{
    hole.addEventListener('click',() =>{
        if(hole===activeHole && hole.classList.contains('active')){
            score++;
            scoreDisplay.textContent = score;
            activeHole.classList.remove('active');
        }
    });
});
 
startButton.addEventListener('click', startGame);