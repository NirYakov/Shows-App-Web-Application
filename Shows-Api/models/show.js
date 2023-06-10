const mongoose = require("mongoose");

const showSchema = mongoose.Schema({

    // email: { type: String, required: true, uniqueValidator: true },
    // password: { type: String, required: true },
    // username: { type: String, required: true, uniqueValidator: true },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: false },
    type: { type: String, required: true },
    seasons: { type: Number, required: false },
    minutes: { type: Number, required: false },


    // title: string;
    // rating: number;
    // img: string;
    // type: string;
    // review: string;
    // seasons?: number;
    // minutes?: number;

});

module.exports = mongoose.model("Show", showSchema);