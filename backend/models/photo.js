let mongoose = require('mongoose');

let photoSchema = new mongoose.Schema ({
    src: String,
    alt: String,
});

let photoModel = mongoose.model("photos", photoSchema);

module.exports = photoModel;
