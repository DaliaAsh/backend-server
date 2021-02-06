import express from "express";
import User from "../models/user";
import multer from "multer";
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets');
    }, filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
router.get("/", (req, res) => {
    User.find().select('userId userName firstName lastName  email password userImagePath role').then((users) => {
        console.log(users);
        res.status(200).json({
            length: users.length,
            users: users,
            request: {
                method: "GET",
                action: "Get all users"
            }
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})
router.post("/", upload.single('userImage'), (req, res, next) => {
    console.log(req.body);
    const user = new User({
        userId: Number(req.body.userId),
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userImagePath: req.file.path,
        role: req.body.role
    })
    user.save().then((user) => {
        res.status(201).json({
            user: {
                userName: user.userName,
                email: user.email
            },
            request: {
                method: 'POST',
                action: 'Add new User'
            }
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })


})

router.delete("/", (req, res) => {
    User.remove({}).then(() => {
        res.status(200).json({
            action: "Delete All users"
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
})
export default router; 