/**
 * Application Configuration
 * Centralizes all environment variables and configuration settings
 */

require('dotenv').config();

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 8001,
    environment: process.env.NODE_ENV || 'development',
  },

  // Adzuna API configuration
  adzuna: {
    baseUrl:
      process.env.ADZUNA_BASE_URL || 'https://api.adzuna.com/v1/api/jobs',
    country: process.env.ADZUNA_COUNTRY || 'us',
    appId: process.env.ADZUNA_APP_ID,
    apiKey: process.env.ADZUNA_API_KEY,
    resultsPerPage: parseInt(process.env.ADZUNA_RESULTS_PER_PAGE || '20'),
    maxDaysOld: parseInt(process.env.ADZUNA_MAX_DAYS_OLD || '1'),
  },

  // OpenAI API configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '100'),
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.5'),
    inputCostPerToken: parseFloat(
      process.env.OPENAI_INPUT_COST_PER_TOKEN || '0.0005'
    ),
    outputCostPerToken: parseFloat(
      process.env.OPENAI_OUTPUT_COST_PER_TOKEN || '0.0015'
    ),
  },

  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
};

module.exports = config;
