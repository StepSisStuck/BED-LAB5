const express = require('express');
const router = express.Router();
const questController = require('../controllers/questController');
console.log("Starting questRoutes");

// POST /quests - Create a new quest
router.post('/', questController.createQuest);
// GET /quests - Retrieve all quests
router.get('/', questController.getAllQuests);
// PUT /quests/:quest_id/progress - Update quest progress
router.put('/:quest_id/progress', questController.updateQuestProgress);

module.exports = router;
