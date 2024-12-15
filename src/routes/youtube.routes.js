import express from 'express';
import axios from 'axios';
import { query, validationResult } from 'express-validator';
import { config } from '../config/environment.js';

const router = express.Router();

// Get video by title
router.get('/', [
  query('gameName').trim().notEmpty().withMessage('Game name is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { gameName } = req.query;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${gameName} trailer&key=${config.youtubeApiKey}`
    );
    res.json(response.data.items[0]);
  } catch (error) {
    console.error('Error fetching YouTube video', error);
    res.status(500).json({ error: 'An error occurred while fetching YouTube video' });
  }
});

// Get video review by title
router.get('/review', [
  query('gameName').trim().notEmpty().withMessage('Game name is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { gameName } = req.query;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${gameName} review&key=${config.youtubeApiKey}`
    );
    res.json(response.data.items[0]);
  } catch (error) {
    console.error('Error fetching YouTube video', error);
    res.status(500).json({ error: 'An error occurred while fetching YouTube video' });
  }
});

export default router; 