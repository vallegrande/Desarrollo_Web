const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
     // res.send('Hello World!');
     res.sendFile(path.join(__dirname, '../../public/html/index.html'))
});

router.get('/hola', (req, res) => {
     res.send('ESTE ES EL TALLER DE DESARROLLO WEB');
});

module.exports = router;
