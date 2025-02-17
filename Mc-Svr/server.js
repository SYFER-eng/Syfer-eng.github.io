const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

let serverProcess = null;
let serverStatus = "offline";
let players = ["Player1", "Player2"];

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/start', (req, res) => {
    if (serverStatus === "offline") {
        serverProcess = spawn('java', [
            '-Xmx1024M',
            '-Xms1024M',
            '-jar',
            'server.jar',
            'nogui'
        ], { cwd: 'minecraft_server' });
        
        serverStatus = "online";
    }
    res.json({ status: "Server started" });
});

app.post('/stop', (req, res) => {
    if (serverProcess) {
        serverProcess.kill();
        serverProcess = null;
        serverStatus = "offline";
    }
    res.json({ status: "Server stopped" });
});

app.get('/status', (req, res) => {
    res.json({ status: serverStatus });
});

app.get('/players', (req, res) => {
    res.json({ players: players });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
