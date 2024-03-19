import redisClient from '../utils/redis';
import dbClient from '../utils/db';


const { getRedisStatus, getDBStatus } = require('./utils'); // Assuming you have the utils for Redis and DB status check

// Assuming you have access to the MongoDB client instance and Redis client instance

const AppController = {};

// Endpoint to check the status of Redis and DB
AppController.getStatus = async (req, res) => {
  try {
    const redisStatus = await getRedisStatus(); // Assuming getRedisStatus() returns true if Redis is alive
    const dbStatus = await getDBStatus(); // Assuming getDBStatus() returns true if the DB is alive
    res.status(200).json({ redis: redisStatus, db: dbStatus });
  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Endpoint to get stats (number of users and files)
AppController.getStats = async (req, res) => {
  try {
    // Assuming you have access to the MongoDB client instance and can query the users and files collections
    const usersCount = await db.collection('users').countDocuments();
    const filesCount = await db.collection('files').countDocuments();
    res.status(200).json({ users: usersCount, files: filesCount });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = AppController;

