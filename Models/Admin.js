const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Connectar a BD
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "misdoctoresdb"
});



exports.decryptPassword = (username, password, callback) => {
    let sql = "SELECT * FROM "

}

exports.login = (username, password, callback) => {
    let sql = "SELECT password FROM user WHERE username = " + connection.escape(username);
    connection.query(sql, function(err, result){
        if (err) throw err
        console.log(result)
        if (result.length > 0){
            bcrypt.compare(password, result[0].password, function(err, result) {

                callback(result)
            });
        } else {
            callback(false)
        }
    })
}

exports.generatePassword = (password, callback) => {
    bcrypt.hash(password, 10, function(err, hash) {
        callback(hash);
    });
}