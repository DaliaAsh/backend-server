"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var checkout_1 = __importDefault(require("../models/checkout"));
var router = express_1.default.Router();
router.post("/", function (req, res) {
    console.log(req.body);
    var checkout = new checkout_1.default({
        checkoutId: req.body.checkoutId,
        clientName: req.body.clientName,
        barCodeScanner: req.body.barCodeScanner,
        productsOrders: req.body.productsOrders,
        total: req.body.total,
        itemsNumber: req.body.itemsNumber
    });
    checkout.save().then(function (checkout) {
        if (checkout) {
            res.status(201).json({
                msg: "checkout added",
                checkout: checkout,
                method: "POST"
            });
        }
    }).catch(function (err) {
        res.status(500).json({
            err: err,
            msg: "error in adding checkout"
        });
    });
});
router.get("/", function (req, res) {
    checkout_1.default.find({}).select('checkoutId clientName total barCodeScanner productsOrders total itemsNumber').then(function (checkouts) {
        res.status(200).json({
            method: "Fetch All Checkouts",
            checkouts: checkouts
        });
    }).catch(function (err) {
        res.status(500).json({
            err: err,
            msg: "an error occur while fetching all checkouts"
        });
    });
});
router.delete("/", function (req, res) {
    checkout_1.default.remove({}).then(function () {
        res.status(200).json({
            msg: "DELETE ALL CHECKOUTS"
        });
    }).catch(function (err) {
        res.status(500).json({
            error: err
        });
    });
});
exports.default = router;
