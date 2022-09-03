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
      await queryRunner.query(
      `INSERT INTO pin_tag (
        pin_id,
        tag_id
      ) VALUES (?,?)
      `,
      [pinInsert.insertId, tagId[i]]
    )}

    await queryRunner.commitTransaction()
  }
    catch{
        await queryRunner.rollbackTransaction()
        throw new ErrorCreater("INVAILD_DATA_INPUT",500)
      }
    finally {
        await queryRunner.release()
    }
}

const getMyTag = async(tagId) => {
  
  let tagList = []
  for(let i in tagId){
    let [tag] = await appDataSource.query(
      `SELECT *
      FROM tag t
      WHERE t.id = ?
        `,
       [tagId[i]]
    )
    tagList[i] = tag
}
    return tagList
}

const checkMyPin = async(pinId, userId) => {
  
 const [myPin] = await appDataSource.query(

      `SELECT *
      FROM pin p
      INNER JOIN board b ON b.id = p.board_id
      INNER JOIN user u ON u.id = b.user_id
      WHERE p.id = ${pinId} AND u.id = ${userId}
        `,
      )
      return myPin
}

const deleteMyPin = async(pinId) => {
    
  return await appDataSource.query(
      `DELETE FROM pin p
       WHERE p.id = ${pinId}
         `,
       )
 }

module.exports = {createMyPin, getMyTag, checkMyPin, deleteMyPin}