const pool = require('../services/db');

module.exports.insertSingle = (data, callback) => {
    const sql = 'INSERT INTO Spells SET ?';
    pool.query(sql, data, (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
};

module.exports.findAll = (callback) => {
    const sql = 'SELECT * FROM Spells';
    pool.query(sql, (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
};
