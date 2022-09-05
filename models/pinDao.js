const { appDataSource } = require('./dataSource');
const ErrorCreater = require('../middlewares/errorCreater');

const getMainPinInfos = async (userId, pageSize, page) => {
    try {
        return await appDataSource.query(`
        SELECT
            pin.id pinId,
            pin.img_url url,
            user.id userId,
            tag.id tagId
        FROM pin
        INNER JOIN board
        ON pin.board_id = board.id
        INNER JOIN user
        ON user.id = board.user_id
        INNER JOIN pin_tag
        ON pin.id = pin_tag.pin_id
        INNER JOIN tag 
        ON tag.id = pin_tag.tag_id
        WHERE tag.id in (SELECT
                pin_tag.tag_id
            FROM pin_tag
            INNER JOIN pin ON pin.id = pin_tag.pin_id
            INNER JOIN board ON pin.board_id = board.id
            WHERE board.user_id = ?)
        ORDER BY pinId
        LIMIT ? OFFSET ?;`, [userId, pageSize, page])
    } catch (err) {
        throw new ErrorCreater('INVALID_DATA_INPUT', 500)
    }
}

module.exports = {
    getMainPinInfos,
}
