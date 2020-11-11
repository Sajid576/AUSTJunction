var nodemailer = require('nodemailer');
var busLocationData=require('./BusLocationData');
var autModel=require('./AuthenticationModel');
var web_scrapper=require('./ScrapModel');

var EventEmitter = require('events')
var ee = new EventEmitter()


class EmailNotifier
{
    static emitted=false;
    static allUserData;
    static allBusData;
    static transporter;

     constructor()
     {
            if(EmailNotifier. transporter==null || EmailNotifier.allBusData)
            {
                  EmailNotifier.allBusData =  busLocationData.fetchAllBusLocationInfo();


                  EmailNotifier. transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    service: 'gmail',
                    auth: {
                      user: 'austjunction8286@gmail.com',
                      pass: 'wewillrock'
                    }
                });
            }  
            ee.on('message', function (text) {
  
  
                  if(EmailNotifier.allUserData==null)
                  {
                      EmailNotifier.allUserData = new autModel.AuthenticaltionModel().readAllUserData();
                      console.log("User data fetched");
                    
                  }
                  //EmailNotifier.monitorBus();
                  web_scrapper.listenNoticeUpdate();
            
            })
            if(EmailNotifier.emitted==false)
            {
                //10 sec interval
                setInterval(()=>{
                          ee.emit('message', 'hello world');
                          EmailNotifier.emitted==true;
                    },10000);
                    
            }
              

     }

     
/*
  it checks the distance between varsity and bus
  it returns false if bus is outside the circle/varsity area 
*/ 
static checkUniversityRadius=function(bus_lat,bus_lon)
{
      // 23.7638646,90.4046308
      var varsity_lat=23.7638646;
      var varsity_lon=90.4046308;
      radius=1;   //in km

      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(bus_lat - varsity_lat); // deg2rad below
      var dLon = this.deg2rad(bus_lon - varsity_lon);
      
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.deg2rad(varsity_lat)) * Math.cos(this.deg2rad(bus_lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
     
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = R * c; // Distance in km
      
        return d<radius;
}
deg2rad(deg) {
   return deg * (Math.PI / 180)
 }

 //used to send notification via email using node mailer packagestatic 
static sendEmailNotification(to,text)
{
          
       console.log("mailing to "+to)
       var mailOptions = {
         from: 'austjunction8286@gmail.com',
         to: to,
         subject: 'Aust Junction',
         text: text
       };
       
       //console.log(mailOptions)
       EmailNotifier.transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent to: ' + to);
              }
       });
 }
 
 /**
  * this function will be called in server side and will be used to continuously check 
    if bus has arrived/left the varsity and notify the students based on it.
  * 
  */
static monitorBus=()=>
{
    
    
    var Mp= new Map(Object.entries(EmailNotifier.allBusData));
   
    for (let [busName, busData] of Mp) 
    {
        //console.log(busName + ' ==== ' +JSON.stringify(busData,null,4) +"\n");
        
        //console.log(busData['coordinate'].latitude+','+busData['coordinate'].longitude);
        //if bus is in the area
        if(EmailNotifier.checkUniversityRadius(busData['coordinate'].latitude,busData['coordinate'].longitude) )
        {
            //console.log(JSON.stringify(allUserData,null,4))
            for(var user in EmailNotifier.allUserData)
            {
                //console.log(user)
              //console.log('busName: '+busName+', subscribed bus:  '+user['subscribedBus']);
                if( busName.includes(EmailNotifier.allUserData[user]['subscribedBus']))
                {
                   
                    var text= busName+' has already reached the University';
                    EmailNotifier.sendEmailNotification(user['email'],text);
                    
                }
            
            }
        }
        else
        {
            for(user in EmailNotifier.allUserData)
            {
                 
                if( busName.includes(user['subscribedBus']))
                {
                      text=busName+' is going outside the university';
                      EmailNotifier.sendEmailNotification(user['email'],text);
                   
                }
            
            }
        }
    
    
    }

}  
    
    
    
     

}
module.exports.EmailNotifier=EmailNotifier;