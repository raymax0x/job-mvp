// frontend/app/config.ts
const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api',
  },
  pagination: {
    itemsPerPage: parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || '5'),
  },
  app: {
    title: process.env.NEXT_PUBLIC_APP_TITLE || 'Job-MVP',
    defaultSearchKeyword:
      process.env.NEXT_PUBLIC_DEFAULT_SEARCH || 'Full-Stack Engineer',
  },
};

export default config;
