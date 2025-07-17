# Sources and Attribution

This document lists all external sources, libraries, APIs, and resources used in the Job-Posting Insights application.

## APIs

### OpenAI API
- **Purpose**: Used for job summarization and cover letter generation
- **Documentation**: [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- **Model Used**: GPT-3.5 Turbo
- **Pricing**: [OpenAI Pricing Page](https://openai.com/pricing)

### Adzuna API
- **Purpose**: Fetching job listings by keyword
- **Documentation**: [Adzuna API Documentation](https://developer.adzuna.com/overview)
- **Endpoint Used**: `/v1/api/jobs/{country}/search`

## Frontend Libraries & Frameworks

### React & Next.js
- **Purpose**: Core frontend framework
- **Documentation**: [React Documentation](https://react.dev/), [Next.js Documentation](https://nextjs.org/docs)
- **Version**: React 18.x, Next.js 14.x

### Tailwind CSS
- **Purpose**: Utility-first CSS framework for styling
- **Documentation**: [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- **Version**: 4.x

### TypeScript
- **Purpose**: Static type checking
- **Documentation**: [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- **Version**: 5.x

## Backend Libraries & Frameworks

### Express.js
- **Purpose**: Node.js web application framework
- **Documentation**: [Express.js Documentation](https://expressjs.com/)
- **Version**: 4.x

### Axios
- **Purpose**: HTTP client for making API requests
- **Documentation**: [Axios Documentation](https://axios-http.com/docs/intro)
- **Version**: 1.x

### CORS
- **Purpose**: Cross-Origin Resource Sharing middleware for Express
- **Documentation**: [CORS Documentation](https://www.npmjs.com/package/cors)
- **Version**: 2.x

### dotenv
- **Purpose**: Environment variables management
- **Documentation**: [dotenv Documentation](https://www.npmjs.com/package/dotenv)
- **Version**: 16.x

## Design Resources

### Color Palette
- Blue and white primary colors for clean, accessible design
- High contrast for readability
- Consistent border and shadow styling

## Code Structure and Patterns

### Frontend Architecture
- Component-based design with React functional components and hooks
- TypeScript interfaces for type safety
- API service layer for backend communication

### Backend Architecture
- RESTful API design with Express routes
- Utility modules for specific functionality
- Global metrics tracking for performance monitoring

## Optimization Techniques

### Controlled Parallelization
- Batch processing of job summarization (5 jobs at a time)
- In-memory caching to avoid redundant API calls

### UI/UX Optimizations
- Card-based layout for better readability
- Expandable sections for detailed content
- Loading states and error handling

## Learning Resources & References

- [OpenAI Documentation](https://platform.openai.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Documentation](https://react.dev/learn)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
