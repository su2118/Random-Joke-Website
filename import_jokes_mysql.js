require('dotenv').config();
const fetch = require('node-fetch');
const mysql = require('mysql2/promise');

(async () => {
  const RAW_URL = 'https://raw.githubusercontent.com/15Dkatz/official_joke_api/master/jokes/index.json';
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  try {
    const res = await fetch(RAW_URL);
    const jokes = await res.json();

    const conn = await mysql.createConnection(
        {
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD
        }
    );

    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await conn.changeUser({ database: DB_NAME });

    await conn.query(`
      CREATE TABLE IF NOT EXISTS jokes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(100),
        setup TEXT NOT NULL,
        punchline TEXT NOT NULL
      );
    `);

    await conn.query('TRUNCATE TABLE jokes;');

    for (const j of jokes) 
    {
      await conn.query(
        'INSERT INTO jokes (type, setup, punchline) VALUES (?, ?, ?)',
        [j.type, j.setup, j.punchline]
      );
    }

    console.log(`Imported ${jokes.length} jokes into ${DB_NAME}`);
    await conn.end();
  } 
  catch (err) 
  {
    console.error('Import failed:', err);
  }
})();
