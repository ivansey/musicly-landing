let mongoose = require('mongoose');

let aboutSchema = new mongoose.Schema ({
    nameEN: String,
    nameRU: String,
    nameCH: String,
    descriptionEN: String,
    descriptionRU: String,
    descriptionCH: String,
    bioEN: String,
    bioRU: String,
    bioCH: String,
});

let aboutModel = mongoose.model("about", aboutSchema);

module.exports = aboutModel;
