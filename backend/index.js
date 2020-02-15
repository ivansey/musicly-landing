require("dotenv").config();
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let md5 = require('md5');
let cors = require('cors');
let fileUpload = require("express-fileupload");
let VKAPI = require("vksdk");
let youTube = require("youtube-node");

mongoose.connect("mongodb://localhost/landing");

let usersModel = require('./models/users');
let userSessionModel = require('./models/userSession');
let aboutModel = require("./models/about");
let galleryModel = require("./models/gallery");

let app = express();

app.use(bodyParser());
app.use(fileUpload());
app.use(cors());
app.use(express.static("storage"));

let youTubeAPI = new youTube();

youTubeAPI.setKey("AIzaSyBegHAkNTirmY5jIMKGckSQc16r_osnuXo");

youTubeAPI.search("World War z Trailer", 2, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(res);
    }
})


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


app.get("/api/v1/gallery/get", (req, res) => {
    return res.json({
        videos: [
            "https://www.youtube.com/watch?v=axiEs5nfp3I",
            "https://www.youtube.com/watch?v=cNuXcezaQrg&t=2s",
            "https://www.youtube.com/watch?v=3QkTW0XhG3c",
        ]
    })
});


app.post("/api/v1/social/vk/posts/get/photo", (req, res) => {
    let wall = [];
    let VK = new VKAPI({
        "appId"     : process.env.VK_APP_ID,
        "appSecret" : process.env.VK_APP_SECRET,
        "language"  : "ru"
    });(async () => {
        VK.on('serverTokenReady', function(_o) {
            VK.setToken(_o.access_token);
        });

        VK.setSecureRequests(true);

        VK.request('secure.getSMSHistory', {}, function(_dd) {
            console.log(_dd);
        });

        await VK.setToken(process.env.VK_TOKEN);

        VK.request("wall.get", {
            "owner_id"  : process.env.VK_ALBUM,
            "count"     : 50
        }, (data) => {
            console.log(data);
            data.response.items.map((post) => {
                if (post.copy_history === undefined && post.attachments !== undefined) {
                    post.attachments.map((photo) => {
                        if (photo.type === "photo" && photo.photo.photo_1280 !== undefined) {
                            wall.push(photo.photo.photo_1280);
                        }
                    })
                }
            });
            return res.json({data: wall, response: "DONE"})
        });
    })()
});


app.post("/api/v1/storage/image/upload", (req, res) => {
    let file = req.files.file;

    console.log("Upload image");

    file.mv("../public/storage/image/" + req.body.filename, (err) => {
        if (err) {
            res.json({response: "OK", url: "/storage/image/" + req.body.filename});
        }

        res.json({response: "OK", url: "/storage/image/" + req.body.filename});
    })
});


// app.post("/storage/image/")

app.listen(process.env.PORT_BACKEND, () => {
    usersModel.find({type: "ADMIN"}).then((data) => {
        if (data.length === 0) {
            console.error("Not found admin user\nCreate admin user...");
            let user = new usersModel({
                email: process.env.DEFAULT_LOGIN_ADMIN,
                pass: md5(process.env.DEFAULT_PASSWORD_ADMIN),
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

    console.log("Server started on port " + process.env.PORT_BACKEND);
});
