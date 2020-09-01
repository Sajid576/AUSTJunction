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
requestEditUserData=(email,name,uid)=>
{
    var obj={
        'email':email,
        'name':name,
        'uid':uid
    }

    fetch(serverUrl+'authenticationApi/users/edit',{
        method:'PUT',
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
// this function used to send request to read a particular user data.
//It will be called when no user data is available in local cache of browser.
requestFetchUserData=(uid)=>
{   
    

    fetch(serverUrl+'authenticationApi/users/read/'+uid,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }, 
    })
    .then(res=>{
        return res.json()
    })
    .then(data=> console.log(data) )
    .catch(error=>console.log('ERROR'))
}


// ** Contact Api Requests ****

//this method used to send request to store contact data to the server
requestStoreContactData=(uid,username,email,subject,message)=>
{
    var obj={
        'email':email,
        'username':username,
        'uid':uid,
        'sub':subject,
        'message':message
    }

    fetch(serverUrl+'contactApi/users/post',{
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

// ***** Lecture Api Requests *****

//this method used to send request to fetch all the lectures according to the selected department & semester
requestFetchLectures=(department,semester)=>
{
    var obj={
        'department':department,
        'semester':semester
    }

    fetch(serverUrl+'lectureApi/lectures',{
        method:'GET',
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

// ****Location Tracking Api Requests *****

// this method used to send request to fetch real-time location of the selected university bus.
// this method will be called from a event emitter that will be triggered after entering into the 
// Mapbox interface.
requestFetchLocationData=(busName)=>
{
    fetch(serverUrl+'locationTrackingApi/fetch/'+busName,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }, 
    })
    .then(res=>{
        return res.json()
    })
    .then(data=> console.log(data) )
    .catch(error=>console.log('ERROR'))
}


