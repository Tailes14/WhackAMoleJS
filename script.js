// assigning variables
const remainingTime = document.querySelector('#remainingTime');
let curScore = document.querySelector('#curScore');
let highScore = document.querySelector('#highScore');
const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');

// making int variables for the alerts
let finalScore = 0;
let newHighScore = 0;

// getting the time to run the game defined in the html file
let curTime = remainingTime.textContent;

// getting a random square to place a mole in
function randomSquare() {
    // clearing all squares first to be sure there are no moles
    square.forEach(moleClass => {
        moleClass.classList.remove('mole')
    })
    // getting our random number using math.floor to make sure its always under 9
    let randomNum = square[Math.floor(Math.random() * 9)];
    randomNum.classList.add('mole');

    // storing the position id of the mole so that we can check if the user clicks on it
    let molePoisiton = randomNum.id;
}

// function to move the Mole around
function updateMolePos() {
    let timer = null;
    // calling the random square function every second
    timer = setInterval(randomSquare, 1000);
}

updateMolePos();

// function to decrease the time left on the game
function gameTimer() {
    curTime--;
    remainingTime.textContent = curTime;

    // checking and alerting for when the game runs out of time
    if (curTime === 0){
        // stopping the interval that loops our game
        clearInterval(timer);

        // also comparing to high score to see if a new one was set
        if (finalScore > highScore) {
            newHighScore = finalScore;
            highScore.textContent = finalScore;
            alert('Game Over! Congratulations you set a new High Score of ' + newHighScore);
        }else { // else giving a different alert
            alert('Game Over! Your score was ' + finalScore + '! The High Score is ' + newHighScore + '! Try Again');
        }
    }
}
let timer = setInterval(gameTimer, 1000);
/*
function startGame() {

    updateMolePos();
    // syncing the game timer to the timer that moves the mole around
    let timer = setInterval(gameTimer, 1000);
    gameTimer();
}
*/
// checking the squares to see where / when the user clicks them
square.forEach(clickID => {
    // using mouseup to get the square where the user releases the mouse, allowing them to change their mind mid click
    clickID.addEventListener('mouseup', () =>{
        if (clickID.id === molePoisiton) {
            // adding onto our final score counter and updating the score the user sees
            finalScore = finalScore + 1;
            curScore.textContent = finalScore;
        }
    })
})

