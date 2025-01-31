const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

// Mock Users Database
const users = {
    "Syfer-eng": "$2a$10$U4r0Ske.Fy5p0h8P7Szt8OnvW2Kh9HcLgIExoBCYcqaOXhkrpqr92",  // 'Td906045'
};

// Simulated IP Logs
const ipLogs = [
    { ip: "192.168.1.1", username: "Syfer-eng" },
    { ip: "203.0.113.42", username: "UserTwo" },
    { ip: "198.51.100.24", username: "UserThree" }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (users[username] && await bcrypt.compare(password, users[username])) {
        req.session.user = username;
        res.send({ success: true });
    } else {
        res.send({ success: false, message: "Invalid credentials" });
    }
});

// Admin route - Simulating retrieving IP logs
app.get('/admin', (req, res) => {
    if (req.session.user) {
        res.send({ success: true, ipLogs });
    } else {
        res.send({ success: false, message: "Not authenticated" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
