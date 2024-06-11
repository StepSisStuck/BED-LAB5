module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Pokedex (owner_id, dex_num, hp, atk, def)
    values (?, ?, ?, ?, ?);
    `;

    const values = [data.owner_id, data.dex_num, data.hp, data.atk, data.def];
    console.log("VALUES: ", values);    
    pool.query(SQLSTATEMENT, values, callback);
}
