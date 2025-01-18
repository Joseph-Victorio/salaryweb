const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

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


app.get("/karyawan", (req, res) => {
  const query = "SELECT * FROM karyawan";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


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
      res.json({
        message: "Karyawan added successfully",
        id: results.insertId,
      });
    }
  );
});


app.delete("/karyawan/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM karyawan WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.json({ message: "Karyawan deleted successfully" });
  });
});


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

app.get("/karyawan/:username", (req, res) => {
  const username = req.params.username;

  const query = "SELECT * FROM karyawan WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Server error occurred");
    }

    if (results.length === 0) {
      return res.status(404).send("Karyawan not found");
    }

    res.json(results[0]);
  });
});




// Register admin
app.post("/register", (req, res) => {
  const { nama, nama_perusahaan, email, pass } = req.body;

  if (!nama || !nama_perusahaan || !email || !pass) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
      INSERT INTO admin (nama, nama_perusahaan, email, pass)
      VALUES (?, ?, ?, ?)
    `;
  db.query(query, [nama, nama_perusahaan, email, pass], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already exists." });
      }
      throw err;
    }
    res.status(201).json({ message: "Admin registered successfully." });
  });
});
app.post("/login", (req, res) => {
  const { email, pass } = req.body;

  const query = "SELECT * FROM admin WHERE email = ? AND pass = ?";
  db.query(query, [email, pass], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length > 0) {
      return res
        .status(200)
        .json({ message: "Login successful", user: results[0] });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

app.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post("/tasks", (req, res) => {
  const { nama_tugas, tanggal, status } = req.body;
  const query =
    "INSERT INTO tasks (nama_tugas, tanggal, status) VALUES (?, ?, ?)";
  db.query(query, [nama_tugas, tanggal, status], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Task added successfully.", taskId: results.insertId });
  });
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = "UPDATE tasks SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to update task status." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json({ message: "Task status updated successfully." });
  });
});

app.put("/absen", (req, res) => {
  const { username, waktu, type } = req.body;
  const columnToUpdate = type === "IN" ? "jam_masuk" : "jam_keluar";

  const query = `
    UPDATE karyawan
    SET ${columnToUpdate} = ?
    WHERE username = ?
  `;
  db.query(query, [waktu, username], (err, result) => {
    if (err) {
      console.error("Error updating attendance:", err);
      return res.status(500).json({ message: "Error updating attendance" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: `${columnToUpdate} updated successfully!` });
  });
});

app.put("/karyawan-gaji/:username", (req, res) => {
  const { username } = req.params;
  const { gaji } = req.body;

  console.log("Request received:", username, gaji);

  if (!gaji) {
    return res.status(400).json({ error: "Gaji is required" });
  }

  const sql = "UPDATE karyawan SET gaji = ? WHERE username = ?";
  db.query(sql, [gaji, username], (err, result) => {
    if (err) {
      console.error("Error updating salary:", err);
      res.status(500).json({ error: "Failed to update salary" });
    } else {
      console.log("Salary updated:", result);
      res.json({ message: "Salary updated successfully" });
    }
  });
});


app.get('/absen/:username', (req, res) => {
  const { username } = req.params;

  const query = "SELECT jam_masuk, jam_keluar FROM karyawan WHERE username = ?";
  
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error fetching attendance:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      res.json({
        jamMasuk: results[0].jam_masuk,  
        jamKeluar: results[0].jam_keluar, 
      });
    } else {
      res.status(404).json({ message: "Data absen tidak ditemukan" });
    }
  });
});




app.post("/login-karyawan", (req, res) => {
  const { username, pass } = req.body;

  if (!username || !pass) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required.",
    });
  }

  const query = "SELECT * FROM karyawan WHERE username = ? AND pass = ?";
  db.query(query, [username, pass], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({
        success: false,
        message: "Database query failed.",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const user = result[0];

    res.json({
      success: true,
      message: "Login successful",
      data: {
        username: user.username,
        nama_depan: user.nama_depan,
        nama_belakang: user.nama_belakang,
        posisi: user.posisi,
      },
    });
  });
});
app.put('/absen/reset', async (req, res) => {
  const { username } = req.body;
  
  try {
    await db.query('UPDATE karyawan SET jam_masuk = NULL, jam_keluar = NULL WHERE username = ?', [username]);
    res.status(200).send({ message: "Attendance data has been reset." });
  } catch (error) {
    res.status(500).send({ message: "Failed to reset attendance data." });
  }
});
app.listen(port, () => {
  console.log(`Servernya di http://localhost:${port}`);
});
