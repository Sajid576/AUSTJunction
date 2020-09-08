locationData=require('../model/BusLocationData');

//this method will be called from browser request by a web worker thread to fetch 
//a bus location continuously.
fetchBusLocationData=(req,res,next)=>{
    const busName= req.params.busName;
    var busData1=locationData.fetchBusLoctionInfo(busName+'-1');
    var busData2=locationData.fetchBusLoctionInfo(busName+'-2');
    //console.log(String(busData['coordinate'])+'--'+String(busData['last_update_time'].toDate()));

    res.status(200).json({
        busData1,
        busData2
    })


}
//this method will be called from a tracking application to send bus location to the server.
storeNewLocationData =(req,res,next)=>{
    const busName=req.body.busName;
    const lat= req.body.latitude;
    const lon=req.body.longitude;
    const velocity=req.body.velocity;
    const time=req.body.time;

    tempLocationDataObj={
        latitude:lat,
        longitude:lon,
        velocity:velocity,
        time:time
    }

    locationData.storeBusLocationData(busName,tempLocationDataObj)

    res.status(200).json({
        message:'Location data stored successfully',
        
    })
}
module.exports.storeNewLocationData=storeNewLocationData;
module.exports.fetchBusLocationData=fetchBusLocationData;