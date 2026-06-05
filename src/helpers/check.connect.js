import mongoose from 'mongoose';
import os from 'os';
import process from 'process';

const DURATION = 10000; // 10 seconds
const MAX_CONNECTIONS_PER_CORE = 5;

export const countConnections = () => {
  try {
    const res = mongoose.connections.length;
    return res;
  } catch (error) {
    console.error('Error checking MongoDB connection:', error);
    return 0;
  }
};

export const checkOverload = () => {
  setInterval(() => {
    const connections = countConnections();
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss / (1024 * 1024); // Convert to MB
    const maxConnections = numCores * MAX_CONNECTIONS_PER_CORE;

    if (connections > maxConnections) {
      console.warn(`Overload detected: ${connections} connections (max ${maxConnections})`);
    } else {
      console.log(`Current connections: ${connections} (max ${maxConnections}), Memory usage: ${memoryUsage} MB`);
    }
  }, DURATION); // Check every 10 seconds
};