const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const port = 3000;

app.use(express.json());

const MINECRAFT_VERSION = '1.16.5';
const SERVER_JAR = 'server.jar';
const SERVER_URL = 'https://launcher.mojang.com/v1/objects/1b557e7b033b583cd9f66746b7a9ab1ec1673ced/server.jar';
const MINECRAFT_DIR = path.join(__dirname, 'mc_server');

let serverProcess = null;
let serverStatus = "offline";
let startupProgress = 0;

if (!fs.existsSync(MINECRAFT_DIR)) {
    fs.mkdirSync(MINECRAFT_DIR);
}

function downloadServerJar() {
    startupProgress = 10;
    return new Promise((resolve, reject) => {
        const jarPath = path.join(MINECRAFT_DIR, SERVER_JAR);
        if (!fs.existsSync(jarPath)) {
            const file = fs.createWriteStream(jarPath);
            https.get(SERVER_URL, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    createEula();
                    startupProgress = 30;
                    resolve();
                });
            });
        } else {
            startupProgress = 30;
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

app.get('/progress', (req, res) => {
    res.json({ progress: startupProgress, status: serverStatus });
});

app.post('/start', async (req, res) => {
    if (serverStatus === "offline") {
        serverStatus = "starting";
        startupProgress = 0;
        
        try {
            await downloadServerJar();
            
            serverProcess = spawn('java', [
                '-Xmx2G',
                '-Xms1G',
                '-jar',
                SERVER_JAR,
                'nogui'
            ], { cwd: MINECRAFT_DIR });

            serverProcess.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(output);
                
                if (output.includes('Done')) {
                    startupProgress = 100;
                    serverStatus = "online";
                } else if (output.includes('Loading')) {
                    startupProgress = 60;
                } else if (output.includes('Preparing')) {
                    startupProgress = 80;
                }
            });

            serverProcess.stderr.on('data', (data) => {
                console.error(`Server error: ${data}`);
            });

            serverProcess.on('close', (code) => {
                console.log(`Server process exited with code ${code}`);
                serverStatus = "offline";
                serverProcess = null;
                startupProgress = 0;
            });
            
            res.json({ status: "Server starting", progress: startupProgress });
        } catch (error) {
            serverStatus = "offline";
            res.status(500).json({ error: "Failed to start server" });
        }
    } else {
        res.json({ status: serverStatus, progress: startupProgress });
    }
});

app.post('/stop', (req, res) => {
    if (serverProcess) {
        serverProcess.kill();
        serverProcess = null;
        serverStatus = "offline";
        startupProgress = 0;
    }
    res.json({ status: "Server stopped" });
});

app.listen(port, () => {
    console.log(`Web interface running at http://localhost:${port}`);
    console.log(`Minecraft server files will be in: ${MINECRAFT_DIR}`);
});
