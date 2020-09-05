import requestFetchLocationData from '../HttpClient/HttpClientService.js'; 

var busName;
//receive message from main thread to worker thread
self.onmessage = function(event)
{
    busName=event.data
    console.log("locationReader called  "+event.data);
    locationReader();     //event.data=busName
};

self.locationReader=()=>{
    
    requestFetchLocationData(busName,postMessage);
    
    setTimeout("locationReader()",2000);
}


