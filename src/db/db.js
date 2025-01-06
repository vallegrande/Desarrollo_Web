//Conexion a la base de datos
const mysql = require('mysql2');
process.loadEnvFile();

const connection = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     port: process.env.DB_PORT
});

connection.connect(err => {
     if (err) {
          console.log('Error de conexión a la base de datos', err);
          process.exit(1);
     } else {
          console.log('Conexión a la base de datos exitosa');
     }
})

module.exports = connection;
