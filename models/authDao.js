const getUserById = async (userId) => {

    const [user] = await appDataSource.query(
  
      `SELECT *
       FROM user u
       WHERE u.id = ?
      `,
      [userId]
    );
    return user;
  };

module.exports={getUserById}