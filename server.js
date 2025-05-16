const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('client'));
app.use(express.json());

app.post('/add-quote', (req, res) => {
    const newQuote = req.body.text;

    fs.readFile('quotes.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');

        let quotes = JSON.parse(data);
        quotes.push(newQuote);

        fs.writeFile('quotes.json', JSON.stringify(quotes, null, 2), err => {
            if (err) return res.status(500).send('Error writing file');
            res.status(200).send('Quote added');
        });
    });
});

app.listen(PORT, () => console.log(`Server running at https://localhost:${PORT}`));