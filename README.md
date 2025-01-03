<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cool Loading Screen</title>
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

    .loading-text {
      margin: 0;
      padding: 0;
      text-align: center;
      letter-spacing: 0.1em;
      z-index: 1;
    }

    .ripple {
      display: inline-block;
      animation: ripple 1s ease infinite;
      font-size: 2em;
    }

    .ripple:after {
      content: ' ';
      display: block;
      width: 100px;
      height: 10px;
      margin: 0 auto;
      border-radius: 50px;
      background: white;
      opacity: 0.5;
      animation: ripple 1s ease infinite;
      animation-delay: -0.5s;
    }

    @keyframes ripple {
      0% {
        transform: scale(0, 0);
        opacity: 0;
      }

      50% {
        transform: scale(1, 1);
        opacity: 1;
      }

      100% {
        transform: scale(2, 2);
        opacity: 0;
      }
    }

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
<body onload="setTimeout(function(){ window.location.replace('Menu.html'); }, 2000);" onmousemove="mouseMove(event)">
  <div class="mouse-picture"></div>
  <div class="loading-text">
    <span class="ripple">L</span>
    <span class="ripple">o</span>
    <span class="ripple">a</span>
    <span class="ripple">d</span>
    <span class="ripple">i</span>
    <span class="ripple">n</span>
    <span class="ripple">g</span>
    <span class="ripple">...</span>
  </div>

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
