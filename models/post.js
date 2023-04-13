const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user_id:{type:mongoose.SchemaTypes.ObjectId,ref:'Customer'}
}, { timestamps: true });
const Post = mongoose.model('Post', postSchema);
module.exports = Post;