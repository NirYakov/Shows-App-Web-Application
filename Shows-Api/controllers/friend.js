const User = require("../models/user");




exports.SearchFindUser = async (req, res, next) => {

    const friendname = req.params.friendname;

    console.log(friendname);

    const friend = await User.findOne({ username: friendname });

    console.log(friend);
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