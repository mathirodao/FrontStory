const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/database');
const campaignsRouter = require('./routes/campaigns');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/campaigns', campaignsRouter);

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});