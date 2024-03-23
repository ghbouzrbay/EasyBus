import { MongoClient } from 'mongodb';
// const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'easy_bus';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.db = client.db(DB_DATABASE);
        this.users = this.db.collection('users');
        this.buses = this.db.collection('buses');
      } else {
        console.log(err.message);
        this.db = false;
      }
    });
  }

  isAlive() { return !!this.db; }

  async nbUsers() { return this.users.countDocuments(); }

  async nbBuses() { return this.buses.countDocuments(); }

  async getUser(query) {
    const user = await this.db.collection('users').findOne(query);
    return user;
  }

  async setUser(query) {
    const user = await this.db.collection('users').insertOne(query);
    return user.insertedId;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
