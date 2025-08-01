// src/services/leaderboardService.js
import axios from 'axios';

export const getLeaderboard = async () => {
  try {
    const response = await axios.get('/api/leaderboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};