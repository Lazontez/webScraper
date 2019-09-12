const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Notes = new Schema({

    headline_ID : {
        type: Schema.Types.ObjectId,
        ref:"Headline"

    },
    date: String,
    text: String

});

const note = mongoose.model("note" , notes);

module.exports = note;