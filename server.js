const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(cors());
app.use(express.static('client'));
app.use(express.json());

app.post('/add-quote', async (req, res) => {
    const { quote, author } = req.body;

    if (!quote || !author) return res.status(400).send('Missing quote or author');

    try {
        await pool.query('INSERT INTO quotes (quote, author) VALUES ($1, $2)', [quote, author]);
        res.status(200).send('Quote added');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving to database');
    }
});

app.get('/random-quote', async (req, res) => {
    try {
        const result = await pool.query('SELECT quote, author FROM quotes ORDER BY RANDOM() LIMIT 1');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading from database');
    }
});

app.get('/quotes', async (req, res) => {
    try {
        const result = await pool.query('SELECT quote, author FROM quotes');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading from database');
    }
})

app.listen(PORT, () => console.log(`Server running at https://localhost:${PORT}`));