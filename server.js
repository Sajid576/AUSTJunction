
const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
app.use('/static', express.static('public'))

//this middlewar used for printing the client request for dev purpose
var morgan = require('morgan')
app.use(morgan('dev'))

//this is used for parsing the body data from request
app.use(express.json());



//routes file imported for sending the client request
const AuthenticationApi=require('./api/routes/authenticationApi');
app.use('/authenticationApi',AuthenticationApi);
const ContactApi=require('./api/routes/contactApi');
app.use('/contactApi',ContactApi);

const LectureApi=require('./api/routes/lectureApi');
app.use('/lectureApi',LectureApi);

const LocationTrackingApi=require('./api/routes/locationtrackingApi');
app.use('/locationTrackingApi',LocationTrackingApi);

//project module imported for server startup
const lectureModel=require('./api/model/LectureModel');
const AuthModel=require('./api/model/AuthenticationModel');
const busLocationModel=require('./api/model/BusLocationData');
const emailNotifier=require('./api/model/EmailNotfier');


app.get('/', function(req, res) {
  console.log("index.html page routing")
  res.status(210).sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/signuppage', function(req, res) {
  console.log("Signup.html page routing")
  res.status(210).sendFile(path.join(__dirname, '/public/signuppage.html'));
});
app.get('/Profile', function(req, res) {
  console.log("profile.html page routing")
  res.status(210).sendFile(path.join(__dirname, '/public/Profile.html'));
});
app.get('/mapbox', function(req, res) {
  console.log("mapbox.html page routing")
  res.status(210).sendFile(path.join(__dirname, '/public/mapbox.html'));
});
app.get('/Lecture1', function(req, res) {
  console.log("Lecture1.html page routing")
  res.status(210).sendFile(path.join(__dirname, '/public/Lecture1.html'));
});
app.get('/Lecture2', function(req, res) {
  console.log("Lecture2.html page routing")
  res.status(210).sendFile(path.join(__dirname, '/public/Lecture2.html'));
});

var PORT= process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT,()=>{
      console.log("Server listening on PORT: "+PORT);
      new lectureModel.LectureModel().fetchAllLecturesFromDb();
      new AuthModel.AuthenticaltionModel().readUserDataFromDb();
      busLocationModel.fetchBusLocationFromDb();
      //new emailNotifier.EmailNotifier();

});
