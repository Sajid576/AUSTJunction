contactData=require('../model/ContactModel');

storeContactData=(req,res,next)=>{
    const uid=req.body.uid;
    const username=req.body.username;
    const email=req.body.email;
    const sub=req.body.sub;
    const message=req.body.message;

    contactObj= new contactData.ContactModel();
    contactObj.storeContactDetails(uid,username,email,sub,message);
    contactObj.storeContactDetailsToDb(uid,username,email,sub,message).then(()=>{
        res.status(200).json({
            message:"Contact message sent successfully",
            
        })

    })
    .catch((error)=>{
        console.log(error.message)
        res.status(404).json({
            message:"Contact message failed to send ",
            
        })
    });

   

}
module.exports.storeContactData=storeContactData;