// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/users') 
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

  app.get('/', (req, res) => {
    res.send('Welcome to my web application');
});

// Signup route handler
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
        console.log("user details:",user)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'User already exist please login' });
    }
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
