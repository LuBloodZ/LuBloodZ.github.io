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
 
// ----- event listeners + initial setup -----
document.querySelector("#submitBtn").addEventListener("click", gradeQuiz);
document.querySelector("#resetBtn").addEventListener("click", resetQuiz);
displayAllChoices();  // show all shuffled choices in random order on load
 
// hide the Try Again button until the quiz is submitted
document.querySelector("#resetBtn").style.display = "none";
 
 
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
 
// ----- check if the right checkboxes (and only those) are selected -----
// qNum: question number, correctValues: array of the values that should be checked
function isCheckboxAnswerCorrect(qNum, correctValues) {
    let boxes = document.querySelectorAll(`#q${qNum}Choices input[type=checkbox]`);
    for (let box of boxes) {
        let shouldBeChecked = correctValues.includes(box.value);
        // if a box that should be checked isn't, or one that shouldn't is, it's wrong
        if (box.checked !== shouldBeChecked) {
            return false;
        }
    }
    return true;
}
 
 
// ----- shuffle an array (Fisher-Yates) -----
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
 
// ----- build shuffled choices for a question -----
// qNum: question number, type: "radio" or "checkbox", choices: array of options
function displayChoices(qNum, type, choices) {
    let choicesArray = choices.slice();  // copy so we don't change the original
    shuffleArray(choicesArray);
 
    let container = document.querySelector(`#q${qNum}Choices`);
    container.textContent = "";
 
    for (let choice of choicesArray) {
        let input = document.createElement("input");
        input.type = type;
        input.name = "q" + qNum;      // same name groups radios together
        input.id = "q" + qNum + "_" + choice.replace(/\s/g, "");
        input.value = choice;
 
        let label = document.createElement("label");
        label.htmlFor = input.id;
        label.textContent = " " + choice + " ";
 
        container.appendChild(input);
        container.appendChild(label);
        container.appendChild(document.createTextNode("  "));
    }
}
 
