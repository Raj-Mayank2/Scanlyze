import React from "react";

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const { matchPercent, missingKeywords, suggestions, summary } = result;

  // Determine match score color and status
  const getMatchStatus = (percent) => {
    if (percent >= 80) return { color: "text-green-600", bg: "bg-green-100", status: "Excellent Match", icon: "🎯" };
    if (percent >= 60) return { color: "text-blue-600", bg: "bg-blue-100", status: "Good Match", icon: "👍" };
    if (percent >= 40) return { color: "text-yellow-600", bg: "bg-yellow-100", status: "Fair Match", icon: "⚠️" };
    return { color: "text-red-600", bg: "bg-red-100", status: "Needs Work", icon: "🔧" };
  };

  const matchStatus = getMatchStatus(matchPercent);

  // Progress bar calculation
  const progressWidth = Math.max(5, matchPercent); // Minimum 5% for visibility

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          📊 Resume Analysis Results
        </h2>
        <p className="text-gray-600">
          Here's how your resume matches the job requirements
        </p>
      </div>

      {/* Match Score Card */}
      <div className={`${matchStatus.bg} rounded-xl p-6 mb-8 border-l-4 ${matchStatus.color.replace('text-', 'border-')}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{matchStatus.icon}</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Match Score</h3>
              <p className={`${matchStatus.color} font-medium`}>{matchStatus.status}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${matchStatus.color}`}>
              {matchPercent != null ? `${matchPercent}%` : "N/A"}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-1000 ease-out ${matchStatus.color.replace('text-', 'bg-')}`}
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Summary */}
        {summary && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">👤</span>
              <h3 className="text-xl font-semibold text-gray-800">Profile Summary</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Missing Keywords */}
        {missingKeywords && missingKeywords.length > 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🎯</span>
              <h3 className="text-xl font-semibold text-gray-800">Missing Keywords</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Consider adding these keywords to improve your match score:
            </p>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium border border-orange-200 hover:bg-orange-200 transition-colors"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {suggestions && (
        <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">💡</span>
            <h3 className="text-xl font-semibold text-gray-800">Improvement Suggestions</h3>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <p className="text-gray-700 leading-relaxed">{suggestions}</p>
          </div>
        </div>
      )}

      {/* Action Items */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">🚀</span>
          <h3 className="text-xl font-semibold text-gray-800">Next Steps</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center border border-blue-100">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-semibold text-gray-800 mb-1">Update Resume</h4>
            <p className="text-sm text-gray-600">Add missing keywords and skills</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-blue-100">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold text-gray-800 mb-1">Tailor Content</h4>
            <p className="text-sm text-gray-600">Align experience with job requirements</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-blue-100">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold text-gray-800 mb-1">Re-analyze</h4>
            <p className="text-sm text-gray-600">Test your updated resume</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          💼 Keep refining your resume to increase your match score and land more interviews!
        </p>
      </div>
    </div>
  );
};

export default AnalysisResult;