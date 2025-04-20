const express = require('express'); 
const path = require('path');
const csrf = require('csurf'); // CSRF protection middleware
const app = express();
const mongoose = require('./db/db_connect'); // MongoDB ODM
const contactModel = require('./db/schema/contact'); // Import the contact model
const multer= require('multer'); // Middleware for handling multipart/form-data
const jwt = require('jsonwebtoken'); // Middleware for handling JWT
//const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const bcrypt = require('bcrypt'); // Middleware for hashing passwords

require('dotenv').config(); // Load environment variables from .env file
console.log(`L'application tourne sur le port ${process.env.PORT}`); // Log the port number from environment variables

// Configuration de base pour multer (stockage sur disque)
const storage = multer.diskStorage({
    // Destination de stockage des fichiers
    destination: function(req, file, cb) {
      cb(null, 'uploads/');  // Le dossier 'uploads/' doit exister
    },
  // Nom des fichiers téléversés
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }); // Initialisation de multer avec la configuration de stockage


//securisation
const helmet = require('helmet');  
app.use(helmet()); // Use Helmet to secure Express headers

//optimisation
const compression = require('compression');
app.use(compression()); // Use compression middleware to gzip responses

//security CSRF
const csrfProtection = csrf({ cookie: true });


//middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use('/uploads', express.static('uploads')); // Serve files from the uploads directory
//app.use(csrfProtection); // Use CSRF protection middleware

//routes

// Importation des routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Routes Front
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'auth.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'auth.html'));
});

app.get('/', (req, res) => {
  res.redirect('/login'); // redirection directe vers la page d'auth
});

app.get('/aboutme', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/pages', 'aboutme.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/pages', 'contact.html'));
});



app.post('/contact', upload.single('file'), async (req, res) => {
    try {
      const { name, email, message } = req.body;
      const photoPath = req.file ? req.file.path : null; // Get the file path if a file was uploaded

      const contact = new contactModel({ name, email, message, photo:photoPath });
      await contact.save();
      res.status(201).send('Message et photo enregistrés.');
      console.log('req.file:', req.file); // Test pour voir si le fichier est bien reçu
      console.log('photoPath:', photoPath);// Test pour voir si le chemin du fichier est bien reçu
    } catch (err) {
      res.status(400).send('Erreur : ' + err.message);
    }
  });

const PORT=process.env.PORT || 3000; // Port d'écoute du serveur

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}   );





