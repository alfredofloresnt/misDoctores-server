var express = require('express')
var app = express();
var docModel = require('../Models/Doctor')
var specialtyModel = require('../Models/Specialty')
var hospitalModel = require('../Models/Hospital')
var adminModel = require('../Models/Admin')
var jwt = require('jsonwebtoken');

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
  console.log(doctor)
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

app.post("/login", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username, password)
  adminModel.login(username, password, function (data) {
    console.log("data login:", data)
    if (data){
      var token = jwt.sign({ idUser: data[0].idUser }, 'misDoctores');
      res.json({admin: token})
    } else {
      res.status(400)
      res.send('Bad Password');
    }  
  });
})

app.post("/password/create", function (req, res) {
  let password = req.body.password
  adminModel.generatePassword(password, function(data) {
    res.json({password: data})
  })
})


function verifyUser (req, res, next) {
  let accessToken = req.header('authorization');
  var decoded = jwt.decode(accessToken, {complete: true});
  console.log("decoded: ", decoded)
  console.log(accessToken);
  jwt.verify(accessToken, 'misDoctores', function(err, decoded) {
    if (!err){
      console.log(decoded)
      req.body.idUser = decoded.idUser
      next();
    } else {
      res.status(403)
      res.send("Invalid session")
    }

  });
  
}

app.post("/comment/create", function (req, res) {
  let comment = req.body.comment;
  docModel.createComment(comment, function (data) {
    res.json({ comment: data })
  })
})

app.post("/doctor/delete", function (req, res) {
  let doctor = req.body.idDoctor;
  docModel.deleteComment(doctor, function (data) {
      docModel.deleteDoctor(doctor, function (data) {
        res.json({ comment: data })
      })
  })
})

app.get("/overview", verifyUser, function (req, res) {
  let idAdmin = req.body.idUser
  let overview = { doctors: null, hospitals: null, comments: null, avgScore: null }
  docModel.countDoctors(idAdmin, function(data) {
    overview.doctors = data
    docModel.countComments(idAdmin, function(data) {
      overview.comments = data
      docModel.avgScoreComments(idAdmin, function (data) {
        overview.avgScore = data
        hospitalModel.countHospitals(idAdmin, function (data) {
          overview.hospitals = data
          res.json({ overview: overview })
        })
      }) 
    })
  })
})

module.exports = app;