const Class = require('../models/classModel');

module.exports.createClass = (req, res) => {
    const { name, description, required_points } = req.body;

    if (!name || !description || !required_points) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const data = { name, description, required_points };

    Class.insertSingle(data, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        const newClass = {
            class_id: result.insertId,
            name,
            description,
            required_points
        };
        res.status(201).json({ message: "Class created successfully", class: newClass });
    });
};

module.exports.getAllClasses = (req, res) => {
    Class.findAll((err, classes) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(classes);
    });
};
