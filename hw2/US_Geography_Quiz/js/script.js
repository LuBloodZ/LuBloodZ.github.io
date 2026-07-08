// ===== US Geography Quiz =====
// CST-336 Internet Programming 
// Lichen Cao
// 07/07/2026

// each of the 10 questions is worth 10 points (100 total)
let score = 0;

// ----- localStorage: total attempts -----
let attempts = localStorage.getItem("total_attempts");
if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}

// ----- event listener -----
document.querySelector("button").addEventListener("click", gradeQuiz);

// ----- helper: set the checkmark / x-mark image -----
function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);
    markContainer.textContent = "";

    let img = document.createElement("img");
    img.src = `img/${imageName}`;
    img.alt = altText;
    img.width = 25;
    markContainer.appendChild(img);
}

// ----- helper: mark a question right -----
function rightAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Correct!";
    feedback.className = "bg-success text-white";
    setMarkImage(index, "checkmark.png", "Checkmark");
    score += 10;
}

// ----- helper: mark a question wrong -----
function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Incorrect!";
    feedback.className = "bg-warning text-white";
    setMarkImage(index, "xmark.png", "X mark");
}