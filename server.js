// Required packages
var express = require('express')
  , cors = require('cors')
  , app = express();

var bodyParser = require('body-parser');            // pull information from HTML POST (express4)
var mongoose = require('mongoose');
var restler = require('restler');
var morgan = require('morgan');
var methodOverride = require('method-override');    // simulate DELETE and PUT (express4)

// Required project files
var consts = require('./constants');
var msgs = require('./messages');

// Required model for Tasks
var Task = require('./models/task');

// Log every request to the console
app.use(morgan('dev'));

// Enable All CORS Requests for now
app.use(cors());

// Configure the app to use bodyParser
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Enable all pre-flight options
app.options('*', cors());

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

// Routes for tasks

// Get all tasks
app.get('/api/tasks', function (req, res) {
    var url = consts.ROOT + consts.TODOS;
    restler.get(url).on(consts.COMPLETE, function(result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
        }
        else {
            res.json(result);
        }
    });
});

// Get task by task_id
app.get('/api/task/:task_id', function (req, res) {
    var url = consts.ROOT + consts.TODOS + '/' + req.params.task_id;
    restler.get(url).on(consts.COMPLETE, function(result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
        }
        else {
            res.json(result);
        }
    });
});

// Get tasks by user_id
app.get('/api/tasks/user/:user_id', function (req, res) {
    var url = consts.ROOT + consts.USERS + '/' + req.params.user_id + consts.TODOS;
    restler.get(url).on(consts.COMPLETE, function(result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
        }
        else {
            res.json(result);
        }
    });
});

// Test basic GET route
app.get('/api', function (req, res) {
  res.send({ message: 'Nessen REST API GET success!' });
});

// Start the server on the assigned PORT and log message to consoles
app.listen(port);
console.log(msgs.NESSEN_SERVER_STARTED_SUCCESS + consts.PORT);
