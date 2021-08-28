// Import necessary libraries
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const appointmentRoute = require('./appointment.route');
const PORT = 4000;

// Create a new express app
const app = express();

// Connect to the local database
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true , useUnifiedTopology:true}).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

// Collaborate with frontend
app.use(cors());

// Get routes for appointments
app.use(appointmentRoute);

// start the server
app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});