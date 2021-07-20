const path = require('path');
const express=require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session=require('express-session');
const passport = require('passport');


const app = express();

//DB
mongoose.connect('mongodb://localhost/crud-erroresWeb')
  .then(db => console.log('DB conectada'))
  .catch(err => console.log(err));

const indexR = require('./routes/index');
const indexU = require('./routes/users');
require('./config/passport');


//configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//otros
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session ({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//rutas
app.use('/', indexR);
app.use('/', indexU);
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });