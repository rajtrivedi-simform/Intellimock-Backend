import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import userRoutes from './modules/auth/auth.routes';
import errorHandler from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';

dotenv.config(); // Load .env variables

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(errorHandler);

// Routes
app.use('/api/v1/users/', userRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('🚀 IntelliMock API is running...');
});

export default app;
