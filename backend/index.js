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
let photoModel = require("./models/photo");

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

app.post("/api/v1/photo/get", (req, res) => {
    photoModel.findOne({_id: req.body._id}).then((data) => {
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

app.post("/api/v1/photo/add", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.length === 0) {
            return res.json({response: "NOT_ACCESS"});
        }

        let photo = new photoModel({
            src: req.body.src,
            alt: req.body.alt,
        });
        photo.save();
        return res.json({response: "DONE"});
    });
});

app.post("/api/v1/photo/delete", (req, res) => {
    userSessionModel.find({token: req.body.token}).then(data => {
        if (data.length === 0) {
            return res.json({response: "NOT_ACCESS"});
        }

        photoModel.findByIdAndRemove(req.body._id).then((data) => {
            return res.json({response: "DONE"});
        }).catch((err) => {
            return res.status(500).send(err);
        });
    });
});

app.post("/api/v1/storage/image/upload", (req, res) => {
    let file = req.files.file;

    file.mv("storage/image/" + req.body.filename, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.json({response: "OK", url: "/image/" + req.body.filename});
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
    console.log("Server started on port " + PORT);
});
