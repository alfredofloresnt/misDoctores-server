const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "misdoctoresdb"
});

exports.getHospital = (hospital, callback) => {
  var sql = "SELECT h.name FROM hospital h WHERE h.name LIKE '%" + hospital + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}

exports.checkHospital = (hospital, callback) => {
  let sql = "SELECT h.idHospital, count(h.name) as total FROM hospital h WHERE h.name = " + connection.escape(hospital) + " GROUP BY h.idHospital"
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result[0]);
    if (result[0] != undefined) {
      callback(result[0].idHospital);
    } else {
      sql = "INSERT INTO hospital (name) VALUES (" + connection.escape(hospital) + ")";
      connection.query(sql, function (err, result) {
        if (err) throw err;
        callback(result.insertId)
      })
    }
  })
}

exports.countHospitals = (idAdmin, callback) => {
  let sql = "SELECT COUNT(h.idHospital) AS hospitales FROM hospital h, user u WHERE u.idUser = " + idAdmin;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(result[0].hospitales);
  })
}