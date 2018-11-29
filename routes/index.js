var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render('home', { title: 'Express' });
});

router.get("/welcome", function(req, res, next) {
  var datas = [
      {title:"测试1", info1:"2", info2: "4", info3:"6", info4:"8", info5:"10"},
      {title:"测试2", info1:"3", info2: "5", info3:"7", info4:"9", info5:"11"}
  ];

  res.render("welcome", {items:datas});
});

router.get("/lol", function(req, res, next) {
  var datas = [
      {title:"测试lol1", info1:"2", info2: "4", info3:"6", info4:"8", info5:"10"},
      {title:"测试lol2", info1:"3", info2: "5", info3:"7", info4:"9", info5:"11"}
  ];

  res.render("lol", {items:datas});
});

router.get("/wzry", function(req, res, next) {
  var datas = [
      {title:"测试wzry1", info1:"2", info2: "4", info3:"6", info4:"8", info5:"10"},
      {title:"测试wzry2", info1:"3", info2: "5", info3:"7", info4:"9", info5:"11"}
  ];

  res.render("wzry", {items:datas});
});


module.exports = router;
