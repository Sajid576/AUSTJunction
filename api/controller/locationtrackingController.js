locationData=require('../model/BusLocationData');

//this method will be called from browser request by a event emitter to fetch a bus location continuously.
fetchBusLocationData=(req,res,next)=>{
    const busName= req.params.busName;
    var busData=locationData.fetchBusLoctionInfo(busName);

    //console.log(String(busData['coordinate'])+'--'+String(busData['last_update_time'].toDate()));

    res.status(200).json({
        message:'Location data fetched successfully',
        active: busData['active'],
        busName:busName,
        coordinate: busData['coordinate'],
        velocity: busData['velocity'],
        lastUpdateTime: String(busData['last_update_time'].toDate()) 
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