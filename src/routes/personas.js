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

// LISTAR INACTIVOS
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
router.get("/:id", (req, res) => {
     const query = `
          SELECT
               id,
               nombres,
               apellidos,
               tipo_doc,
               num_doc,
               celular,
               correo,
               DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento,
               estado
          FROM persona
          WHERE id = ?
     `;

     connection.query(query, [req.params.id], (err, results) => {
          if (err) {
               console.log("Error al obtener persona por ID", err);
               return res
                    .status(500)
                    .json({ error: "Error al obtener persona por ID" });
          }
          if (results.length === 0) {
               return res.status(404).json({ error: "Persona no encontrada" });
          }
          res.json(results[0]);
     });
});

// MÉTODO DE ACTUALIZAR
router.put("/:id", (req, res) => {
     const {
          nombres,
          apellidos,
          tipo_doc,
          num_doc,
          celular,
          correo,
          fecha_nacimiento
     } = req.body;
     const query = `
        UPDATE persona
        SET nombres = ?, apellidos = ?, tipo_doc = ?, num_doc = ?, celular = ?, correo = ?, fecha_nacimiento = ?
        WHERE id = ?
    `;
     connection.query(
          query,
          [
               nombres,
               apellidos,
               tipo_doc,
               num_doc,
               celular,
               correo,
               fecha_nacimiento,
               req.params.id
          ],
          (err, results) => {
               if (err) {
                    console.log("Error al actualizar persona", err);
                    return res
                         .status(500)
                         .json({ error: "Error al actualizar persona" });
               }
               res.json({ message: "Persona actualizada exitosamente" });
          }
     );
});

// METODO DE CREAR
router.post("/", (req, res) => {
     const {
          nombres,
          apellidos,
          tipo_doc,
          num_doc,
          celular,
          correo,
          fecha_nacimiento,
          estado
     } = req.body;

     const query = ` INSERT INTO persona (nombres, apellidos, tipo_doc, num_doc, celular, correo, fecha_nacimiento, estado) VALUES (?, ?, ?, ?, ?, ?, ?, 'A')`;

     connection.query(
          query,
          [
               nombres,
               apellidos,
               tipo_doc,
               num_doc,
               celular,
               correo,
               fecha_nacimiento
          ],
          (err, results) => {
               if (err) {
                    console.log("ERROR AL INSERTAR: " + err);
                    return res
                         .status(500)
                         .json({ error: "Error al insertar datos" });
               }
               res.status(201).json({
                    message: "Persona agregada correctamente",
                    id: results.insertId
               });
          }
     );
});

// ELIMINADO LÓGICO (Cambiar estado a 'I')
router.put("/eliminar/:id", (req, res) => {
     const query = `
          UPDATE persona
          SET estado = 'I'
          WHERE id = ?
     `;
     connection.query(query, [req.params.id], (err, results) => {
          if (err) {
               console.log("Error al eliminar persona (lógico)", err);
               return res
                    .status(500)
                    .json({ error: "Error al eliminar persona" });
          }
          if (results.affectedRows === 0) {
               return res.status(404).json({ error: "Persona no encontrada" });
          }
          res.json({ message: "Persona eliminada (lógicamente)" });
     });
});

// RESTAURAR PERSONA (Cambiar estado a 'A')
router.put("/restaurar/:id", (req, res) => {
     const query = `
          UPDATE persona
          SET estado = 'A'
          WHERE id = ?
     `;
     connection.query(query, [req.params.id], (err, results) => {
          if (err) {
               console.log("Error al restaurar persona", err);
               return res
                    .status(500)
                    .json({ error: "Error al restaurar persona" });
          }
          if (results.affectedRows === 0) {
               return res.status(404).json({ error: "Persona no encontrada" });
          }
          res.json({ message: "Persona restaurada exitosamente" });
     });
});


module.exports = router;
