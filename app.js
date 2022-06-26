var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routes = require('./mains/routes');
var token = require('./mains/helpers/authJwt');
var resMessage = require('./mains/helpers/resMessage');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', token.getToken);
app.use('/', routes);

app.use(function (_req, res) {
    let result = {
        data: '',
        err: '',
        code: '404'
    }
    resMessage.response(res, 'fail', result, 'url tidak ditemukan')
});

module.exports = app;
