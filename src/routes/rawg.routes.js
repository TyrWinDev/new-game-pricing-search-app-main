import express from 'express';
import axios from 'axios';
import { query, validationResult } from 'express-validator';
import { config } from '../config/environment.js';

const router = express.Router();

// Get games by title
router.get('/', [
  query('title').trim().notEmpty().withMessage('Game title is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title } = req.query;
  const apiUrl = `https://api.rawg.io/api/games?key=${config.rawgApiKey}&search=${title}&page_size=10`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching game data', error);
    res.status(500).json({ error: 'An error occurred while fetching game data' });
  }
});

// Get game details by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const apiUrl = `https://api.rawg.io/api/games/${id}?key=${config.rawgApiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching game details', error);
    res.status(500).json({ error: 'An error occurred while fetching game details' });
  }
});

// Get game screenshots by ID
router.get('/:id/screenshots', async (req, res) => {
  const { id } = req.params;
  const apiUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${config.rawgApiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching screenshots', error);
    res.status(500).json({ error: 'An error occurred while fetching screenshots' });
  }
});

export default router;
