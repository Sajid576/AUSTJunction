import * as mapbox from '../Mapbox/MapController.js'

var busName=localStorage.getItem("busName");
console.log(busName);
mapbox.MapController.getUserPosition();
//2 mapCOntroller instance are created for 2 buses
var mapController= new mapbox.MapController();
var mapController1= new mapbox.MapController();

window.worker = new Worker('static/additional_js/locationFetch/web-work.js');

/**
 * used to start a background thread that will fetch bus location from server
 * 
 */
window.initLocationFetchThread=(busName)=>{
    //post message from main thread to worker thread
    worker.postMessage(busName);

}
//receive message from worker thread to main thread
worker.onmessage = (event)=>
{
    console.log("onmessage:  "+JSON.stringify(event.data))
    
    var bus1=event.data['busData1'];
    var bus2=event.data['busData2'];

    mapController.listenForBusLocationChanges(bus1);
    mapController1.listenForBusLocationChanges(bus2);
};
initLocationFetchThread(busName);