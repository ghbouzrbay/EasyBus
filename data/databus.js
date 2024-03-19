[
  // For busId: "BUS001"
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
      { "name": "Station B", "timeRemaining": ["00:20:00", "00:30:00", "00:35:00", "00:40:00"] }
      // Add more stations as needed
    ]
  },

  // For busId: "BUS005"
  {
    "busId": "BUS005",
    "departureTimes": ["08:00", "08:10", "08:15", "08:20"],
    "stations": [
      { "name": "Station U", "timeRemaining": ["00:00:00", "00:10:00", "00:15:00", "00:20:00"] },
      { "name": "Station X", "timeRemaining": ["00:10:00", "00:20:00", "00:25:00", "00:30:00"] },
      { "name": "Station Z", "timeRemaining": ["00:20:00", "00:30:00", "00:35:00", "00:40:00"] }
      // Add more stations as needed
    ]
  }
]


// Connect to MongoDB and insert sample data into buses collection
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017'; // MongoDB connection URL
const dbName = 'easybus'; // Name of the database

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB successfully');

  const db = client.db(dbName);
  const busesCollection = db.collection('buses');

  // Insert sample data into buses collection
  busesCollection.insertMany(busesData, (err, result) => {
    if (err) {
      console.error('Error inserting buses data:', err);
    } else {
      console.log('Sample data inserted successfully:', result.insertedCount, 'documents');
    }
    client.close(); // Close the MongoDB connection
  });
});



// Function to find buses passing through a specific station
const findBusesByStation = (stationName) => {
  const busesPassing = [];
  buses.forEach(bus => {
    const busStation = bus.stations.find(station => station.name === stationName);
    if (busStation) {
      const timeRemaining = busStation.timeRemaining[0]; // Time remaining for the first station
      busesPassing.push({ busId: bus.busId, timeRemaining: timeRemaining });
    }
  });
  return busesPassing;
};

// Function to find the closest bus to the station
const findClosestBus = (buses, currentTime) => {
  let closestBus = null;
  let minTimeRemaining = Infinity;
  buses.forEach(bus => {
    const timeRemainingInSeconds = timeToSeconds(bus.timeRemaining);
    if (timeRemainingInSeconds < minTimeRemaining) {
      closestBus = bus;
      minTimeRemaining = timeRemainingInSeconds;
    }
  });
  return closestBus;
};

// Function to convert time string to seconds
const timeToSeconds = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

// Function to display buses passing through the station and the closest bus
const displayBusesInfo = (stationName, busesPassing, closestBus) => {
  console.log(`Buses passing through ${stationName}:`);
  busesPassing.forEach(bus => {
    console.log(`Bus ID: ${bus.busId} | Time Remaining: ${bus.timeRemaining}`);
  });
  console.log(`\nClosest bus to ${stationName}:`);
  console.log(`Bus ID: ${closestBus.busId} | Time Remaining: ${closestBus.timeRemaining}`);
};

displayBusesInfo(stationName, busesPassing, closestBus);
