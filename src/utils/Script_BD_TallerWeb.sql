CREATE DATABASE taller_web;

USE taller_web;

CREATE TABLE
    persona (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        tipo_doc ENUM ('DNI', 'CNE') NOT NULL,
        dni VARCHAR(20) NOT NULL UNIQUE,
        celular VARCHAR(15) NOT NULL,
        correo VARCHAR(100) NOT NULL,
        fecha_nacimiento DATE NOT NULL,
        estado CHAR(1) DEFAULT 'A' CHECK (estado IN ('A', 'I')),
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

INSERT INTO
    persona (
        nombres,
        apellidos,
        tipo_doc,
        dni,
        celular,
        correo,
        fecha_nacimiento,
        estado
    )
VALUES
    (
        'Isael',
        'Fatama',
        'DNI',
        '12345678',
        '922843355',
        'isael.fatama@vallegrande.edu.pe',
        STR_TO_DATE ('23/11/2005', '%d/%m/%Y'),
        'A'
    ),
    (
        'Ana',
        'López',
        'DNI',
        '87654321',
        '998877665',
        'ana.lopez@gmail.com',
        STR_TO_DATE ('22/08/1985', '%d/%m/%Y'),
        'A'
    ),
    (
        'Carlos',
        'Gómez',
        'DNI',
        '01345784',
        '997766554',
        'carlos.gomez@hotmail.com',
        STR_TO_DATE ('15/11/1992', '%d/%m/%Y'),
        'I'
    );

SELECT
    *
FROM
    persona;

SELECT
    id,
    nombres,
    apellidos,
    tipo_doc,
    dni,
    celular,
    correo,
    DATE_FORMAT (fecha_nacimiento, '%d - %b - %Y') AS fecha_nacimiento,
    estado
FROM
    persona
WHERE
    estado = 'A';
