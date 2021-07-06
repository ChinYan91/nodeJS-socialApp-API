const PostModel = require('../app.models/post.model');

class PostController {

    static getAll(req, res) {
        let page = req.query.page;
        let postPerPage = 10;
        let fromRow = (page - 1) * postPerPage;

        PostModel.getAll(fromRow, postPerPage, res, (result) => {
            if (!result) {
                res.json({ "data": "no comment created at the moment", "error": 0 });
            } else {
                res.json({ "data": result, "error": 0 });
            }
        });
    }

    static create(req, res) {
        let title = req.body.title;
        let content = req.body.content;
        let userID = req.userID;
        PostModel.create(title, content, userID, res, (result) => {
            res.json({ "data": "Post Created", "error": 0 });
        });
    }

    static update(req, res) {
        let title = req.body.title;
        let content = req.body.content;
        let contentID = req.body.contentID;
        PostModel.update(title, content, contentID, res, (result) => {
            res.json({ "data": "Post Updated", "error": 0 });
        });
    }

    static delete(req, res) {
        let contentID = req.body.contentID;

        PostModel.delete(contentID, res, (result) => {
            res.json({ "data": "Post Deleted", "error": 0 });
        });
    }
}

module.exports = PostController;