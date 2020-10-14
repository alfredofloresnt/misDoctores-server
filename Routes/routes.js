var express = require('express')
var app = express();

app.get("/", function (req, res) {
    res.send("<h1>API para Mis Doctores</h1>")
})

app.get("/test", function (req, res) {
    res.json({test: "Hello world"})
})

module.exports = app;
