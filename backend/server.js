const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Configurar las variables de entorno
dotenv.config();

// Crear la conexión a MySQL
const db = mysql.createConnection({
  host: "db", // Nombre del contenedor de la base de datos en Docker
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");

    // Asegurar la existencia de la tabla "proplayers"
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS proplayers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          foto VARCHAR(255),
          earnings DECIMAL(10,2)
      );
    `;
    db.query(createTableQuery, (err) => {
      if (err) {
        console.error("Error creating table:", err);
      } else {
        console.log("Table 'proplayers' ensured.");
      }
    });
  }
});

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
// Ver todos los proplayers
app.get("/api/proplayers", (req, res) => {
  db.query("SELECT * FROM proplayers", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Insertar nuevos proplayers
app.post("/api/proplayers", (req, res) => {
  const { nombre, foto, earnings } = req.body;
  const query =
    "INSERT INTO proplayers (nombre, foto, earnings) VALUES (?, ?, ?)";
  db.query(query, [nombre, foto, earnings], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: "Proplayer creado", id: results.insertId });
  });
});

// Actualizar un proplayer
app.put("/api/proplayers/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, foto, earnings } = req.body;
  const query =
    "UPDATE proplayers SET nombre = ?, foto = ?, earnings = ? WHERE id = ?";
  db.query(query, [nombre, foto, earnings, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Proplayer actualizado exitosamente" });
  });
});

// Eliminar un proplayer
app.delete("/api/proplayers/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM proplayers WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Proplayer eliminado exitosamente" });
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
