var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/doLogin', function(req, res) {
  res.render('config',{localCircle:"",uploadCircle:"",localResolution:"",uploadResolution:"",isRfid:"",isClosed:"",endTime:""});
});

module.exports = router;
