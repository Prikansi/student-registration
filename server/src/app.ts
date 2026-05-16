import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api', studentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// 404 handler — log unmatched requests for debugging
app.use((req, res) => {
  console.log(`No route matched: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Not Found' });
});

export default app;