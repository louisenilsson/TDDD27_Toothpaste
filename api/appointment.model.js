const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Appointment = new Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required:true,
  }
},{
    collection: 'appointments'
});

module.exports = mongoose.model('Appointment', Appointment);