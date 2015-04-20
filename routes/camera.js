var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('cameraconfig.db');



/* GET users listing. */
router.get('/show', function(req, res) {
  res.render('config',{});
});


/* GET users listing. */
router.post('/save', function(req, res) {


  db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
  });





  res.redirect('/camera/show');
});

module.exports = router;
