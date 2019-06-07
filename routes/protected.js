const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const upload = multer();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('../middleware/auth');
const propertyValidation = require('../middleware/propertyValidation');


let User = require('../models/user');
let Annoucment = require('../models/annoucment');

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

// router.get('/', function(req, res, next) {
// 	//Todo rendering records from db
// 	res.render('home', {title: 'Home'})
// });

router.get('/annoucment', auth, function(req, res, next) {
	res.render('annoucment', {title: 'Annoucment'});
});

router.post('/annoucment', [auth,propertyValidation],function(req,res,next) {
	// if(!req.body) res.status(400);
	console.log(req.body);

	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('username', 'Username field is required').notEmpty();
	// req.checkBody('password', 'The password must be 5+ chars long and contain a number')
	// 	.not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
	// 	.isLength({ min: 5 }).withMessage('Incorrect password length')
	// 	.matches(/\d/);
	// req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	const now = new Date();
		let property = {
			title: req.body.title,
			state:req.body.state,
			price:req.body.price,
			mortgage:req.body.mortgage,
			sqft:req.body.sqft,
			rooms:req.body.rooms,
			bathrooms:req.body.bathrooms,
			property:req.body.property,
			description:req.body.description,
			created:now,
		}
		req.flash('success', 'You added a new annoucment');
		res.location('/');
		res.redirect('/');
});

module.exports = router;