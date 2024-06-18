const Quest = require('../models/questModel');
const CharacterProgression = require('../models/characterProgressionModel');

module.exports.createQuest = (req, res) => {
    const { title, description, reward_points } = req.body;

    if (!title || !description || !reward_points) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const data = { title, description, reward_points };

    Quest.insertSingle(data, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        const newQuest = {
            quest_id: result.insertId,
            title,
            description,
            reward_points
        };
        res.status(201).json({ message: "Quest created successfully", quest: newQuest });
    });
};

module.exports.getAllQuests = (req, res) => {
    Quest.findAll((err, quests) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(quests);
    });
};

module.exports.updateQuestProgress = (req, res) => {
    const { quest_id } = req.params;
    const { user_id, status } = req.body;

    if (!user_id || !status) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const validStatuses = ['pending', 'in-progress', 'completed', 'failed'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    const data = { user_id, quest_id, status };

    CharacterProgression.updateProgress(data, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        const updatedProgress = {
            progress_id: result.insertId,
            user_id,
            quest_id,
            status,
            completion_date: new Date()
        };
        res.status(200).json({ message: "Quest progress updated successfully", progress: updatedProgress });
    });
};
