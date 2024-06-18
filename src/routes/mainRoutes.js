// Initialize express router
const express = require('express');
//Define router
const router = express.Router();
console.log("Starting mainRoutes");
// Define routes
const userRoutes = require('../routes/userRoutes');
const  questionRoutes = require('../routes/questionsRoutes');
const questRoutes = require('../routes/questRoutes');
const classRoutes = require('../routes/classRoutes');
const spellRoutes = require('../routes/spellRoutes');
const customizationRoutes = require('../routes/customizationRoutes');
// Use routes
router.use("/users", userRoutes);
router.use("/questions", questionRoutes);
router.use("/quests", questRoutes);
router.use("/classes", classRoutes);
router.use("/spells", spellRoutes);
router.use("/customization", customizationRoutes);


// Export router
module.exports = router;