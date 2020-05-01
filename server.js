const express = require('express');
const path = require('path');

const app = express();

app.use('/static', express.static('public'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/signuppage', function(req, res) {
  res.sendFile(path.join(__dirname, '/signuppage.html'));
});
app.get('/Profile', function(req, res) {
  res.sendFile(path.join(__dirname, '/Profile.html'));
});
app.get('/mapbox', function(req, res) {
  res.sendFile(path.join(__dirname, '/mapbox.html'));
});



app.listen(3000);
