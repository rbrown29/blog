const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;
    const passwordError = 'Password is incorrect';
    const usernameError = 'Username does not exist';

    User.findOne({ username: username }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.redirect('/');
                } else {
                    const validationErrors = [passwordError];
                    req.flash('validationErrors', validationErrors);
                    req.flash('data', req.body);
                    return res.redirect('/auth/login');

                }
            });
        } else {
            const validationErrors = [usernameError];
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            return res.redirect('/auth/login');
        }
    }  
    );
};