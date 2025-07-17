# Job-MVP 

An intelligent job search application that fetches job listings, auto-summarizes job descriptions, and generates customized cover letters using AI.

![Job-Posting Insights](/screenshots/app-screenshot.png)

## Features

- **Job Search**: Search for job listings using keywords (powered by Adzuna API)
- **Automatic Job Summarization**: Each job description is automatically summarized (≤280 characters)
- **Cover Letter Generation**: Generate tailored cover letters for any job listing (≤120 words)
- **Modern UI**: Clean, responsive, card-based design with expandable job details
- **Performance Metrics**: Track and display runtime, token usage, and cost metrics

## Quick Start Guide

### Local Setup (5 Steps)

1. **Clone & Install**
   ```bash
   git clone https://github.com/raymax0x/job-mvp.git
   cd job-mvp
   npm run setup   # Installs both frontend and backend dependencies
   ```

2. **Set Environment Variables**
   ```bash
   # Backend (.env)
   echo "PORT=8001
   OPENAI_API_KEY=your_openai_key
   ADZUNA_APP_ID=your_adzuna_id
   ADZUNA_API_KEY=your_adzuna_key" > backend/.env
   
   # Frontend (.env.local)
   echo "NEXT_PUBLIC_API_URL=http://localhost:8001/api" > frontend/.env.local
   ```

3. **Run Application**
   ```bash
   # Start both with concurrently (or use separate terminals)
   npm start
   ```

4. **Access the App**: Open `http://localhost:3000` in your browser

5. **Test Features**: Search for "Full-Stack Engineer" jobs and try generating a cover letter

### Cloud Deployment (5 Steps)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy Backend (Render)**
   - Create new Web Service on Render pointing to your repository
   - Set Root Directory to `backend`
   - Add environment variables: `OPENAI_API_KEY`, `ADZUNA_APP_ID`, `ADZUNA_API_KEY`

3. **Deploy Frontend (Vercel)**
   - Import your GitHub repository to Vercel
   - Set `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api`

4. **Connect Services**: Ensure frontend environment variable points to your backend URL with `/api` suffix

5. **Access Your App**: Visit your Vercel deployment URL

## Tech Stack

### Frontend
- **Framework**: Next.js with React
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **API Communication**: Fetch API

### Backend
- **Framework**: Express.js
- **Architecture**: MVC pattern with Controllers, Services, and Models
- **Language**: JavaScript
- **APIs**: OpenAI GPT-3.5 Turbo, Adzuna Jobs API
- **Optimizations**: Parallel processing, in-memory caching, separation of concerns

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- Adzuna API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/raymax0x/job-mvp.git
   cd job-mvp
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following:
   ```
   PORT=8001
   OPENAI_API_KEY=your_openai_api_key
   ADZUNA_APP_ID=your_adzuna_app_id
   ADZUNA_API_KEY=your_adzuna_api_key
   ```

5. Create a `.env.local` file in the frontend directory with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8001/api
   ```

### Running the Application

1. Start the backend server
   ```bash
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Search for Jobs**: Enter keywords in the search box and click "Search Jobs"
2. **View Job Details**: Click on a job card to expand and see the full description
3. **Generate Cover Letter**: Click the "Generate Cover Letter" button for any expanded job
4. **Refresh Data**: Click the refresh button to reset metrics and fetch fresh job listings

## Performance Optimizations

- **Parallel Processing**: Jobs are processed in small batches (5 at a time) for efficient API usage
- **Caching**: Job summaries are cached to prevent redundant API calls
- **Token Tracking**: Detailed tracking of token usage and costs for AI operations
- **Architectural Improvements**: Clear separation of concerns with controllers and services
- **Code Maintainability**: Modular design for easier maintenance and future extensions

## Deployment

The application is deployed and accessible at the following URLs:

- **Frontend (Vercel)**: [https://job-mvp.vercel.app/](https://job-mvp.vercel.app/)
- **Backend (Render)**: [https://job-mvp-backend.onrender.com/](https://job-mvp-backend.onrender.com/)

### Deployment Configuration

For deploying your own instance:

1. **Backend (Render)**
   - Create a new Web Service on Render
   - Connect your repository or deploy from source
   - Set Root Directory to `backend`
   - Add the following environment variables:
     ```
     PORT=10000
     OPENAI_API_KEY=your_openai_api_key
     ADZUNA_APP_ID=your_adzuna_app_id
     ADZUNA_API_KEY=your_adzuna_api_key
     CORS_ORIGIN=your_frontend_url
     ```

2. **Frontend (Vercel)**
   - Deploy to Vercel using their GitHub integration or CLI
   - Add the following environment variable:
     ```
     NEXT_PUBLIC_API_URL=your_backend_url/api
     ```
   - Make sure to include the `/api` suffix in your backend URL

## Project Structure

```
job-posting-insights/
├── backend/
│   ├── controllers/
│   │   ├── jobController.js        # Job endpoints request handling
│   │   ├── summarizeController.js  # Summary endpoints request handling
│   │   └── coverLetterController.js # Cover letter endpoints request handling
│   ├── services/
│   │   ├── jobService.js           # Job search and processing business logic
│   │   ├── summarizeService.js      # Summarization business logic
│   │   └── coverLetterService.js    # Cover letter generation business logic
│   ├── models/
│   │   └── Metrics.js               # Data models and structures
│   ├── routes/
│   │   ├── jobs.js                  # Job search endpoint routes
│   │   ├── summarize.js             # Summarization endpoint routes
│   │   └── coverLetter.js           # Cover letter endpoint routes
│   ├── utils/
│   │   ├── fetchJobs.js             # Adzuna API integration
│   │   ├── summarizeJob.js          # OpenAI job summarization
│   │   └── generateCoverLetter.js   # OpenAI cover letter generation
│   └── app.js                       # Express server setup
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── JobTable.tsx     # Job listing cards component
│   │   │   └── MetricsDisplay.tsx  # Performance metrics display
│   │   ├── api/
│   │   │   └── jobService.ts    # Frontend API service
│   │   ├── page.tsx             # Main application page
│   │   └── globals.css          # Global styles
│   └── next.config.js           # Next.js configuration
└── README.md                    # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Powered by OpenAI's GPT-3.5 Turbo
- Job data provided by Adzuna API
