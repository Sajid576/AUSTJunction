const express = require('express');
const router  = express.Router();
const contactController=require('../controller/contactController');

//POST: request for storing contact data
router.post('/users',contactController.storeContactData);

module.exports=router;