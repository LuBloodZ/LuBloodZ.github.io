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
displayQ4Choices();  // show Q4 choices in random order on load

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

// ----- shuffle an array (Fisher-Yates) -----
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// ----- build Q4 radio choices in random order -----
function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    shuffleArray(q4ChoicesArray);

    let choicesContainer = document.querySelector("#q4Choices");
    choicesContainer.textContent = "";

    for (let choice of q4ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "q4";
        input.id = choice;
        input.value = choice;

        let label = document.createElement("label");
        label.htmlFor = choice;
        label.textContent = " " + choice + " ";

        choicesContainer.appendChild(input);
        choicesContainer.appendChild(label);
        choicesContainer.appendChild(document.createTextNode("  "));
    }
}

// ----- validate that everything was answered -----
function isFormValid() {
    let isValid = true;
    let validationFdbk = document.querySelector("#validationFdbk");

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

    // Q1 - text (capital of California = Sacramento)
    let q1 = document.querySelector("#q1").value.toLowerCase().trim();
    if (q1 === "sacramento") { rightAnswer(1); } else { wrongAnswer(1); }

    // Q2 - dropdown (longest river = Missouri)
    let q2 = document.querySelector("#q2").value;
    if (q2 === "mo") { rightAnswer(2); } else { wrongAnswer(2); }

    // Q3 - checkboxes (Jefferson + Roosevelt only)
    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    // Q4 - radio (smallest state = Rhode Island)
    let q4 = document.querySelector("input[name=q4]:checked");
    if (q4 !== null && q4.value === "Rhode Island") { rightAnswer(4); } else { wrongAnswer(4); }

    // Q5 - text (capital of US = Washington)
    let q5 = document.querySelector("#q5").value.toLowerCase().trim();
    if (q5 === "washington" || q5 === "washington dc" || q5 === "washington d.c.") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    // Q6 - dropdown (Sunshine State = Florida)
    let q6 = document.querySelector("#q6").value;
    if (q6 === "fl") { rightAnswer(6); } else { wrongAnswer(6); }

    // Q7 - checkboxes (Pacific coast = Oregon + Washington)
    if (document.querySelector("#Oregon").checked &&
        document.querySelector("#Washington").checked &&
        !document.querySelector("#Nevada").checked &&
        !document.querySelector("#Idaho").checked) {
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
}