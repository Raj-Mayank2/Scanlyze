import React, { useState } from "react";
import { uploadResumeForAnalysis } from "../services/resumeService";
import { useAuth } from "../hooks/useAuth";

const ResumeUpload = ({ onResult }) => {
  const { user } = useAuth();
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !user.token) {
      setError("You must be logged in to upload a resume.");
      return;
    }
    if (!resumeFile || !jdText.trim()) {
      setError("Resume file and job description are required.");
      return;
    }

    setLoading(true);
    try {
      const result = await uploadResumeForAnalysis(resumeFile, jdText, user.token);
      onResult(result);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "Error analyzing resume.";
      setError(message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg w-full mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md mt-6 sm:mt-10">
      <h2 className="text-lg sm:text-xl font-bold text-center mb-4 text-gray-800">
        Upload Resume for Analysis
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <label className="block text-sm font-medium text-gray-700">
          Upload Resume (PDF/DOC/DOCX)
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-gray-700">
          Job Description
        </label>
        <textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste the Job Description here..."
          rows={5}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="text-sm text-red-600 text-center px-2" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-md transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;
