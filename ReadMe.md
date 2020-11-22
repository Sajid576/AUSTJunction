# Project Architecture:
Aust Junction is composed of a backend that is responsible for storing AUST bus locations,
previous year study materials , sending notification about bus and new notice on aust.edu website.
,and a frontend that allows the user to query their bus locations,query their desired study materials
et.

## Technology Stack:
	
- Client side language & framework - HTML,CSS,Bootstrap,Javascript
- Server side application language & framework - Javascript & Nodejs
- Database for the server - Firebase cloud firestore
- Hosting for the server  -  Heroku

## Core Feature:

1. User authentication through mobile number.
2. User Profile
3. Bus schedule and routes
4. Real-time locations of all of the Bus of AUST.
5. Easy query of previous semester lectures and questions of all departments of AUST.
6. Request section for location contribution or lecture contribution.                     
7. Email notification of bus locations after a particular time.
8. Email notification of  new notice on official website of AUST
 

## Future works:

1) Showing route,required distance and estimated time from user and varsity bus.
2) integration of books sharing system.Students can share/sell their books to the juniors.


## Prequisities
- Download & install NodeJS latest version and NPM in your system [From Here](https://nodejs.org/en/download/ )


## Project Installation

- To install all necessary packages that are used in this project, run the following command:

```
$ npm install  
```

- To start the local server ,run the following command:

```
$ npm start   
```
Your server should be available at  ```localhost:5000 ``` .... :)

## References

- [Web Scrapping with javascript]( https://blog.miguelgrinberg.com/post/easy-web-scraping-with-nodejs)
- [sending http request to server](https://javascript.info/xmlhttprequest)

## Aust Junction Api

1) Store user data after signup:
```
POST  authenticationApi/users  
```
```  
Request JSON object: 

    - uid(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - phone(string): User mobile number.
  
Response JSON object:

    - message(string): successful

```

2) Store edited UserData:
```
PUT authenticationApi/users/edit   
```
```
Request JSON object:

    - uid(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - subscribedBus(string): A particular user will be notified about his subscribed bus. 

Response JSON object:

     - message(string): successful
     
```

3) User data fetch:
```
GET  authenticationApi/users/read/(string:id)
```
```
Response JSON object:

      - message(string): successful
      - uid(string): A unique user id.
      - username(string):A name choosen by the user.
      - email(string): User email.
      - phone(string): User mobile number.
      - subscribedBus(string): A particular user will be notified about his subscribed bus. 

```

## Contact API: 

1) store user contact data
```
POST  contactApi/users/post  
```
```  
Request JSON object:

	    - uid(string): A unique user id.
	    - username(string):A name choosen by the user.
	    - email(string): User email.
	    - subject(string): subject of the  email.
	    - message(string): message provided by the user.
Response JSON object:
	    - message(string): successful
```
## Lecture API: 

1) Query lecture according to the user:
```
GET lectureApi/lectures/(string:department)/(string:semester)
```
```
Response JSON object:
		contributors(string): Those who will provide lectures(admin/students)
		session(string):  The session of university (spring-19/fall-19) 
		driveLink(string): the google drive link of lecture the admin is about to upload.
```
 

## LocationTracking API:

1)   Bus location fetching request(from browser):
```	
GET   locationTrackingApi/fetch/(string:busName)
```
```
Response JSON object:
		active(number): It will show whether bus location contribution is on/off.[0=off,1=on]
		busName(string): User want to query this bus's location information.
		coordinate(GeoData): location coordinate of the bus.
		velocity(string): velocity of the bus.
		lastUpdateTime(Timestamp/string): the last location update time of the bus.

```


2) Bus location contribution request(from client application):
```
POST   locationTrackingApi/contribute    
```
```
Request JSON object:
	active(number): It will show whether bus location contribution is on/off.[0=off,1=on]
	busName(string): User want to query this bus's location information.
	coordinate(GeoData): location coordinate of the bus.
	velocity(string): velocity of the bus.
	lastUpdateTime(Timestamp/string): the last location update time of the bus.
```
 


