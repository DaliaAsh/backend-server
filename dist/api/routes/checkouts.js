"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var checkout_1 = __importDefault(require("../models/checkout"));
var router = express_1.default.Router();
router.post('/', function (req, res, next) {
    var checkout = new checkout_1.default({
        id: req.body.id,
        date: req.body.date,
        products: req.body.products,
        total: req.body.total,
        discount: req.body.discount,
        paymentAmount: req.body.paymentAmount,
        paymentMethod: req.body.paymentMethod
    });
    checkout.save().
        then(function (checkout) {
        res.status(200).
            json({
            checkout: checkout,
            request: {
                method: 'POST',
                action: 'create checkout'
            }
        });
    }).
        catch(function (err) {
        console.log(err);
        res.status(500).
            json({
            error: err
        });
    });
});
exports.default = router;
