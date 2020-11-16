const mysql = require('mysql');

// Connectar a BD
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root!@#$",
  database: "misdoctoresdb"
});


exports.createDoctor = (data, callback) => {
  console.log("========", data)
  let sql = "INSERT INTO doctor (firstName, lastname, idHospital, idSpecialty) VALUES (" + connection.escape(data.firstname) + "," + connection.escape(data.lastname) + "," + data.idHospital + "," + data.idSpecialty + ")";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(true);
  })
}



exports.getDoctorInfo = (idDoctor, callback) => {
  let sql = "SELECT d.firstname, d.lastname, s.name as specialty, h.name as hospital, h.city, h.state, score.average FROM doctor d JOIN specialty s ON d.idSpecialty = s.idSpecialty JOIN hospital h ON d.idHospital = h.idHospital LEFT JOIN (SELECT c.idDoctor, AVG(c.score) AS average FROM comment c GROUP BY c.idDoctor) AS score ON d.idDoctor = score.idDoctor WHERE d.idDoctor = " + idDoctor;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(result[0]);
  })
}

exports.getDoctorComments = (idDoctor, callback) => {
  let sql = "SELECT c.name, c.comment, c.score FROM doctor d JOIN comment c ON c.idDoctor = d.idDoctor WHERE d.idDoctor = " + idDoctor;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(result);
  })
}


exports.getDoctors = (doctor, callback) => {
  var sql = "SELECT d.firstName, d.lastName FROM doctor d WHERE d.firstName LIKE '" + doctor + "%' OR d.lastName LIKE '" + doctor + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}

exports.getSearchHospital = (hospital, callback) => {
  var sql = "SELECT d.idDoctor, d.firstName, d.lastName, h.name AS hospital, s.name AS specialty, score.average FROM doctor d JOIN hospital h ON d.idHospital = h.idHospital JOIN specialty s ON d.idSpecialty = s.idSpecialty LEFT JOIN (SELECT c.idDoctor, AVG(c.score) AS average FROM comment c GROUP BY c.idDoctor) AS score ON d.idDoctor = score.idDoctor WHERE h.name LIKE '%" + hospital + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}

exports.getSearchDoctor = (doctor, callback) => {
  var sql = "SELECT d.idDoctor, d.firstName, d.lastName, h.name AS hospital, s.name AS specialty, score.average FROM doctor d JOIN hospital h ON d.idHospital = h.idHospital JOIN specialty s ON d.idSpecialty = s.idSpecialty LEFT JOIN (SELECT c.idDoctor, AVG(c.score) AS average FROM comment c GROUP BY c.idDoctor) AS score ON d.idDoctor = score.idDoctor WHERE concat(d.firstName, ' ', d.lastName) LIKE '%" + doctor + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}

exports.getSearchSpecialty = (specialty, callback) => {
  var sql = "SELECT d.idDoctor, d.firstName, d.lastName, h.name AS hospital, s.name AS specialty, score.average FROM doctor d JOIN hospital h ON d.idHospital = h.idHospital JOIN specialty s ON d.idSpecialty = s.idSpecialty LEFT JOIN (SELECT c.idDoctor, AVG(c.score) AS average FROM comment c GROUP BY c.idDoctor) AS score ON d.idDoctor = score.idDoctor WHERE s.name LIKE '%" + specialty + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}

exports.createComment = (data, callback) => {
  let sql = "INSERT INTO comment (name, comment, score, idDoctor) VALUES (" + connection.escape(data.name) + ", " + connection.escape(data.comment) + ", " + data.score + ", " + data.idDoctor + ")";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(true);
  })
}

exports.deleteComment = (doctor, callback) => {
  let sql = "DELETE FROM comment WHERE idDoctor = " + doctor;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(true);
  })
}

exports.deleteDoctor = (doctor, callback) => {
  let sql = "DELETE FROM doctor WHERE idDoctor = " + doctor;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(true);
  })
}

exports.countDoctors = (idAdmin, callback) => {
  let sql = "SELECT COUNT(d.idDoctor) AS doctores FROM doctor d, user u WHERE u.idUser = " + idAdmin;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(result[0].doctores);
  })
}

exports.countComments = (idAdmin, callback) => {
  let sql = "SELECT COUNT(c.idComment) AS comentarios FROM comment c, user u WHERE u.idUser = " + idAdmin;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(result[0].comentarios);
  })
}

exports.avgScoreComments = (idAdmin, callback) => {
  let sql = "SELECT AVG(c.score) AS 'promedio total' FROM comment c, user u WHERE u.idUser = " + idAdmin;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(result[0]["promedio total"]);
  })
}