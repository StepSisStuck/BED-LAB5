const express = require('express');
const router = express.Router();
console.log("Starting mainRoutes");

const playerRoutes = require('../routes/playerRoutes');
const userRoutes = require('../routes/userRoutes')
//const pokedexRoutes = require('../routes/pokedexRoutes');
//use("/pokemon", pokemonRoutes);
//router.use("/pokedex", pokedexRoutes);
router.use("/player", playerRoutes);
router.use("/user", userRoutes);
module.exports = router;