const { appDataSource } = require('../models/dataSource');
const ErrorCreater = require('../middlewares/errorCreater');

const createBoard = async(userId, title) => {
    try {
        return await appDataSource.query(`
        INSERT INTO board (
            user_id, title
        ) VALUES (?, ?)
        `, [userId, title])
    } catch (err) {
        throw new ErrorCreater('INVALID_DATA_INPUT', 500)
    }
}

module.exports = {
    createBoard
}