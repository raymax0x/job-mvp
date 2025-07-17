const express = require('express');
const cors = require('cors');
const config = require('./config');

const jobRoutes = require('./routes/jobs');
const summarizeRoutes = require('./routes/summarize');
const coverLetterRoutes = require('./routes/coverLetter');

const app = express();

// Configure CORS with settings from config
app.use(
  cors({
    origin: config.cors.origin,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(
    'Job-MVP API is running. Try /api/jobs or /api/summarize endpoints.'
  );
});

app.use('/api/jobs', jobRoutes);
app.use('/api/summarize', summarizeRoutes);
app.use('/api/cover-letter', coverLetterRoutes);

const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${config.server.environment} mode`
  );
});
