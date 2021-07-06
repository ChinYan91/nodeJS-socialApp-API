const CommentModel = require('../app.models/comment.model');

class CommentController {

    static getAll(req, res) {
        let page = req.query.page;
        let commentPerPage = 10;
        let fromRow = (page - 1) * commentPerPage;

        CommentModel.getAll(res, fromRow, commentPerPage, (result) => {
            if (!result) {
                res.json({ "data": "no comment created at the moment", "error": 0 });
            } else {
                res.json({ "data": result, "error": 0 });
            }
        });
    }

    static create(req, res) {
        let content = req.body.content;
        let postID = req.body.postID;
        let userID = req.userID;
        CommentModel.create(content, postID, userID, res, (result) => {
            res.json({ "data": "Comment Created", "error": 0 });
        });
    }

    static update(req, res) {
        let content = req.body.content;
        let contentID = req.body.contentID;
        CommentModel.update(content, contentID, res, (result) => {
            res.json({ "data": "Comment Updated", "error": 0 });
        });
    }

    static delete(req, res) {
        let contentID = req.body.contentID;
        CommentModel.delete(contentID, res, (result) => {
            res.json({ "data": "Comment deleted", "error": 0 });
        });
    }
}

module.exports = CommentController;