"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var store_1 = __importDefault(require("../models/store"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    store_1.default.find().select('storeId storeName email storePhone country city ').then(function (stores) {
        console.log(stores);
        res.status(200).json({
            length: stores.length,
            stores: stores,
            request: {
                method: "GET",
                action: "Get all stores"
            }
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
router.post("/", function (req, res, next) {
    console.log(req.body);
    var store = new store_1.default({
        storeId: Number(req.body.storeId),
        storeName: req.body.storeName,
        email: req.body.email,
        storePhone: Number(req.body.storePhone),
        city: req.body.city,
        country: req.body.country
    });
    store.save().then(function (store) {
        res.status(201).json({
            store: {
                storeName: store.storeName,
                email: store.email
            },
            request: {
                method: 'POST',
                action: 'Add new Store'
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
    store_1.default.remove({}).then(function () {
        res.status(200).json({
            action: "Delete All stores"
        });
    }).catch(function (err) {
        res.status(500).json({
            error: err
        });
    });
});
exports.default = router;
