import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import instanceDatabase from './dbs/init.mongodb.lv100.js';
import router from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// initialize database connection
instanceDatabase;

// routes
app.use('/api/v1', router);

export default app;