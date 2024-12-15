const API_URL = 'http://localhost:3000/api';

// Fetch games by title
export const fetchGames = async (title) => {
  const response = await fetch(`${API_URL}/games?title=${encodeURIComponent(title)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  return response.json();
};

// Fetch game details by ID
export const fetchGameById = async (id) => {
  const response = await fetch(`${API_URL}/games/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch game');
  }
  return response.json();
};

// Fetch game screenshots by ID
export const fetchGameScreenshots = async (id) => {
  const response = await fetch(`${API_URL}/games/${id}/screenshots`);
  if (!response.ok) {
    throw new Error('Failed to fetch game screenshots');
  }
  return response.json();
};

// Fetch deals by title
export const fetchDeals = async (title) => {
  const response = await fetch(`${API_URL}/deals?title=${encodeURIComponent(title)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch deals');
  }
  return response.json();
};

// Fetch trending deals
export const fetchTrendingDeals = async () => {
  const response = await fetch(`${API_URL}/deals/trending`);
  if (!response.ok) {
    throw new Error('Failed to fetch trending deals');
  }
  return response.json();
};

// Fetch YouTube video by game name
export const fetchYouTubeVideo = async (gameName) => {
  const response = await fetch(`${API_URL}/youtube?gameName=${encodeURIComponent(gameName)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch YouTube video');
  }
  return response.json();
};

// Fetch YouTube review by game name
export const fetchYouTubeReview = async (gameName) => {
  const response = await fetch(`${API_URL}/youtube/review?gameName=${encodeURIComponent(gameName)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch YouTube review');
  }
  return response.json();
};

// Login
export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return response.json();
};

export const fetchGameDetails = async (id) => {
  try {
    // First get the game details
    const gameResponse = await fetch(`${API_URL}/games/${id}`);
    if (!gameResponse.ok) {
      throw new Error('Failed to fetch game');
    }
    const gameDetails = await gameResponse.json();

    // Use the game's name to search for deals
    const dealsResponse = await fetch(`${API_URL}/deals?title=${encodeURIComponent(gameDetails.name)}`);
    if (!dealsResponse.ok) {
      throw new Error('Failed to fetch deals');
    }
    const deals = await dealsResponse.json();

    // Add deals information to game details
    gameDetails.cheapest = deals[0]?.cheapest || null;
    gameDetails.cheapestDealID = deals[0]?.cheapestDealID || null;
    gameDetails.storeLink = deals[0] ? `https://www.cheapshark.com/redirect?dealID=${deals[0].cheapestDealID}` : null;

    return gameDetails;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};