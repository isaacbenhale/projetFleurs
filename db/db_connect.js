const mongoose = require('mongoose'); // MongoDB ODM
require('dotenv').config(); // Chargement des variables d'environnement


// Connexion à MongoDB
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}`;
//console.log(uri)
mongoose.connect(uri)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));

module.exports = mongoose; // Export the mongoose instance for use in other files