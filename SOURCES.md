# Sources and Attribution

This document lists all external sources, libraries, APIs, and resources used in the Job-Posting Insights application.

## APIs

### Job Search APIs

1. **Adzuna API** (✅ Selected)
   - **Documentation**: [Adzuna API Documentation](https://developer.adzuna.com/overview)
   - **Endpoint Used**: `/v1/api/jobs/{country}/search`
   - **Justification**: Adzuna was selected for its comprehensive job data across multiple countries and generous free tier offering 1,000 API calls per month. Its structured response format provides rich job details including salary information and geographic data, making it ideal for our summarization pipeline.

2. **Indeed API**
   - **Documentation**: [Indeed API Documentation](https://developer.indeed.com/docs/job-search-api/)
   - **Features**: Extensive job listings, employer information, and detailed job descriptions
   - **Limitations**: Requires employer account and has stricter rate limits

3. **LinkedIn Jobs API**
   - **Documentation**: [LinkedIn Marketing API](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/job-posting-api)
   - **Features**: Access to LinkedIn's professional job network, company details integration
   - **Limitations**: Requires LinkedIn partnership, more complex authentication

4. **ZipRecruiter API**
   - **Documentation**: [ZipRecruiter Partner API](https://www.ziprecruiter.com/zipsearch)
   - **Features**: US-focused job data, simple integration
   - **Limitations**: Less international coverage than Adzuna

### OpenAI API
- **Purpose**: Used for job summarization and cover letter generation
- **Documentation**: [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- **Model Used**: GPT-3.5 Turbo
- **Pricing**: [OpenAI Pricing Page](https://openai.com/pricing)

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

### Zustand
- **Purpose**: State management for React applications
- **Documentation**: [Zustand Documentation](https://github.com/pmndrs/zustand)
- **Version**: 4.x
- **Benefits**: Simple API, minimal boilerplate, TypeScript integration

## Backend Libraries & Frameworks

### Express.js
- **Purpose**: Node.js web application framework
- **Documentation**: [Express.js Documentation](https://expressjs.com/)
- **Version**: 4.x

### Architectural Pattern
- **Pattern**: Model-View-Controller (MVC)
- **Implementation**:
  - **Controllers**: Handle HTTP requests/responses
  - **Services**: Contain business logic separate from HTTP concerns
  - **Models**: Define data structures and schema
  - **Routes**: Map URL endpoints to controller methods
- **Benefits**: Separation of concerns, improved maintainability, easier testing

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
