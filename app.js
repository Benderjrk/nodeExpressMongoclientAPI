const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
var async = require('async');


// Connect to Database
var initializeDatabases = require('./dbs');
var routes = require('./routes');

initializeDatabases(function(err, dbs) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Database connected`)

  // Init Express App
  const app = express();

  // Port Number
  const port = process.env.PORT || 8080;

  // Cors Middleware
  app.use(cors());

  // Set Static Folder
  app.use(express.static(path.join(__dirname, 'public')));

  // BodyParser Middleware
  app.use(bodyParser.json());

routes(app, dbs);

  // Index Route
  app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));

  });
  // Start Server
  app.listen(port, () => {
    console.log("Server has started on " + port);
  });
});
