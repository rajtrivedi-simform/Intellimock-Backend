import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import userRoutes from './modules/auth/auth.routes';
import questionRoutes from './modules/questions/questions.routes';
import interviewRoutes from './modules/interviews/interviews.routes';
import errorHandler from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import { CORS_CLIENTS } from './configs/env.config';
// import nodeCron from 'node-cron';

dotenv.config(); // Load .env variables

const app = express();

// Middlewares
app.use(
  cors({
    origin: CORS_CLIENTS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(errorHandler);

// Routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/questions/', questionRoutes);
app.use('/api/v1/interviews/', interviewRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('🚀 IntelliMock API is running...');
});

// cron job schedule
// nodeCron.schedule('* * * * * *', () => {
//   console.log('Running a task every 10 minutes');
// });

export default app;
