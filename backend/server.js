const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/templates', (req, res) => {
    const filePath = path.join(__dirname, '..', 'backend', 'data', 'templates.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Failed to read templates data' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
