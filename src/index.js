// IMPORTACION DE DEPENDENCIAS
const express = require('express');
const path = require('path');
const rutas = require('./routes/router');
const personaRutas = require('./routes/personas');
process.loadEnvFile();

// APLICACIÓN DE EXPRESS
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public/')));

// RUTAS
app.use('/', rutas);
app.use('/api/personas', personaRutas)

// MANEJO DE ERRORES
app.use((err, req, res, next) => {
     console.log(err)
     res.status(500).json({ error: 'Error interno' });
})

// INICIO DEL SERVIDOR
app.listen(process.env.PORT, () => {
     console.log(`SERVIDOR EN LA RUTA http://${process.env.IP}:${process.env.PORT}`);
})
