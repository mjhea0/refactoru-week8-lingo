// routes that handle the basic pages and user accounts

var User = require('../models/user');
var newWord = {};
var BeGlobal = require('node-beglobal');

//initialize the BeGlobal API
var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'sHznA1WNhbI28hl%2BbKFjpQ%3D%3D'
});

// object
module.exports = {

  // app.get('/'...)
  index: function(req, res) {
    res.render('index.jade', {
      title: app.locals.config.name,
      user: req.user
    });
  },

  // app.get('/translate'...)
  translate: function(req, res) {
    res.render('translate.jade', {
      title: 'Translate',
      user: req.user
    });
  }, 

  // app.post('/translate'...)
  postTranslate: function(req, res) {
    console.log(req.body)
    beglobal.translations.translate(req.body, function(err, results) {
      if (!err) {
        res.send(results);
        console.log(results)
      } else {
        return console.log(err); 
      }
    });
  },

  // app.get('/login'...)
  login: function(req, res) {
    res.render('login.jade', {
      title: 'Login to ' + app.locals.config.name,
      user: req.user
    });
  },

  // app.get('/about'...)
  about: function(req, res) {
    res.render('about.jade', {
      title: 'About ' + app.locals.config.name,
      user: req.user
    });
  },

  // app.get('/about/tos'...)
  tos: function(req, res) {
    res.render('tos.jade', {
      title: app.locals.config.name + ' Terms of Service',
      user: req.user
    });
  },

  // app.get('register'...)
  getRegister: function (req, res) {
    res.render('register.jade', {
      title: 'Register for '+app.locals.config.name,
      user: req.user
    });
  },

  // app.get('/checkExists')
  checkExists: function(req, res, next) {
    var data = req.query;
    var query = {};
    if (data.username) {
      query['username'] = data.username;
    } else if (data.email) {
      query['email'] = data.email;
    } else {
      res.send(400, {'message':'Invalid Request'});
    }
    User.findOne(query, function(err, user) {
      if (err) {
        res.send(500, err);
      } else if (user) {
        res.send(409, {'message':'User Exists'});
      } else {
        res.send(200, {'message':'All Clear'});
      }
    });
  },

  // app.post('/register'...)
  postRegister: function (req, res, next) {
    var user = new User(req.body);
    user.save( function (err) {
      if (err) { next(err); }
      res.redirect('/profile');
    });
  },

  // app.get('/profile')
  profile: function (req, res, next) {
    User.findOne({'_id':req.user._id}, function (err, user) {
      if (err) { next(err); }
      res.render('profile.jade', {
          title: user.name.first + '\'s Profile',
          user: user
      });
    });
  },

  // app.get('/logout'...)
  logout: function (req, res){
      req.logout();
      res.redirect('/');
  }
  
};