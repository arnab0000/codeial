const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include array of ids of all comments in postSchema beacuse of easy accessibility
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post