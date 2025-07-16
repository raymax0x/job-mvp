/**
 * Generates a personalized cover letter paragraph using OpenAI's API
 * Restricts paragraphs to 120 words maximum
 * 
 * @param {Object} job - Job object with title, summary, and other details
 * @returns {Promise<Object>} Cover letter paragraph and usage metrics
 */
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateCoverLetter(job) {
  // Start tracking metrics
  const startTime = Date.now();

  try {
    // Extract relevant information from the job
    const { title, summary, company } = job;
    const jobInfo = `Job Title: ${title}\nCompany: ${company?.display_name || 'Unknown'}\nJob Summary: ${summary || ''}`;

    // Make API call to OpenAI for cover letter generation
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional job application assistant. Generate a personalized cover letter paragraph (maximum 120 words) that highlights the applicant's fit for the position. The paragraph should be ready to include in a formal cover letter. Make it specific to the job description and company. Do not use generic language. Focus on value proposition and relevant skills. Don't exceed 120 words."
        },
        {
          role: "user",
          content: `Please write a personalized cover letter paragraph for the following job:\n\n${jobInfo}`
        }
      ],
      max_tokens: 250, // Appropriate limit for ~120 words
      temperature: 0.7, // Slightly creative but still professional
    });

    // Extract the cover letter from the response
    const coverLetter = response.choices[0].message.content.trim();
    
    // Calculate metrics
    const endTime = Date.now();
    const runtime = endTime - startTime;
    const tokensUsed = response.usage.total_tokens;
    
    // Calculate cost (based on gpt-3.5-turbo pricing: $0.0015 per 1K tokens)
    const cost = (tokensUsed / 1000) * 0.0015;
    
    return {
      coverLetter,
      metrics: {
        runtime,
        tokensUsed,
        cost
      }
    };

  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw new Error(`Failed to generate cover letter: ${error.message}`);
  }
}

module.exports = generateCoverLetter;
