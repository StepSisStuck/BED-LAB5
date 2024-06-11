const express = require('express');
const router = express.Router();
console.log("Starting playerRoutes");

const controller = require('../controllers/playerController');
//const controller = require('.')
router.get('/', controller.readAllPlayer);
router.post('/', controller.createNewPlayer);

router.get('/:id', controller.readPlayerById);
router.put('/:id', controller.updatePlayerById);
router.delete('/:id', controller.deletePlayerById);

module.exports = router;