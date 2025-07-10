import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import questionRoutes from './modules/questions/questions.routes';
import errorHandler from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';

dotenv.config(); // Load .env variables

const app = express();

// Middlewares
app.use(
  cors({
    origin: ['http://localhost:4200', 'https://ftq6fsw1-4200.inc1.devtunnels.ms'],
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

// Health Check
app.get('/', (req, res) => {
  res.send('🚀 IntelliMock API is running...');
});

export default app;
