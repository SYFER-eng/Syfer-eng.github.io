<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Single Page Website</title>
  <style>
    /* General Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Arial', sans-serif;
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
      font-size: 18px;
      padding: 10px;
      cursor: pointer;
    }

    .menu li a {
      color: white;
      text-decoration: none;
    }

    .menu li a:hover {
      color: #ff9a9e;
    }

    /* Content Sections */
    .section {
      padding: 100px 20px;
      text-align: center;
      font-size: 24px;
      color: white;
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
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#websites">Websites</a></li>
    </ul>
  </nav>

  <!-- Home Section -->
  <div id="home" class="section">
    <h1>Welcome to the Stylish Website</h1>
    <p>Click on the menu items to explore different sections.</p>
  </div>

  <!-- About Section -->
  <div id="about" class="section">
    <h2>About Us</h2>
    <p>Everything is made by Syfer-eng.</p>
  </div>

  <!-- Websites Section -->
  <div id="websites" class="section">
    <h2>Websites</h2>
    <p>Check out these cool websites we have worked on:</p>
    <ul>
      <li><a href="https://Syfer-eng.github.io/Menu.html" style="color: #ff9a9e;">Syfer-eng's Hub</a></li>
      <li><a href="https://example2.com" style="color: #ff9a9e;">Example Website 2</a></li>
      <li><a href="https://example3.com" style="color: #ff9a9e;">Example Website 3</a></li>
    </ul>
  </div>
</body>
</html>
