const { appDataSource } = require('./dataSource');

const getMainPinInfos = async (userId, pageSize, page) => {
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
}

const getPinInfo = async (pinId) => {
    return await appDataSource.query(`
    SELECT
        p.img_url imgUrl,
        u.nickname,
        p.title,
        p.contents,
        JSON_ARRAYAGG(JSON_OBJECT(
            'tagId', pt.tag_id
        )) tagIds, 
        (
            SELECT COUNT(follower.following_id)
            FROM follower
            INNER JOIN user
                ON user.id = follower.follower_id
            WHERE user.id = u.id
        ) follower,
        (
            SELECT COUNT(review.id)
            FROM review
            INNER JOIN pin
                ON review.pin_id = pin.id
            WHERE pin.id = p.id
        ) reviewCount
	FROM pin p
	INNER JOIN	board
	    ON p.board_id = board.id
	INNER JOIN user u
	    ON board.user_id = u.id
    INNER JOIN pin_tag pt
        ON p.id = pt.pin_id
	WHERE p.id = ?;`, [pinId])
}

module.exports = {
    getMainPinInfos,
    getPinInfo
}
