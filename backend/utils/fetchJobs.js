const axios = require('axios');

async function fetchJobs(keyword) {
  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1`;
  const params = {
    app_id: process.env.ADZUNA_APP_ID,
    app_key: process.env.ADZUNA_APP_KEY,
    what: keyword,
    max_days_old: 1,
    results_per_page: 20,
    sort_by: 'date',
  };

  const response = await axios.get(url, { params });
  return response.data.results;
}

module.exports = fetchJobs;
