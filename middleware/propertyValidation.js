module.exports = function propertyValidation (req,res,next) {
    req.checkBody('title', 'Title field is required').notEmpty();
	req.checkBody('state', 'State field is required').notEmpty();
	req.checkBody('price', 'Price field is required').notEmpty();
	req.checkBody('mortgage', 'Mortgage field is required').notEmpty();
	req.checkBody('sqft', 'Sqft field is required').notEmpty();
	req.checkBody('rooms', 'Rooms field is required').notEmpty();
	req.checkBody('bathrooms', 'Bathrooms field is required').notEmpty();
	req.checkBody('property', 'Property field is required').notEmpty();
	req.checkBody('description', 'Description field is required').notEmpty();
    let errors = req.validationErrors();
    if(errors) {
        res.render('annoucment', {
			errors: errors
		});
    } else {
        return next();
    }
}