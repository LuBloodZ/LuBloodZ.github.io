// ===== Sign Up Page =====
// CST-336 Internet Programming 
// Lichen Cao
// 07/12/2026

// load the states as soon as the script runs (no event listener needed)
loadStates();

// ----- event listeners -----
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", loadCounties);
document.querySelector("#password").addEventListener("click", suggestPassword);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", validateForm);

// ----- API 1: get city / lat / long from zip code -----
async function displayCity() {
    try {
        let zipCode = document.querySelector("#zip").value;
        let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
        let response = await fetch(url);
        let data = await response.json();

        // the API returns false if the zip code isn't found
        if (data === false) {
            document.querySelector("#city").textContent = "Zip code not found";
            document.querySelector("#latitude").textContent = "";
            document.querySelector("#longitude").textContent = "";
            return;
        }

        document.querySelector("#city").textContent = data.city;
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.longitude;

    } catch (error) {
        document.querySelector("#city").textContent = "Unable to retrieve city";
        console.error(error);
    }
}

// ----- API 2: check whether the username is available -----
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");

    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "red";
        return false;
    }

    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.available) {
        usernameError.textContent = "Username available!";
        usernameError.style.color = "green";
        return true;
    } else {
        usernameError.textContent = "Username taken";
        usernameError.style.color = "red";
        return false;
    }
}

// ----- API 3: load counties for the selected state -----
async function loadCounties() {
    let state = document.querySelector("#state").value.toLowerCase();
    let countyMenu = document.querySelector("#county");
    countyMenu.textContent = "";

    if (state === "") {
        return;
    }

    try {
        let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
        let response = await fetch(url);
        let data = await response.json();



        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.county;
            option.textContent = item.county;
            countyMenu.appendChild(option);
        }
    } catch (error) {
        console.error(error);
    }
}

// ----- API 4: load all US states into the state dropdown -----
async function loadStates() {
    let stateMenu = document.querySelector("#state");
    stateMenu.textContent = "";

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select One";
    stateMenu.appendChild(defaultOption);

    try {
        let url = "https://csumb.space/api/allStatesAPI.php";
        let response = await fetch(url);
        let data = await response.json();

        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.usps;
            option.textContent = item.state;
            stateMenu.appendChild(option);
        }
    } catch (error) {
        console.error(error);
        stateMenu.textContent = "";
        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load states";
        stateMenu.appendChild(errorOption);
    }
}

// ----- API 5: get a suggested password when clicking the password box -----
async function suggestPassword() {
    try {
        let url = "https://csumb.space/api/suggestedPassword.php?length=8";
        let response = await fetch(url);
        let data = await response.json();

        document.querySelector("#suggestedPassword").textContent =
            "Suggested password: " + data.password;
    } catch (error) {
        console.error(error);
    }
}

// ----- validate the whole form before submitting -----
async function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    // --- username validation ---
    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");
    usernameError.textContent = "";

    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "red";
        isValid = false;
    } else {
        let usernameAvailable = await checkUsername();
        if (usernameAvailable === false) {
            isValid = false;
        }
    }

    // --- password validation ---
    let password = document.querySelector("#password").value;
    let passwordAgain = document.querySelector("#passwordAgain").value;
    let passwordError = document.querySelector("#passwordError");
    passwordError.textContent = "";

    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        passwordError.style.color = "red";
        isValid = false;
    } else if (password !== passwordAgain) {
        passwordError.textContent = "Passwords do not match";
        passwordError.style.color = "red";
        isValid = false;
    }

    // --- if everything is valid, submit the form ---
    if (isValid) {
        document.querySelector("#signupForm").submit();
    }
}