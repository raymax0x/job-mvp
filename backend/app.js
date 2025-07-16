const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jobRoutes = require('./routes/jobs');
const summarizeRoutes = require('./routes/summarize');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(
    'Job-MVP API is running. Try /api/jobs or /api/summarize endpoints.'
  );
});

app.use('/api/jobs', jobRoutes);
app.use('/api/summarize', summarizeRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
