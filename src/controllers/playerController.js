const model = require("../models/playerModel.js");
const User = require('../models/userModel');
const Player = require('../models/playerModel');
console.log("Starting playerController");
module.exports.createPlayerForUser = (req, res) => {
    const { name, level } = req.body;
    const { userId } = req.params;

    if (!name || !level || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // First, check if the user exists
    User.selectById({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!user.length) {
            return res.status(404).json({ message: "User not found" });
        }

        // If the user exists, create the player
        const data = { name, level, userId };

        Player.insertPlayer(data, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json({ message: `Player ${result.insertId} created for User ${userId} successfully.` });
        });
    });
};


module.exports.readAllPlayer = (req, res, next) =>
    {
        console.log("readAllPlayer")
        const callback = (error, results, fields) => {
            console.log("readAllPlayer callback", results)
            if (error) {
                console.error("Error readAllPlayer:", error);
                res.status(500).json(error);
            } 
            else res.status(200).json(results);
            console.log("readAllPlayer results:", results);
        }
    
        model.selectAll(callback);
    }

    module.exports.readPlayerById = (req, res, next) =>
        {
            const data = {
                id: req.params.id
            }
        
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error readPlayerById:", error);
                    res.status(500).json(error);
                } else {
                    if(results.length == 0) 
                    {
                        res.status(404).json({
                            message: "Player not found"
                        });
                    }
                    else res.status(200).json(results[0]);
                }
            }
        
            model.selectById(data, callback);
        }

        module.exports.createNewPlayer = (req, res, next) =>
            {
                if(req.body.name == undefined)
                {
                    res.status(400).send("Error: name is undefined");
                    return;
                }
            
                const data = {
                    name: req.body.name,
                    level: 1
                }
            
                const callback = (error, results, fields) => {
                    if (error) {
                        console.error("Error createNewPlayer:", error);
                        res.status(500).json(error);
                    } else {
                        res.status(201).json(results);
                    }
                }
            
                model.insertSingle(data, callback);
            }


            module.exports.updatePlayerById = (req, res, next) =>
                {
                    if(req.body.name == undefined || req.body.level == undefined)
                    {
                        res.status(400).json({
                            message: "Error: name or level is undefined"
                        });
                        return;
                    }
                
                    const data = {
                        id: req.params.id,
                        name: req.body.name,
                        level: req.body.level
                    }
                
                    const callback = (error, results, fields) => {
                        if (error) {
                            console.error("Error updatePlayerById:", error);
                            res.status(500).json(error);
                        } else {
                            if(results.affectedRows == 0) 
                            {
                                res.status(404).json({
                                    message: "Player not found"
                                });
                            }
                            else res.status(204).send(); // 204 No Content
                        }
                    }
                
                    model.updateById(data, callback);
                }

                module.exports.deletePlayerById = (req, res, next) =>
                    {
                        const data = {
                            id: req.params.id
                        }
                    
                        const callback = (error, results, fields) => {
                            if (error) {
                                console.error("Error deletePlayerById:", error);
                                res.status(500).json(error);
                            } else {
                                if(results.affectedRows == 0) 
                                {
                                    res.status(404).json({
                                        message: "Player not found"
                                    });
                                }
                                else res.status(204).send(); // 204 No Content            
                            }
                        }
                    
                        model.deleteById(data, callback);
                    }


//Advanced Task 1

module.exports.createPlayerForUser = (req, res) => {
    const { name, level } = req.body;
    const { userId } = req.params;

    if (!name || !level || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    User.selectById({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!user.length) {
            return res.status(404).json({ message: "User not found" });
        }

        const data = { name, level, user_id: userId };

        Player.insertSingle(data, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json({ message: `Player ${result.insertId} created for User ${userId} successfully.` });
        });
    });
}