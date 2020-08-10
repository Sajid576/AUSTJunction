locationData=require('../model/BusLocationData');


fetchBusLocationData=(req,res,next)=>{
    const busName= req.params.busName;
    var busData=locationData.fetchBusLocation()

    res.status(200).json({
        message:'Location data fetched successfully',
        active: busData['active'],
        busName:busName,
        coordinate: busData['geo'],
        velocity: busData['velocity'],
        lastUpdateTime: busData['lastUpdateTime'] 
    })

}

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

    locationData.storeBusLocation(busName,tempLocationDataObj)

    res.status(200).json({
        message:'Location data stored successfully',
        
    })
}
module.exports.storeNewLocationData=storeNewLocationData;
module.exports.fetchBusLocationData=fetchBusLocationData;