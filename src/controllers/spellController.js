const Spell = require('../models/spellModel');

module.exports.createSpell = (req, res) => {
    const { name, description, power } = req.body;

    if (!name || !description || !power) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const data = { name, description, power };

    Spell.insertSingle(data, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        const newSpell = {
            spell_id: result.insertId,
            name,
            description,
            power
        };
        res.status(201).json({ message: "Spell created successfully", spell: newSpell });
    });
};

module.exports.getAllSpells = (req, res) => {
    Spell.findAll((err, spells) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(spells);
    });
};
