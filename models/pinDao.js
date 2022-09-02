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
      console.log(pinInsert)
      console.log(pinInsert.insertId)
    
      const tagInsert = await queryRunner.query(

      `INSERT INTO pin_tag (
        pin_id,
        tag_id
      ) VALUES (?,?)
      `,
      [pinInsert.insertId, tagId]
    )
    

  //   try {
  //     // execute some operations on this transaction:
  //     await queryRunner.manager.save(pinInsert)
  //     await queryRunner.manager.save(tagInsert)
  
  //     // commit transaction now:
  //     await queryRunner.commitTransaction()
  // } catch (err) {
  //     // since we have errors let's rollback changes we made
  //     await queryRunner.rollbackTransaction()
  // } finally {
  //     // you need to release query runner which is manually created:
  //     await queryRunner.release()
  // }

    await queryRunner.manager.save(pinInsert)
    await queryRunner.manager.save(tagInsert)

    await queryRunner.commitTransaction()

    return [pinInsert, tagInsert]
  }
    catch (err) {
        await queryRunner.rollbackTransaction()
      } finally {
          await queryRunner.release()
    }
}

//const getMyPinTag = async()

module.exports = {createMyPin}