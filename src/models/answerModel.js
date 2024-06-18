const pool = require('../services/db');

module.exports.insertSingle = (data, callback) => {
    const sql = 'INSERT INTO UserAnswer SET ?';
    pool.query(sql, data, (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
};

module.exports.findByQuestionId = (questionId, callback) => {
    const sql = 'SELECT participant_id, creation_date, answer, additional_notes FROM UserAnswer WHERE answered_question_id = ?';
    pool.query(sql, [questionId], (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
};
