const authService = require("../services/authService");

const logIn = async (req, res) => {
    const accessToken = req.headers.authorization;
    const token = await authService.logIn(accessToken);
    res.status(200).json({ accessToken: token });
}

const getUserInfo = async (req, res) => {
    const userId = req.user.id;
    const userInfo = await authService.getUserInfo(userId);
    res.status(200).json({data : userInfo});
}

const createFollower = async (req, res) => {
    const { followerUserId } = req.params;
    const followingUserId = req.user.id;
    await authService.createFollower(followingUserId, followerUserId);
    res.status(201).json({message : 'CREATED_FOLLOWER'})
} 

const deleteFollower = async (req, res) => {
    const { followerUserId } = req.params;
    const followingUserId = req.user.id;
    await authService.deleteFollower(followingUserId, followerUserId);
    res.sendStatus(204);
}

module.exports = {
    logIn,
    getUserInfo,
    createFollower,
    deleteFollower
}
