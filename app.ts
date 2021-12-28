var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import cors from 'cors'

const PORT = 5500

var employeesRouter = require('./controllers/employees.controller');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors( { credentials: true, origin: true } ))

app.use('/employees', employeesRouter);

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})