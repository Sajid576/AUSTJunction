const express = require('express');
const router  = express.Router();
const contactController=require('../controller/contactController');

//POST: request for storing contact data
router.post('/users/post',contactController.storeContactData);

module.exports=router;