# Random-Joke-Website

A web application that displays random jokes one at a time. Shows the **setup** first, and the **punchline** appears on click. Built with **Node.js**, **Express**, and **MySQL**.

---

## Features

- Fetches jokes from a public JSON source.
- Stores jokes in a MySQL database.
- Displays jokes one at a time on a web page.
- Click to reveal the punchline, click again for the next joke.
- Clean and responsive UI.

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- HTML, CSS, JavaScript

---

## Installation & Setup

### 1. Install Node.js & MySQL

1. Download and install **Node.js** from [https://nodejs.org](https://nodejs.org)
2. Download and install **MySQL Installer** from [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
   - During installation, remember your **root password**.
   - Optionally, install **MySQL Workbench** for GUI database management.

---

### 2️. Create MySQL database and user

1. Open **MySQL Workbench** or MySQL CLI.
2. Run the following commands (replace `jokesdb`, `jokesuser`, and `jokespass` as needed):

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS jokesdb;

-- Create a user for the app
CREATE USER 'jokesuser'@'localhost' IDENTIFIED BY 'jokespass';

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON jokesdb.* TO 'jokesuser'@'localhost';
FLUSH PRIVILEGES;

```

### 3. Configure environment variables

1. After cloning the repository, you will see .env.example in the project root.

2. Create your own .env file by copying .env.example:

```bash
cp .env.example .env
```

3. Open .env and fill in your own database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_NAME=jokesdb
PORT=3000
```

## Note:

- .env is ignored by Git to keep your credentials safe.

- .env.example is included as a template with placeholder values for reference.

### 4. Install Node.js dependencies

```
npm install
```

This installs:

- express

- mysql2

- dotenv

- node-fetch

### 5. Import jokes JSON into MySQL

1. Open terminal/PowerShell in the project folder.

2. Run the import script:

```bash
npm run import
```

This will:

- Fetch jokes from GitHub JSON

- Create the jokes table if it doesn’t exist

- Insert all jokes into your MySQL database

### 6. Run the application

```bash
npm start
```

Open your browser and go to:

http://localhost:3000

Click on the joke setup to reveal the punchline, then click again for the next joke.

## Project Structure

```text
project-root/
├── server.js              # Node.js + Express server
├── import_jokes_mysql.js  # Script to import jokes
├── package.json
├── .env
└── public/
    ├── index.html
    ├── styles.css
    └── app.js             # Client-side JS
```

## Notes

- Ensure MySQL server is running before running the import script or starting the app.

- Use your app user (jokesuser) instead of root for better security.

- .env allows you to configure database credentials and server port without editing the code.

## License

This project is for learning and demonstration purposes.
