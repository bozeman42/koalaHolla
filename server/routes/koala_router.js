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
      var queryText = 'SELECT * FROM "koala" ORDER BY "name" ASC;';
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

router.put('/:id',function(req,res){ //update koala info PUT
  var koalaId = req.params.id;
  var koala = req.body;
  console.log(koala);
  console.log('koala edit test', koalaId,koala);
  pool.connect(function(errorConnectingToDB, db, done) {
    if(errorConnectingToDB){
        console.log('Only a flesh wound - error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
    } else {
      var queryText = 'UPDATE "koala" SET "name" = $1, "gender" = $2, "age" = $3, "readyfortransfer" = $4, "notes" = $5 WHERE "id" = $6;';
      db.query(queryText,[koala.name, koala.gender, koala.age, koala.readyForTransfer, koala.notes, koalaId], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('I want to suck your blood - error making query', errorMakingQuery, result);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});


router.put('/ready/:id',function(req,res){   //mark ready for transfer PUT
  var koalaId = req.params.id;
  var koala = req.body;
  console.log(koala);

  pool.connect(function(errorConnectingToDB, db, done) {
    if(errorConnectingToDB){
        console.log('Only a flesh wound - error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
    } else {
      var queryText = 'UPDATE "koala" SET "readyfortransfer" = TRUE WHERE "id" = $1;';
      db.query(queryText,[koalaId], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('I want to suck your blood - error making query', errorMakingQuery, result);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

router.get('/:id',function(req,res){
  var koalaId = req.params.id;
  console.log('GETting koala #'+koalaId);
  pool.connect(function(errorConnectingToDB, db, done) {
    if(errorConnectingToDB){
        console.log('Only a flesh wound - error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "koala" WHERE "id" = $1';
      db.query(queryText, [koalaId], function(errorMakingQuery, result){
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

router.delete('/:id',function(req,res){
  var koalaId = req.params.id;
  pool.connect(function(errorConnectingToDB, db, done) {
    if(errorConnectingToDB){
        console.log('Only a flesh wound - error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
    } else {
      var queryText = 'DELETE FROM "koala" WHERE "id" = $1';
      db.query(queryText, [koalaId], function(errorMakingQuery, result){
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


module.exports = router;