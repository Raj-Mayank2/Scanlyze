import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../services/leaderboardService";
import { useAuth } from "../hooks/useAuth";

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboard();
      setLeaderboardData(data);
      setError("");
    } catch (err) {
      setError("Failed to load leaderboard data");
      console.error("Leaderboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return "🥇";
      case 1: return "🥈";
      case 2: return "🥉";
      default: return "🏅";
    }
  };

  const getRankClass = (index) => {
    switch (index) {
      case 0: return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300";
      case 1: return "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300";
      case 2: return "bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300";
      default: return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const isCurrentUser = (userName) => {
    return user && user.name === userName;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border border-red-200">
        <div className="text-center">
          <span className="text-4xl mb-4 block">❌</span>
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error Loading Leaderboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchLeaderboard}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="text-center">
          <span className="text-6xl mb-4 block">📊</span>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Data Yet</h3>
          <p className="text-gray-600">Be the first to analyze your resume and appear on the leaderboard!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🏆 Resume Match Leaderboard
        </h2>
        <p className="text-gray-600">
          Top performers with the highest resume match scores
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{leaderboardData.length}</div>
          <div className="text-sm text-gray-600">Total Participants</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {leaderboardData[0]?.score || 0}%
          </div>
          <div className="text-sm text-gray-600">Highest Score</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(leaderboardData.reduce((sum, item) => sum + item.score, 0) / leaderboardData.length) || 0}%
          </div>
          <div className="text-sm text-gray-600">Average Score</div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboardData.map(({ userName, score }, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-md
              ${getRankClass(index)}
              ${isCurrentUser(userName) ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
            `}
          >
            {/* Rank and User Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm">
                <span className="text-2xl">{getRankIcon(index)}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {userName}
                    {isCurrentUser(userName) && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        You
                      </span>
                    )}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Rank #{index + 1}
                </p>
              </div>
            </div>

            {/* Score */}
            <div className="text-right">
              <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                {score}%
              </div>
              <div className="text-xs text-gray-500">
                Match Score
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <button
          onClick={fetchLeaderboard}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>🔄</span>
          <span>Refresh Leaderboard</span>
        </button>
      </div>

      {/* User's Position Info */}
      {user && (
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {(() => {
                const userIndex = leaderboardData.findIndex(item => item.userName === user.name);
                if (userIndex !== -1) {
                  return `🎯 You're currently ranked #${userIndex + 1} with ${leaderboardData[userIndex].score}% match score!`;
                } else {
                  return "📈 Analyze your resume to appear on the leaderboard!";
                }
              })()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;