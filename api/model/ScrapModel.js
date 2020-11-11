/**
 *  A web scrapping bot  will be implemented in this module that will listen for new
 *  notice board update in http://aust.edu/news_events.htm page
 */

const request = require('request');
var cheerio = require('cheerio');
var emailNotifier=require('./EmailNotfier');
var autModel=require('./AuthenticationModel');
var date;
var numberOfNewNotification;



listenNoticeUpdate=()=>
{
    
    
    request('http://aust.edu/news_events.htm', function (error, response, body) {
            if(error){
                console.error('error:', error); // Print the error if one occurred
            }
             //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            else{
                 
                var $ = cheerio.load(body);
                var list=[];
                $('#AutoNumber6 td font').each(function() {
                    var post=$(this).text().trim().replace(/\s\s+/g, '');
                   
                    //console.log(post);
                    if(list.length<50 && post!='' && post!='NewsTitle' && post!='PostingDate'){
                        list.push(post);
                    }
                });

                //it contains total 25 top notice [1st index=notice post,2nd index=date of the notice post]
                console.log(list);
                //date is initialized with latest notice date
                if(date==null)
                {
                    date=list[1];
                    console.log(date);
                }
                //if new notice has arrived
                if(date!=list[1])
                {
                    console.log('New Notice!!!')
                    numberOfNewNotification=0;
                    newNoticeList=[];
                    for(var i=1;;i+=2)
                    {
                        if(list[i]==date)
                        {
                            break;
                        }
                        else{
                            numberOfNewNotification+=1;
                            newNoticeList.push([  list[i-1],list[i] ]);
                        }
                    }
                    console.log(numberOfNewNotification+" notice has arrived");
                    console.log(newNoticeList);
                    
                    var text=numberOfNewNotification+" notice has arrived";
                    //var Mp= new Map(Object.entries());
                    for(user in emailNotifier.EmailNotifier.allUserData)
                    {
                        emailNotifier.EmailNotifier.sendEmailNotification(user['email'],text);
                    }

                }
                
                //console.log("LELLE: "+JSON.stringify(userData,null,4))
                var Mp= new Map(Object.entries(emailNotifier.EmailNotifier.allUserData));
                for(let [uid,userdata] of Mp)
                {
                    var text='testing mail ';
                    
                    emailNotifier.EmailNotifier.sendEmailNotification(userdata['email'],text);
                }
            }
             


    });

 }

 module.exports={
    listenNoticeUpdate
 }