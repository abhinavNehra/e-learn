// Created By Nitesh Jatav on 14/02/2016 
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var config = require('./config');
var User = require('../models/users');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        
        process.nextTick(function() {

        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', {message:'That email is already Registered',email:false}));
            } else {

                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
				newUser.local.name = req.body.name;
				newUser.local.dob = req.body.dob;

                newUser.save(function(err) {
                    if (err)
                        return done(err);
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

    passport.use('admin-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        
        process.nextTick(function() {

        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', {message:'That email is already Registered',email:false}));
            } else {

                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.name = req.body.name;
                newUser.local.dob = req.body.dob;
                newUser.local.ambassdor = true;

                newUser.save(function(err) {
                    if (err)
                        return done(err);
                    return done(null, newUser);
                });
            }
        });    

        });

    }));
	passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        User.findOne({ 'local.email' :  email,'local.ambassdor':false, 'local.password':{$ne: null}}, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', { message:'No user found',email:false,password:false}));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', { message:'Oops! Wrong password',email:true,password:false}));

            return done(null, user);
        });

    }));

    passport.use('admin-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        User.findOne({ 'local.email' :  email,'local.ambassdor':true,'local.password':{$ne: null} }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', { message:'No user found',email:false,password:false}));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', { message:'Oops! Wrong password',email:true,password:false}));

            return done(null, user);
        });

    }));

    passport.use(new FacebookStrategy({
        clientID        : config.facebook.clientID,
        clientSecret    : config.facebook.clientSecret,
        callbackURL     : config.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },

    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {

            User.findOne({ 'local.id' : profile.id }, function(err, user) {

                if (err)
                    return done(err);

                if (user) {
                    return done(null, user);
                } else {
                    var newUser            = new User();
                    newUser.local.id    = profile.id;                   
                    newUser.local.token = token;                     
                    newUser.local.name  = profile.displayName ? profile.displayName : null;
                    newUser.local.email = (profile.emails ? profile.emails.length : false) ? profile.emails[0].value : null;
                    newUser.local.avatar_url = (profile.photos ?  profile.photos.length : false) ? profile.photos[0].value : null;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    passport.use(new TwitterStrategy({

        consumerKey     : config.twitter.consumerKey,
        consumerSecret  : config.twitter.consumerSecret,
        callbackURL     : config.twitter.callbackURL

    },
    function(token, tokenSecret, profile, done) {

        process.nextTick(function() {

            User.findOne({ 'local.id' : profile.id }, function(err, user) {

                if (err)
                    return done(err);

                if (user) {
                    return done(null, user);
                } else {

                    var newUser                 = new User();
                    newUser.local.id          = profile.id;
                    newUser.local.token       = token;
                    newUser.local.email    = profile.username ? profile.username : null;
                    newUser.local.name = profile.displayName ? profile.displayName : null;
                    newUser.local.avatar_url = (profile.photos ?  profile.photos.length : false) ? profile.photos[0].value : null;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    
    passport.use(new GoogleStrategy({
        clientID:     config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback   : true
      },
      function(request, accessToken, refreshToken, profile, done) {
        
        process.nextTick(function() {

            User.findOne({ 'local.id' : profile.id }, function(err, user) {

                if (err)
                    return done(err);

                if (user) {
                    return done(null, user);
                } else {

                    var newUser                 = new User();
                    newUser.local.id          = profile.id;
                    newUser.local.token       = accessToken;
                    newUser.local.email    = (profile.emails ? profile.emails.length : false) ? profile.emails[0].value : null;
                    newUser.local.name = profile.displayName ? profile.displayName : null;
                    newUser.local.avatar_url = (profile.photos ?  profile.photos.length : false) ? profile.photos[0].value : null;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
      }
    ));
    
    passport.use(new LinkedInStrategy({
        clientID: config.linkedin.clientID,
        clientSecret: config.linkedin.clientSecret,
        callbackURL: config.linkedin.callbackURL,
        scope: ['r_emailaddress', 'r_basicprofile'],
    },
    function(accessToken, refreshToken, profile, done) {

        process.nextTick(function() {

            User.findOne({ 'local.id' : profile.id }, function(err, user) {

                if (err)
                    return done(err);

                if (user) {
                    return done(null, user);
                } else {

                    var newUser                 = new User();
                    newUser.local.id          = profile.id;
                    newUser.local.token       = accessToken;
                    newUser.local.email    = (profile.emails ? profile.emails.length : false) ? profile.emails[0].value : null;
                    newUser.local.name = profile.displayName ? profile.displayName : null;
                    newUser.local.avatar_url = (profile.photos ?  profile.photos.length : false) ? profile.photos[0].value : null;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};