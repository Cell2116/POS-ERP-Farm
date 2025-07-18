const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const profile = require('./Profile');
const goods = require('./Goods');
const authenticate = require('./Auth');

const routes = express.Router();

routes.use(cors());
routes.use(bodyParser.json());
// routes.use('/farmers', farm);
// routes.use('/consument', consument);
routes.use('/auth', authenticate);
routes.use('/profile', profile);

routes.use('/good', goods);

module.exports = routes;