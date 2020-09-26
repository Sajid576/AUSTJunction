
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
 

## How to Install Node.js and NPM on Windows

## Step 1: Download Node.js Installer
  In a web browser, navigate to https://nodejs.org/en/download/. 
  Click the Windows Installer button to download the latest default version. 
  At the time this article was written, version 10.16.0-x64 was the latest version. 
  The Node.js installer includes the NPM package manager.

## Step 2: Installation

- Once the installer finishes downloading, launch it. Open the downloads link in your browser and click the file. Or, browse to the location where you have saved the file and double-click it to launch.

- The system will ask if you want to run the software – click Run.

- You will be welcomed to the Node.js Setup Wizard – click Next.

- On the next screen, review the license agreement. Click Next if you agree to the terms and install the software.

- The installer will prompt you for the installation location. Leave the default location, unless you have a specific need to install it somewhere else – then click Next.

- The wizard will let you select components to include or remove from the installation. Again, unless you have a specific need, accept the defaults by clicking Next.

- Finally, click the Install button to run the installer. When it finishes, click Finish.


## Step 3: Verify Installation
  
- Open a command prompt (or PowerShell), and enter the following:

>  `node –v`
  
-  The system should display the Node.js version installed on your system. You can do the same for NPM:

>  `npm –v`

- To install all necessary packages that are used in this project, run the following command:

> `  npm install  `

- To start the local server ,run the following command:

> `   npm start   `


##Doc for Web Scrapping with javascript
- https://blog.miguelgrinberg.com/post/easy-web-scraping-with-nodejs

## Documentation for sending http request to server
- https://javascript.info/xmlhttprequest


# Aust Junction Api

- SignUp:

> POST  authenticationApi/users  
  
  * Request JSON object: *

    - uid(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - phone(string): User mobile number.
  
  *Response JSON object:*

    - message(string): successful

- EditUserData:
> PUT authenticationApi/users/edit   

   *Request JSON object:*

    - uid(string): A unique user id.
    - username(string):A name choosen by the user.
    - email(string): User email.
    - subscribedBus(string): A particular user will be notified about his subscribed bus. 

   *Response JSON object:*

     - message(string): successful

- User data fetch:

> GET  authenticationApi/users/read/(string:id)

   *Response JSON object:*

      - message(string): successful
      - uid(string): A unique user id.
      - username(string):A name choosen by the user.
      - email(string): User email.
      - phone(string): User mobile number.
      - subscribedBus(string): A particular user will be notified about his subscribed bus. 


		
## Contact API: 

- Contact post by the user:

> POST  contactApi/users/post  
  
  *Request JSON object:*

	    - uid(string): A unique user id.
	    - username(string):A name choosen by the user.
	    - email(string): User email.
	    - subject(string): subject of the  email.
	    - message(string): message provided by the user.
  
  *Response JSON object:*

	    - message(string): successful






## Lecture API: 

- Query lecture according to the user:

> GET lectureApi/lectures/(string:department)/(string:semester)

	*Response JSON object:*
		
		contributors(string): Those who will provide lectures(admin/students)
		session(string):  The session of university (spring-19/fall-19) 
		driveLink(string): the google drive link of lecture the admin is about to upload.


## LocationTracking API:

-   Bus location fetching request(from browser):
	
>   GET	locationTrackingApi/fetch/(string:busName)
	
	*Response JSON object:*
	
		active(number): It will show whether bus location contribution is on/off.[0=off,1=on]
		busName(string): User want to query this bus's location information.
		coordinate(GeoData): location coordinate of the bus.
		velocity(string): velocity of the bus.
		lastUpdateTime(Timestamp/string): the last location update time of the bus.
		


-	Bus location contribution request(from client application):

>  POST	 locationTrackingApi/contribute    
	
	*Request JSON object:*
	
		active(number): It will show whether bus location contribution is on/off.[0=off,1=on]
			busName(string): User want to query this bus's location information.
			coordinate(GeoData): location coordinate of the bus.
			velocity(string): velocity of the bus.
			lastUpdateTime(Timestamp/string): the last location update time of the bus.



