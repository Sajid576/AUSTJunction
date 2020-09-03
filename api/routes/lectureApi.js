const express = require('express');
const router  = express.Router();
const lectureController=require('../controller/lectureController');

//GET: request for fetching lecture data from server
router.get('/lectures/:department/:semester',lectureController.fetchLectureData);

module.exports=router;