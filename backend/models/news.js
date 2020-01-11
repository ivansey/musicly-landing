let mongoose = require('mongoose');

let newsSchema = new mongoose.Schema ({
    titleEN: String,
    titleRU: String,
    titleCH: String,
    descEN: String,
    descRU: String,
    descCH: String,
    textEN: String,
    textRU: String,
    textCH: String,
    image: String,
    date: String,
});

let newsModel = mongoose.model("news", newsSchema);

module.exports = newsModel;
