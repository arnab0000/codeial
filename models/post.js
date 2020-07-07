const mongooge = require('mongoose');

const postSchema = new mongooge.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongooge.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post