const BlogPost = require('../models/BlogPost');
const path = require('path');

module.exports = async (req, res) => {
    const { title, body } = req.body;
    const image = req.files ? req.files.image : null;

    if (!title || !body || !image) {
        // Set a flash message for missing information
        req.flash('error', 'Please provide a title, description, and image');
        return res.redirect('/posts/new');
    }

    image.mv(path.resolve(__dirname, '..', 'public/img', image.name),
        async (error) => {
            if (error) {
                // Set a flash message for an error while moving the image
                req.flash('error', 'Error uploading image');
                return res.redirect('/posts/new');
            }

            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name,
                userid: req.session.userId
            });

            // Set a flash message for successful blog post creation
            req.flash('success', 'Blog post created successfully');
            res.redirect('/posts/new');
        });
};