//const serverUrl="https://austjunction.herokuapp.com/"
const serverUrl="http://localhost:5000/";

// ********** Authentication Api Requests ***************

//this function used to send request to store user data while signing up
requestStoreUserData=(email,name,phone,uid)=>
{
    var obj={
        'email':email,
        'name':name,
        'phone':phone,
        'uid':uid
    }

    fetch(serverUrl+'authenticationApi/users',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:obj 
    })
    .then(res=>{
        return res.json()
    })
    .then(data=> console.log(data) )
    .catch(error=>console.log('ERROR'))
        




}

// this function used to send request to edit the existing user data from Profile page
requestEditUserData=()=>
{

}
// this function used to send request to read a particular user data.
//It will be called when no user data is available in local cache of browser.
requestFetchUserData=()=>
{

}


// ** Contact Api Requests ****

//this method used to send request to store contact data to the server
requestStoreContactData=()=>
{

}

// ***** Lecture Api Requests *****

//this method used to send request to fetch all the lectures according to the selected department & semester
requestFetchLectures=()=>
{

}

// ****Location Tracking Api Requests *****

// this method used to send request to fetch real-time location of the selected university bus.
// this method will be called from a event emitter that will be triggered after entering into the 
// Mapbox interface.
requestFetchLocationData=()=>
{

}


