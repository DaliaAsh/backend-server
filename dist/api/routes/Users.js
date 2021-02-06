"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("../models/user"));
var multer_1 = __importDefault(require("multer"));
var router = express_1.default.Router();
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets');
    }, filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var upload = multer_1.default({
    storage: storage,
    fileFilter: fileFilter
});
router.get("/", function (req, res) {
    user_1.default.find().select('userId userName firstName lastName  email password userImagePath role').then(function (users) {
        console.log(users);
        res.status(200).json({
            length: users.length,
            users: users,
            request: {
                method: "GET",
                action: "Get all users"
            }
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
router.post("/", upload.single('userImage'), function (req, res, next) {
    console.log(req.body);
    var user = new user_1.default({
        userId: Number(req.body.userId),
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userImagePath: req.file.path,
        role: req.body.role
    });
    user.save().then(function (user) {
        res.status(201).json({
            user: {
                userName: user.userName,
                email: user.email
            },
            request: {
                method: 'POST',
                action: 'Add new User'
            }
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
router.delete("/", function (req, res) {
    user_1.default.remove({}).then(function () {
        res.status(200).json({
            action: "Delete All users"
        });
    }).catch(function (err) {
        res.status(500).json({
            error: err
        });
    });
});
exports.default = router;
