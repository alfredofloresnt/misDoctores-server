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
    res.json({ doctors: data })
  })
})

app.get("/specialty", function (req, res) {
  specialtyModel.getSpecialty(req.query.name, (data) => {
    res.json({ specialties: data })
  })
})

app.get("/hospital", function (req, res) {
  hospitalModel.getHospital(req.query.name, (data) => {
    res.json({ hospitals: data })
  })
})

app.get("/search/:type", function (req, res) {
  var type = req.params.type
  if (type == 'hospital') {
    docModel.getSearchHospital(req.query.name, (data) => {
      res.json({ result: data })
    })
  } else if (type == 'doctor') {
    docModel.getSearchDoctor(req.query.name, (data) => {
      res.json({ result: data })
    })
  } else {
    docModel.getSearchSpecialty(req.query.name, (data) => {
      res.json({ result: data })
    })
  }
})

app.post("/doctor/create", function (req, res) {
  let doctor = req.body.doctor;
  hospitalModel.checkHospital(doctor.hospital, function(idHospital) {
    specialtyModel.checkSpecialty(doctor.specialty, function(idSpecialty) {
      doctor.idHospital = idHospital;
      doctor.idSpecialty = idSpecialty;
      docModel.createDoctor(doctor, function (data) {
        res.json({ doctor: data });
      })
    });
  })
})

app.get("/doctor/info", function (req, res) {
  let idDoctor = req.query.idDoctor;
  let doctor = { info: {}, comments: [] }
  docModel.getDoctorInfo(idDoctor, function (data) {
    doctor.info = data;
    docModel.getDoctorComments(idDoctor, function (data) {
      doctor.comments = data
      res.json({ doctor: doctor });

    });

  });
})

app.post("/comment/create", function (req, res) {
  let comment = req.body.comment;
  docModel.createComment(comment, function (data) {
    res.json({ comment: data })
  })
})

module.exports = app;
