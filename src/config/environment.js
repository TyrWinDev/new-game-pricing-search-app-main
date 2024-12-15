import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  rawgApiKey: process.env.RAWG_API_KEY,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
};
