const Question = require('../models/questionModel');
console.log("Starting questionController");

module.exports.createQuestion = (req, res) => {
    const { user_id, question } = req.body;

    if (!user_id || !question) {
        return res.status(400).json({ message: "User ID and question are required" });
    }

    const data = { creator_id: user_id, question };

    Question.insertSingle(data, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        const newQuestion = {
            question_id: result.insertId,
            question,
            creator_id: user_id
        };
        res.status(201).json({ message: "Question created successfully", question: newQuestion });
    });
};

module.exports.getAllQuestions = (req, res) => {
    Question.findAll((err, questions) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(questions);
    });
};

module.exports.updateQuestion = (req, res) => {
    const questionId = req.params.question_id;
    const { user_id, question } = req.body;

    if (!user_id || !question) {
        return res.status(400).json({ message: "User ID and question are required" });
    }

    Question.findById(questionId, (err, existingQuestion) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!existingQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        if (existingQuestion.creator_id !== user_id) {
            return res.status(403).json({ message: "Forbidden: You are not the creator of this question" });
        }

        const data = { question };
        Question.updateById(questionId, data, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            const updatedQuestion = {
                question_id: questionId,
                question,
                creator_id: user_id
            };
            res.status(200).json({ message: "Question updated successfully", question: updatedQuestion });
        });
    });
};

module.exports.deleteQuestion = (req, res) => {
    const questionId = req.params.question_id;

    Question.findById(questionId, (err, existingQuestion) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!existingQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        Question.deleteById(questionId, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(204).send();
        });
    });
};
