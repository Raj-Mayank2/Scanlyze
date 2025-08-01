{/*/// src/services/resumeService.js
import axios from 'axios';

// Set base URL for all requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Upload resume file and job description for analysis.
 * 
 * @param {File} file - Resume file (PDF/DOCX)
 * @param {string} jdText - Job description text
 * @param {string} token - JWT token for authorization
 * @returns {Promise<object>} Analysis result from backend//

export async function uploadResumeForAnalysis(file, jdText, token) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jdText);

  const response = await axios.post(
    `${API_BASE_URL}/api/resume/analyze`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;  // JSON including match, suggestions, keywords, etc.
}
*/}
import React, { useState } from 'react';
import { uploadResumeForAnalysis } from '../services/resumeService';

function ResumeAnalyzer() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (file, jobDescription, token) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await uploadResumeForAnalysis(file, jobDescription, token);
      setResult(analysisResult);
    } catch (err) {
      // ✅ IMPORTANT: Store error message as string, not error object
      setError(err.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ✅ CORRECT: Render error message, not error object */}
      {error && (
        <div className="error-message" style={{ color: 'red', padding: '10px', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      {loading && (
        <div className="loading-message">
          Analyzing resume...
        </div>
      )}

      {/* ✅ CORRECT: Render specific properties, not entire result object */}
      {result && (
        <div className="results">
          <h3>Analysis Results</h3>
          
          {/* Safely render different types of data */}
          {result.score && (
            <div>
              <strong>Match Score:</strong> {result.score}%
            </div>
          )}
          
          {result.message && (
            <div>
              <strong>Message:</strong> {result.message}
            </div>
          )}
          
          {result.suggestions && Array.isArray(result.suggestions) && (
            <div>
              <strong>Suggestions:</strong>
              <ul>
                {result.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
          
          {result.keywords && Array.isArray(result.keywords) && (
            <div>
              <strong>Keywords:</strong>
              <div>
                {result.keywords.map((keyword, index) => (
                  <span key={index} style={{ 
                    backgroundColor: '#e0e0e0', 
                    padding: '2px 6px', 
                    margin: '2px', 
                    borderRadius: '3px',
                    display: 'inline-block'
                  }}>
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* ❌ NEVER DO THIS - This causes Error #31 */}
          {/* <div>{result}</div> */}
          
          {/* ✅ For debugging, use JSON.stringify */}
          {process.env.NODE_ENV === 'development' && (
            <details>
              <summary>Debug: Raw Response</summary>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

// ❌ COMMON MISTAKES THAT CAUSE ERROR #31:

// 1. Rendering entire objects
function BadComponent({ result }) {
  return <div>{result}</div>; // ERROR #31
}

// 2. Rendering error objects
function BadErrorComponent({ error }) {
  return <div>{error}</div>; // ERROR #31 if error is an object
}

// 3. Rendering arrays without mapping
function BadArrayComponent({ items }) {
  return <div>{items}</div>; // ERROR #31
}

// ✅ CORRECT WAYS:

// 1. Render object properties
function GoodComponent({ result }) {
  return <div>{result?.message || 'No message'}</div>;
}

// 2. Render error messages
function GoodErrorComponent({ error }) {
  return <div>{typeof error === 'string' ? error : error?.message || 'An error occurred'}</div>;
}

// 3. Map arrays
function GoodArrayComponent({ items }) {
  return (
    <div>
      {items?.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}

export default ResumeAnalyzer;
