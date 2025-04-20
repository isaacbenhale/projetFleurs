const mongoose = require('mongoose'); // MongoDB ODM

mongoose.connect('mongodb+srv://myAtlasDBUser:myatlas-001@myatlasclusteredu.86z4g.mongodb.net/fleurs?retryWrites=true&w=majority&appName=myAtlasClusterEDU', { // Replace with your MongoDB connection string
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB database');
})
.catch((error) => {
    console.error('Error connecting to MongoDB database:', error);
});

module.exports = mongoose; // Export the mongoose instance for use in other files