const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')
const app = express();

//**********************引入配置文件开始**********************//
const config = require('./libs/config').init();
global.config = config;
//**********************引入配置文件结束**********************//

//**********************引入数据库工具开始**********************//
const dbUtil = require('./libs/db');
global.dbUtil = dbUtil;
//**********************引入数据库工具结束**********************//

//**********************引入路由文件开始**********************//
const users = require('./routes/users');
const pages = require('./routes/pages');
const auth = require('./middle/auth');
//**********************引入路由文件结束**********************//

//**********************设置模板引擎开始**********************//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//**********************设置模板引擎结束**********************//

//**********************加载中间件开始**********************//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave:false,
  saveUninitialized: true,
  secret: "test",
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
}));
app.use(passport.initialize())
app.use(passport.session())
//**********************加载中间件结束**********************//

//**********************设置路由开始**********************//
app.use('/', users);
app.use('/', pages);
//**********************设置路由结束**********************//

//**********************异常处理开始**********************//
app.use(function(req, res, next) {
	res.render('error', {
		message: "No such page!",
		error:{status:404, stack:"null"}
	});
});

app.use(function(err, req, res, next) {
	res.render('error', {
		message: "No such page!",
		error:{status:404, stack:"null"}
	});
});
//**********************异常处理开始**********************//

//**********************启动http服务**********************//
const server = require('./libs/server');
global.server = server;
//**********************启动http服务**********************//

module.exports = app;
