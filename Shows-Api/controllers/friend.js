const User = require("../models/user");
const Friend = require("../models/friend");
const Shows = require("../models/show");




exports.SearchFindUser = async (req, res, next) => {

    const friendname = req.params.friendname;

    //console.log(friendname);

    const friend = await User.findOne({ username: friendname });

    // console.log(friend);
    // const friend = "";

    console.log("That is the frined idddd ", friend._id);

    if (friend) {
        res.status(200).json({
            message: "Found Friend :)",
            found: true,
            friendId: friend._id
        });
    } else {
        res.status(400).json({
            message: "No Friend Around ...",
            found: false
        });
    }


};


exports.AddFriend = async (req, res, next) => {

    const friendUsername = req.params.friendname;

    const usernameId = req.userData.userId;

    const friendId = req.body.friendId;

    // const friend = await friends.findOne({ username: friendname });

    // if (friend) {

    // } else {

    // }

    // for now not checking for dup and like this

    console.log("Here in the Addfriend controller ");


    const userHaveInitFriends = await Friend.findOne({ usernameId });

    if (userHaveInitFriends) {
        console.log("Here and created");
        // here inject my code to add more friend to this user .!!
        userHaveInitFriends.friends.push({ friendUsername, friendId });
        userHaveInitFriends.save().then(result => {
            res.status(200).json({
                message: "Already created row . added to friendslist.",
                result
            });

        }).catch(error => {
            res.status(400).json({
                message: "error in save friend",
                error
            });
        });

        return;
    }

    try {
        const friend = new Friend({ usernameId: usernameId, friends: [{ friendUsername, friendId }] });

        friend.save().then(result => {
            res.status(201).json(
                {
                    message: "success",
                    result
                });
        }).catch(error => {
            res.status(400).json({
                message: "error in save friend",
                error
            });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error in save friend",
            error
        });
    }
}


exports.GetFriends = async (req, res, next) => {
    try {
        const usernameId = req.userData.userId;

        const userFriends = await Friend.findOne({ usernameId });

        if (userFriends) {
            res.status(200).json({
                message: "Found user friends.",
                friends: userFriends.friends
            });
        } else {
            res.status(401).json({
                message: "No friends to share",
                error: "No friends to share"
            });

        }
    } catch (error) {
        res.status(401).json({
            message: "No friends to share",
            error: error
        });
    }

}


exports.GetFriendsShows = async (req, res, next) => {
    try {

        console.log("Here in friend shows and more");

        const friendId = req.params.friendId;

        const userFriendsShows = await Shows.find({ creator: friendId });

        if (userFriendsShows) {
            res.status(200).json({
                message: "Found user friends.",
                shows: userFriendsShows
            });
        } else {
            res.status(401).json({
                message: "No friends to share",
                error: "No friends to share"
            });

        }
    } catch (error) {
        res.status(401).json({
            message: "No friends to share",
            error: error
        });
    }

}

