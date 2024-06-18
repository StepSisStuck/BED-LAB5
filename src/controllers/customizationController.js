const Customization = require('../models/customizationModel');

module.exports.createOrUpdateCustomization = (req, res) => {
    const { user_id, appearance, abilities } = req.body;

    if (!user_id || !appearance || !abilities) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const data = { user_id, appearance, abilities };

    Customization.upsert(data, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        const newCustomization = {
            customization_id: result.insertId || result.customization_id,
            user_id,
            appearance,
            abilities
        };
        res.status(201).json({ message: "Customization saved successfully", customization: newCustomization });
    });
};

module.exports.getCustomization = (req, res) => {
    const { user_id } = req.params;

    Customization.findByUserId(user_id, (err, customization) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!customization) {
            return res.status(404).json({ message: "Customization not found" });
        }
        res.status(200).json(customization);
    });
};
