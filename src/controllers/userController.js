const User = require('../models/userModel');

console.log("Starting userController");

module.exports.readAllUser = (req, res) => {
    User.selectAll((err, users) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(users);
    });
}

module.exports.readUserById = (req, res) => {
    const data = { id: req.params.id };
    User.selectById(data, (err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!user.length) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user[0]);
    });
}

module.exports.createUser = (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const data = { username, email, password };

    User.insertSingle(data, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        const newUser = {
            id: result.insertId,
            username,
            email,
            created_on: new Date(),
            updated_on: new Date(),
            last_login_on: new Date()
        };
        res.status(201).json({ message: "User created successfully", user: newUser });
    });
}

module.exports.updateUserById = (req, res) => {
    const { username, email, password } = req.body;
    const { id } = req.params;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const data = { id, username, email, password };

    User.updateById(data, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(204).send(); // 204 No Content
    });
}
module.exports.deleteUserById = (req, res) => {
    const { id } = req.params;

    User.deleteById({ id }, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(204).send(); // 204 No Content
    });
}
