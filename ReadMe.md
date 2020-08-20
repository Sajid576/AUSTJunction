# Aust Junction Api
			
## Authentication API :

- SignUp Request (User data store request) : 
  authenticationApi/users  POST  
  [Request body=uid, username,email,phone ]

- EditUserData request:
  authenticationApi/users/edit  PUT  
  [Request body=uid, email,username,subscribedBus ]

- Particular User data fetch request:(From Home Page)
  authenticationApi/users/read/:uid  GET
  [Request parameter=uid & response body= email,username,phone,subscribedBus ]


## Contact API: 

- Contact Request(User will contact through this request):
  contactApi/users/post  POST
  [Request body=uid, username,email,subject,message ]


## Lecture API:  
-	Lecture Fetch Request(the lectures will be fetched from server):
	lectureApi/lectures   GET
	[Request body= department,semester & Response body= contributors,session,driveLink]


## LocationTracking API:
-	Bus location fetching request:(from browser)
	locationTrackingApi/fetch/:busName  GET
	[ Response body= active,busName,coordinate,velocity,lastUpdateTime ]



-	Bus location contribution request(from client application):
	locationTrackingApi/contribute    POST
	[Request body=active,busName,coordinate,velocity,lastUpdateTime]



