// Created By Nitesh Jatav  on 14/02/2016
var authHelper = require('../helper/authentication');
var authHelper = require('../helper/authentication');
var GroupNotifications = require('../models/groupNotifications');
var UserGroup = require('../models/userGroup');
var helper = require('../helper/response');
var AWS = require('aws-sdk');
var q = require('q');

module.exports = function(app, passport) {

    app.post('/signup', function(req, res, next) {

        passport.authenticate('local-signup', function(err, user, info) {
            if (err)
                res.json(helper.handleError(400, err));
            if (!user){ 
                var loginMessage = req.flash('signupMessage')[0];
                res.json(helper.handleError(422, loginMessage));
            }else{
                req.logIn(user, function(err) {
                    if (err)
                        res.json(helper.handleError(400, err))
                    else{
                        req.result = req.user;
                        next();
                    }
                });
            }
        })(req, res, next);
    },authHelper.isLoggedIn,function(req, res, next){
        q.all([
            UserGroup.update({email:req.user.local.email,status:'requestBNR'},{ $set : {user:req.user._id,status:'request'}}),
            GroupNotifications.update({email:req.user.local.email,type:'requestBNR'},{ $set : {to:req.user._id,type:'request'}})
        ]).then(function(data){
            next();
        }).catch(function(err){
            res.json(helper.handleError(422, err));
        })
    },helper.handleSuccess);

    app.post('/admin/signup', function(req, res, next) {

        passport.authenticate('admin-signup', function(err, user, info) {
            if (err)
                res.json(helper.handleError(400, err));
            if (!user){ 
                var loginMessage = req.flash('signupMessage')[0];
                res.json(helper.handleError(422, loginMessage));
            }else{
                req.logIn(user, function(err) {
                    if (err)
                        res.json(helper.handleError(400, err))
                    else{
                        req.result = req.user;
                        next();
                    }
                });
            }
        })(req, res, next);
    },authHelper.isLoggedIn,helper.handleSuccess);

    app.post('/login', function(req, res, next) {

        passport.authenticate('local-login', function(err, user, info) {
            
            if (err)
                res.json(helper.handleError(400, err));
            if (!user){ 
                var loginMessage = req.flash('loginMessage')[0];
                res.json(helper.handleError(422, loginMessage));
            }else{
                req.logIn(user, function(err) {
                    if (err)
                        res.json(helper.handleError(400, err))
                    else {
                        req.result = req.user;
                        next();
                    }
                });
            }
        })(req, res, next);
    },authHelper.isLoggedIn,helper.handleSuccess);

    app.post('/admin/login', function(req, res, next) {

        passport.authenticate('admin-login', function(err, user, info) {
            
            if (err)
                res.json(helper.handleError(400, err));
            if (!user){ 
                var loginMessage = req.flash('loginMessage')[0];
                res.json(helper.handleError(422, loginMessage));
            }else{
                req.logIn(user, function(err) {
                    if (err)
                        res.json(helper.handleError(400, err))
                    else {
                        req.result = req.user;
                        next();
                    }
                });
            }
        })(req, res, next);
    },authHelper.isLoggedIn,helper.handleSuccess);

    app.get('/facebook', passport.authenticate('facebook'));

    app.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/'
    }));

    app.get('/twitter', passport.authenticate('twitter'));

    app.get('/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/',
            failureRedirect : '/'
    }));

    app.get('/linkedin', passport.authenticate('linkedin',{ state: 'SOME STATE'  }));

    app.get('/linkedin/callback',
        passport.authenticate('linkedin', {
            successRedirect : '/',
            failureRedirect : '/'
    }));
    
    app.get('/auth/google',
      passport.authenticate('google', { scope: 
        [ 'https://www.googleapis.com/auth/plus.login',
        , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
    ));
     
    app.get( '/auth/google/callback', 
        passport.authenticate( 'google', { 
            successRedirect: '/',
            failureRedirect: '/'
    }));

    app.get('/profile', authHelper.isLoggedIn, function(req, res, next) {
        req.result = req.user;
        next();
    },helper.handleSuccess);

    app.get('/isAuthenticated', function(req, res, next) {
        if (req.isAuthenticated())
            res.json(helper.responseObject(200, 'ok', "Authenticated", false));
        else 
            res.json(helper.responseObject(401, 'unauthorized', null, true));   
    });

    app.get('/logout', function(req, res, next) {
        req.logout();
        req.result = { "message": "ok"};
        next();
    },helper.handleSuccess);
    
};