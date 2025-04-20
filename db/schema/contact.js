const {Schema}= require('mongoose');
const mongoose = require('../db_connect'); // Import the mongoose instance from db_connect.js

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    message: {
        type: String,
        required: true,
    },
    
    photo: {
        type: String,
        required: false, // Photo is optional
    },

}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

const contactModel = mongoose.model('Question', contactSchema); // Create a model based on the schema

module.exports = contactModel; // Export the model for use in other files