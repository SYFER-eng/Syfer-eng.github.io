<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cool Interactive Single Page Website</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
  <style>
    /* General Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Roboto', sans-serif;
      background-color: #1c1c1c;
      color: white;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Navbar Style */
    nav {
      background-color: #222;
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      padding: 15px 50px;
      z-index: 1000;
    }

    .menu {
      display: flex;
      justify-content: space-around;
      align-items: center;
      list-style-type: none;
    }

    .menu li {
      font-size: 20px;
      padding: 10px;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .menu li a {
      color: white;
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    .menu li a:hover {
      color: #ff9a9e;
    }

    .menu li a i {
      margin-right: 8px;
      font-size: 22px;
    }

    /* Cool Buttons */
    .btn {
      padding: 12px 20px;
      background-color: #ff9a9e;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      border-radius: 5px;
      transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .btn:hover {
      background-color: #ff4f6c;
      transform: translateY(-3px);
    }

    /* Content Sections */
    .section {
      padding: 100px 20px;
      text-align: center;
      font-size: 24px;
      min-height: 100vh;
    }

    /* About Page */
    #about {
      background-color: #333;
    }

    /* Websites Page */
    #websites {
      background-color: #444;
    }

    /* Home Section */
    #home {
      background-color: #222;
    }

    /* Cool Text Effects */
    .cool-text {
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 2px;
      color: #ff9a9e;
      animation: text-glow 1.5s infinite alternate;
    }

    @keyframes text-glow {
      0% {
        text-shadow: 0 0 10px #ff9a9e, 0 0 20px #ff9a9e, 0 0 30px #ff9a9e, 0 0 40px #ff4f6c, 0 0 50px #ff4f6c;
      }
      100% {
        text-shadow: 0 0 20px #ff9a9e, 0 0 30px #ff9a9e, 0 0 40px #ff9a9e, 0 0 50px #ff4f6c, 0 0 60px #ff4f6c;
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      nav {
        padding: 15px;
      }

      .menu {
        flex-direction: column;
        align-items: center;
      }

      .menu li {
        padding: 15px;
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <nav>
    <ul class="menu">
      <li><a href="#home"><i class="fas fa-home"></i>Home</a></li>
      <li><a href="#about"><i class="fas fa-info-circle"></i>About</a></li>
      <li><a href="#websites"><i class="fas fa-laptop-code"></i>Websites</a></li>
    </ul>
  </nav>

  <!-- Home Section -->
  <div id="home" class="section">
    <h1 class="cool-text">Welcome to the Stylish Website</h1>
    <p>Click on the menu items to explore different sections.</p>
    <button class="btn">Learn More</button>
  </div>

  <!-- About Section -->
  <div id="about" class="section">
    <h2 class="cool-text">About Us</h2>
    <p>Everything is made by Syfer-eng.</p>
    <button class="btn">Contact Us</button>
  </div>

  <!-- Websites Section -->
  <div id="websites" class="section">
    <h2 class="cool-text">Websites</h2>
    <p>Check out these cool websites we have worked on:</p>
    <ul>
      <li><a href="https://Syfer-eng.github.io/Menu.html" style="color: #ff9a9e;">Syfer-eng's Hub</a></li>
      <li><a href="https://example2.com" style="color: #ff9a9e;">Example Website 2</a></li>
      <li><a href="https://example3.com" style="color: #ff9a9e;">Example Website 3</a></li>
    </ul>
    <button class="btn">Visit More Websites</button>
  </div>
</body>
</html>
