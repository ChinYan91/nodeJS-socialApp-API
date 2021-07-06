const express = require('express');
const router = express.Router();
const LikeController = require('../app.controllers/user.controller');
const JsonWebToken = require('../foundation/JWT.class');
const jwtAuth = JsonWebToken.auth;

router.post('/likePost', jwtAuth, (req, res) => LikeController.like(req, res, "post"));
router.post('/likeComment', jwtAuth, (req, res) => LikeController.like(req, res, "comment"));
router.post('/unlikePost', jwtAuth, (req, res) => LikeController.unlike(req, res, "post"));
router.post('/unlikeComment', jwtAuth, (req, res) => LikeController.unlike(req, res, "comment"));

router.get('/totalPostLike', jwtAuth, (req, res) => LikeController.totalLike(req, res, "post"));
router.get('/totalCommentLike', jwtAuth, (req, res) => LikeController.totalLike(req, res, "comment"));
router.get('/postLikeBy', jwtAuth, (req, res) => LikeController.likeBy(req, res, "post"));
router.get('/commentLikeBy', jwtAuth, (req, res) => LikeController.likeBy(req, res, "comment"));

module.exports = router;