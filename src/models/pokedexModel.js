const pool = require('../services/db');

module.exports.selectRandomDex = (callback) =>  
{
    const SQLSTATEMENT = `
    SELECT * FROM Pokedex
    ORDER BY RAND()
    LIMIT 1;
    `;
    pool.query(SQLSTATEMENT, callback);
}

