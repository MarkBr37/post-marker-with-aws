const mongoose = require('mongoose');

const postShcema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: [100, "Title is longer than the maximum allowed length 100."]
    },
    text: {
        type: String,
        maxlength: [1024,"Text is longer than the maximum allowed length 1024."]
    },
    image:{
        type: String
    },
    
})

const Post = mongoose.model('Post', postShcema);

exports.Post = Post;