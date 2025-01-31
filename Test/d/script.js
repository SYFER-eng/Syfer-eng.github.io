const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Dummy data for active users
let activeUsers = [
    { username: 'User1', ip: '192.168.0.1' },
    { username: 'User2', ip: '192.168.0.2' }
];

// Banned IP list
let bannedIPs = ['192.168.0.3'];

// Serve static files (the HTML, JS, and CSS)
app.use(express.static('public'));

// Endpoint to get active users
app.get('/api/active-users', (req, res) => {
    res.json({ users: activeUsers });
});

// Endpoint to kick a user
app.post('/api/kick-user', (req, res) => {
    const ip = req.query.ip;
    activeUsers = activeUsers.filter(user => user.ip !== ip);
    res.json({ message: 'User kicked' });
});

// Endpoint to rename a user
app.post('/api/rename-user', (req, res) => {
    const { ip, username } = req.query;
    const user = activeUsers.find(user => user.ip === ip);
    if (user) {
        user.username = username;
        res.json({ message: 'Username updated' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Endpoint to ban a user
app.post('/api/ban-user', (req, res) => {
    const ip = req.query.ip;
    if (!bannedIPs.includes(ip)) {
        bannedIPs.push(ip);
        res.json({ message: 'User banned' });
    } else {
        res.status(400).json({ message: 'User is already banned' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
