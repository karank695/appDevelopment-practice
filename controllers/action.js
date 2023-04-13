const Post = require('../models/post');
const Customer = require('../models/customer');
module.exports.createPost = (req, res) => {
    Post.create({
        content: req.body.post,
        user_id: req.user._id
    }).then((data) => {
        return res.redirect('back');
    }).catch((err) => {
        console.log("err");
    }
    )
}