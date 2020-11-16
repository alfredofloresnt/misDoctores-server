const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root!@#$",
  database: "misdoctoresdb"
});

exports.getSpecialty = (specialty, callback) => {
  var sql = "SELECT s.name FROM specialty s WHERE s.name LIKE '%" + specialty + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}

exports.checkSpecialty = (specialty, callback) => {
  let sql = "SELECT s.idSpecialty, count(s.name) as total FROM specialty s WHERE s.name = " + connection.escape(specialty)
  connection.query(sql, function (err, result) {
    if (err) throw err;
    if (result[0].total > 0) {
      callback(result[0].idSpecialty);
    } else {
      sql = "INSERT INTO specialty (name) VALUES (" + connection.escape(specialty) + ")";
      connection.query(sql, function (err, result) {
        if (err) throw err;
        callback(result.insertId)
      })
    }
  })
}