module.exports = function(app, dbs) {

  app.get('/crunchbase', function(req, res) {
    dbs.production.collection('companies').find({}).limit(1).toArray(function (err, docs) {
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        res.json(docs);
      }
    });
  });

  app.get('/api/marketing', function(req, res) {
    dbs.production.collection('companies').find({}).toArray(function (err, docs) {
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        res.json(docs);
      }
    });
  });

  return app;
};
