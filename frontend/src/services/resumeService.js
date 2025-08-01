import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL || "";

/**
 * Upload resume file and job description for analysis.
 *
 * @param {File} file Resume file (PDF/DOCX)
 * @param {string} jdText Job description text
 * @param {string} token JWT token for authorization
 * @returns {Promise<Object>} Analysis result from backend
 */
export async function uploadResumeForAnalysis(file, jdText, token) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jdText);

  const response = await axios.post(`${apiBase}/resume/analyze`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
