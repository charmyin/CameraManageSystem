var express = require('express');
var router = express.Router();

var dblite = require('dblite');
var db = new dblite('cameraconfig.db','-header');



/* GET users listing. */
router.get('/show', function(req, res) {
   // db.run("CREATE TABLE camera_config (info TEXT,)");
    db.query("SELECT * FROM camera_config", function(err, row) {
        //如果不存在，save
        if(err || !row){
          res.json({result:"请先初始化表！"});
          return;
        }
        //update
        if(row && row[0] && row[0].id==1){
          res.render("config",row[0]);
        }
    });
 // res.json({result:"未知原因错误！"});
});


/* 保存相机配置 */
router.post('/save', function(req, res) {
  
   // db.run("CREATE TABLE camera_config (info TEXT,)");
    console.log("oooooooooooo");
    db.query("SELECT * FROM camera_config", function(err, row) {
        //如果不存在，save
        if(err || !row){
          res.json({result:"请先初始化表！"});
        }
        //update
        if(row &&row[0] && row[0].id==1){
          db.query("UPDATE camera_config SET localCircle=?, uploadCircle=?, localResolution=?, uploadResolution=?, isRfid=?, isClosed=?",[req.body.localCircle, req.body.uploadCircle, req.body.localResolution, req.body.uploadResolution, req.body.isRfid, req.body.isClosed],function(){
			res.redirect('/camera/show');
		  });
		  
        }
    });
 

  
});

/* GET users listing. */
router.get('/initdb', function(req, res) {
    db.query("DROP TABLE IF EXISTS camera_config", function(){
		db.query("CREATE TABLE camera_config (id INTEGER, localCircle INTEGER, uploadCircle INTEGER, localResolution TEXT, uploadResolution TEXT, isRfid INTEGER, isClosed INTEGER )", function(){
			db.query("INSERT INTO camera_config VALUES (1,30, 10, '1920*1080', '1024*768', 1, 1)", function(){
				res.json({ok:true});
			});
		});
	});
 
});

module.exports = router;
