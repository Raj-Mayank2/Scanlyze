import React, { useState } from "react";
import ResumeBuilder from "../components/ResumeBuilder";
import ResumeUpload from "../components/ResumeUpload";
import AnalysisResult from "../components/AnalysisResult";
import Leaderboard from "../components/Leaderboard";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="container mx-auto py-8">
      <nav className="flex gap-4 mb-8 justify-center">
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded ${activeTab === "upload" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Upload/Analyze Resume
        </button>
        <button
          onClick={() => setActiveTab("build")}
          className={`px-4 py-2 rounded ${activeTab === "build" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Create Resume
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`px-4 py-2 rounded ${activeTab === "leaderboard" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Leaderboard
        </button>
      </nav>

      {activeTab === "upload" && (
        <>
          <ResumeUpload onResult={setAnalysisResult} />
          {analysisResult && <AnalysisResult result={analysisResult} />}
        </>
      )}
      {activeTab === "build" && <ResumeBuilder />}
      {activeTab === "leaderboard" && <Leaderboard />}
    </div>
  );
};

export default MainPage;
