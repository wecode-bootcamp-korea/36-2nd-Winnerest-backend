const { appDataSource } = require('../models/dataSource');

const createBoard = async (userId, title) => {
    return await appDataSource.query(`
    INSERT INTO board (
        user_id, title
    ) VALUES (?, ?)
    `, [userId, title])
}

module.exports = {
    createBoard
}