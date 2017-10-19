var express = require('express');
var pg = require('pg');

var router = express.Router();
var config = {
  database: 'deneb',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/',function(req,res){
  pool.connect(function(errorConnectingToDB, db, done) {
    if(errorConnectingToDB){
        console.log('Only a flesh wound - error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "koala";';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('I want to suck your blood - error making query', errorMakingQuery, result)
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/',function(req,res){
  var koala = req.body;
  console.log(koala);

  pool.connect(function(errorConnectingToDB, db, done) {
    if(errorConnectingToDB){
        console.log('Only a flesh wound - error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "koala" ("name", "gender", "age", "readyfortransfer", "notes") VALUES ($1 , $2, $3, $4, $5);';
      db.query(queryText,[koala.name, koala.gender, koala.age, koala.readyForTransfer, koala.notes], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('I want to suck your blood - error making query', errorMakingQuery, result);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});




module.exports = router;