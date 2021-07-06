const express = require('express');
const router = express.Router();
const CommentController = require('../app.controllers/comment.controller');
const JsonWebToken = require('../foundation/JWT.class');
const jwtAuth = JsonWebToken.auth;

router.post('/getAll', jwtAuth, (req, res) => CommentController.getAll(req, res));
router.post('/create', jwtAuth, (req, res) => CommentController.create(req, res));
router.post('/update', jwtAuth, (req, res) => CommentController.update(req, res));
router.post('/delete', jwtAuth, (req, res) => CommentController.delete(req, res));

module.exports = router;