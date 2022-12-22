// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();     //Instance of 'express' application
server.use(express.json());   //Global Middleware

//Endpoints - Get
server.get('/sanity-check', (request, response) => {
     response.status(200).json({ message: 'good sanity-check' })
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
