var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('cameraconfig.db');



/* GET users listing. */
router.get('/show', function(req, res) {

  db.serialize(function() {
   // db.run("CREATE TABLE camera_config (info TEXT,)");
    db.get("SELECT * FROM camera_config", function(err, row) {
        //如果不存在，save
        if(err || !row){
          res.json({result:"请先初始化表！"});
          return;
        }
        //update
        if(row && row.id==1){
          res.render("config",row);
        }
    });
  });


 // res.json({result:"未知原因错误！"});
});


/* 保存相机配置 */
router.post('/save', function(req, res) {
  db.serialize(function() {
   // db.run("CREATE TABLE camera_config (info TEXT,)");
    db.get("SELECT * FROM camera_config", function(err, row) {
        //如果不存在，save
        if(err || !row){
          res.json({result:"请先初始化表！"});
        }
        //update
        if(row && row.id==1){
          var stmt = db.prepare("UPDATE camera_config SET localCircle=(?), uploadCircle=(?), localResolution=(?), uploadResolution=(?), isRfid=(?), isClosed=(?)");
          stmt.run(req.body.localCircle, req.body.uploadCircle, req.body.localResolution, req.body.uploadResolution, req.body.isRfid, req.body.isClosed);
          console.log(req.body);
        }
    });
  });

  res.redirect('/camera/show');
});

/* GET users listing. */
router.get('/initdb', function(req, res) {
  db.serialize(function() {
    db.run("DROP TABLE IF EXISTS camera_config");
    db.run("CREATE TABLE camera_config (id INTEGER, localCircle INTEGER, uploadCircle INTEGER, localResolution TEXT, uploadResolution TEXT, isRfid INTEGER, isClosed INTEGER )");
    db.run("INSERT INTO camera_config VALUES (1,30, 10, 1920*1080, 1024*768, 1, 1)");
  });

  res.json({ok:true});
});

module.exports = router;
