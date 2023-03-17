const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    body: {
        type: String,
        required: [true, 'Please enter a body']
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted:{
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        required: [true, 'Please enter an image']

    }
});

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost;
