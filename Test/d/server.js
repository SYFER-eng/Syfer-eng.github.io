const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

// Mock database for user credentials and IP logging
const users = {
    "Syfer-eng": "$2a$10$U4r0Ske.Fy5p0h8P7Szt8OnvW2Kh9HcLgIExoBCYcqaOXhkrpqr92",  // bcrypt hash of 'Td906045'
};

// Simulate logged-in users' IPs (this should be handled securely in production)
const ipLogs = [
    { ip: "192.168.1.1", username: "Syfer-eng" },
    { ip: "203.0.113.42", username: "UserTwo" },
];

// Middleware for parsing POST data and managing sessions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

// Serve the HTML login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Handle login form submission
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists and password matches
    if (users[username] && await bcrypt.compare(password, users[username])) {
        req.session.user = username;
        res.redirect('/admin');  // Redirect to the admin page upon successful login
    } else {
        res.send('Invalid credentials');
    }
});

// Admin page (only accessible by logged-in users)
app.get('/admin', (req, res) => {
    if (req.session.user) {
        let ipTable = ipLogs.map(log => {
            return `<tr>
                        <td class="py-2 px-4 border-b">${log.ip}</td>
                        <td class="py-2 px-4 border-b">
                            <button class="text-red-500">Ban</button>
                            <button class="text-blue-500">Rename</button>
                        </td>
                    </tr>`;
        }).join('');
        
        const adminPageHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Admin Dashboard</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="bg-gray-900 text-white">
                <div class="max-w-7xl mx-auto px-4 py-8">
                    <h2 class="text-3xl font-bold mb-4">Admin Dashboard</h2>
                    <h3 class="text-xl font-semibold mb-4">Manage Users and IPs</h3>
                    <table class="table-auto w-full text-sm">
                        <thead>
                            <tr>
                                <th class="py-2 px-4 border-b">IP Address</th>
                                <th class="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${ipTable}
                        </tbody>
                    </table>
                    <a href="/" class="mt-4 inline-block bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">Logout</a>
                </div>
            </body>
            </html>
        `;
        res.send(adminPageHTML);
    } else {
        res.send('Please log in first');
    }
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
