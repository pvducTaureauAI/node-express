import 'dotenv/config';
import mongoose from 'mongoose';
import { countConnections } from '../helpers/check.connect.js';

const URI = process.env.DB_URI || 'mongodb://localhost:27017/myapp';

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.connect(URI)
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