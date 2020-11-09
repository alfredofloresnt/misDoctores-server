var express = require('express')
var app = express();
var docModel = require('../Models/Doctor')
var specialtyModel = require('../Models/Specialty')
var hospitalModel = require('../Models/Hospital')

app.get("/", function (req, res) {
    res.send("<h1>API para Mis Doctores</h1>")
})

app.get("/doctor", function (req, res) {

    docModel.getDoctors(req.query.name, (data) => {
        res.json({doctors: data})
    })
})

app.get("/specialty", function (req, res) {
    specialtyModel.getSpecialty(req.query.name, (data) => {
        res.json({specialties: data})
    })
})

app.get("/hospital", function (req, res) {
    hospitalModel.getHospital(req.query.name, (data) => {
        res.json({hospitals: data})
    })
})

app.get("/search/:type", function (req, res) {
    console.log("pasando por aqui")
    var type = req.params.type
    
    if (type == 'hospital') {
        console.log("pasando por hospital")
        docModel.getSearchHospital(req.query.name, (data) => {
            res.json({result: data})
        })
    } else if (type == 'doctor') {
        docModel.getSearchDoctor(req.query.name, (data) => {
            res.json({result: data})
        })
    } else {
        docModel.getSearchSpecialty(req.query.name, (data) => {
            res.json({result: data})
        })
    }

})

module.exports = app;
