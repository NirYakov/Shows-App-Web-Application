const mongoose = require("mongoose");

const showSchema = mongoose.Schema({

    // email: { type: String, required: true, uniqueValidator: true },
    // password: { type: String, required: true },
    // username: { type: String, required: true, uniqueValidator: true },

    username: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    friends: [{ friendUsername: String, friendId: mongoose.Schema.Types.ObjectId }],


    // need to check if i did array in mopngoose good and to continue

});

module.exports = mongoose.model("friend", showSchema);