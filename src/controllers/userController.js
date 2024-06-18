const User = require('../models/userModel');
console.log("Starting userController");

module.exports.createUser = (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    User.findByUsername(username, (err, existingUser) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const data = { username, points: 0 };

        User.insertSingle(data, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            const newUser = {
                user_id: result.insertId,
                username,
                points: 0
            };
            res.status(201).json({ message: "User created successfully", user: newUser });
        });
    });
};

module.exports.getAllUsers = (req, res) => {
    User.findAll((err, users) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(users);
    });
};

module.exports.getUserById = (req, res) => {
    const userId = req.params.user_id;

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        User.getCompletedQuestions(userId, (err, completedQuestions) => {
            if (err) {
                return res.status(500).json(err);
            }

            const userDetails = {
                user_id: user.user_id,
                username: user.username,
                completed_questions: completedQuestions.length,
                points: user.points
            };

            res.status(200).json(userDetails);
        });
    });
};

module.exports.updateUser = (req, res) => {
    const userId = req.params.user_id;
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        User.findByUsername(username, (err, existingUser) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (existingUser.length > 0 && existingUser[0].user_id != userId) {
                return res.status(409).json({ message: "Username already exists" });
            }

            User.updateById(userId, { username }, (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }

                const updatedUser = {
                    user_id: userId,
                    username,
                    points: user.points
                };

                res.status(200).json({ message: "User updated successfully", user: updatedUser });
            });
        });
    });
};
