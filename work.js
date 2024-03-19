import DBClient from './utils/databus';

const { Client } = require('pg');
const { Queue } = require('bull');
const { timeToSeconds } = require('./utils');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'your_user',
  password: 'your_password',
  database: 'your_database'
});

const queue = new Queue('processBuses');

queue.process(async (job) => {
  const { stationName } = job.data;

  try {
    await client.connect();

    // Get the buses data from the database
    const result = await client.query('SELECT * FROM buses');
    const buses = result.rows;

    // Find buses passing through the specified station
    const busesPassing = findBusesByStation(stationName, buses);

    // Find the closest bus to the station
    const currentTime = '08:05'; // Current time for demonstration purposes
    const closestBus = findClosestBus(busesPassing, currentTime);

    // Display the buses passing through the station and the closest bus
    displayBusesInfo(stationName, busesPassing, closestBus);

  } catch (err) {
    console.error('Error processing buses:', err);
  } finally {
    await client.end();
  }
});

// Function to find buses passing through a specific station
function findBusesByStation(stationName, buses) {
  const busesPassing = [];
  buses.forEach(bus => {
    const busStation = bus.stations.find(station => station.name === stationName);
    if (busStation) {
      const timeRemaining = busStation.timeRemaining[0]; // Time remaining for the first station
      busesPassing.push({ busId:bus.busId, timeRemaining: timeRemaining });
    }
  });
  return busesPassing;
}

// Function to find the closest bus to the station
function findClosestBus(buses, currentTime) {
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
}

// Function to convert time string to seconds
function timeToSeconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

// Function to display buses passing through the station and the closest bus
function displayBusesInfo(stationName, busesPassing, closestBus) {
  console.log(`Buses passing through ${stationName}:`);
  busesPassing.forEach(bus => {
    console.log(`Bus ID: ${bus.busId} | Time Remaining: ${bus.timeRemaining}`);
  });
  console.log(`\nClosest bus to ${stationName}:`);
  console.log(`Bus ID: ${closestBus.busId} | Time Remaining: ${closestBus.timeRemaining}`);
}

// Start processing the queue
queue.process(10, async (job) => {
  console.log(`Processing job ${job.id}...`);
  await processBuses(job.data);
  console.log(`Job ${job.id} processed.`);
});
