const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var port = process.env.PORT || 4000;

const app = express();

// Connectar a BD
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root!@#$"
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connectado a BD!");
});


// Iniciar Servidor
app.use(bodyParser.json())
app.use('/', require('./Routes/routes'));

app.listen(port, function(){
    console.log('Servidor corriendo: ' + port);
})