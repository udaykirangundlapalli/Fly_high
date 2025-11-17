// Show / Hide Section Function
function display(sectionId) {
    document.getElementById("sectionHome").style.display = "none";
    document.getElementById("sectionFavouritePlaces").style.display = "none";

    document.getElementById(sectionId).style.display = "block";
}

// Wikipedia Search Code
let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

async function searchWikipedia(event) {
    if (event.key === "Enter") {
        let searchInput = searchInputEl.value.trim();
        if (searchInput === "") {
            alert("Please enter a search term.");
            return;
        }

        spinnerEl.classList.remove("d-none");
        searchResultsEl.innerHTML = "";

        let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchInput)}&format=json&origin=*`;

        try {
            let response = await fetch(url);
            let data = await response.json();
            displayResults(data.query.search);
        } catch (error) {
            searchResultsEl.textContent = "Failed to fetch results.";
        } finally {
            spinnerEl.classList.add("d-none");
        }
    }
}

function displayResults(results) {
    searchResultsEl.innerHTML = "";

    if (results.length === 0) {
        searchResultsEl.textContent = "No results found.";
        return;
    }

    for (let result of results) {
        createAndAppend(result);
    }
}

function createAndAppend(result) {
    let {
        title,
        snippet
    } = result;

    let card = document.createElement("div");
    card.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    titleEl.textContent = title;
    card.appendChild(titleEl);

    let urlEl = document.createElement("a");
    urlEl.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    urlEl.textContent = `https://en.wikipedia.org/wiki/${title}`;
    card.appendChild(urlEl);

    let desc = document.createElement("p");
    desc.classList.add("link-description");
    desc.innerHTML = snippet;
    card.appendChild(desc);

    searchResultsEl.appendChild(card);
}

searchInputEl.addEventListener("keydown", searchWikipedia);