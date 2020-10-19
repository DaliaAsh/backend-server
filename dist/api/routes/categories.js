"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_1 = __importDefault(require("../models/category"));
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
router.get('/', function (req, res, next) {
    category_1.default.find().
        select('id name categoryImage').
        then(function (categories) {
        console.log(categories);
        res.status(200).json({
            length: categories.length,
            categories: categories,
            request: {
                method: 'GET',
                action: 'Get All Categories'
            }
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
router.post('/', upload.single('categoryImage'), function (req, res, next) {
    var category = new category_1.default({
        id: req.body.id,
        name: req.body.name,
        categoryImage: req.file.path
    });
    category.save().
        then(function (category) {
        res.status(201).json({
            category: {
                name: category.name,
                id: category.id,
                categoryImage: category.categoryImage
            },
            request: {
                method: 'POST',
                action: 'Create new Category'
            }
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
router.get('/:id', function (req, res, next) {
    var categoryId = req.params.id;
    category_1.default.find({ id: categoryId }).
        select('id name categoryImage').
        then(function (category) {
        if (category) {
            res.status(200).json({
                category: category,
                request: {
                    method: 'GET',
                    action: 'Get one Category'
                }
            });
        }
        else {
            res.status(500).json({ message: 'ID Not Found' });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
router.delete('/:id', function (req, res, next) {
    var categoryId = req.params.id;
    category_1.default.remove({ id: categoryId }).
        then(function (category) {
        res.status(200).json({
            category: {
                name: category.name,
                id: category.id
            },
            request: {
                method: 'DELETE',
                action: 'Delete One Category'
            }
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
router.delete('/', function (req, res, next) {
    category_1.default.remove({}).
        then(function (result) {
        res.status(200).json({ result: result });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
router.put('/:id', function (req, res, next) {
    var categoryId = req.params.id;
    var props = {};
    for (var _i = 0, _a = req.body; _i < _a.length; _i++) {
        var property = _a[_i];
        props[property.propName] = property.value;
    }
    category_1.default.updateOne({ id: categoryId }, { $set: props })
        .then(function (category) {
        res.status(200).json({
            Updated_Category: {
                name: category.name,
                id: category.id,
            },
            request: {
                method: 'PUT',
                action: 'Update One Category'
            }
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
exports.default = router;
