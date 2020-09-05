var worker = new Worker('static/additional_js/locationFetch/web-work.js');
 window.initLocationFetchThread=(busName)=>{
    
    worker.postMessage(busName);

}

worker.onmessage = (event)=>
{
    console.log("onmessage:  "+JSON.stringify(event.data))
};