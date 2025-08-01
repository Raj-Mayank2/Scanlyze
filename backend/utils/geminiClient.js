const axios = require('axios');

async function analyzeResumeWithGemini(resumeText, jobDescription) {
  const prompt = `
You are a professional ATS (Applicant Tracking System) and Career Coach. Analyze the resume against the job description and respond with ONLY a valid JSON object.

ANALYSIS REQUIREMENTS:
1. Calculate match percentage based on skills alignment, experience relevance, and keyword presence
2. Identify 5-8 most important missing keywords from the job description
3. Provide actionable improvement suggestions in bullet point format
4. Write a professional profile summary highlighting strengths

RESPONSE FORMAT (JSON ONLY):
{
  "matchPercent": 85,
  "missingKeywords": ["React", "Node.js", "AWS", "Agile", "CI/CD"],
  "suggestions": "• Add specific React projects with measurable outcomes (e.g., 'Built React dashboard that improved user engagement by 40%')\n• Include Node.js backend experience with specific frameworks (Express, Fastify)\n• Highlight cloud experience with AWS services (EC2, S3, Lambda)\n• Quantify achievements with numbers and percentages\n• Add soft skills relevant to the role (teamwork, problem-solving)\n• Include any certifications or continuous learning initiatives\n• Use action verbs like 'developed', 'implemented', 'optimized'",
  "summary": "Experienced software developer with strong technical foundation and proven track record in web development. Demonstrates solid understanding of modern technologies with room for growth in cloud computing and agile methodologies. Shows potential for the role with relevant core skills."
}

FORMATTING RULES:
- matchPercent: number 0-100 (be realistic, not overly generous)
- missingKeywords: array of 5-8 most critical missing terms from job posting
- suggestions: string with bullet points using • symbol, each point actionable and specific
- summary: 2-3 sentences highlighting candidate's strengths and potential fit
- Use \\n for line breaks in suggestions
- Be constructive and encouraging in tone

Resume Text:
${resumeText}

Job Description:
${jobDescription}
  `;
  
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: prompt.trim() }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1000
        }
      }
    );
    
    const aiRaw = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log('Raw Gemini Response:', aiRaw); // Debug log
    
    // Clean the response - remove markdown code blocks if present
    let cleanedResponse = aiRaw.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/, '').replace(/\n?```$/, '');
    }
    
    console.log('Cleaned Response:', cleanedResponse); // Debug log
    
    // Try to parse the JSON
    let analysis = JSON.parse(cleanedResponse);
    
    // Validate and set defaults for required fields
    analysis = {
      matchPercent: typeof analysis.matchPercent === 'number' ? analysis.matchPercent : 0,
      missingKeywords: Array.isArray(analysis.missingKeywords) ? analysis.missingKeywords : [],
      suggestions: typeof analysis.suggestions === 'string' ? analysis.suggestions : 'No suggestions available',
      summary: typeof analysis.summary === 'string' ? analysis.summary : 'No summary available'
    };
    
    console.log('Final Analysis:', analysis); // Debug log
    return analysis;
    
  } catch (parseError) {
    console.error('JSON Parse Error:', parseError);
    console.error('Failed to parse AI response');
    
    // Return default structure instead of error object
    return {
      matchPercent: 0,
      missingKeywords: [],
      suggestions: 'Analysis failed - please try again',
      summary: 'Unable to generate summary'
    };
  }
}

module.exports = { analyzeResumeWithGemini };