const mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    anime_id: {
        type: String,
        required: true,
        default: '',
    },
    // the id of comment (CommentSchema) where all those replies belong to 
    // if the comment is the parent comment, than parentComment id is ''
    parentComment_id: {
        type: String,
        required: true,
        default: '',
    },
    // the content of comment
    commentContent: {
        type: String, 
        required: true,
        default: '',
    },
    // the username of the user who comments
    username: {
        type: String,
        required: true,
        default: '',
    }, 
    // the avatar of the user
    avatar: {
        type: String,
        required: true,
        default: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
    },
     // the id of comment(CommentSchema or ReplySchema) where the user replies, 
    // if the comment is not a reply, the replied comment id is ''
    repliedComment_id: {
        type: String,
        default: '',
    }, 
     // the username of the user being replied
    // if the comment is not a reply, the replied username is ''
    repliedUsername: {
        type: String,
        default: '',
    },
    //if the replied comment is the parent comment, then repliedAvatar is ''
    repliedAvatar: {
        type: String,
        default: '',
    },
    // date comments
    date: {
        type: Date,
        default: new Date(),
    },
    like: {
        type: Array,
        default: [],
    },
    dislike: {
        type: Array, 
        default: [],
    },
})

module.exports = mongoose.model('Comment', CommentSchema);