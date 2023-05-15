const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, uniqueValidator: true },
    password: { type: String, required: true },
    // username: { type: String, required: true, uniqueValidator: true },
});

module.exports = mongoose.model("User", userSchema);