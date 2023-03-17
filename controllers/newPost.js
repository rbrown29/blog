module.exports = function (req, res) {
    if (req.session.userId) {
        return res.render('create', {
            createPost: true,
            messages: req.flash()
        });
    }
    
    res.redirect('/auth/login');
};