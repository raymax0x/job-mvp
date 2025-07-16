const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jobRoutes = require('./backend/routes/jobs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
