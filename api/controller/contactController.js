contactData=require('../model/ContactModel');

storeContactData=(req,res,next)=>{
    const uid=req.body.uid;
    const username=req.body.username;
    const email=req.body.email;
    const sub=req.body.sub;
    const message=req.body.message;
    
    contactObj= new contactData.ContactModel();
    contactObj.storeContactDetails(uid,username,email,sub,message);

    res.status(200).json({
        message:"Contact message sent successfully",
        
    })

}
module.exports.storeContactData=storeContactData