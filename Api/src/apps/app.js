const express = require('express');
const config = require('config');

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(config.get("app.prefixApiVersion"),require(`${__dirname}/../routers/web`));

module.exports = app;