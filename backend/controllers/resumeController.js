const { extractText } = require('../utils/parser');
const { analyzeResumeWithGemini } = require('../utils/geminiClient');
const Analysis = require('../models/Analysis');
const fs = require('fs');

exports.uploadAndParse = async (req, res) => {
  try {
    const file = req.file;
    const { jobDescription } = req.body;
    if (!file || !jobDescription) {
      return res.status(400).json({ error: 'File and job description are required.' });
    }

    // Extract raw text from the uploaded file
    const text = await extractText(file.path, file.mimetype);
    
    // Clean up uploaded file after processing
    fs.unlinkSync(file.path);

    // Call Gemini API for analysis
    const analysis = await analyzeResumeWithGemini(text, jobDescription);

    // Access the authenticated userId from req.user (ensure auth middleware is used)
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: User ID missing' });
    }

    // Save analysis result in MongoDB
    const analysisRecord = new Analysis({
      user: userId,
      matchPercent: analysis.matchPercent || 0,
      missingKeywords: analysis.missingKeywords || [],
      suggestions: analysis.suggestions || '',
      summary: analysis.summary || ''
    });

    await analysisRecord.save();

    // Send analysis result back to client
    return res.json(analysis);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to process resume.' });
  }
};
