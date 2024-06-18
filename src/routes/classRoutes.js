const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
console.log("Starting classRoutes");
// POST /classes - Create a new class
router.post('/', classController.createClass);
// GET /classes - Retrieve all classes
router.get('/', classController.getAllClasses);
module.exports = router;
