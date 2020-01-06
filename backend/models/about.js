let mongoose = require('mongoose');

let aboutSchema = new mongoose.Schema ({
    name: String,
    description: String,
    bio: String,
});

let aboutModel = mongoose.model("about", aboutSchema);

module.exports = aboutModel;
