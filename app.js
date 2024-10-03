const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://dheem:dhee1234@nasaapi.bt3iqk8.mongodb.net/bookmart', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/register', async (req, res) => {
    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send('Email already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();
        
        // Redirect to homepage upon successful registration
        res.redirect('/homepage.html');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error registering user');
    }
});



app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Redirect to homepage upon successful login
            res.redirect('/homepage.html');
        } else {
            res.status(401).send('Incorrect password');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging in');
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
