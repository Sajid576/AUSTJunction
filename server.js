const express = require('express');
const path = require('path');
const app = express();
app.use('/static', express.static('public'))

require('./public/model/fire_model');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/signuppage', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/signuppage.html'));
});
app.get('/Profile', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/Profile.html'));
});
app.get('/mapbox', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/mapbox.html'));
});
app.get('/Lecture1', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/Lecture1.html'));
});
app.get('/Lecture2', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/Lecture2.html'));
});

var PORT= process.env.PORT || 5000;


app.listen(PORT);
