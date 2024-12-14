<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Menu</title>
    <style>
        :root {
            --primary: #6200ea;
            --secondary: #b388ff;
            --dark: #1a1a1a;
            --light: #ffffff;
            --transition: all 0.3s ease;
        }

        body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background: var(--dark);
            color: var(--light);
        }

        .nav-container {
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            background: rgba(26, 26, 26, 0.95);
            backdrop-filter: blur(10px);
        }

        .nav-wrapper {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .nav-menu {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            color: var(--secondary);
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            gap: 30px;
        }

        .nav-link {
            color: var(--light);
            text-decoration: none;
            font-size: 1.1rem;
            padding: 8px 16px;
            border-radius: 25px;
            transition: var(--transition);
            position: relative;
        }

        .nav-link:hover {
            color: var(--secondary);
        }

        .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 50%;
            background: var(--secondary);
            transition: var(--transition);
            transform: translateX(-50%);
        }

        .nav-link:hover::after {
            width: 70%;
        }

        .menu-button {
            display: none;
            background: none;
            border: none;
            color: var(--light);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 10px;
        }

        @media (max-width: 768px) {
            .menu-button {
                display: block;
            }

            .nav-links {
                position: fixed;
                top: 70px;
                right: -100%;
                flex-direction: column;
                background: rgba(26, 26, 26, 0.98);
                width: 100%;
                text-align: center;
                transition: var(--transition);
                padding: 20px 0;
                backdrop-filter: blur(10px);
            }

            .nav-links.active {
                right: 0;
            }

            .nav-link {
                padding: 15px;
                width: 100%;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <nav class="nav-container">
        <div class="nav-wrapper">
            <div class="nav-menu">
                <a href="#" class="logo">CodeHub</a>
                <div class="nav-links">
                    <a href="#home" class="nav-link">Home</a>
                    <a href="#projects" class="nav-link">Projects</a>
                    <a href="#about" class="nav-link">About</a>
                    <a href="#contact" class="nav-link">Contact</a>
                </div>
                <button class="menu-button">☰</button>
            </div>
        </div>
    </nav>

    <script>
        const menuButton = document.querySelector('.menu-button');
        const navLinks = document.querySelector('.nav-links');

        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuButton.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuButton.textContent = '☰';
            });
        });
    </script>
</body>
</html>
