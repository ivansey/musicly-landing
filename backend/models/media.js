let mongoose = require('mongoose');

let mediaSchema = new mongoose.Schema ({
    titleEN: String,
    titleRU: String,
    titleCH: String,
    descEN: String,
    descRU: String,
    descCH: String,
    textEN: String,
    textRU: String,
    textCH: String,
    youtubeURL: String,
    yMusicURL: String,
    iTunesURL: String,
    googlePlayURL: String,
    spotifyURL: String,
    boomURL: String,
    image: String,
    date: String,
});

let mediaModel = mongoose.model("media", mediaSchema);

module.exports = mediaModel;
