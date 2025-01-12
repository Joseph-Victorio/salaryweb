const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "salary",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Nyambung nih.");
});

// Fetch all karyawan
app.get("/karyawan", (req, res) => {
  const query = "SELECT * FROM karyawan";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new karyawan
app.post("/karyawan", (req, res) => {
  const {
    username,
    email,
    pass,
    nama_depan,
    nama_belakang,
    nomor_telp,
    jenis_kelamin,
    alamat,
    posisi,
    pangkat,
    gaji,
  } = req.body;
  const query = `
    INSERT INTO karyawan 
    (username, email, pass, nama_depan, nama_belakang, nomor_telp, jenis_kelamin, alamat, posisi, pangkat, gaji, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
  `;
  db.query(
    query,
    [
      username,
      email,
      pass,
      nama_depan,
      nama_belakang,
      nomor_telp,
      jenis_kelamin,
      alamat,
      posisi,
      pangkat,
      gaji,
    ],
    (err, results) => {
      if (err) throw err;
      res.json({ message: "Karyawan added successfully", id: results.insertId });
    }
  );
});

// Delete a karyawan
app.delete("/karyawan/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM karyawan WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.json({ message: "Karyawan deleted successfully" });
  });
});

// Update karyawan status
app.put("/karyawan/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  const query = "UPDATE karyawan SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err, results) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({ message: "Status updated successfully" });
  });
});


app.listen(port, () => {
  console.log(`Servernya di http://localhost:${port}`);
});
