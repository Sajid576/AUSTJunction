const request = require('request');
var cheerio = require('cheerio');


/**
 *  A web scrapping bot  will be implemented in this module that will listen for new
 *  notice board update in http://aust.edu/news_events.htm page
 */

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

                console.log(list);
                
            }
             


    });

 }

 module.exports={
    listenNoticeUpdate
 }