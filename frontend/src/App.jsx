import React, { useContext, useState } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Auth from "./components/Auth";
import MainPage from "./pages/MainPage";
import Leaderboard from "./components/Leaderboard";

function AppInner() {
  const { user, logout } = useContext(AuthContext);
  const [currentView, setCurrentView] = useState("main");

  if (!user) return <Auth />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Logo/Title */}
            <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
              📄 Scanlyze
            </h1>

            {/* Nav Buttons & User Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
              {/* Nav Buttons */}
              <div className="flex flex-col sm:flex-row sm:space-x-3 gap-2 sm:gap-0">
                <button
                  onClick={() => setCurrentView("main")}
                  className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                    currentView === "main"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  📤 Analyze Resume
                </button>
                <button
                  onClick={() => setCurrentView("leaderboard")}
                  className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                    currentView === "leaderboard"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  🏆 Leaderboard
                </button>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "main" && <MainPage />}
        {currentView === "leaderboard" && <Leaderboard />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-600">
          📊 Improve your resume match score and climb the leaderboard! 🚀
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;
