const { appDataSource } = require("./dataSource");
const ErrorCreater = require("../middlewares/errorCreater");

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
    
    for(let i in tagId){
      
    const tagInsert = await queryRunner.query(

      `INSERT INTO pin_tag (
        pin_id,
        tag_id
      ) VALUES (?,?)
      `,
      [pinInsert.insertId, tagId[i]]
    )}
    await queryRunner.commitTransaction()}
    
    catch (err) {
        await queryRunner.rollbackTransaction()
      } finally {
          await queryRunner.release()
    }
}

//const getMyPinTag = async()

module.exports = {createMyPin}