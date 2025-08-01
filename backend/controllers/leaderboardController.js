const Analysis = require('../models/Analysis');
const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  try {
    // Aggregate highest score per user, sort descending
    const topResults = await Analysis.aggregate([
      {
        $group: {
          _id: '$user',
          bestScore: { $max: '$matchPercent' },
          totalAnalyses: { $sum: 1 },
          lastAnalysis: { $max: '$createdAt' }
        }
      },
      { $sort: { bestScore: -1, lastAnalysis: -1 } }, // Secondary sort by recency
      { $limit: 50 } // Increased limit for more comprehensive leaderboard
    ]);

    // Populate user info with error handling
    const leaderboard = await Promise.all(
      topResults.map(async ({ _id, bestScore, totalAnalyses, lastAnalysis }) => {
        try {
          const user = await User.findById(_id);
          if (!user) {
            console.warn(`User not found for ID: ${_id}`);
            return null; // Will be filtered out
          }
          return { 
            userName: user.name, 
            score: Math.round(bestScore * 100) / 100, // Round to 2 decimal places
            totalAnalyses,
            lastAnalysis
          };
        } catch (error) {
          console.error(`Error fetching user ${_id}:`, error);
          return null; // Will be filtered out
        }
      })
    );

    // Filter out null results and send response
    const validLeaderboard = leaderboard.filter(entry => entry !== null);
    
    res.json(validLeaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch leaderboard data',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};