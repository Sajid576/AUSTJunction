const firebase=require('./FirebaseConnection');

//this variable holds the information of all the university bus
var BusLocationData={};

logger = () =>
{
    var Mp= new Map(Object.entries(BusLocationData));
    //printing all user details on server
    console.log("printing all university bus data on server: ");
    for (let [key, value] of Mp) 
    {
        console.log(key + ' ==== ' +JSON.stringify(value,null,4) +"\n");
    }
}
//this function used for fetching locations of all trains from cloud firestore on server startup
async function fetchBusLocationFromDb()
{
    const snapshot = await firebase.firestore().collection('bus_location').get()
    snapshot.docs.map(doc => 
    {
        BusLocationData[doc.id]=doc.data();
    });
    logger();   
}
//this function to store the bus locations to the cloud firestore according to the daily schedule basis
//this function will be used later with event emitter so that we can store the bus location once in a day.
//It will reduce the CRUD operation on database.
function storeBusLocationToDb()
{
    const Mp = new Map(Object.entries(BusLocationData));
    const usersCollection = firebase.firestore().collection('locations');

    //printing the map for checking
    for (let [key, value] of Mp) 
    {
            console.log(key + ' = ' + value)
            usersCollection.doc(key).set({
            value, 
    }, {merge: true})
    .then(()=>{
             console.log('All of the University Bus Data has been saved successfully for today !');
            }) 
    .catch(error => {
         console.error(error)
     });
     }

}
// this function used to fetch the location,velocity and other information of a particular bus from 
// 'BusLocationData' variable in server
function fetchBusLoctionInfo(BusName)
{
    return BusLocationData[BusName];
}

//this function will be used to update the location information of all the university bus in real time 
//in server
function storeBusLocationData(BusName,BusData)
{
    BusLocationData[BusName]=BusData;
    logger();
    
}


module.exports={
  
    storeBusLocationData,
    fetchBusLoctionInfo,
    storeBusLocationToDb,
    fetchBusLocationFromDb
    
}