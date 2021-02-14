"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = __importDefault(require("../models/admin"));
var router = express_1.default.Router();
router.post("/", function (req, res, next) {
    console.log(req.body);
    var admin = new admin_1.default({
        id: req.body.id,
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    admin.save().then(function (admin) {
        res.status(201).json({
            action: "Create new Admin"
        });
    }).catch(function (err) {
        res.status(500).json({
            error: err
        });
    });
});
router.get("/:name/:password", function (req, res) {
    admin_1.default.find({ name: req.params.name, password: req.params.password }).then(function (admin) {
        if (admin) {
            res.status(200).json({
                admin: admin
            });
        }
    }).catch(function (err) {
        res.status(500).json({
            error: err
        });
    });
});
exports.default = router;
