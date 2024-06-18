const express = require('express');
const router = express.Router();
const spellController = require('../controllers/spellController');
console.log("Starting spellRoutes");
// POST /spells - Create a new spell
router.post('/', spellController.createSpell);
// GET /spells - Retrieve all spells
router.get('/', spellController.getAllSpells);
module.exports = router;
