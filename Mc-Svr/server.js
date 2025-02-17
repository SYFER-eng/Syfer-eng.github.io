const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const port = 3000;

// Middleware
app.use(express.static(__dirname));
app.use(express.json());

const MINECRAFT_VERSION = '1.16.5';
const SERVER_JAR = 'server.jar';
const SERVER_URL = 'https://launcher.mojang.com/v1/objects/1b557e7b033b583cd9f66746b7a9ab1ec1673ced/server.jar';
const MINECRAFT_DIR = path.join(__dirname, 'mc_server');

let serverProcess = null;
let serverStatus = "offline";
let startupProgress = 0;
let players = [];
let tps = 20;

// Create minecraft server directory if it doesn't exist
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
                file.on('error', (err) => {
                    fs.unlink(jarPath);
                    reject(err);
                });
            }).on('error', (err) => {
                fs.unlink(jarPath);
                reject(err);
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

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/progress', (req, res) => {
    res.json({
        progress: startupProgress,
        status: serverStatus,
        players: players.length,
        tps: tps
    });
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
                
                // Update progress based on server output
                if (output.includes('Done')) {
                    startupProgress = 100;
                    serverStatus = "online";
                } else if (output.includes('Loading')) {
                    startupProgress = 60;
                } else if (output.includes('Preparing')) {
                    startupProgress = 80;
                }

                // Track player joins/leaves
                if (output.includes('joined the game')) {
                    const player = output.split('[')[2].split(':')[0].trim();
                    players.push(player);
                } else if (output.includes('left the game')) {
                    const player = output.split('[')[2].split(':')[0].trim();
                    players = players.filter(p => p !== player);
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
                players = [];
            });
            
            res.json({ 
                status: "Server starting", 
                progress: startupProgress 
            });

        } catch (error) {
            serverStatus = "offline";
            startupProgress = 0;
            res.status(500).json({ 
                error: "Failed to start server",
                details: error.message 
            });
        }
    } else {
        res.json({ 
            status: serverStatus, 
            progress: startupProgress 
        });
    }
});

app.post('/stop', (req, res) => {
    if (serverProcess) {
        serverProcess.kill();
        serverProcess = null;
        serverStatus = "offline";
        startupProgress = 0;
        players = [];
        res.json({ status: "Server stopped" });
    } else {
        res.json({ status: "Server already stopped" });
    }
});

app.get('/stats', (req, res) => {
    res.json({
        status: serverStatus,
        players: players,
        tps: tps,
        uptime: serverProcess ? process.uptime() : 0
    });
});

// Start the web server
app.listen(port, () => {
    console.log(`Web interface running at http://localhost:${port}`);
    console.log(`Minecraft server files will be in: ${MINECRAFT_DIR}`);
});

// Handle process termination
process.on('SIGTERM', () => {
    if (serverProcess) {
        serverProcess.kill();
    }
    process.exit(0);
});

process.on('SIGINT', () => {
    if (serverProcess) {
        serverProcess.kill();
    }
    process.exit(0);
});
