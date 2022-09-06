const { appDataSource } = require('../models/dataSource');

const createBoard = async (userId, title) => {
    return await appDataSource.query(`
    INSERT INTO board (
        user_id, title
    ) VALUES (?, ?)
    `, [userId, title])
}

const getBoardTitle = async (userId) => {
    return await appDataSource.query(`
    SELECT
        title
    FROM board
    WEHER user_id = ?;`, [userId])
}

const getUserBoard = async (userId) => {
    return await appDataSource.query(`
    SELECT
        board.id boardId,
        board.title title,
        JSON_ARRAYAGG(JSON_OBJECT(
            'pinId', pin.id,
            'pinImgUrl', pin.img_url)) pinDatas,
        count(pin.id) pinCount
    FROM board
    INNER JOIN pin
        ON pin.board_id = board.id
    WHERE board.user_id = ?
    GROUP by board.id;`, [userId])
}

const getBoardInfo = async (boardId) => {
    return await appDataSource.query(`
    SELECT
        pin.id pinId,
        pin.img_url imgUrl
    FROM pin
    INNER JOIN board
        ON pin.board_id = board.id
    WHERE board.id = ?;`, [boardId])
}

const verifiedUserBoard = async(userId, boardId) => {
    const [verifiedResult] = await appDataSource.query(`
    SELECT EXISTS (
        SELECT * FROM board
        WHERE user_id = ? AND id = ? 
    ) verifiedResult;`, [userId, boardId]);
    return verifiedResult;
}

const updateBoard = async(userId, title, boardId) => {
    return await appDataSource.query(`
    UPDATE board SET title = ? WHERE user_id = ? AND id = ?;`,
    [title, userId, boardId]);
}

const deleteBoard = async(userId, boardId) => {
    return await appDataSource.query(`
    DELETE FROM board WHERE user_id = ? AND id = ?;`, [userId, boardId]);
}

module.exports = {
    createBoard,
    getBoardTitle,
    verifiedUserBoard,
    updateBoard,
    deleteBoard,
    getUserBoard,
    getBoardInfo,
}