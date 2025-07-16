/**
 * Generates a concise summary of job description using OpenAI's API
 * Restricts summaries to 280 characters maximum
 * 
 * @param {Object} job - Job object with description and other details
 * @returns {Promise<string>} A summary of the job limited to 280 characters
 */
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function summarizeJob(job) {
  // Start tracking metrics
  const startTime = Date.now();

  try {
    // Extract relevant information from the job
    const { title, description, company } = job;
    const jobInfo = `Title: ${title}\nCompany: ${company?.display_name || 'Unknown'}\nDescription: ${description}`;

    // Make API call to OpenAI for summarization
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes job postings concisely. Your summary should be no more than 280 characters."
        },
        {
          role: "user",
          content: `Summarize this job posting in under 280 characters:\n${jobInfo}`
        }
      ],
      max_tokens: 100,
      temperature: 0.5,
    });

    // Extract the summary text
    const summary = response.choices[0].message.content.trim();
    
    // Calculate metrics
    const endTime = Date.now();
    const metrics = {
      runtime: endTime - startTime,
      tokensUsed: response.usage.total_tokens,
      cost: calculateCost(response.usage)
    };

    return { summary, metrics };
  } catch (error) {
    console.error('Error summarizing job:', error);
    return { 
      summary: 'Failed to generate summary.', 
      metrics: { runtime: Date.now() - startTime, tokensUsed: 0, cost: 0 }
    };
  }
}

/**
 * Calculate estimated cost of OpenAI API usage
 * Based on current OpenAI pricing for gpt-3.5-turbo
 * 
 * @param {Object} usage - Token usage from OpenAI response
 * @returns {number} Estimated cost in USD
 */
function calculateCost(usage) {
  // Current pricing for gpt-3.5-turbo (as of 2025)
  // $0.0005 per 1K input tokens, $0.0015 per 1K output tokens
  const inputTokens = usage.prompt_tokens;
  const outputTokens = usage.completion_tokens;
  
  const inputCost = (inputTokens / 1000) * 0.0005;
  const outputCost = (outputTokens / 1000) * 0.0015;
  
  return inputCost + outputCost;
}

module.exports = summarizeJob;