// ----- show all the shuffled questions (called on load and reset) -----
function displayAllChoices() {
    // Q3 checkboxes - Mount Rushmore
    displayChoices(3, "checkbox", ["A. Jackson", "B. Franklin", "T. Jefferson", "T. Roosevelt"]);
    // Q4 radio - smallest state
    displayChoices(4, "radio", ["Maine", "Rhode Island", "Maryland", "Delaware"]);
    // Q7 checkboxes - Pacific coast
    displayChoices(7, "checkbox", ["Oregon", "Nevada", "Washington", "Idaho"]);
    // Q8 radio - largest state
    displayChoices(8, "radio", ["Texas", "Alaska", "Montana", "California"]);
    // Q9 radio - East Coast ocean
    displayChoices(9, "radio", ["Atlantic", "Pacific", "Indian", "Arctic"]);
}
 
 
// ----- validate that everything was answered -----
function isFormValid() {
    let isValid = true;
    let validationFdbk = document.querySelector("#validationFdbk");
 
    // check text inputs and dropdowns are not empty
    let q1 = document.querySelector("#q1").value;
    let q2 = document.querySelector("#q2").value;
    let q5 = document.querySelector("#q5").value;
    let q6 = document.querySelector("#q6").value;
    let q10 = document.querySelector("#q10").value;
 
    if (q1 === "" || q2 === "" || q5 === "" || q6 === "" || q10 === "") {
        isValid = false;
        validationFdbk.textContent = "Please answer all questions before submitting.";
    }
 
    return isValid;
}
 
 
// ----- grade the whole quiz -----
function gradeQuiz() {
    document.querySelector("#validationFdbk").textContent = "";
    document.querySelector("#congratsMsg").textContent = "";
 
    if (!isFormValid()) {
        return;
    }
 
    score = 0;
 
    // Q1 - text
    let q1 = document.querySelector("#q1").value.toLowerCase().trim();
    if (q1 === "sacramento") { rightAnswer(1); } else { wrongAnswer(1); }
 
    // Q2 - dropdown (longest river = Missouri)
    let q2 = document.querySelector("#q2").value;
    if (q2 === "mo") { rightAnswer(2); } else { wrongAnswer(2); }
 
    // Q3 - checkboxes (correct = T. Jefferson + T. Roosevelt only)
    if (isCheckboxAnswerCorrect(3, ["T. Jefferson", "T. Roosevelt"])) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }
 
    // Q4 - radio (smallest state = Rhode Island)
    let q4 = document.querySelector("input[name=q4]:checked");
    if (q4 !== null && q4.value === "Rhode Island") { rightAnswer(4); } else { wrongAnswer(4); }
 
    // Q5 - text (capital of US = Washington)
    let q5 = document.querySelector("#q5").value.toLowerCase().trim();
    // remove commas and periods so "Washington, D.C." also works
    let q5Clean = q5.replace(/[.,]/g, "");
    if (q5Clean === "washington" || q5Clean === "washington dc") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }
 
    // Q6 - dropdown (Sunshine State = Florida)
    let q6 = document.querySelector("#q6").value;
    if (q6 === "fl") { rightAnswer(6); } else { wrongAnswer(6); }
 
    // Q7 - checkboxes (correct = Oregon + Washington only)
    if (isCheckboxAnswerCorrect(7, ["Oregon", "Washington"])) {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }
 
    // Q8 - radio (largest state = Alaska)
    let q8 = document.querySelector("input[name=q8]:checked");
    if (q8 !== null && q8.value === "Alaska") { rightAnswer(8); } else { wrongAnswer(8); }
 
    // Q9 - radio (East Coast ocean = Atlantic)
    let q9 = document.querySelector("input[name=q9]:checked");
    if (q9 !== null && q9.value === "Atlantic") { rightAnswer(9); } else { wrongAnswer(9); }
 
    // Q10 - dropdown (Great Lake entirely in US = Michigan)
    let q10 = document.querySelector("#q10").value;
    if (q10 === "michigan") { rightAnswer(10); } else { wrongAnswer(10); }
 
    // ----- show total score, red if < 80, green otherwise -----
    let totalScore = document.querySelector("#totalScore");
    totalScore.textContent = `Total Score: ${score} / 100`;
    if (score < 80) {
        totalScore.className = "mt-4 text-danger";
    } else {
        totalScore.className = "mt-4 text-success";
    }
 
    // ----- congratulatory message if score > 80 -----
    if (score > 80) {
        document.querySelector("#congratsMsg").textContent =
            "Congratulations! Your Score is above 80!";
    }
 
    // ----- update attempts in localStorage -----
    attempts++;
    document.querySelector("#totalAttempts").textContent =
        `Total times quiz taken: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);
 
    // ----- lock inputs so answers can't be changed, show Try Again -----
    lockInputs(true);
    document.querySelector("#submitBtn").style.display = "none";
    document.querySelector("#resetBtn").style.display = "inline-block";
}
 
 
// ----- lock all inputs so answers can't be changed after submitting -----
function lockInputs(locked) {
    // all the inputs and selects on the page
    let inputs = document.querySelectorAll("input, select");
    for (let el of inputs) {
        el.disabled = locked;
    }
}
 
// ----- reset the quiz to take it again -----
function resetQuiz() {
    // clear text inputs and dropdowns
    document.querySelector("#q1").value = "";
    document.querySelector("#q2").value = "";
    document.querySelector("#q5").value = "";
    document.querySelector("#q6").value = "";
    document.querySelector("#q10").value = "";
 
    // uncheck all checkboxes and radios
    let checks = document.querySelectorAll("input[type=checkbox], input[type=radio]");
    for (let c of checks) {
        c.checked = false;
    }
 
    // clear all feedback and mark images
    for (let i = 1; i <= 10; i++) {
        let fb = document.querySelector(`#q${i}Feedback`);
        if (fb) {
            fb.textContent = "";
            fb.className = "";
        }
        let mark = document.querySelector(`#markImg${i}`);
        if (mark) {
            mark.textContent = "";
        }
    }
 
    // clear score and messages
    document.querySelector("#totalScore").textContent = "";
    document.querySelector("#congratsMsg").textContent = "";
    document.querySelector("#validationFdbk").textContent = "";
 
    // re-shuffle all the choice questions
    displayAllChoices();
 
    // unlock the inputs
    lockInputs(false);
 
    // show Submit, hide Try Again
    document.querySelector("#submitBtn").style.display = "inline-block";
    document.querySelector("#resetBtn").style.display = "none";
}
