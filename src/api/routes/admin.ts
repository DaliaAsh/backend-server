import express from "express";
import Admin from "../models/admin";
const router = express.Router();
router.post("/", (req, res, next) => {
    console.log(req.body)
    const admin = new Admin({
        id: req.body.id,
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    admin.save().then((admin) => {
        res.status(201).json({
            action: "Create new Admin"
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
})
router.get("/:name/:password", (req, res) => {
    Admin.find({ name: req.params.name, password: req.params.password }).then((admin) => {
        if (admin) {
            res.status(200).json({
                admin: admin
            })
        }
    }).catch((err) => {
        res.status(500).json({
            error: err
        })

    })
})
export default router; 