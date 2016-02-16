// Required packages
var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var restler = require('restler');

// Required project files
var consts = require('./constants');
var msgs = require('./messages');
var routes = require('./routes');

// Required models
var Task = require('./models/task');

// Create the connection to Express
var app = express();

// Configure the app to use bodyParser
app.use(bodyParser.urlencoded({ extended: true} ));
app.use(bodyParser.json());

// Set our REST API port
var port = process.env.PORT || consts.PORT;

// The following lines connect to MongoDB - uncomment if MongoDB connection is required
// Start - MongoDB connections
// var options = {
//   db: { native_parser: true },
//   server: { poolSize: consts.POOL_SIZE }
// };
//
// mongoose.connect(consts.URI, options);
// var db = mongoose.connection;
// db.on(consts.ERROR, console.error.bind(console, msgs.MONGO_DB_CONN_ERROR));
// db.once(consts.OPEN, function() {
//   console.log(msgs.MONGO_DB_CONN_SUCCESS);
// });
// End - MongoDB connection

// API Routes
var router = express.Router();

// Routes for tasks

// Get all tasks
router.route(routes.ROUTE_TASKS)
    .get(function(req, res) {
        var url = consts.ROOT + consts.TODOS;
        restler.get(url).on(consts.COMPLETE, function(result) {
            if (result instanceof Error) {
                console.log('Error:', result.message);
            }
            else {
                console.log(result);
                res.json(result);
            }

        });
    });

// Get task by task_id
router.route(routes.ROUTE_TASK_BY_ID)
    .get(function(req, res) {
        var url = consts.ROOT + consts.TODOS + '/' + req.params.task_id;
        restler.get(url).on(consts.COMPLETE, function(result) {
            if (result instanceof Error) {
                console.log('Error:', result.message);
            }
            else {
                console.log(result);
                res.json(result);
            }
        });
    });

// Get tasks by user_id
router.route('/tasks/user/:user_id')
    .get(function(req, res) {
        var url = consts.ROOT + consts.USERS + '/' + req.params.user_id + consts.TODOS;
        console.log('URL = ' + url);

        restler.get(url).on(consts.COMPLETE, function(result) {
            if (result instanceof Error) {
                console.log('Error:', result.message);
            }
            else {
                console.log(result);
                res.json(result);
            }
        });
    });

// Test basic GET route
router.get('/', function(req, res) {
	res.json({ message: 'Nessen REST API GET success!' });
});

// Register our routes ... all routes will be prefixed with /api
app.use(consts.ROUTE_PREFIX, router);

// Start the server on the assigned PORT
app.listen(port);
console.log(msgs.NESSEN_SERVER_STARTED_SUCCESS + consts.PORT);
