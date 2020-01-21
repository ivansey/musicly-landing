let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let md5 = require('md5');
let cors = require('cors');
let fileUpload = require("express-fileupload");

const PORT = 3001;

mongoose.connect("mongodb://localhost/landing");

let usersModel = require('./models/users');
let userSessionModel = require('./models/userSession');
let galleryModel = require("./models/gallery");
let aboutModel = require("./models/about");
let newsModel = require("./models/news");
let mediaModel = require("./models/media");
let repertoireModel = require("./models/repertoire");

let app = express();

app.use(bodyParser());
app.use(fileUpload());
app.use(cors());
app.use(express.static("storage"));


app.post("/api/v1/users/reg", (req, res) => {
    usersModel.find({email: req.body.email}).then(data => {
            if (data.length > 0) {
                res.json({response: "EMAIL_NOT_FREE"});
            } else {
                let user = new usersModel({
                    email: req.body.email,
                    type: "USER",
                    pass: md5(req.body.pass),
                });
                user.save();
                res.json({response: "DONE"});
            }
        }
    );
});

app.post("/api/v1/users/login", (req, res) => {
    usersModel.find({email: req.body.email}).then(data => {
        if (data.length === 0) {
            res.json({response: "USER_NOT_FOUND", token: null});
        } else {
            if (data[0].validatePass(req.body.pass)) {
                res.json({response: "INVALID_PASSWORD", token: null});
            }

            let session = new userSessionModel({idUser: data[0]._id});

            let token = session.generateToken();
            session.token = token;

            session.save();
            res.json({response: "DONE", token: token});
        }
    })
});

app.post("/api/v1/users/checkToken", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.length === 0) {
            res.json({response: "NOT_TOKEN", _id: null, data: {}});
        }

        res.json({response: "CHECK_TOKEN_DONE", _id: data[0].idUser});
    });
});

app.post("/api/v1/users/get", (req, res) => {
    usersModel.findById(req.body._id).then(data => {
        res.json({
            response: "USER_FOUND", data: {
                _id: data._id,
                email: data.email
            }
        });
    });
});

app.post("/api/v1/users/auth/get", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        console.log(data);
        if (data.length === 0) {
            return res.json({
                response: "NOT_ACCESS", data: {
                    _id: null,
                    email: null,
                    type: "GUEST",
                }
            });
        } else {
            usersModel.findById(data[0].idUser).then(data => {
                return res.json({
                    response: "USER_FOUND", data: {
                        _id: data._id,
                        email: data.email,
                        type: data.type,
                    }
                });
            });
        }
    });
});


app.post("/api/v1/gallery/get", (req, res) => {
    galleryModel.findById(req.body._id).then((data) => {
        if (data.src === undefined) {
            return res.json({
                response: "NOT_FOUND", data: [{}]
            });
        }

        return res.json({
            response: "OK", data: data
        })
    })
});

app.post("/api/v1/gallery/getAll", (req, res) => {
    galleryModel.find({}).limit(req.body.limit).then((data) => {
        if (data.length === 0) {
            return res.json({
                response: "NOT_FOUND", data: [{}]
            });
        }

        return res.json({
            response: "OK", data: data
        })
    })
});

app.post("/api/v1/gallery/add", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.length === 0) {
            return res.json({response: "NOT_ACCESS"});
        }

        let gallery = new galleryModel({
            src: req.body.src,
            alt: req.body.alt,
            type: req.body.type,
        });
        gallery.save();
        return res.json({response: "DONE"});
    });
});

app.post("/api/v1/gallery/delete", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.length === 0) {
            return res.json({response: "NOT_ACCESS"});
        }

        galleryModel.findByIdAndRemove(req.body._id).then((data) => {
            return res.json({response: "DONE"});
        }).catch((err) => {
            return res.status(500).send(err);
        });
    });
});


app.post("/api/v1/about/get", (req, res) => {
    aboutModel.find({}).then((data) => {
        return res.json({
            response: "OK", data: data[0]
        })
    })
});

app.post("/api/v1/about/edit", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.length === 0) {
            return res.json({response: "NOT_ACCESS"});
        }

        console.log(req.body);

        aboutModel.findByIdAndUpdate(req.body._id, {
            nameEN: req.body.nameEN,
            nameRU: req.body.nameRU,
            nameCH: req.body.nameCH,
            descriptionEN: req.body.descriptionEN,
            descriptionRU: req.body.descriptionRU,
            descriptionCH: req.body.descriptionCH,
            bioEN: req.body.bioEN,
            bioRU: req.body.bioRU,
            bioCH: req.body.bioCH,
        }).then(() => {
            return res.json({response: "OK"})
        }).catch((err) => {
            return res.status(500).send(err)
        });
    }).catch((err) => {
        return res.status(500).send(err)
    });
});


app.post("/api/v1/news/get", (req, res) => {
    newsModel.findById(req.body._id).then((data) => {
        if (data.src === undefined) {
            return res.json({
                response: "NOT_FOUND", data: {}
            });
        }

        return res.json({
            response: "OK", data: data
        })
    })
});

app.post("/api/v1/news/getAll", (req, res) => {
    newsModel.find({}).limit(req.body.limit).sort({_id: -1}).then((data) => {
        if (data.length === 0) {
            return res.json({
                response: "NOT_FOUND", data: [{}]
            });
        }

        return res.json({
            response: "OK", data: data
        })
    })
});

