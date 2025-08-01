# Scanlyze - MERN Stack Application

**Creator:** Mayank Raj  
**Project:** Scanlyze & Builder with AI-Powered Resume Analysis

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

Resume Grader is a modern web application that helps users **create, upload, and analyze resumes** using AI (Gemini API) to optimize their job applications. The platform supports:

- User authentication (signup/login/logout)
- Resume upload and AI-powered analysis against job descriptions
- In-app resume building with live preview and PDF export
- Leaderboard to track top-performing resumes by score

---

## Features

- **User Authentication:** Secure JWT-based signup/login and session management.
- **Resume Upload:** Upload PDF/DOCX resumes and analyze them against job descriptions.
- **Resume Builder:** Build resumes from scratch using an interactive form, preview in real-time, and download as PDF.
- **AI Analysis:** Integrates Gemini AI API to score resumes and suggest improvements.
- **Leaderboard:** View top resume scores and rankings.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT authentication
- **AI Integration:** Gemini API (Google Generative AI)
- **PDF Export:** jsPDF with html2canvas
- **Deployment:** Can be deployed on platforms like Heroku (backend) and Vercel/Netlify (frontend)

---

## Folder Structure

resume-grader-frontend/
├── src/
│ ├── components/
│ │ ├── Auth.jsx
│ │ ├── ResumeUpload.jsx
│ │ ├── ResumeBuilder.jsx
│ │ ├── AnalysisResult.jsx
│ │ └── Leaderboard.jsx
│ ├── context/
│ │ └── AuthContext.jsx
│ ├── hooks/
│ │ └── useAuth.js
│ ├── pages/
│ │ └── MainPage.jsx
│ ├── services/
│ │ ├── authService.js
│ │ └── resumeService.js
│ ├── App.jsx
│ └── index.jsx
├── public/
├── package.json
├── tailwind.config.js
└── vite.config.js

resume-grader-backend/
├── controllers/
│ ├── authController.js
│ ├── resumeController.js
│ └── leaderboardController.js
├── middleware/
│ └── auth.js
├── models/
│ ├── User.js
│ ├── Analysis.js
│ └── Resume.js
├── routes/
│ ├── authRoutes.js
│ ├── resumeRoutes.js
│ └── leaderboardRoutes.js
├── utils/
│ ├── parser.js
│ └── geminiClient.js
├── app.js
├── server.js
├── .env
└── package.json


---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas or local MongoDB instance
- Gemini API key from Google Cloud

### Setup Frontend

1. Navigate to frontend folder:


2. Install dependencies:


3. Create `.env` file (if needed) to configure any frontend environment variables.

4. Run development server:


### Setup Backend

1. Navigate to backend folder:


2. Install dependencies:


3. Create `.env` file with environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key


4. Run backend server:


---

## Available Scripts

### Frontend

- `npm run dev` — Run Vite dev server
- `npm run build` — Build production frontend assets
- `npm run preview` — Preview production build locally

### Backend

- `npm run dev` — Run backend with nodemon (auto reload)
- `npm start` — Run backend once (production mode)

---

## Environment Variables

### Backend `.env` variables:

- `PORT`: Backend server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `GEMINI_API_KEY`: API key for Gemini AI

---

## API Endpoints Overview

| Endpoint               | Method | Description                          | Auth Required |
|------------------------|--------|----------------------------------|----------------|
| `/api/auth/register`   | POST   | Create new user                     | No             |
| `/api/auth/login`      | POST   | Login and get JWT token             | No             |
| `/api/resume/analyze`  | POST   | Upload resume + job description, get AI analysis | Yes            |
| `/api/leaderboard`     | GET    | Get top resume holders leaderboard | No             |

---

## Usage

1. Register or log in.
2. Upload your resume and job description on the Analyze Resume page or create one via Resume Builder.
3. Get your resume analyzed with suggestions powered by AI.
4. View your ranking on the leaderboard.
5. Download your resume as PDF from Resume Builder for offline use.

---

## Contributing

Contributions and suggestions are welcome!  
1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/my-feature`)  
3. Commit your changes (`git commit -m "Add my feature"`)  
4. Push to the branch (`git push origin feature/my-feature`)  
5. Open a pull request

---

## License

This project is licensed under the **MIT License**.

---

## Contact

Created by **Mayank Raj**  
Feel free to reach out for issues or suggestions!

---

*Thank you for using Resume Grader! Making your resume shine, one AI-powered insight at a time.*

