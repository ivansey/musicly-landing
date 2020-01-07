let mongoose = require('mongoose');

let gallerySchema = new mongoose.Schema ({
    src: String,
    alt: String,
    type: String,
});

let galleryModel = mongoose.model("gallery", gallerySchema);

module.exports = galleryModel;
