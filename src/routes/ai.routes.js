const express = require('express');
const aiController = require("../controllers/ai.controller");
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Protected route - requires authentication
router.post("/get-review", authMiddleware, aiController.getReview);

module.exports = router;    