const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./Database/db');
const routes = require('./routes/index');

const app = express();
const PORT = 3000;
const dotenv = require('dotenv');
const createDatabase = require('./Database/InitialDb');

createDatabase();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
