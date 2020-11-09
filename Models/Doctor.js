const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root!@#$",
  database: "misdoctoresdb"
});

exports.getDoctors = (doctor, callback) => {
  var sql = "SELECT d.firstName, d.lastName FROM doctor d WHERE d.firstName LIKE '" + doctor + "%' OR d.lastName LIKE '" + doctor + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}

exports.getSearchHospital = (hospital, callback) => {
  var sql = "SELECT d.idDoctor, d.firstName, d.lastName, h.name AS hospital, s.name AS specialty FROM doctor d JOIN hospital h ON d.idHospital = h.idHospital JOIN specialty s ON d.idSpecialty = s.idSpecialty WHERE h.name LIKE '%" + hospital + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}

exports.getSearchDoctor = (doctor, callback) => {
  var sql = "SELECT d.idDoctor, d.firstName, d.lastName, h.name AS hospital, s.name AS specialty FROM doctor d JOIN hospital h ON d.idHospital = h.idHospital JOIN specialty s ON d.idSpecialty = s.idSpecialty WHERE d.firstName LIKE '" + doctor + "%' OR d.lastName LIKE '" + doctor + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}

exports.getSearchSpecialty = (specialty, callback) => {
  var sql = "SELECT d.idDoctor, d.firstName, d.lastName, h.name AS hospital, s.name AS specialty FROM doctor d JOIN hospital h ON d.idHospital = h.idHospital JOIN specialty s ON d.idSpecialty = s.idSpecialty WHERE s.name LIKE '%" + specialty + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}