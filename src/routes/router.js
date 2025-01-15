const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
     // res.send('Hello World!');
     res.sendFile(path.join(__dirname, '../../public/html/index.html'))
});

router.get('/personas', (req, res) => {
     res.sendFile(path.join(__dirname, '../../public/html/personas.html'))
});

module.exports = router;
