const User = require('../models/User');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        console.log(error);
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            return res.redirect('/auth/register');
        }
        res.redirect('/');
    });
}