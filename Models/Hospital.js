const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root!@#$",
  database: "misdoctoresdb"
});

exports.getHospital = (hospital, callback) => {
  var sql = "SELECT h.name FROM hospital h WHERE h.name LIKE '%" + hospital + "%'"
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    callback(results)
  })
}