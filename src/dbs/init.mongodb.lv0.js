import mongoose from 'mongoose';

const URI = config.db.uri;

mongoose.connect(URI)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); 
});

export default mongoose;