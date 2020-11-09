var express = require('express')
var app = express();
var Doctor = require('../Models/Doctor')

app.get("/", function (req, res) {
    res.send("<h1>API para Mis Doctores</h1>")
})

app.get("/test", function (req, res) {
    res.json({test: "Hello world"})
})

app.post("/doctor/create", function (req, res) {
    let doctor = req.body.doctor;
    Doctor.createDoctor(doctor, function(data){
        res.json({doctor: data});
    });
})

app.get("/doctor/info", function (req, res) {
    let idDoctor = req.query.idDoctor;
    let doctor = {info: {}, comments: []}
    Doctor.getDoctorInfo(idDoctor, function(data){
        doctor.info = data;
        Doctor.getDoctorComments(idDoctor, function(data){
            doctor.comments = data
            res.json({doctor: doctor});

        });
        
    });
})

module.exports = app;
