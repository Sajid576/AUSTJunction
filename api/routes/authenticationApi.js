const express = require('express');
const router  = express.Router();

const userDataController=require('../controller/userDataController');


//store user data
router.post('/users',userDataController.storeUserDataController)

//edit user data
router.put('/users/edit',userDataController.editUserDataController)

//read user data
router.get('/users/read/:id',userDataController.readUserDataController)

module.exports=router;