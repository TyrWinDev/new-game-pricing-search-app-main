import express from 'express';
import cors from 'cors';
import { config } from './src/config/environment.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { rawgRoutes, youtubeRoutes, dealRoutes } from './src/routes/index.js';

const app = express();

app.use(cors({
  origin: '*', 
  methods: 'GET, POST, OPTIONS',
  allowedHeaders: 'Content-Type',
}));
app.use(express.json());

// Routes
app.use('/api/games', rawgRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/deals', dealRoutes);

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});