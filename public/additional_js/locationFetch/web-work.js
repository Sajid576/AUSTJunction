import requestFetchLocationData from '../HttpClient/HttpClientService.js'; 

var busName;
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