app.post("/api/v1/news/add", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.length === 0) {
            return res.json({response: "NOT_ACCESS"});
        }

        let news = new newsModel({
            titleEN: req.body.titleEN,
            titleRU: req.body.titleRU,
            titleCH: req.body.titleCH,
            descEN: req.body.descEN,
            descRU: req.body.descRU,
            descCH: req.body.descCH,
            textEN: req.body.textEN,
            textRU: req.body.textRU,
            textCH: req.body.textCH,
            image: req.body.image,
            date: new Date(Date.now()),
        });
        news.save();
        return res.json({response: "DONE"});
    });
});

app.post("/api/v1/news/delete", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.length === 0) {
            return res.json({response: "NOT_ACCESS"});
        }

        newsModel.findByIdAndRemove(req.body._id).then((data) => {
            return res.json({response: "DONE"});
        }).catch((err) => {
            return res.status(500).send(err);
        });
    });
});


app.post("/api/v1/media/get", (req, res) => {
    mediaModel.findById(req.body._id).then((data) => {
        if (data.src === undefined) {
            return res.json({
                response: "NOT_FOUND", data: {}
            });
        }

        return res.json({
            response: "OK", data: data
        })
    })
});

app.post("/api/v1/media/getAll", (req, res) => {
    newsModel.find({}).limit(req.body.limit).sort({_id: -1}).then((data) => {
        if (data.length === 0) {
            return res.json({
                response: "NOT_FOUND", data: [{}]
            });
        }

        return res.json({
            response: "OK", data: data
        })
    })
});

app.post("/api/v1/media/add", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.response === "NOT_TOKEN") {
            return res.json({response: "USER_FOUND", data: {}});
        }

        let media = new mediaModel({
            titleEN: req.body.titleEN,
            titleRU: req.body.titleRU,
            titleCH: req.body.titleCH,
            descEN: req.body.descEN,
            descRU: req.body.descRU,
            descCH: req.body.descCH,
            textEN: req.body.textEN,
            textRU: req.body.textRU,
            textCH: req.body.textCH,
            youtubeURL: req.body.youtubeURL,
            yMusicURL: req.body.yMusicURL,
            iTunesURL: req.body.iTunesURL,
            googlePlayURL: req.body.googlePlayURL,
            spotifyURL: req.body.spotifyURL,
            boomURL: req.body.boomURL,
            image: req.body.image,
            date: new Date(Date.now()),
        });
        media.save();
        return res.json({response: "DONE"});
    });
});

app.post("/api/v1/media/delete", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.response === "NOT_TOKEN") {
            return res.json({response: "USER_FOUND", data: {}});
        }

        newsModel.findByIdAndRemove(req.body._id).then((data) => {
            return res.json({response: "DONE"});
        }).catch((err) => {
            return res.status(500).send(err);
        });
    });
});


app.post("/api/v1/repertoire/get", (req, res) => {
    repertoireModel.find({}).then((data) => {
        return res.json({
            response: "OK", data: data[0]
        })
    })
});

app.post("/api/v1/repertoire/edit", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.length === 0) {
            return res.json({response: "NOT_ACCESS"});
        }

        repertoireModel.findByIdAndUpdate(req.body._id, {
            descriptionEN: req.body.descriptionEN,
            descriptionRU: req.body.descriptionRU,
            descriptionCH: req.body.descriptionCH,
        }).then(() => {
            return res.json({response: "OK"})
        }).catch((err) => {
            return res.status(500).send(err)
        });
    }).catch((err) => {
        return res.status(500).send(err)
    });
});


app.post("/api/v1/storage/image/upload", (req, res) => {
    let file = req.files.file;

    console.log("Upload image");
    console.log(req);

    file.mv("../public/storage/image/" + req.body.filename, (err) => {
        if (err) {
            res.json({response: "OK", url: "/storage/image/" + req.body.filename});
        }

        res.json({response: "OK", url: "/storage/image/" + req.body.filename});
    })
});

// app.post("/storage/image/")

app.listen(PORT, () => {
    usersModel.find({type: "ADMIN"}).then((data) => {
        if (data.length === 0) {
            console.error("Not found admin user\nCreate admin user...");
            let user = new usersModel({
                email: "admin",
                pass: md5("admin"),
                type: "ADMIN",
            });
            user.save().then(() => {
                console.log("Add admin user\nLogin: admin\nPassword: admin");
            }).catch((err) => {
                console.error("Error add admin user\n" + err);
            });
        }
    });

    aboutModel.find({}).then((data) => {
        if (data.length === 0) {
            console.error("Not found about information\nCreate default about information...");
            let about = new aboutModel({
                name: "Person",
                description: "Person desc",
                bioEN: "String #1\n" +
                    "String #2\n" +
                    "String #3\n",
                bioRU: "String #1\n" +
                    "String #2\n" +
                    "String #3\n",
                bioCH: "String #1\n" +
                    "String #2\n" +
                    "String #3\n",
            });
            about.save().then(() => {
                console.log("Add about information");
            }).catch((err) => {
                console.error("Error add about information\n" + err);
            });
        }
    });

    repertoireModel.find({}).then((data) => {
        if (data.length === 0) {
            console.error("Not found repertoire information\nCreate default repertoire information...");
            let repertoire = new repertoireModel({
                descriptionEN: "String #1\n" +
                    "String #2\n" +
                    "String #3\n",
                descriptionRU: "String #1\n" +
                    "String #2\n" +
                    "String #3\n",
                descriptionCH: "String #1\n" +
                    "String #2\n" +
                    "String #3\n",
            });
            repertoire.save().then(() => {
                console.log("Add repertoire information");
            }).catch((err) => {
                console.error("Error add repertoire information\n" + err);
            });
        }
    });

    console.log("Server started on port " + PORT);
});
