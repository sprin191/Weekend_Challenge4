var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekend4';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM tasks', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);

    });
  });
});

router.post('/', function (req, res) {
  var list = req.body;
  var completed = false;
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO tasks (task, completed) ' +
                  'VALUES ($1, $2)',
                   [list.task, completed],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(201);
                 });
  });
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('DELETE FROM tasks ' +
                  'WHERE id = $1',
                   [id],
                 function (err, result) {
                   done();

                   if (err) {
                     console.log(err);
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(200);
                 });
  });
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var task = req.body.value;
  console.log(req.body);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log("connect");
      res.sendStatus(500);
    }

    client.query('UPDATE tasks SET completed = $1 WHERE id = $2',[task, id],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     console.log("query");
                     return;
                   }

                   res.sendStatus(200);
                 });
  });
});

module.exports = router;
