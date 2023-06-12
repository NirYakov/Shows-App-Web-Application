const User = require("../models/user");
const Friend = require("../models/friend");
const user = require("../models/user");




exports.SearchFindUser = async (req, res, next) => {

    const friendname = req.params.friendname;

    //console.log(friendname);

    const friend = await User.findOne({ username: friendname });

    // console.log(friend);
    // const friend = "";

    if (friend) {
        res.status(200).json({
            message: "Found Friend :)",
            found: true
        });
    } else {
        res.status(400).json({
            message: "No Friend Around ...",
            found: false
        });
    }


};


exports.AddFriend = async (req, res, next) => {

    const friendname = req.params.friendname;

    const usernameId = req.userData.userId;
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
        userHaveInitFriends.friends.push({ friendUsername: friendname, friendId: "Just an iddd" });
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

    const friend = new Friend({ usernameId: usernameId, friends: [{ friendUsername: friendname, friendId: "Just an iddd" }] });

    friend.save().then(result => {
        res.status(201).json(
            {
                message: "sacssece",
                result
            });
    }).catch(error => {
        res.status(400).json({
            message: "error in save friend",
            error
        });
    });

}


exports.GetFriends = async (req, res, next) => {


    const userHaveInitFriends = await Friend.findOne({ usernameId });


}
