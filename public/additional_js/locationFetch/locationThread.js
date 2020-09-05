var worker = new Worker('static/additional_js/locationFetch/web-work.js');
 window.initLocationFetchThread=(busName)=>{
    //post message from main thread to worker thread
    worker.postMessage(busName);

}
//receive message from worker thread to main thread
worker.onmessage = (event)=>
{
    console.log("onmessage:  "+JSON.stringify(event.data))
    new MapController().listenForBusLocationChanges(event.data);
};