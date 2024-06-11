const pool = require('../services/db');


module.exports.insertPlayer = (data, callback) => {
    const sqlStatement = "INSERT INTO Player (name, level, userId) VALUES (?, ?, ?);";
    const values = [data.name, data.level, data.userId];
    pool.query(sqlStatement, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}


module.exports.selectAll = (callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM Player;
    `;
    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Player
    WHERE id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Player (name, level)
    VALUES (?, ?);
    `;
const VALUES = [data.name, data.level];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Player 
    SET name = ?, level = ?
    WHERE id = ?;
    `;
const VALUES = [data.name, data.level, data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Player 
    WHERE id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//Advanced Task 1
module.exports.insertSingle = (data, callback) => {
    const sqlStatement = "INSERT INTO Player (name, level, user_id) VALUES (?, ?, ?);";
    const values = [data.name, data.level, data.user_id];
    pool.query(sqlStatement, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}