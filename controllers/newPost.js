module.exports = function (req, res) {
    if (req.session.userId) {
        return res.render('create', {
            createPost: true,
            messages: req.flash()
        });
        
    }
    req.flash('error', 'You must be logged in to create a post');
    res.redirect('/auth/login');
};