import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import questionRoutes from './modules/questions/questions.routes';
import interviewRoutes from './modules/interviews/interviews.routes';
import errorHandler from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import { AI_API_URL, CORS_CLIENTS, PARSER_API_URL } from './configs/env.config';
import nodeCron from 'node-cron';


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
app.use('/api/v1/auth/', authRoutes);
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/questions/', questionRoutes);
app.use('/api/v1/interviews/', interviewRoutes);

// Health Check
app.get('/', (_, res) => {
  res.send('🚀 IntelliMock API is running...');
});

// cron job schedule
nodeCron.schedule('*/5 * * * *', async () => {
  try {
    await fetch(`${AI_API_URL}`);
  } catch (error) {
    console.error(error);
  }
});

nodeCron.schedule('*/5 * * * *', async () => {
  try {
    await fetch(`${PARSER_API_URL}`);
  } catch (error) {
    console.error(error);
  }
});

export default app;