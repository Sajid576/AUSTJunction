const express = require('express');
const router  = express.Router();
const locationTrackingController=require('../controller/locationTrackingController');

//POST: request for storing data from tracking app
router.post('/newLocationData',locationTrackingController.storeNewLocationData)

//GET: request for fetching bus location to web browser using a thread
router.get('/fetch/:busName',locationTrackingController.fetchBusLocationData)


module.exports=router;