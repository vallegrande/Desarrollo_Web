// IMPORTACION DE DEPENDENCIAS
const express = require('express');
const path = require('path');
const rutas = require('./routes/router');
process.loadEnvFile();

// APLICACIÓN DE EXPRESS
const app = express();

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public/')));

// RUTAS
app.use('/', rutas);

// INICIO DEL SERVIDOR
app.listen(process.env.PORT, () => {
     console.log(`SERVIDOR EN LA RUTA http://${process.env.IP}:${process.env.PORT}`);
})
