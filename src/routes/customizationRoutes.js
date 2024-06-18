const express = require('express');
const router = express.Router();
const customizationController = require('../controllers/customizationController');

// POST /customization - Create or update character customization
router.post('/', customizationController.createOrUpdateCustomization);

// GET /customization/:user_id - Retrieve customization details of a specific user
router.get('/:user_id', customizationController.getCustomization);

module.exports = router;
