const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// Set up Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.once('open', () => console.log('MongoDB database connection established successfully!'));

// Set up middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/companies', require('./routes/api/companies'))
app.use('/api/register', require('./routes/api/register'))

// Handle production
if (!isDev) {
    // Static folder
    app.use(express.static(__dirname + '/public'));
    // SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

module.exports = app;