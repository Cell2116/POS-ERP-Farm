const express = require('express');
const cors = require('cors');
const { register, login } = require('../Controller/AuthController');

const routes = express.Router();

routes.post('/register', register);
routes.post('/login', login);

module.exports = routes;