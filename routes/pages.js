const express = require('express');
const router = express.Router();
const fs = require('fs');
const marked = require('marked');

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get("/page/home", function(req, res, next) {
	res.render("home");
});

router.get("/page/login", function(req, res, next) {
	res.render("login");
});

router.get("/page/edit", function(req, res, next){
	if(!req.isAuthenticated()){
		return res.render('error', {
			message: "error-forbidden!",
			error:{status:404, stack:"null"}
		});	
	}
	
	res.render('edit');
});

router.get("/page/view", function(req, res, next){
	if(!req.isAuthenticated()){
		return res.render('error', {
			message: "error-forbidden!",
			error:{status:404, stack:"null"}
		});	
	}
	
	let docName = req.query.doc;
	if(docName == undefined){
		return res.render('error', {
			message: "No such doc!",
			error:{status:404, stack:"null"}
		});
	}
	
	let path  = __dirname+'/../public/doc/'+ docName +'.md';
	fs.readFile(path, function(err, data){
		if(err){
			res.render('error', {
				message: "No such doc!",
				error:{status:404, stack:"null"}
			});
		} else {
			htmlStr = marked(data.toString());
			res.render('view', {doc: htmlStr});
		}
	});
});

router.get("/page/lol", function(req, res, next) {
	let cur = req.query.page == undefined ? 0 : parseInt(req.query.page);
	let from = req.query.from == undefined ? 1 : parseInt(req.query.from);

	const COND_LOL = {
		fc: {infoType: 1, comefrom: from},
		sc: {"uploadTime": -1},
		limit: config.pageSize,
		skip: (cur * config.pageSize),	
	};
	
	var callback_con = function(error, docs, max){
		if(error != null || docs.lenght == 0){
			res.render('error');
		} else {
			res.render("lol", {datas: docs, page: cur, maxp: max, from: from});
		}
	};

	var callback_max = function(error, max) {
		if(error != null) {
			res.render('error');
		} else {
			let maxp = Math.ceil((max*1.0)/COND_LOL.limit);
			dbUtil.where("wikidb", "HupuData", COND_LOL,
				function(error, docs){ callback_con(error, docs, maxp); }
			);
		}
	};
	dbUtil.count("wikidb", "HupuData", COND_LOL, callback_max);
});

router.get("/page/wzry", function(req, res, next) {
	let cur = req.query.page == undefined ? 0 : parseInt(req.query.page);
	let from = req.query.from == undefined ? 1 : parseInt(req.query.from);
	
	const COND_WZRY = {
		fc: {infoType: 2, comefrom:from},
		sc: {"uploadTime": -1},
		limit: config.pageSize,
		skip: (cur * config.pageSize),	
	};
	
	var callback_con = function(error, docs, max){
		if(error != null || docs.lenght == 0){
			res.render('error');
		} else {
			res.render("wzry", {datas: docs, page: cur, maxp: max, from: from});
		}
	};

	var callback_max = function(error, max) {
		if(error != null) {
			res.render('error');
		} else {
			let maxp = Math.ceil((max*1.0)/COND_WZRY.limit);
			dbUtil.where("wikidb", "HupuData", COND_WZRY,
				function(error, docs){ callback_con(error, docs, maxp); }
			);
		}
	};
	dbUtil.count("wikidb", "HupuData", COND_WZRY, callback_max);
});

module.exports = router;
