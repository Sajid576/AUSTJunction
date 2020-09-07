//import * as myfunc from '/static/additional_js/HttpClient/HttpClientService.js'; 

var busName;
//receive message from main thread to worker thread
self.onmessage = function(event)
{
    busName=event.data
    console.log("locationReader called  "+event.data);
    locationReader();     //event.data=busName
};

self.locationReader=()=>{
    //console.log("lel:  "+postMessage())
    requestFetchLocationData(busName);
    
    setTimeout("locationReader()",2000);
}

// ****Location Tracking Api Requests *****

// this method used to send request to fetch real-time location of the selected university bus.
// this method will be called from a event emitter that will be triggered after entering into the 
// Mapbox interface.
function requestFetchLocationData(busName)
{
    const serverUrl="http://localhost:5000/";

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
          //post message from worker thread to main thread 
          //console.log(xmlhttp.response)
           postMessage(xmlhttp.response);
        } else { 
          //post message from worker thread to main thread 
            postMessage(xmlhttp.response);
          //console.log(xmlhttp.response)
        }
      };

    xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
            console.log('Network Error');
            postMessage(xmlhttp.response);
        };
    
}

