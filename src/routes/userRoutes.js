const express = require('express');
const router = express.Router();
console.log("Starting mainRoutes");

const userController = require('../controllers/userController');
const playerController = require('../controllers/playerController');

router.get('/', userController.readAllUser);
router.post('/', userController.createUser);

router.get('/:id', userController.readUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

// Route for creating a player associated with a user
router.post('/:userId/player', playerController.createPlayerForUser);

module.exports = router;