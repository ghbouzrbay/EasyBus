// script.js
import dbClient from '../utils/db';

document.addEventListener("DOMContentLoaded", function () {
    const stationsTab = document.getElementById("stationsTab");
    const targetTab = document.getElementById("targetTab");
    const stationsForm = document.getElementById("stationsForm");
    const targetForm = document.getElementById("targetForm");
    const resultsContainer = document.getElementById("results");

    // Event listener for switching to Stations tab
    stationsTab.addEventListener("click", function () {
        stationsTab.classList.add("active");
        targetTab.classList.remove("active");
        stationsForm.classList.remove("hidden");
        targetForm.classList.add("hidden");
        resultsContainer.innerHTML = ""; // Clear previous results
    });

    // Event listener for switching to Route tab
    targetTab.addEventListener("click", function () {
        targetTab.classList.add("active");
        stationsTab.classList.remove("active");
        targetForm.classList.remove("hidden");
        stationsForm.classList.add("hidden");
        resultsContainer.innerHTML = ""; // Clear previous results
    });
});

async function searchStations() {
    const stationSearchInput = document.getElementById("stationSearch");
    const stationName = stationSearchInput.value.trim();

    const buses = await dbClient.buses.find().toArray();
    var busesPassing = [];
    for (let i = 0; i < buses.length; i++) {
      const busStation = buses[i].stations.find(station => station.name === stationName);
      if (busStation !== undefined) {
        busesPassing.push({ busId: buses[i].busId, timeRemaining: busStation.timeRemaining });
      }
    }
    displayResults(busesPassing);
}

function searchRoute() {
    const departureInput = document.getElementById("departure");
    const destinationInput = document.getElementById("destination");
    const departure = departureInput.value.trim();
    const destination = destinationInput.value.trim();

    // Perform validation on departure and destination, if needed

    // Assuming an asynchronous request to the backend to fetch route information
    fetch(`/api/route?departure=${departure}&destination=${destination}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data); // Function to display results
        })
        .catch(error => {
            console.error('Error fetching route information:', error);
        });
}

function displayResults(data) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear previous results

    // Assuming data is an array of results, you can format and display them here
    if (data.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
    } else {
        // Example: Displaying results as a list
        const ul = document.createElement("ul");
        data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.busId} - Time Remaining: ${item.timeRemaining}`;
            ul.appendChild(li);
        });
        resultsContainer.appendChild(ul);
    }
}
