const isEmail = email => {
	const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(regExp)) return true
	else return false
};

const isPassword = password => {
	const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
	if (password.match(regExp)) return true
	else return false
}

const isEmpty = string => string.trim() === '' ? true : false

exports.validateSignUpData = data => {
	let errors = {}
	
	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty'
	} else if (!isEmail(data.email)) {
		errors.email = 'Email must be validate'
	}

	if (isEmpty(data.password)) {
		errors.password = 'Must not be empty'
	} else if (!isPassword(data.password)) {
		errors.password = 'Password too weak'
	}
	
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Password’s must be match'
	if (isEmpty(data.name)) errors.name = 'Must not be empty'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}
}

exports.validateLoginData = data => {
	let errors = {}

	if (isEmpty(data.email)) errors.email = 'Must not be empty'
	if (isEmpty(data.password)) errors.password = 'Must not be empty'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}
}

