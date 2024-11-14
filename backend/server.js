const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "db", // Este nombre se usará en Docker
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Ver todos los players
app.get("/api/proplayers", (req, res) => {
  db.query("SELECT * FROM proplayers", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Insertar nuevos players
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
  db.query(
    "UPDATE proplayers SET nombre = ?, foto = ?, earnings = ? WHERE id = ?",
    [nombre, foto, earnings, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Proplayer actualizado exitosamente" });
    }
  );
});

// Eliminar un proplayer
app.delete("/api/proplayers/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM proplayers WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Proplayer eliminado exitosamente" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
