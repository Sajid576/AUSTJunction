const firebase=require('./FirebaseConnection');


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
    //this function used to store contact information to the server variables and cloud firestore both
    storeContactDetails(uid,username,email,sub,message)
    {
        storeContactDetailsToDb(uid,username,email,sub,message);

        const details={
            'username':username,
            'email':email,
            'sub':sub,
            'message':message
        };
        var data=ContactModel.AllContactData.get(uid);
        data.push(details);
        ContactModel.AllContactData.set(uid,data);
        
        this.logger();
    }

    //this function used to store contact data to firestore
    storeContactDetailsToDb(uid,username,email,sub,message)
    {
        const usersCollection = firebase.firestore().collection('ContactUs').doc(uid);
        usersCollection.set({
            username: username,
            email:email,
            sub:sub,
            message:message
        })
        .then(()=>{
            alert('Contact Data has been saved successfully !')})


            
        .catch(error => {
                alert(error)
        });
   }
  

}

module.exports={
    ContactModel
}