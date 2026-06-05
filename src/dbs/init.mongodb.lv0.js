import 'dotenv/config';
import mongoose from 'mongoose';

const URI = process.env.DB_URI || 'mongodb://localhost:27017/myapp';

mongoose.connect(URI)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); 
});

export default mongoose;