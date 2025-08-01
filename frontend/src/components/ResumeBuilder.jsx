import React, { useRef, useState } from "react";

const defaultResume = {
  name: "",
  email: "",
  phone: "",
  summary: "",
  education: [{ institution: "", degree: "", year: "" }],
  experience: [{ company: "", role: "", duration: "", description: "" }],
  skills: ""
};

const ResumeBuilder = () => {
  const [resume, setResume] = useState(defaultResume);
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef();

  // Handler for simple text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume((r) => ({ ...r, [name]: value }));
  };

  // Education handlers
  const handleEduChange = (index, e) => {
    const { name, value } = e.target;
    const education = [...resume.education];
    education[index][name] = value;
    setResume((r) => ({ ...r, education }));
  };

  const addEducation = () => {
    setResume((r) => ({
      ...r,
      education: [...r.education, { institution: "", degree: "", year: "" }]
    }));
  };

  const removeEducation = (index) => {
    setResume((r) => ({
      ...r,
      education: r.education.filter((_, i) => i !== index)
    }));
  };

  // Experience handlers
  const handleExpChange = (index, e) => {
    const { name, value } = e.target;
    const experience = [...resume.experience];
    experience[index][name] = value;
    setResume((r) => ({ ...r, experience }));
  };

  const addExperience = () => {
    setResume((r) => ({
      ...r,
      experience: [...r.experience, { company: "", role: "", duration: "", description: "" }]
    }));
  };

  const removeExperience = (index) => {
    setResume((r) => ({
      ...r,
      experience: r.experience.filter((_, i) => i !== index)
    }));
  };

  // Alternative PDF generation using browser's print functionality
  const generatePDF = () => {
    setIsGenerating(true);
    
    try {
      // Create a new window with just the resume content
      const printWindow = window.open('', '_blank');
      const resumeContent = resumeRef.current;
      
      if (!resumeContent) {
        alert("Resume preview not available for PDF generation.");
        setIsGenerating(false);
        return;
      }

      // Create HTML content for the new window
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resume - ${resume.name || 'Your Name'}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .name {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .contact {
              font-size: 14px;
              color: #666;
            }
            .section {
              margin-bottom: 20px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              border-bottom: 1px solid #ddd;
              padding-bottom: 5px;
              margin-bottom: 10px;
            }
            .item {
              margin-bottom: 10px;
            }
            .item-title {
              font-weight: bold;
            }
            .item-subtitle {
              font-style: italic;
              color: #666;
            }
            .description {
              margin-top: 5px;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="name">${resume.name || 'Your Name'}</div>
            <div class="contact">
              ${resume.email ? `Email: ${resume.email}` : ''}
              ${resume.phone ? ` | Phone: ${resume.phone}` : ''}
            </div>
          </div>

          ${resume.summary ? `
            <div class="section">
              <div class="section-title">Professional Summary</div>
              <p>${resume.summary}</p>
            </div>
          ` : ''}

          ${resume.education.some(edu => edu.institution || edu.degree || edu.year) ? `
            <div class="section">
              <div class="section-title">Education</div>
              ${resume.education.map(edu => 
                (edu.institution || edu.degree || edu.year) ? `
                  <div class="item">
                    <div class="item-title">${edu.degree || 'Degree'}</div>
                    <div class="item-subtitle">${edu.institution || 'Institution'} ${edu.year ? `(${edu.year})` : ''}</div>
                  </div>
                ` : ''
              ).join('')}
            </div>
          ` : ''}

          ${resume.experience.some(exp => exp.company || exp.role) ? `
            <div class="section">
              <div class="section-title">Experience</div>
              ${resume.experience.map(exp => 
                (exp.company || exp.role) ? `
                  <div class="item">
                    <div class="item-title">${exp.role || 'Role'}</div>
                    <div class="item-subtitle">${exp.company || 'Company'} ${exp.duration ? `(${exp.duration})` : ''}</div>
                    ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
                  </div>
                ` : ''
              ).join('')}
            </div>
          ` : ''}

          ${resume.skills ? `
            <div class="section">
              <div class="section-title">Skills</div>
              <p>${resume.skills}</p>
            </div>
          ` : ''}

          <script>
            // Auto-print when page loads
            window.onload = function() {
              window.print();
              // Close the window after printing (optional)
              setTimeout(() => {
                window.close();
              }, 1000);
            };
          </script>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Alternative: Simple text download
  const downloadText = () => {
    const textContent = `
${resume.name || 'Your Name'}
${'='.repeat((resume.name || 'Your Name').length)}

Contact Information:
${resume.email ? `Email: ${resume.email}` : ''}
${resume.phone ? `Phone: ${resume.phone}` : ''}

${resume.summary ? `Professional Summary:
${resume.summary}

` : ''}${resume.education.some(edu => edu.institution || edu.degree || edu.year) ? `Education:
${resume.education.map(edu => 
  (edu.institution || edu.degree || edu.year) ? 
    `• ${edu.degree || 'Degree'} - ${edu.institution || 'Institution'} ${edu.year ? `(${edu.year})` : ''}`
    : ''
).filter(Boolean).join('\n')}

` : ''}${resume.experience.some(exp => exp.company || exp.role) ? `Experience:
${resume.experience.map(exp => 
  (exp.company || exp.role) ? 
    `• ${exp.role || 'Role'} at ${exp.company || 'Company'} ${exp.duration ? `(${exp.duration})` : ''}${exp.description ? `\n  ${exp.description}` : ''}`
    : ''
).filter(Boolean).join('\n\n')}

` : ''}${resume.skills ? `Skills:
${resume.skills}` : ''}
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.name || 'resume'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Resume Builder</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Personal Information</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={resume.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={resume.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={resume.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Professional Summary</h2>
            <textarea
              name="summary"
              placeholder="Write a brief professional summary..."
              value={resume.summary}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-indigo-600">Education</h2>
              <button
                type="button"
                onClick={addEducation}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
              >
                + Add
              </button>
            </div>
            <div className="space-y-4">
              {resume.education.map((edu, i) => (
                <div key={i} className="relative p-4 bg-white rounded-lg border">
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="institution"
                      placeholder="Institution Name"
                      value={edu.institution}
                      onChange={(e) => handleEduChange(i, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree/Program"
                      value={edu.degree}
                      onChange={(e) => handleEduChange(i, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="year"
                      placeholder="Year/Duration"
                      value={edu.year}
                      onChange={(e) => handleEduChange(i, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  {resume.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(i)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-indigo-600">Experience</h2>
              <button
                type="button"
                onClick={addExperience}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
              >
                + Add
              </button>
            </div>
            <div className="space-y-4">
              {resume.experience.map((exp, i) => (
                <div key={i} className="relative p-4 bg-white rounded-lg border">
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => handleExpChange(i, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="role"
                      placeholder="Job Title/Role"
                      value={exp.role}
                      onChange={(e) => handleExpChange(i, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="duration"
                      placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
                      value={exp.duration}
                      onChange={(e) => handleExpChange(i, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <textarea
                      name="description"
                      placeholder="Job description and achievements..."
                      value={exp.description}
                      onChange={(e) => handleExpChange(i, e)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  {resume.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(i)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Skills</h2>
            <input
              type="text"
              name="skills"
              placeholder="e.g., JavaScript, React, Project Management, Communication"
              value={resume.skills}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-6">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg">
            <div ref={resumeRef} className="space-y-6">
              <div className="text-center border-b-2 border-gray-800 pb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {resume.name || "Your Name"}
                </h1>
                <div className="text-gray-600">
                  {resume.email && <span>{resume.email}</span>}
                  {resume.email && resume.phone && <span className="mx-2">|</span>}
                  {resume.phone && <span>{resume.phone}</span>}
                </div>
              </div>

              {resume.summary && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
                </div>
              )}

              {resume.education.some(edu => edu.institution || edu.degree || edu.year) && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                    Education
                  </h2>
                  <div className="space-y-3">
                    {resume.education.map((edu, i) =>
                      (edu.institution || edu.degree || edu.year) ? (
                        <div key={i}>
                          <div className="font-medium text-gray-800">
                            {edu.degree || "Degree"}
                          </div>
                          <div className="text-gray-600">
                            {edu.institution || "Institution"}
                            {edu.year && <span className="ml-2">({edu.year})</span>}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {resume.experience.some(exp => exp.company || exp.role) && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {resume.experience.map((exp, i) =>
                      (exp.company || exp.role) ? (
                        <div key={i}>
                          <div className="font-medium text-gray-800">
                            {exp.role || "Role"}
                          </div>
                          <div className="text-gray-600 mb-1">
                            {exp.company || "Company"}
                            {exp.duration && <span className="ml-2">({exp.duration})</span>}
                          </div>
                          {exp.description && (
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {resume.skills && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                    Skills
                  </h2>
                  <p className="text-gray-700">{resume.skills}</p>
                </div>
              )}
            </div>
          </div>

          {/* Download Buttons */}
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={generatePDF}
              disabled={isGenerating}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isGenerating ? "Generating..." : "Download as PDF"}
            </button>
            <button
              type="button"
              onClick={downloadText}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Download as Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;