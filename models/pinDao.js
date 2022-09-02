const { appDataSource } = require("./dataSource");
const error = require("../middlewares/errorCreater");

const createMyPin = async (boardId, title, contents, tagId, imgUrl) => {
    
    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction()
    try{
    const pinInsert = await queryRunner.query(
    `INSERT INTO pin (
      board_id,
      title,
      contents,
      img_url
    ) VALUES (?,?,?,?)`,
    [boardId, title, contents, imgUrl]
  );
    console.log(pinInsert)
    console.log(pinInsert.insertId)
    
    pinId = [1]
    tagId = [1, 2, 3]
    
    const pinTag = [
      { "pinId" : 1 , "tagId" : 1}, 
      { "pinId" : 1 , "tagId" : 1}, 
      { "pinId" : 1 , "tagId" : 1}
    ] 

    const tagInsert = await queryRunner.query(
      `DELIMITER $$
      CREATE PROCEDURE CREATETAG()
      BEGIN
      DECLARE i INT DEFAULT 1;
      WHILE i <= ${tagId.length}
      DO 
      INSERT INTO pin_tag (
        pin_id,
        tag_id
      ) VALUES (?,?)
      SET i = i+1;
      END WHILE
      END$$
      DELIMITER ;
      `,
      [pinInsert.insertId, tagId]
    )
    await queryRunner.commitTransaction()}
    
    catch (err) {
        await queryRunner.rollbackTransaction()
      } finally {
          await queryRunner.release()
    }
}

const getMyPinTag = async()

module.exports = {createMyPin, getMyPinTag}