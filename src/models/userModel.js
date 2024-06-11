
const pool = require('../services/db');

module.exports.selectAll = (callback) => {
    const sqlStatement = "SELECT id, username, email, created_on, updated_on, last_login_on FROM User;";
    pool.query(sqlStatement, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

module.exports.selectById = (data, callback) => {
    const sqlStatement = "SELECT id, username, email, created_on, updated_on, last_login_on FROM User WHERE id = ?;";
    const values = [data.id];
    pool.query(sqlStatement, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

module.exports.insertSingle = (data, callback) => {
    const sqlStatement = "INSERT INTO User (username, email, password, created_on, updated_on, last_login_on) VALUES (?, ?, ?, NOW(), NOW(), NOW());";
    const values = [data.username, data.email, data.password];
    pool.query(sqlStatement, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}


module.exports.updateById = (data, callback) => {
    const sqlStatement = "UPDATE User SET username = ?, email = ?, password = ?, updated_on = NOW() WHERE id = ?;";
    const values = [data.username, data.email, data.password, data.id];
    pool.query(sqlStatement, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

module.exports.deleteById = (data, callback) => {
    const sqlStatement = "DELETE FROM User WHERE id = ?;";
    const values = [data.id];
    pool.query(sqlStatement, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}