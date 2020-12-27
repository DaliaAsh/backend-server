"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_1 = __importDefault(require("../models/product"));
var category_1 = __importDefault(require("../models/category"));
var router = express_1.default.Router();
router.get('/', function (req, res, next) {
    product_1.default.find({}).
        select('id name rawPrice price code color category description stockCount expirationDate').
        then(function (products) {
        res.status(200).json({
            length: products.length,
            products: products,
            request: {
                method: 'GET',
                action: 'Get All Products'
            }
        });
    }).
        catch(function (err) {
        res.status(500).json({
            error: err
        });
    });
});
router.post('/', function (req, res, next) {
    category_1.default.find({ id: req.body.category }).
        then(function (category) {
        if (category.length !== 0) {
            var product = new product_1.default({
                id: req.body.id,
                name: req.body.name,
                rawPrice: req.body.rawPrice,
                price: req.body.price,
                code: req.body.code,
                color: req.body.color,
                category: req.body.category,
                description: req.body.description,
                stockCount: req.body.stockCount,
                expirationDate: req.body.expirationDate
            });
            product.save()
                .then(function (product) {
                res.status(201)
                    .json({
                    message: 'One Product is created',
                    product: product,
                    request: {
                        method: 'POST',
                        action: 'Create new Product'
                    }
                });
            }).catch(function (err) {
                res.status(500).json({
                    error: err
                });
            });
        }
        else {
            res.status(500).
                json({
                error: 'Category Id not found'
            });
        }
    }).catch(function (err) {
        res.status(500).
            json({ error: err });
    });
});
router.get('/:id', function (req, res, next) {
    var productId = req.params.id;
    product_1.default.find({ id: productId }).
        select('id name rawPrice price code color category description stockCount expirationDate').
        then(function (product) {
        res.status(200).
            json({
            product: product,
            request: {
                method: 'GET',
                action: 'Get One Product by Id'
            }
        });
    }).
        catch(function (err) {
        res.status(500).
            json({
            error: err
        });
    });
});
router.delete('/', function (req, res, next) {
    product_1.default.remove({}).
        then(function (result) {
        res.status(200).json({ result: result });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
router.delete('/:id', function (req, res, next) {
    var productId = req.params.id;
    product_1.default.remove({ id: productId }).
        then(function (product) {
        res.status(200).
            json({
            product: product,
            request: {
                method: 'DELETE',
                action: 'Delete One Product By Id'
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
router.put('/:id', function (req, res, next) {
    var productId = req.params.id;
    var props = {};
    for (var _i = 0, _a = req.body; _i < _a.length; _i++) {
        var property = _a[_i];
        props[property.propName] = property.value;
    }
    product_1.default.updateOne({ id: productId }, {
        $set: props
    }).then(function (product) {
        res.status(200).
            json({
            product: product,
            request: {
                method: 'PUT',
                action: 'Update One Product'
            }
        });
    })
        .catch(function (err) {
        res.status(500)
            .json({
            error: err
        });
    });
});
exports.default = router;
