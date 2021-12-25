
class AuthenAuthor{
	checkLogin(req, res, next) {
		if(req.session.user) {
			next()
		}
		else {
			res.redirect('/dangnhap')
		}
	}

	checkCreate(req, res, next) {
		let roles = req.session.roles;
		if(roles){
			if(roles.includes('Create') || roles.includes('Full')) next()
			else res.render('error/403', {layout: 'onlybody'})
		}
		else {
			res.redirect('/dangnhap')
		}
	}

	checkEdit(req, res, next) {
		let roles = req.session.roles;
		if(roles){
			if(roles.includes('Edit') || roles.includes('Full')) next()
			else res.render('error/403', {layout: 'onlybody'})
		}
		else {
			res.redirect('/dangnhap')
		}
	}

	checkDelete(req, res, next) {
		let roles = req.session.roles;
		if(roles){
			if(roles.includes('Delete') || roles.includes('Full')) next()
			else res.render('error/403', {layout: 'onlybody'})
		}
		else {
			res.redirect('/dangnhap')
		}
	}

	checkManager(req, res, next) {
		let roles = req.session.roles;
		if(roles){
			if(roles.includes('Manager') || roles.includes('Full')) next()
			else res.render('error/403', {layout: 'onlybody'})
		}
		else {
			res.redirect('/dangnhap')
		}
	}
	
}


module.exports = new AuthenAuthor;