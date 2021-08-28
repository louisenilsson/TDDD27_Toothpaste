// Import necessary libraries and folders 
const express = require('express');
const appointmentRoutes = express.Router();
var jwtCheck = require('./jwtCheck');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Require Appointment model in our routes module
let Appointment = require('./appointment.model.js');

// Route for adding an Appointment
appointmentRoutes.post('/appointments/add', jsonParser, jwtCheck, function (req, res) {
  let appointment = new Appointment(req.body);
  appointment.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Route for reading the inlogged users appointment.
appointmentRoutes.get('/appointments', jsonParser, jwtCheck, function (req, res) {
  Appointment.find({
    email: req.query.email
  },
  function(err, appointments){
    if(err){
      res.json(err);
    }
    else {
      res.json(appointments);
    }
  });
});

// Route for reading every booked appointment.
appointmentRoutes.get('/appointments/all', jsonParser, jwtCheck, function (req, res) { 
  Appointment.find(
  function(err, appointments){
    if(err){
      res.json(err);
    }
    else {
      res.json(appointments);
    }
  });
});

// Route for canceling an appointment.
appointmentRoutes.delete('/appointments/delete/:id',jsonParser, jwtCheck, function (req, res) {
    Appointment.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = appointmentRoutes;