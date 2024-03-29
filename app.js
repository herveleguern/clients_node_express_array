var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride=require('method-override');//a installer avec npm

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//clients
var clients=require("./routes/clients.js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride(function(req,res){
  if(req.body && typeof req.body ==='object' && '_method'in req.body){
    var method=req.body._method;
    return method;
  }
}));

//default
app.use('/', indexRouter);
app.use('/users', usersRouter);

//lister les clients
app.get("/clients",clients.index);

//ajouter un client
app.get("/clients/new",clients.new);
app.post("/clients",clients.create);

//voir un client
app.get("/clients/:client",clients.show);

//modifier un client
app.get("/clients/:client/edit",clients.edit);
app.put("/clients/:client",clients.update);

//supprimer un client
app.delete("/clients/:client",clients.destroy);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
