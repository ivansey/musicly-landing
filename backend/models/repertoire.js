let mongoose = require('mongoose');

let repertoireSchema = new mongoose.Schema ({
    descriptionEN: String,
    descriptionRU: String,
    descriptionCH: String,
});

let repertoireModel = mongoose.model("repertoire", repertoireSchema);

module.exports = repertoireModel;
