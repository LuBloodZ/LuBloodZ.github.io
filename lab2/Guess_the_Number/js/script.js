// ===== Guess the Number Game =====
// CST-336 Internet Programming 
// Lichen Cao
// 07/05/2026
 
// Global variables
let randomNumber;
let attempts = 0;

// start the game when the page loads
initializeGame();

// Event listeners 
// when the Guess button is clicked, run checkGuess()
document.querySelector("#guessBtn").addEventListener("click", checkGuess);


// sets up (or resets) the game
function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number: " + randomNumber);
    attempts = 0;

    // hide Reset, show Guess
    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";

    // focus and clear the textbox
    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = "";

    // clear feedback and guesses
    document.querySelector("#feedback").textContent = "";
    document.querySelector("#guesses").textContent = "";
}

// checks the player's guess
function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);

    // validation - must be between 1 and 99
    if (guess < 1 || guess > 99 || guess === "") {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    // valid guess, count it
    attempts++;
    console.log("Attempts: " + attempts);

    // show this guess in the previous guesses list
    document.querySelector("#guesses").textContent += guess + " ";

      feedback.style.color = "orange";

    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won! It took " + attempts + " attempts.";
        feedback.style.color = "darkgreen";
        gameOver();
    } else if (attempts == 7) {
        feedback.textContent = "Sorry, you lost! The number was " + randomNumber + ".";
        feedback.style.color = "red";
        gameOver();
    } else if (guess > randomNumber) {
        feedback.textContent = "Guess was too high";
    } else {
        feedback.textContent = "Guess was too low";
    }

    // clear the textbox for next guess
    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.value = "";
    playerGuess.focus();
}

    // ends the game - hide Guess, show Reset
function gameOver() {
    document.querySelector("#guessBtn").style.display = "none";
    document.querySelector("#resetBtn").style.display = "inline";
}
