var async = require('async');
var MongoClient = require('mongodb').MongoClient;

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
var PROD_URI = "mongodb://localhost:27017/crunchbase";

var databases = {
  production: async.apply(MongoClient.connect, PROD_URI)
};

module.exports = function (cb) {
  async.parallel(databases, cb);
};
