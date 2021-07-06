const likeModel = require('../app.models/like.model');

class LikeController {

    static like(req, res, type) {
        let userID = req.userID;
        let typeID = (type === "post") ? req.body.postID : req.body.commentID;
        likeModel.like(userID, typeID, res, type, (result) => {
            res.json({ "data": "Comment Created", "error": 0 });
        });
    }

    static unlike(req, res, type) {
        let userID = req.userID;
        let typeID = (type === "comment") ? req.commentID : req.postID;
        likeModel.unlike(type, userID, typeID, res, type, (result) => {
            res.json({ "data": "Comment Created", "error": 0 });
        });
    }

    static totalLike(req, res, type) {
        let typeID = (type === "post") ? req.query.postID : req.query.commentID;
        likeModel.totalLike(typeID, type, res, (result) => {
            res.json({ "data": result, "error": 0 });
        });
    }

    static likeBy(req, res, type) {
        let typeID = (type === post) ? req.query.postID : req.query.commentID;
        likeModel.likeBy(type, typeID, res, (result) => {
            res.json({ "data": result, "error": 0 });
        });
    }
}

module.exports = LikeController;