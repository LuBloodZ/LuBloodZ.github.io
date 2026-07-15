// ===== Fetch and Web APIs =====
// CST-336 Internet Programming 
// Lichen Cao
// 07/14/2026

// when the Search button is clicked, run searchCharacters()
document.querySelector("#searchBtn").addEventListener("click", searchCharacters);

// async lets us use "await" inside this function
async function searchCharacters() {
    // grab what the user typed into the textbox
    let name = document.querySelector("#charName").value.trim();
    let errorMsg = document.querySelector("#errorMsg");
    let results = document.querySelector("#results");

    // clear the old error message before each search
    errorMsg.textContent = "";

    // ----- VALIDATION -----
    // don't search if the box is empty
    if (name === "") {
        errorMsg.textContent = "Please enter a character name.";
        return;  // stop the function right here
    }
    // a single letter matches way too many characters, so require 2+
    if (name.length < 2) {
        errorMsg.textContent = "Please enter at least 2 characters.";
        return;
    }

    // clear any previous results before showing new ones
    results.textContent = "";
    let url = `https://rickandmortyapi.com/api/character/?name=${name}`;

    // await pauses here until the API sends data back
    let response = await fetch(url);
    // convert the JSON response into a JavaScript object
    let data = await response.json();

 // grab the container where the cards will go
    let results = document.querySelector("#results");

    // clear old results before showing new ones
    results.textContent = "";

    // data.results is the array of characters the API found
    for (let character of data.results) {
        let card = document.createElement("div");
         card.className = "card";  // so the CSS can style it later

        // pick a dot color based on whether the character is alive
        let statusColor = "gray";  // default for "unknown"
        if (character.status === "Alive") {
            statusColor = "green";
        } else if (character.status === "Dead") {
            statusColor = "red";
        }

        // innerHTML builds the whole card layout at once
        // ${...} inserts each character's data into the template
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p><span class="dot ${statusColor}"></span>
               ${character.status} - ${character.species}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Origin:</strong> ${character.origin.name}</p>
            <p><strong>Location:</strong> ${character.location.name}</p>
        `;
        results.appendChild(card);  // add it to the page
    }
}

