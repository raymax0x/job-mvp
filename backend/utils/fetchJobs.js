const axios = require('axios');
const config = require('../config');

async function fetchJobs(keyword) {
  const { baseUrl, country, appId, apiKey, resultsPerPage, maxDaysOld } =
    config.adzuna;

  // Construct the URL from configuration
  const url = `${baseUrl}/${country}/search/1`;

  const params = {
    app_id: appId,
    app_key: apiKey,
    what: keyword,
    max_days_old: maxDaysOld,
    results_per_page: resultsPerPage,
    sort_by: 'date',
  };

  const response = await axios.get(url, { params });
  return response.data.results;
}

module.exports = fetchJobs;
