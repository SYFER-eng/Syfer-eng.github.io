const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let activeUsers = [
    { username: 'User1', ip: '192.168.0.1' },
    { username: 'User2', ip: '192.168.0.2' },
];

let bannedIPs = ['192.168.0.3'];

// Endpoint to get active users
app.get('/api/active-users', (req, res) => {
    res.json({ users: activeUsers });
});

// Endpoint to kick user
app.post('/api/kick-user', (req, res) => {
    const ip = req.query.ip;
    activeUsers = activeUsers.filter(user => user.ip !== ip);
    res.json({ message: 'User kicked' });
});

// Endpoint to rename user
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

// Endpoint to ban user
app.post('/api/ban-user', (req, res) => {
    const ip = req.query.ip;
    bannedIPs.push(ip);
    res.json({ message: 'User banned' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
