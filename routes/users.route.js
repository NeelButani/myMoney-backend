const { register } = require('../controllers/users.controller');
const express = require('express');
const router = express.Router();

// to register a new user
router.post(`/`,register);

module.exports = router