const mysql = require('mysql');

// Connectar a BD
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "misdoctoresdb"
});


exports.createDoctor = (data, callback) => {
    let doctor = [connection.escape(data.firstname), connection.escape(data.lastname), data.idHospital, data.idSpecialty]
    let sql = "INSERT INTO doctor (firstName, lastname, idHospital, idSpecialty) VALUES (" + connection.escape(data.firstname) + "," + connection.escape(data.lastname) + "," + data.idHospital + "," + data.idSpecialty + ")";
    connection.query(sql, doctor, function (err, result){
        if (err) throw err;
        callback(true);
    })
}

exports.getDoctorInfo = (idDoctor, callback) => {
    let sql = "SELECT d.firstname, d.lastname, s.name, h.name, h.city, h.state FROM doctor d JOIN specialty s ON d.idSpecialty = s.idSpecialty JOIN hospital h ON d.idHospital = h.idHospital WHERE d.idDoctor = " + idDoctor;
    connection.query(sql, function (err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getDoctorComments = (idDoctor, callback) => {
    let sql = "SELECT c.name, c.comment, c.score FROM doctor d JOIN comment c ON c.idDoctor = d.idDoctor WHERE d.idDoctor = " + idDoctor;
    connection.query(sql, function (err, result){
        if (err) throw err;
        callback(result);
    })
}