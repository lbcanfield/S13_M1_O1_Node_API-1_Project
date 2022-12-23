// BUILD YOUR SERVER HERE
const express = require('express');
// Server Model
const Users = require('./users/model');


const server = express();     //Instance of 'express' application
server.use(express.json());   //Global Middleware

//Endpoints - Get(sanity-check)
server.get('/sanity-check', (request, response) => {
     response.status(200).json({ message: 'good sanity-check' })
})


/////////////////////SETTING UP ENDPOINTS FOR MVP
//Endpoint: get (Returns an array of users)
server.get('/api/users', async (request, response) => {
     //finish
     try {
          const users = await Users.find();
          // console.log(users) //users successfully logged to the console
          response.status(200).json(users); //success in Postman
     }
     catch (error) {
          response.status(500).json({ message: `ERROR: Could not find users: ${error.message}` })
     }
})

//Endpoint: post (Creates a user using the information sent inside the 'request body')
server.post('/api/users', (request, response) => {
     //finish
})

//Endpoint: get (Returns a specific user based on the id value)
server.get('/api/users/:id', (request, response) => {
     //finish
})

//Endpoint: delete (Removes a specific user based on the id value)
server.delete('/api/users/:id', (request, response) => {
     //finish
})

//Endpoint: put (updates a specific user based on the id value)
server.put('/api/users/:id', (request, response) => {
     //finish
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
