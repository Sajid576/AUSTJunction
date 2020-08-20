const firebase=require('./FirebaseConnection');

//this class used to handle the data that are coming from Contact section 
class ContactModel{
    static AllContactData= new Map();

    constructor()
    {

    }

    logger()
    {
        console.log("After inserting the data of All Contact details: ");
        console.log(ContactModel.AllContactData)
    }
    /*
    {
        'uid':[ 
            {
            'username':username,
            'email':email,
            'sub':sub,
            'message':message
            },
            {
            'username':username,
            'email':email,
            'sub':sub,
            'message':message
            }
        
        ],
        'uid2':[ 
            {
            'username':username,
            'email':email,
            'sub':sub,
            'message':message
            },
            {
            'username':username,
            'email':email,
            'sub':sub,
            'message':message
            }
        
        ],


    }
    */
    //this function used to store contact information to the server variables 
    storeContactDetails(uid,username,email,sub,message)
    {
        const details={
            'username':username,
            'email':email,
            'sub':sub,
            'message':message
        };
        var data=ContactModel.AllContactData.get(uid);
        if(data==null)
        {
            data=[];
        }
    
        data.push(details);
        ContactModel.AllContactData.set(uid,data);
        this.logger();
    }

    //this function used to store contact data to firestore
    async storeContactDetailsToDb(uid,username,email,sub,message)
    {
        var contactDataMap={
            username:username,
            email:email,
            sub:sub,
            message:message
        }
        
        const contactData = firebase.firestore().collection('ContactUs').doc(uid);
        contactData.set({
            UserContactData:firebase.firestore.FieldValue.arrayUnion(contactDataMap)
        },{merge:true})
        
   }
  

}

module.exports={
    ContactModel
}