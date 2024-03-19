import { MongoClient } from 'mongodb';
// const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'easybus';



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

    // Find buses passing through a specific station
    const stationName = 'Station X';
    busesCollection.find({ "stations.name": stationName }).toArray((err, buses) => {
      if (err) {
        console.error('Error finding buses:', err);
      } else {
        const busesPassing = buses.map(bus => {
          const busStation = bus.stations.find(station => station.name === stationName);
          const timeRemaining = busStation.timeRemaining[0]; // Time remaining for the first station
          return { busId: bus.busId, timeRemaining: timeRemaining };
        });

        // Find the closest bus to the station
        const closestBus = findClosestBus(busesPassing);

        // Display buses passing through the station and the closest bus
        displayBusesInfo(stationName, busesPassing, closestBus);
      }
      client.close(); // Close the MongoDB connection
    });
  });
});

const findClosestBus = (buses, currentTime) => {
  let closestBus = null;let minTimeRemaining = Infinity;
  buses.forEach(bus => {
    const timeRemainingInSeconds = timeToSeconds(bus.timeRemaining);
    if (timeRemainingInSeconds < minTimeRemaining) {
      closestBus = bus;
      minTimeRemaining = timeRemainingInSeconds;
    }
  });
  return closestBus;
};

const timeToSeconds = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const displayBusesInfo = (stationName, busesPassing, closestBus) => {
  console.log(`Buses passing through ${stationName}:`);
  busesPassing.forEach(bus => {
    console.log(`Bus ID: ${bus.busId} | Time Remaining: ${bus.timeRemaining}`);
  });
  console.log(`\nClosest bus to ${stationName}:`);
  console.log(`Bus ID: ${closestBus.busId} | Time Remaining: ${closestBus.timeRemaining}`);
};

const busesData = [
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
      { "name": "Station B", "timeRemaining00:40:00"] }
      // Add more": ["00:2 stations as needed
    ]
  },

  // For busId0:00", "00:30:00", "00:3: "BUS004"
  {
    "busId":5:00", "00:40:00"] }
      // Add more stations as needed
    ]
  },

 "BUS004",
    "departureTimes": ["08:00", "08:10", "08:15", "0  // For busId8:2: "BUS005"
  {
    "busId": "BUS005",
    "departureTimes": ["08:000"],
    "stations": [
      { "name":", "08:10", "08:15", "0 "Station R", "timeRemaining": ["00:8:20"],
    "stations": [
      { "name":00:00", "00:10:00", "00:1 "Station U", "timeRemaining": ["00:00:00", "00:10:00", "00:15:00", "5:00",00:20:00"] },
      { "name "00:20:00"] },
      { "name": "Station N", "timeRemaining": ["00:10:00", "00:2": "Station X", "timeRemaining0:00", "00:25:00", "00:30:00"] },
      { "name": "Station B", "timeRemaining": ["00:2": ["00:10:00", "00:20:00", "00:30:00",0:00", "00:25:00", "00:30:00"] },
      { "name": "Station Z", "timeRemaining "00:35:00",": ["00:2 "00:40:00"] }
      // Add more stations as needed
    ]
  },

  // For busId0:00", "00:30:00", "00:35:00", "00:4: "BUS005"
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
];
