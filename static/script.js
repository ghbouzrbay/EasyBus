const buses = [
    {
        "busId": "BUS001",
        "departureTimes": ["08:00", "08:10", "08:15", "08:20"],
        "stations": [
          { "name": "Station A", "timeRemaining": ["00:00:00", "00:10:00", "00:15:00", "00:20:00"] },
          { "name": "Station B", "timeRemaining": ["00:10:00", "00:20:00", "00:25:00", "00:30:00"] },
          { "name": "Station C", "timeRemaining": ["00:20:00", "00:30:00", "00:35:00", "00:40:00"] }
          // Add more stations as needed
        ]
      },
    
      // For busId: "BUS002"
      {
        "busId": "BUS002",
        "departureTimes": ["08:00", "08:10", "08:15", "08:20"],
        "stations": [
          { "name": "Station X", "timeRemaining": ["00:00:00", "00:10:00", "00:15:00", "00:20:00"] },
          { "name": "Station A", "timeRemaining": ["00:10:00", "00:20:00", "00:25:00", "00:30:00"] },
          { "name": "Station Z", "timeRemaining": ["00:20:00", "00:30:00", "00:35:00", "00:40:00"] }
          // Add more stations as needed
        ]
      },
    
      // For busId: "BUS003"
      {
        "busId": "BUS003",
        "departureTimes": ["08:00", "08:10", "08:15", "08:20"],
        "stations": [
          { "name": "Station X", "timeRemaining": ["00:00:00", "00:10:00", "00:15:00", "00:20:00"] },
          { "name": "Station Q", "timeRemaining": ["00:10:00", "00:20:00", "00:25:00", "00:30:00"] },
          { "name": "Station R", "timeRemaining": ["00:20:00", "00:30:00", "00:35:00", "00:40:00"] }
          // Add more stations as needed
        ]
      },
    
      // For busId: "BUS004"
      {
        "busId": "BUS004",
        "departureTimes": ["08:00", "08:10", "08:15", "08:20"],
        "stations": [
          { "name": "Station R", "timeRemaining": ["00:00:00", "00:10:00", "00:15:00", "00:20:00"] },
          { "name": "Station N", "timeRemaining": ["00:10:00", "00:20:00", "00:25:00", "00:30:00"] },
          { "name": "Station B", "timeRemaining": ["00:40:00", "00:20:00", "00:25:00", "00:30:00"] }
          // Add more": ["00:2 stations as needed
        ]
      }
];


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

function searchRoute() {
    const departureInput = document.getElementById("departure");
    const destinationInput = document.getElementById("destination");
    const departure = departureInput.value.trim();
    const destination = destinationInput.value.trim();

    var departurePassing = [];
    for (let i = 0; i < buses.length; i++) {
      const busStation = buses[i].stations.find(station => station.name === departure);
      if (busStation !== undefined) {
        departurePassing.push(buses[i]);
      }
    }
    var destinationPassing = [];
    for (let i = 0; i < buses.length; i++) {
      const busStation = buses[i].stations.find(station => station.name === destination);
      if (busStation !== undefined) {
        destinationPassing.push(buses[i]);
      }
    }
    var busesPass = [];
    for (let i = 0; i < departurePassing.length; i++) {
        for (let j = 0; j < destinationPassing.length; j++) {
            if (departurePassing[j] === destinationPassing[i]) {
                busesPass.push(departurePassing[j]);
            }
        }
    }
    displayResults2(busesPass);
}

function displayResults2(data) {
    const resultsContainer = document.getElementById("adamresults");
    resultsContainer.innerHTML = ""; // Clear previous results

// Assuming data is an array of results, you can format and display them here
    if (data.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
    } else {
// Example: Displaying results as a list
    const ul = document.createElement("ul");
    data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.busId}:`;
        const ul2 = document.createElement("ul");
        for (let i = 0; i < item.stations.length; i++) {
            const li2 = document.createElement("li");
            li2.textContent += ` ${item.stations[i].name}, ${item.stations[i].timeRemaining}`;
            ul2.appendChild(li2);
        }
        li.appendChild(ul2);
        ul.appendChild(li);
    });
    resultsContainer.appendChild(ul);
    }
}

function displayResults(data) {
    const resultsContainer = document.getElementById("adamresults");
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

function searchStations() {
    var inputElement = document.getElementById("stationSearch");
    
    // Get the value from the input element
    const stationName = inputElement.value;
    var busesPassing = [];
    for (let i = 0; i < buses.length; i++) {
      const busStation = buses[i].stations.find(station => station.name === stationName);
      if (busStation !== undefined) {
        busesPassing.push({ busId: buses[i].busId, timeRemaining: busStation.timeRemaining });
      }
    }
    //const buses = await dbClient.buses.find().toArray();

    displayResults(busesPassing);
}
