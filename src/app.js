'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const routes = require('./routes');
const errorLogger = require('./middleware/error-logger');

module.exports = (db) => {
   
    app.use('/api/rides-service', routes);
    app.use(errorLogger);

    return app;
};
