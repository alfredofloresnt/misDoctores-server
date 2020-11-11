const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
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
  let sql = "SELECT h.idHospital, count(h.name) as total FROM hospital h WHERE h.name = " + connection.escape(hospital)
  connection.query(sql, function (err, result) {
    if (err) throw err;
    if (result[0].total > 0) {
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