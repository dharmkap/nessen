Nessen - NodeJS REST API server example
==============

This NodeJS server example uses Express and Restler to expose a REST-ful API to expose 'Tasks'.  The API itself gets data from http://jsonplaceholder.typicode.com by calling that REST API.

Nessen File List
--------------

- server.js: actual NodeJS server code
- constants.js: string and numerical constants used in the project
- messages.js: application message strings
- routes.js: REST-ful API routes used in the example
- package.json: package file used by NodeJS which details all of the required modules
- /models/task.js: MongooseJS model for tasks

Installation Details
--------------
From the command line, proceed to a directory area where you want the project code to reside.  Then enter the following to create the sub-directory and download the code from GitHub

	git clone https://github.com/dharmkap/nessen.git

Then change directory to 'nessen'

	cd nessen

Finally, within the 'nessen' directory enter the following command to download the required mode modules

	npm install

Running nessen
--------------
From the nessen sub-directory, enter the following from the command line to start the nessen server

	node server.js

This will start the server on localhost, port 8088.  The port number can be changed in constants.js.

Note: there is commented code in server.js which if uncommented, will attach to an instance of MongoDB running in the local server at the default MongoDB port, 27017.

API Routes
--------------
This example supports the following REST-ful end points

- http://localhost:8088/api = root level check to make sure the API is running
- http://localhost:8088/api/tasks = gets all tasks
- http://localhost:8088/api/task/:task_id = gets tasks by id
	http://localhost:8088/api/task/5
- http://localhost:8088/api/tasks/user/:user_id = gets tasks by user_id
	http://localhost:8088/api/tasks/user/1

Note: all of the API end points are prefixed with '/api'.

