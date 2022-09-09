const ErrorCreater = require("../middlewares/errorCreater");
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
        WHERE board.user_id = ${userId})
    AND user.id NOT IN (${userId})
    ORDER BY RAND()
    LIMIT ${pageSize} OFFSET ${page};`)
}

const getRecommendPins = async (tagId, pageSize, page) => {
    return await appDataSource.query(
        `SELECT
        board.user_id userId,
        pin.id pinId,
        pin.img_url url,
        board.user_id userId,
        pin_tag.tag_id tagId
    FROM pin
    INNER JOIN pin_tag
        ON pin.id = pin_tag.pin_id
    INNER JOIN board
        ON pin.board_id = board.id
    WHERE pin_tag.tag_id = ?
    ORDER BY RAND()
    LIMIT ? OFFSET ?;`, [tagId, pageSize, page]
    )
}

const getPinInfo = async (userId, pinId) => {
    return await appDataSource.query(`
    SELECT
        u.id userId,
        p.img_url imgUrl,
        u.profile_img_url profileUrl,
        u.nickname,
        p.title,
        p.contents,
        JSON_ARRAYAGG(
            pt.tag_id
        ) tagIds, 
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
        ) reviewCount,
        (SELECT EXISTS(
            SELECT * FROM follower
            INNER JOIN user
            ON user.id = follower.follower_id
            WHERE follower.following_id = ? 
            and follower.follower_id =u.id)) duplicatedResult
	FROM pin p
	INNER JOIN	board
	    ON p.board_id = board.id
	INNER JOIN user u
	    ON board.user_id = u.id
    INNER JOIN pin_tag pt
        ON p.id = pt.pin_id
	WHERE p.id = ?;`, [userId, pinId])
}

const checkMyPin = async (pinId, userId) => {

    const [myPin] = await appDataSource.query(
        `SELECT *
        FROM pin p
            INNER JOIN board b 
            ON b.id = p.board_id
            INNER JOIN user u 
            ON u.id = b.user_id
        WHERE p.id = ${pinId} AND u.id = ${userId}
        `,
    )
    return myPin
}

const deleteMyPin = async (pinId) => {
    return await appDataSource.query(
        `DELETE FROM pin p WHERE p.id = ${pinId}`,
    )
}

const patchMyPin = async (pinId, boardId, title, contents) => {
    return await appDataSource.query(
        `UPDATE pin
        SET 
            title = ?,
            contents = ?
        WHERE id = ${pinId}
        AND board_id = ${boardId}
        `, [title, contents]
    )
}

const createMyPin = async (boardId, title, contents, tagIds, imgUrl) => {
    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction()
    try {
        const pinInsert = await queryRunner.query(
            `INSERT INTO pin (
                board_id,
                title,
                contents,
                img_url
            ) VALUES (?,?,?,?)`,
            [boardId, title, contents, imgUrl]
        );

        const lists = [];
        for (let i in tagIds) {
            lists.push([pinInsert.insertId, tagIds[i]])
        }

        await queryRunner.query(
            `INSERT INTO pin_tag (
                pin_id,
                tag_id
            ) VALUES ?`,
            [lists]
        )

        await queryRunner.commitTransaction()
    }
    catch {
        await queryRunner.rollbackTransaction()
        throw new ErrorCreater("INVAILD_DATA_INPUT", 500)
    }
    finally {
        await queryRunner.release()
    }
}

const checkMyBoard = async (boardId, userId) => {
    const [myBoard] = await appDataSource.query(
            `SELECT * FROM board b WHERE b.id = ? AND b.user_id = ?`, [boardId, userId]
    )
    return myBoard
}

module.exports = {
    getMainPinInfos,
    getRecommendPins,
    getPinInfo,
    patchMyPin,
    getMainPinInfos,
    checkMyPin,
    createMyPin,
    checkMyBoard,
    deleteMyPin
}