import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import snippetRoutes from './routes/snippetRoutes.js';
import { connection, sequelize } from './postgres/postgres.js';
import startCleanupJob from './jobs/cleanupJob.js';
import cors from 'cors';


const app = express();

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

console.log('Allowed CORS origins:', allowedOrigins, process.env.CORS_ORIGINS, process.env.PORT);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // if you send cookies/auth headers
}));
app.use(express.json());

app.use('/snippets', snippetRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;

(async () => {
  await connection();
  await sequelize.sync(); // creates tables if they don’t exist
  // Start automatic cleanup job
  startCleanupJob();
  app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
})();