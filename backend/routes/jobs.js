const express = require('express');
const router = express.Router();
const fetchJobs = require('../utils/fetchJobs');

router.post('/', async (req, res) => {
  const { keyword } = req.body;

  try {
    const jobs = await fetchJobs(keyword);
    res.json({ jobs });
  } catch (err) {
    console.error('Error fetching jobs:', err.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

module.exports = router;
