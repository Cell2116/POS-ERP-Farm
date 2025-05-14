const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const farm = require('./Farmers');
const consument = require('./Consument');
const authenticate = require('./Auth');

const routes = express.Router();

routes.use(cors());
routes.use(bodyParser.json());
// routes.use('/farmers', farm);
// routes.use('/consument', consument);
routes.use('/auth', authenticate);

module.exports = routes;