const express = require('express');
const router = express.Router();
const PostController = require('../app.controllers/user.controller');
const JsonWebToken = require('../foundation/JWT.class');
const jwtAuth = JsonWebToken.auth;

router.post('/getAll', jwtAuth, (req, res) => PostController.getAll(req, res));
router.post('/create', jwtAuth, (req, res) => PostController.create(req, res));
router.post('/update', jwtAuth, (req, res) => PostController.update(req, res));
router.post('/delete', jwtAuth, (req, res) => PostController.delete(req, res));

module.exports = router;