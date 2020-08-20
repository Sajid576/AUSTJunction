const AuthModel = require('../model/AuthenticationModel');



//POST: store user data
storeUserDataController =(req,res,next)=>{
    const uid=req.body.uid
    const username=req.body.username
    const email=req.body.email
    const phone=req.body.phone

    new AuthModel.AuthenticaltionModel().storeUserData(uid,username,email,phone).then(()=>{
        res.status(200).json({
            message:'User data successfully saved',
            username:username,
            email:email,
            phone:phone,
        })
    }).catch(error => {
        console.error(error)
        res.status(404).json({
            message:'Data could not be stored due to  '+error.message,
           
        })
    });

    
}

//PUT: edit user data
editUserDataController =(req,res,next)=>{
    const uid=req.body.uid
    const username=req.body.username
    const email=req.body.email
    const subscribedBus=req.body.subscribedBus
   
    new AuthModel.AuthenticaltionModel().editUserData(uid,username,email,subscribedBus).then(()=>{
        res.status(200).json({
            message:'User data successfully edited',
            email:email,
            username:username,
            subscribedBus:subscribedBus
        })
    }).catch(error => {
        console.error(error)
        res.status(404).json({
            message:'Data could not be saved due to  '+error.message,
           
        })
    });
}

//GET: read a particular user data
readUserDataController =(req,res,next)=>{
    const uid=req.params.id;
    
    
    var user=new AuthModel.AuthenticaltionModel().readUserData(uid);
    //console.log("lel:: "+JSON.stringify(user));
    res.status(202).json({
            message:'User data read successfully',
            uid:user['uid'],
            username:user['username'],
            email:user['email'],
            phone:user['phone'],
            coins:user['coins']
        })
    
    
   
}


module.exports.storeUserDataController=storeUserDataController;
module.exports.editUserDataController=editUserDataController;
module.exports.readUserDataController=readUserDataController;
