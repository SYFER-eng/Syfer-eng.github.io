const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const port = 3000;

const MINECRAFT_VERSION = '1.16.5';
const SERVER_JAR = 'server.jar';
const SERVER_URL = 'https://launcher.mojang.com/v1/objects/1b557e7b033b583cd9f66746b7a9ab1ec1673ced/server.jar';
const MINECRAFT_DIR = path.join(__dirname, 'mc_server');

let serverProcess = null;
let serverStatus = "offline";
let players = [];

if (!fs.existsSync(MINECRAFT_DIR)) {
    fs.mkdirSync(MINECRAFT_DIR);
}

function downloadServerJar() {
    return new Promise((resolve, reject) => {
        const jarPath = path.join(MINECRAFT_DIR, SERVER_JAR);
        if (!fs.existsSync(jarPath)) {
            const file = fs.createWriteStream(jarPath);
            https.get(SERVER_URL, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    createEula();
                    resolve();
                });
            });
        } else {
            resolve();
        }
    });
}

function createEula() {
    const eulaPath = path.join(MINECRAFT_DIR, 'eula.txt');
    if (!fs.existsSync(eulaPath)) {
        fs.writeFileSync(eulaPath, 'eula=true');
    }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/start', async (req, res) => {
    if (serverStatus === "offline") {
        await downloadServerJar();
        
        serverProcess = spawn('java', [
            '-Xmx2G',
            '-Xms1G',
            '-jar',
            SERVER_JAR,
            'nogui'
        ], { cwd: MINECRAFT_DIR });

        serverProcess.stdout.on('data', (data) => {
            console.log(`Server output: ${data}`);
        });

        serverProcess.stderr.on('data', (data) => {
            console.error(`Server error: ${data}`);
        });

        serverProcess.on('close', (code) => {
            console.log(`Server process exited with code ${code}`);
            serverStatus = "offline";
            serverProcess = null;
        });
        
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
    console.log(`Web interface running at http://localhost:${port}`);
    console.log(`Minecraft server files will be in: ${MINECRAFT_DIR}`);
});
