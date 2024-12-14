<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Start Button</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: black;
        }

        .start-button {
            padding: 15px 40px;
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            background-color: #800080;
            border: 2px solid #9932CC;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .start-button:hover {
            background-color: #9932CC;
            transform: scale(1.1);
            box-shadow: 0 0 20px #800080;
        }
    </style>
</head>
<body>
    <button class="start-button">START</button>
</body>
</html>
