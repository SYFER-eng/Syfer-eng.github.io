🡹The Button above dose nothing🡹
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Start</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            background-color: black;
            color: #9932CC;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
        }

        h1 {
            font-size: 48px;
            text-shadow: 0 0 10px #800080;
            margin-bottom: 40px;
        }

        .menu-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .menu-button {
            padding: 15px 40px;
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            background-color: #800080;
            border: 2px solid #9932CC;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            text-align: center;
        }

        .menu-button:hover {
            background-color: #9932CC;
            transform: scale(1.1);
            box-shadow: 0 0 20px #800080;
        }
    </style>
</head>
<body>
    <h1>Main Menu</h1>
    <div class="menu-container">
        <a href="Menu.html" class="menu-button">Start Page</a>
    </div>
</body>
</html>
