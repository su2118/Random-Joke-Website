require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env;

const pool = mysql.createPool
({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/joke/random', async (req, res) => 
{
  try 
  {
    const [rows] = await pool.query(
      'SELECT id, setup, punchline FROM jokes ORDER BY RAND() LIMIT 1'
    );
    res.json(rows[0]);
  } 
  catch (err) 
  {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT || 3000, () => 
{
  console.log(`Server running at http://localhost:${PORT || 3000}`);
});
