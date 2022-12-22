// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();     //Instance of 'express' application
server.use(express.json());   //Global Middleware






module.exports = server; // EXPORT YOUR SERVER instead of {}
