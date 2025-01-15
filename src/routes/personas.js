const express = require("express");
const router = express.Router();
const connection = require("../db/db");

// OBTENER DATOS DE PERSONAS
router.get("/", (req, res) => {
     const query = `SELECT id, nombres, apellidos, tipo_doc, num_doc, celular, correo, DATE_FORMAT(fecha_nacimiento, '%d - %b - %Y') AS fecha_nacimiento, estado FROM persona`;

     connection.query(query, (err, results) => {
          if (err) {
               console.log("Error al obtener datos de personas", err);
               return res
                    .status(500)
                    .json({ error: "Error al obtener datos de personas" });
          }
          res.json(results);
     });
});

router.get("/activos", (req, res) => {
     const query = `SELECT id, nombres, apellidos, tipo_doc, num_doc, celular, correo, DATE_FORMAT(fecha_nacimiento, '%d - %b - %Y') AS fecha_nacimiento, estado FROM persona WHERE estado = 'A'`;

     connection.query(query, (err, results) => {
          if (err) {
               console.log("Error al obtener datos de personas", err);
               return res
                    .status(500)
                    .json({ error: "Error al obtener datos de personas" });
          }
          res.json(results);
     });
});

router.get("/inactivos", (req, res) => {
     const query = `SELECT id, nombres, apellidos, tipo_doc, num_doc, celular, correo, DATE_FORMAT(fecha_nacimiento, '%d - %b - %Y') AS fecha_nacimiento, estado FROM persona WHERE estado = 'I'`;

     connection.query(query, (err, results) => {
          if (err) {
               console.log("Error al obtener datos de personas", err);
               return res
                    .status(500)
                    .json({ error: "Error al obtener datos de personas" });
          }
          res.json(results);
     });
});

// MÉTODO PARA OBTENER POR ID

// METODO DE ACTUALIZAR

// METODO DE CREAR
router.post("/", (req, res) => {
     const { nombres, apellidos, tipo_doc, num_doc, celular, correo, fecha_nacimiento, estado } = req.body;

     const query = ` INSERT INTO persona (nombres, apellidos, tipo_doc, num_doc, celular, correo, fecha_nacimiento, estado) VALUES (?, ?, ?, ?, ?, ?, ?, 'A')`;

     connection.query(query, [nombres, apellidos, tipo_doc, num_doc, celular, correo, fecha_nacimiento], (err, results) => {
          if (err) {
               console.log("ERROR AL INSERTAR: " + err);
               return res.status(500).json({ error: "Error al insertar datos" });
          }
          res.status(201).json({ message: "Persona agregada correctamente", id: results.insertId });
     })
})
// METODO DE ELIMINAR

// MÉTODO DE RESTAURAR

module.exports = router;
