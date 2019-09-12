const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const headlineSchema = new Schema({
    newsHeadLine: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        require: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    date : String
});

const Headline = mongoose.model("headline", headlineSchema);

module.exports = Headline
