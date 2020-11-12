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
    let sql = "SELECT password, idUser FROM user WHERE username = " + connection.escape(username);
    connection.query(sql, function(err, user){
        if (err) throw err
        console.log(user)
        if (user.length > 0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                if (result) {
                    callback(user)
                } else {
                    callback(false)
                }
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