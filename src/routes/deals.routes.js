import express from 'express';
import axios from 'axios';
import { query, validationResult } from 'express-validator';
import { cache } from '../config/cache.js';

const router = express.Router();

// Get deals by title
router.get('/', [
  query('title').trim().notEmpty().withMessage('Game title is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title } = req.query;
  const apiUrl = `https://www.cheapshark.com/api/1.0/games?title=${title}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching deal data', error);
    res.status(500).json({ error: 'An error occurred while fetching deal data' });
  }
});

// Get deal by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const apiUrl = `https://www.cheapshark.com/api/1.0/games?id=${id}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching deal data', error);
    res.status(500).json({ error: 'An error occurred while fetching deal data' });
  }
});

// Get trending deals (with caching)
router.get('/trending', async (req, res) => {
  const cacheKey = 'trending-deals';
  const cachedData = cache.get(cacheKey);
  
  if (cachedData) {
    return res.json(cachedData);
  }
  
  const apiUrl = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';

  try {
    const response = await axios.get(apiUrl);
    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching trending deals', error);
    res.status(500).json({ error: 'An error occurred while fetching trending deals' });
  }
});

export default router;
