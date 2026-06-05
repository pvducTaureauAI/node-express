import mongoose from 'mongoose';
import { countConnections } from '../helpers/check.connect.js';
import config from '../configs/config.js';

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.connect(config.db.uri)
      .then(() => console.log('MongoDB connected successfully', countConnections()))
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceDatabase = Database.getInstance();

export default instanceDatabase;