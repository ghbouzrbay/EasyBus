import { MongoClient } from 'mongodb';

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || 27017;
    const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${DB_HOST}:${DB_PORT}`;

    // Create a MongoDB client
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to MongoDB
    this.client.connect((err) => {
      if (err) {
        console.error('Error connecting to MongoDB:', err);
        this.db = false;
      } else {
        console.log('Connected to MongoDB successfully');
        this.db = this.client.db(DB_DATABASE);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      }
    });
  }

  isAlive() {
    // Check if the MongoDB client is connected
    return !!this.db;
  }

  async nbUsers() {
    // Get the number of documents in the users collection
    try {
      const count = await this.users.countDocuments();
      return count;
    } catch (err) {
      console.error('Error getting number of users:', err);
      return -1;
    }
  }

  async nbFiles() {
    // Get the number of documents in the files collection
    try {
      const count = await this.files.countDocuments();
      return count;
    } catch (err) {
      console.error('Error getting number of files:', err);
      return -1;
    }
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
