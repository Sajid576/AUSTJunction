

function checkInternet()
{
    require('dns').resolve('www.google.com', function(err) {
        if (err) {
           console.log("No connection");
           return false;
        } else {
           console.log("Connected");
           return true;
        }
      });
}
//var ck=checkInternet();


/*this function will be called in server side and will be used to continuously check 
if bus has arrived the varsity */
//returns false if bus is outside the circle/varsity area 
function checkUniversityRadius(bus_lat,bus_lon)
{
      var varsity_lat=23.7638646;
      var varsity_lon=90.4046308;
      radius=1;   //in km

      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(bus_lat - varsity_lat); // deg2rad below
      var dLon = deg2rad(bus_lon - varsity_lon);
      
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(varsity_lat)) * Math.cos(deg2rad(bus_lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
     
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = R * c; // Distance in km
      return d<radius;
      

}
function deg2rad(deg) {
   return deg * (Math.PI / 180)
 }
 console.log(checkUniversityRadius(23.777715, 90.398122));