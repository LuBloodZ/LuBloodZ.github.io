// ===== Guess the Number Game =====
// CST-336 Internet Programming 
// Lichen Cao
// 07/05/2026
 
// Global variables
let randomNumber;
let attempts = 0;

// start the game when the page loads
initializeGame();

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