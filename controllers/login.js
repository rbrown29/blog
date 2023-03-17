module.exports = (req, res, error) => {
    var username = "";
    var password = "";
    const data = req.flash('data')[0];
    if (typeof data !== 'undefined') {
        username = data.username;
        password = data.password;
    }
    res.render('login', {
        errors: req.flash('validationErrors'),
        username: username,
        password: password

    });
}