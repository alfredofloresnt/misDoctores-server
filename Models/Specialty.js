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