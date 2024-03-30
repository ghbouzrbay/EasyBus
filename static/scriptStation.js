function searchStations() {
    var stationName = document.getElementById("stationSearch").value;
    var apiUrl = "https://effc-41-142-74-155.ngrok-free.app/api/stations/" + encodeURIComponent(stationName);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(data) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (data.length === 0) {
        resultsDiv.innerHTML = "No stations found.";
        return;
    }

    var stationsList = document.createElement("ul");
    data.forEach(station => {
        var stationItem = document.createElement("li");
        stationItem.textContent = station.busId;
        stationsList.appendChild(stationItem);
    });
    resultsDiv.appendChild(stationsList);

    // Show the results div
    resultsDiv.classList.remove("hidden");
}
