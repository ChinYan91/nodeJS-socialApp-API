const express = require('express');
const router = express.Router();
const UserController = require('../app.controllers/user.controller');
const JsonWebToken = require('../foundation/JWT.class');
const jwtAuth = JsonWebToken.auth;

router.post('/register', (req, res) => UserController.register(req, res));
router.post('/login', (req, res) => UserController.login(req, res));
router.get('/profile', jwtAuth, (req, res) => UserController.profile(req, res));

module.exports = router;