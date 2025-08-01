// src/services/resumeService.js
import axios from "axios";

/**
 * Upload resume file and job description for analysis.
 * 
 * @param {File} file - Resume file (PDF/DOCX)
 * @param {string} jdText - Job description text
 * @param {string} token - JWT token for authorization
 * @returns {Promise<object>} Analysis result from backend
 */
export async function uploadResumeForAnalysis(file, jdText, token) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jdText);

  const response = await axios.post(
    "/api/resume/analyze", // Backend API endpoint
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Add JWT token here for auth
      },
    }
  );
  return response.data;  // JSON including match, suggestions, keywords, etc.
}
