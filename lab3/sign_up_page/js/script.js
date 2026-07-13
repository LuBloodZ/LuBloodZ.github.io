// ===== Sign Up Page =====
// CST-336 Internet Programming 
// Lichen Cao
// 07/12/2026

// load the states as soon as the script runs (no event listener needed)
loadStates();

// ----- event listeners -----
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", loadCounties);

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