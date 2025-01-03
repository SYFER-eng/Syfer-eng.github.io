<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Mouse Background</title>
    <style>
        /* Global body styles */
        body {
            height: 100vh;
            margin: 0;
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite; /* Smooth gradient transition */
            cursor: none; /* Hide default cursor */
            background-color: rgba(0, 0, 0, 0.7); /* Darker background overlay */
            position: relative;
        }

        /* Keyframe for smooth gradient transition */
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Glowing effect for text */
        .start-text {
            font-size: 200px; /* Very large font size to fill the entire page */
            font-weight: bold;
            color: #ffffff;
            text-align: center;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.7), 0 0 40px rgba(255, 255, 255, 0.8);
            animation: glow 1.5s infinite alternate;
            user-select: none; /* Prevent text selection */
            position: absolute; /* Fill entire screen */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -1; /* Place text behind other elements */
            opacity: 0; /* Make the text invisible */
        }

        /* Glowing effect animation */
        @keyframes glow {
            from {
                text-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.7), 0 0 40px rgba(255, 255, 255, 0.8);
            }
            to {
                text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.8);
            }
        }

        /* Custom cursor styling */
        .custom-cursor {
            position: absolute;
            width: 70px; /* Fixed size */
            height: 70px;
            pointer-events: none;
            background-image: url('https://i.ibb.co/HNTCGkN/icons8-kuromi-512.png'); /* Cursor image */
            background-size: cover;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease-out;
            animation: pulse 0.6s ease-out infinite; /* Pulse effect */
        }

        /* Pulse effect for cursor */
        @keyframes pulse {
            0% { transform: scale(1) translate(-50%, -50%); }
            50% { transform: scale(1.1) translate(-50%, -50%); }
            100% { transform: scale(1) translate(-50%, -50%); }
        }

        /* Parallax background movement */
        .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            transition: transform 0.2s ease-in-out;
        }

        /* Parallax effect on mouse movement */
        .parallax {
            transform: scale(1);
            transition: transform 0.3s ease-in-out;
        }
    </style>
</head>
<body>
    <div class="background parallax"></div>
    <div class="start-text">Invisible Text Filling Menu</div> <!-- Invisible text -->
    <div class="custom-cursor" id="customCursor"></div>

    <script>
        // Selecting DOM elements
        const cursor = document.querySelector('.custom-cursor');
        const background = document.querySelector('.background');
        const text = document.querySelector('.start-text');

        // Cursor image URL
        const cursorImageUrl = 'https://i.ibb.co/HNTCGkN/icons8-kuromi-512.png'; 

        // Preloading cursor image
        const cursorImage = new Image();
        cursorImage.src = cursorImageUrl;
        cursorImage.onload = () => {
            cursor.style.backgroundImage = `url(${cursorImageUrl})`;
        };

        // Mouse movement effect
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Move custom cursor
            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;

            // Parallax background effect (moves slower than mouse)
            background.style.transform = `translate(${(x - window.innerWidth / 2) * 0.05}px, ${(y - window.innerHeight / 2) * 0.05}px)`;
        });

        // Keydown event to open website on "5" key press
        document.addEventListener('keydown', (event) => {
            if (event.key === '5') {
                window.location.href = 'https://syfer-eng.github.io'; // Navigate to the website
            }
        });

        // Responsive handling for cursor scaling
        window.addEventListener('resize', () => {
            const cursorSize = window.innerWidth / 15; // Adjust cursor size based on window size
            cursor.style.width = `${cursorSize}px`;
            cursor.style.height = `${cursorSize}px`;
        });
    </script>
</body>
</html>
