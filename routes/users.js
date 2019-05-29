const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const upload = multer();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('../middleware/auth');


let User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
	//Todo rendering records from db
	res.render('home', {title: 'Home'})
});


router.get('/register', function(req, res, next) {
  res.render('register', { title:'Register' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title:'Login' });
});

router.post('/login',
	passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: 'Invalid username or password'}),
	function(req,res) {
		req.flash('success', 'You are now logged in');
		res.redirect('/');
});

/* POST users listing. */

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		if(err) throw err;
		done(err, user);
	});
})

passport.use(new LocalStrategy(function(username, password, done){
	User.findOne({username}, function(err, user){
		if(err) throw err;
		if(!user) {
			return done(null, false, {message: 'Unknown User'});
		}
		bcrypt.compare(password, user.password, function(err, isMatch) {
			if(isMatch) {
				return done(null, user);
			} else {
				return done(null, false, {message: 'Invalid Password'});
			}
		})
	})
}));

router.post('/register', upload.single('profileimage') ,function(req, res, next) {
	let name = req.body.name;
	let email = req.body.email;
	let username = req.body.username;
	let password = req.body.password;
	let password2 = req.body.password2;
	let file = req.file;
	let base64 = ( function(file) {
		if(!file) {
			return null;
		}
		return file.buffer.toString('base64');
	})();

	//Form validator
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'The password must be 5+ chars long and contain a number')
    .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
    .isLength({ min: 5 }).withMessage('Incorrect password length')
		.matches(/\d/);
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	//Check Errors
	let errors = req.validationErrors();
	if(errors){
		console.log('Errors');
		res.render('register', {
			errors: errors
		});
	} else {
		const today = new Date();
		let newUser = new User({
			name,
			email,
			username,
			password,
			profileimage:base64,
			created: today
		});
		User.findOne({
			email: req.body.email
		})
		.then(user =>{
			if(!user) {
				User.createUser(newUser, function(err, user){
					if(err) {
						req.flash('error', err);
						res.location('/users/register');
						res.redirect('/users/register');
					}
						req.flash('success', 'You are now registered and can login');
						res.location('/');
						res.redirect('/');
				})
			} else {
					req.flash('error', 'User already exists. Please try register again');
					res.location('/users/register');
					res.redirect('/users/register');
			}   
		})
		.catch(err => {
			res.send('error: ' + err);
		});
	}
});

router.get('/logout', function(req,res) {
	req.logout();
	req.flash('success', 'You are now logged out');
	res.redirect('/users/login');
})


router.get('/members', auth, function(req, res, next) {
	res.render('members', {title: 'Members'})
});

router.get('/annoucment', auth, function(req, res, next) {
	res.render('annoucment', {title: 'Annoucment'});
});

router.post('/annoucment', function(req,res,next) {
	if(!req.body) res.status(400);
	
	//TODO saving records to db
	req.flash('success', 'You added a new annoucment');
	res.location('/');
	res.redirect('/');
});


module.exports = router;
