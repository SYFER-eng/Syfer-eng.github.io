const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

// Example user data (usually stored in a database)
const users = {
    "Syfer-eng": "$2b$10$U4r0Ske.Fy5p0h8P7Szt8OnvW2Kh9HcLgIExoBCYcqaOXhkrpqr92"  // bcrypt hashed password for 'Td906045'
};

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (users[username] && await bcrypt.compare(password, users[username])) {
        req.session.user = username;  // Store user in session
        res.redirect('/admin');
    } else {
        res.send('Invalid credentials');
    }
});

// Admin Page (only accessible by logged-in users)
app.get('/admin', (req, res) => {
    if (req.session.user) {
        res.send('Welcome to the admin page!');
    } else {
        res.send('Please log in first');
    }
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
