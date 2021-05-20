const express = require('express');
const cors = require('cors');
var path = require('path');

const app = express();

// configure app
global.appRoot = path.resolve(__dirname);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configure passport for passport-bearer auth
const passport = require('./services/auth.service');
app.use(passport.initialize());

//configure router
const  router  = require('./routes/router');
app.use('/',router)

// server run
app.set('port', process.env.PORT || 8080)
app.listen(process.env.PORT || 8080, function() {
  console.log('Node API server started on port 8080!')
})