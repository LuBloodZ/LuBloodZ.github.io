// ===== Fetch and Web APIs =====
// CST-336 Internet Programming 
// Lichen Cao
// 07/14/2026

// when the Search button is clicked, run searchCharacters()
document.querySelector("#searchBtn").addEventListener("click", searchCharacters);

// async lets us use "await" inside this function
async function searchCharacters() {
    // grab what the user typed
    let name = document.querySelector("#charName").value;
    let results = document.querySelector("#results");

    // clear any previous results before showing new ones
    results.textContent = "";
    let url = `https://rickandmortyapi.com/api/character/?name=${name}`;

    // await pauses here until the API sends data back
    let response = await fetch(url);
    // convert the JSON response into a JavaScript object
    let data = await response.json();

    // data.results is the array of characters the API found
    for (let character of data.results) {
        let card = document.createElement("div");
        card.textContent = character.name;
        results.appendChild(card);  // add the div to the page
    }
}