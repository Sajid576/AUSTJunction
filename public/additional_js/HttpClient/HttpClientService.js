//const serverUrl="https://austjunction.herokuapp.com/"
const serverUrl="http://localhost:5000/";

// ********** Authentication Api Requests ***************



//this function used to send request to store user data while signing up
window.requestStoreUserData=(email,name,phone,uid)=>
{
    var obj={
        'email':email,
        'username':name,
        'phone':phone,
        'uid':uid
    }
    obj=JSON.stringify(obj);

    const url=serverUrl+'authenticationApi/users';

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(obj);
    xmlhttp.responseType='json';
    //after receiving the response from server
    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 || xmlhttp.status<=210) { 
           
           window.location.replace("./"),alert("You are logged in");
        } else { 
          alert(xmlhttp.response)
        }
      };

      xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
            alert(`Network Error`);
        };

        xmlhttp.onprogress = function(event) { // triggers periodically
            
            alert("data is being sent to server");
          };




}

// this function used to send request to edit the existing user data from Profile page
window.requestEditUserData=(email,name,uid,subscribedBus)=>
{
    var obj={
        'email':email,
        'username':name,
        'uid':uid,
        'subscribedBus':subscribedBus
    };

        obj=JSON.stringify(obj);

        const url=serverUrl+'authenticationApi/users/edit';
    
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        
        xmlhttp.open("PUT", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(obj);
        xmlhttp.responseType='json';
        //after receiving the response from server
        xmlhttp.onload = function() {
            if (xmlhttp.status >= 200 || xmlhttp.status<=210) { 
              alert(xmlhttp.response['message'])
            } else { 
              alert(xmlhttp.response)
            }
          };
    
          xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
                alert(`Network Error`);
            };
    
            xmlhttp.onprogress = function(event) { // triggers periodically
                
                alert("data is being sent to server");
              };
    
}
// this function used to send request to read a particular user data.
//It will be called when no user data is available in local cache of browser.
window.requestFetchUserData=(uid)=>
{   
        const url=serverUrl+'authenticationApi/users/read/'+uid;
    
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        
        xmlhttp.open("GET", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send();
        xmlhttp.responseType='json';
        //after receiving the response from server
        xmlhttp.onload = function() {
            if (xmlhttp.status >= 200 || xmlhttp.status<=210) { 
              console.log(xmlhttp.response['message'])
            } else { 
              console.log(xmlhttp.response)
            }
          };
    
        xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
                console.log('Network Error');
            };
    
       
}


// ** Contact Api Requests ****

//this method used to send request to store contact data to the server
window.requestStoreContactData=(uid,username,email,subject,message)=>
{
        var obj={
            'email':email,
            'username':username,
            'uid':uid,
            'sub':subject,
            'message':message
        }
        
        obj=JSON.stringify(obj);

        const url=serverUrl+'contactApi/users/post';
    
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(obj);
        xmlhttp.responseType='json';
        //after receiving the response from server
        xmlhttp.onload = function() {
            if (xmlhttp.status >= 200 || xmlhttp.status<=210) { 
              alert(xmlhttp.response['message'])
            } else { 
              alert(xmlhttp.response)
            }
          };
    
          xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
                alert('Network Error');
            };
    
        xmlhttp.onprogress = function(event) { // triggers periodically
                
                alert("data is being sent to server");
              };
}

// ***** Lecture Api Requests *****

//this method used to send request to fetch all the lectures according to the selected department & semester
window.requestFetchLectures=(department,semester)=>
{
       
       
        const url=serverUrl+'lectureApi/lectures/'+department+"/"+semester;
    
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        
        xmlhttp.open("GET", url,true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send();
        
        xmlhttp.responseType='json';
        //after receiving the response from server
        xmlhttp.onload = function() 
        {
            if (xmlhttp.status >= 200 || xmlhttp.status<=210) { 
              console.log(xmlhttp.response)
            } else { 
              console.log(xmlhttp.response)
            }
          };
    
        xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
                console.log('Network Error');
            };


}

// ****Location Tracking Api Requests *****

// this method used to send request to fetch real-time location of the selected university bus.
// this method will be called from a event emitter that will be triggered after entering into the 
// Mapbox interface.
export default function requestFetchLocationData(busName,postMessage)
{
    
    const url=serverUrl+'locationTrackingApi/fetch/'+busName;
    
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    
    xmlhttp.open("GET", url,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();
    
    xmlhttp.responseType='json';
    //after receiving the response from server
    xmlhttp.onload = function() 
    {
        if (xmlhttp.status >= 200 || xmlhttp.status<=210) { 
          //console.log(xmlhttp.response)
          postMessage(xmlhttp.response);
        } else { 
            postMessage(xmlhttp.response);
          //console.log(xmlhttp.response)
        }
      };

    xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
            console.log('Network Error');
            postMessage(xmlhttp.response);
        };
    
}


