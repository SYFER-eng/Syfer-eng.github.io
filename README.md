<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0.001;url=https://syfer-eng.github.io/Loading%20Screen/Loading%20Screen.html">
    <title>Redirecting...</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            font-family: 'Fira Code', monospace;
            font-size: 16px;
            color: white;
            font-weight: bold;
            font-style: italic;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            cursor: none; /* Hide the default cursor */
            background: linear-gradient(45deg, #ff0066, #ffcc00, #66ffcc, #6600ff);
            background-size: 400% 400%;
            animation: gradientAnimation 10s ease infinite;
            position: relative;
        }

        @keyframes gradientAnimation {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        /* Particle Effect */
        .particle {
            position: absolute;
            border-radius: 50%;
            background: white;
            opacity: 0.7;
            animation: particleMove 4s infinite;
        }

        @keyframes particleMove {
            0% {
                transform: translate(0, 0);
                opacity: 0.7;
            }
            100% {
                transform: translate(200px, 200px);
                opacity: 0;
            }
        }

        /* Mouse Picture */
        .mouse-picture {
            width: 30px;
            height: 30px;
            position: fixed;
            z-index: 9999;
            pointer-events: none;
            opacity: 0.8;
            transition: opacity 0.5s;
            margin-left: -15px; /* Adjust the cursor position to center */
            margin-top: -15px;  /* Adjust the cursor position to center */
            background-image: url('https://i.ibb.co/HNTCGkN/icons8-kuromi-512.png');
            background-size: contain; /* Adjust to the size of the image */
            background-repeat: no-repeat;
            background-position: center;
        }

        .mouse-picture:after {
            content: "";
            border: 0px solid white;
            border-radius: 0px;
            position: absolute;
            width: 0px;
            height: 0px;
            margin: 0px;
            animation: pulse 0s ease-in-out infinite;
            animation-delay: 0s;
        }

        @keyframes pulse {
            0% {
                opacity: 0;
                transform: scale(0);
            }

            50% {
                opacity: 1;
                transform: scale(1.2);
            }

            100% {
                opacity: 0;
                transform: scale(1);
            }
        }
    </style>
</head>
<body onload="setTimeout(function(){ window.location.replace('https://syfer-eng.github.io/Loading Screen/Loading Screen.html'); }, 2000);" onmousemove="mouseMove(event)">
    <div class="mouse-picture"></div>
    
    <script>
        function mouseMove(event) {
            const mousePicture = document.querySelector('.mouse-picture');
            mousePicture.style.left = event.pageX + 'px';
            mousePicture.style.top = event.pageY + 'px';
        }

        // Generate particles
        setInterval(() => {
            let particle = document.createElement('div');
            let size = Math.random() * 10 + 5;
            particle.classList.add('particle');
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            document.body.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }, 100);
    </script>
</body>
</html>
