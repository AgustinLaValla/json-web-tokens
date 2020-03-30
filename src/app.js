const express = require('express');
const app = express();
const { router } = require('./constrollers/auth.controller');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use(router)

module.exports = { app };