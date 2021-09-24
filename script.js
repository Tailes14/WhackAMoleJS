// assigning variables
const remainingTime = document.querySelector('#remainingTime');
let curScore = document.querySelector('#curScore');
let highScore = document.querySelector('#highScore');
const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
var gameTime = null;
var moleTimer = null;
var molePoisiton = null;

// making int variables for the alerts
let finalScore = 0;
let newHighScore = 0;

// getting the time to run the game defined in the html file
let curTime = remainingTime.textContent;
// also storing the time in a seperate variable so we can reset the timer when the game is over
startTime = remainingTime.textContent;

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
    molePoisiton = randomNum.id;
}

function startGame() {
    updateMolePos();
    // syncing the game timer to the timer that moves the mole around
    gameTime = setInterval(gameTimer, 1000);
    gameTimer();
}

// function to move the Mole around
function updateMolePos() {
    // calling the random square function every 3/4 second
    moleTimer = setInterval(randomSquare, 750);
}

// function to decrease the time left on the game
function gameTimer() {
    curTime--;
    remainingTime.textContent = curTime;

    // checking and alerting for when the game runs out of time
    if (curTime === 0){
        // stopping the interval that loops our game
        clearInterval(gameTime);
        clearInterval(moleTimer);

        // also comparing to high score to see if a new one was set
        if (finalScore > newHighScore) {
            newHighScore = finalScore;
            highScore.textContent = newHighScore;
            alert('Game Over! Congratulations you set a new High Score of ' + newHighScore);
        } else { // else giving a different alert
            alert('Game Over! Your score was ' + finalScore + '! The High Score is ' + newHighScore + '! Try Again');
        }
        // resetting timer and score
        remainingTime.textContent = startTime;
        curTime = remainingTime.textContent;
        finalScore = 0;
        curScore.textContent = finalScore;
    }
}


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

