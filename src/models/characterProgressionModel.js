const pool = require('../services/db');

module.exports.updateProgress = (data, callback) => {
    const sql = 'INSERT INTO CharacterProgression (user_id, quest_id, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status), completion_date = CURRENT_TIMESTAMP';
    pool.query(sql, [data.user_id, data.quest_id, data.status], (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
};
