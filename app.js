const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connect = require('connect')
/** start app **/
const app = express();

const routes = require('./routes/index');
const books = require('./routes/books');
app.use('/', routes)
app.use('/books', books)

/** set to directory views where pug files **/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/** body parser**/
app.use(bodyParser.json());
/** parse app text url encoded data**/
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** error status 400**/
app.use(function(request, response) {
  response.status(400);
  response.render('page-not-found');
});

/** error status 500 **/
app.use(function(error, request, response) {
  response.status(500);
  response.render('error');
});

module.exports = app;
