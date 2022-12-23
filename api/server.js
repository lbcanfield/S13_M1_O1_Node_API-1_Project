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
     try {
          const users = await Users.find();
          // console.log(users) //users successfully logged to the console
          response.status(200).json(users); //success in Postman
     }
     catch (error) {
          response.status(500).json({
               message: "The users information could not be retrieved"
          })
     }
})

//Endpoint: post (Creates a user using the information sent inside the 'request body')
server.post('/api/users', async (request, response) => {
     try {
          const { name, bio } = request.body;
          if (!name || !bio) {     //for new users, both fields are required
               response.status(400).json({
                    message: "Please provide name and bio for the user"
               })
          }
          else {
               const newUser = await Users.insert({ name, bio });
               response.status(201).json({ //201 - Created //Success in postman
                    message: newUser,
                    data: newUser
               })
          }
     }
     catch (error) {
          response.status(500).json({
               message: "There was an error while saving the user to the database",
          })
     }
})

//Endpoint: get (Returns a specific user based on the id value)
server.get('/api/users/:id', async (request, response) => {
     //finish
     try {
          const { id } = request.params;
          const user = await Users.findById(id);
          if (!user) {
               response.status(404).json({ //404 - Not Found
                    message: "The user with the specified ID does not exist"
               })
          }
          else {
               response.status(200).json(user);
          }
     }
     catch (error) {
          response.status(500).json({
               message: "The user information could not be retrieved"
          })
     }
})

//Endpoint: delete (Removes a specific user based on the id value)
server.delete('/api/users/:id', async (request, response) => {
     //finish
     try {
          const { id } = request.params;
          const removeUser = await Users.remove(id);
          if (!removeUser) {
               response.status(404).json({
                    message: "The user with the specified ID does not exist"
               })
          }
          else {
               response.status(202).json({ //202 - Accepted
                    message: "User removed from database",
                    data: removeUser
               })
          }
     }
     catch (error) {
          response.status(500).json({
               message: "The user could not be removed",
          })
     }
})

//Endpoint: put (updates a specific user based on the id value)
server.put('/api/users/:id', async (request, response) => {
     //finish
     try {
          const { id } = request.params;
          const { name, bio } = request.body;
          if (!name || !bio) {
               response.status(400).json({
                    message: "Please provide name and bio for the user"
               })
          }
          else {
               const updateUser = await Users.update(id, { name, bio })
               if (!updateUser) {
                    response.status(404).json({
                         message: "The user with the specified ID does not exist"
                    })
               }
               else {
                    response.status(200).json({
                         message: "User updated successfully",
                         data: updateUser
                    })
               }
          }
     }
     catch (error) {
          response.status(500).json({
               message: "The user information could not be modified",
          })
     }
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
