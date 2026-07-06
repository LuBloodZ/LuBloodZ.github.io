// ===== Guess the Number Game =====
// CST-336 Internet Programming 
// Lichen Cao
// 07/05/2026

// Global variables
let randomNumber;      // the number the player is trying to guess
let attempts = 0;      // how many guesses the player has made
let wins = 0;          // total wins
let losses = 0;        // total losses
const MAX_ATTEMPTS = 7; // player loses after 7 wrong guesses

// Event listeners
// when the Guess button is clicked, run checkGuess()
document.querySelector("#guessBtn").addEventListener("click", checkGuess);

// when the Reset button is clicked, run initializeGame()
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// start the game when the page loads
initializeGame();


// Sets up (or resets) the game
function initializeGame() {
    // pick a new random number between 1 and 99
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number: " + randomNumber);

    // reset attempts back to 0
    attempts = 0;

    // hide the Reset button, show the Guess button
    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";

    // grab the textbox, add focus and clear it
    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();     // cursor is ready in the textbox
    playerGuess.value = "";  // clear the textbox

    // clear the feedback message
    document.querySelector("#feedback").textContent = "";

    // clear the previous guesses
    document.querySelector("#guesses").textContent = "";

    // show how many attempts are left 
    document.querySelector("#attemptsLeft").textContent = MAX_ATTEMPTS;
}


// Checks the player's guess
function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    // get the player's guess from the textbox
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);

    // validate: must be a number between 1 and 99
    if (guess < 1 || guess > 99 || guess === "") {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    // valid guess, so count it
    attempts++;
    console.log("Attempts: " + attempts);

    // update attempts left 
    document.querySelector("#attemptsLeft").textContent = MAX_ATTEMPTS - attempts;

    // show this guess in the previous guesses list
    document.querySelector("#guesses").textContent += guess + " ";

    feedback.style.color = "orange";

    // compare the guess to the random number
    if (guess == randomNumber) {
        // player won
        feedback.textContent = "You guessed it! You Won! It took " + attempts + " attempts.";
        feedback.style.color = "darkgreen";
        wins++;  // add a win 
        document.querySelector("#wins").textContent = wins;
        gameOver();
    } else if (attempts == MAX_ATTEMPTS) {
        // player ran out of attempts
        feedback.textContent = "Sorry, you lost! The number was " + randomNumber + ".";
        feedback.style.color = "red";
        losses++;  // add a loss 
        document.querySelector("#losses").textContent = losses;
        gameOver();
    } else if (guess > randomNumber) {
        feedback.textContent = "Guess was too high";
    } else {
        feedback.textContent = "Guess was too low";
    }

    // clear the textbox for the next guess
    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.value = "";
    playerGuess.focus();
}


// Ends the game (hide Guess, show Reset)
function gameOver() {
    document.querySelector("#guessBtn").style.display = "none";
    document.querySelector("#resetBtn").style.display = "inline";
}
