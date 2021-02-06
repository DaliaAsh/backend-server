import express from "express";
import Product from "../models/product";
import Category from '../models/category';
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
router.get('/', (req, res, next) => {
    Product.find({}).
        select('id name rawPrice price code taxMethod category description stockCount expirationDate productImage').
        then((products) => {
            console.log(products)
            res.status(200).json({
                length: products.length,
                products: products,
                request: {
                    method: 'GET',
                    action: 'Get All Products'
                }
            })
        }).
        catch((err) => {
            res.status(500).json({
                error: err
            })
        })
});

router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.body)
    Category.find({ name: req.body.category }).
        then(
            (category) => {
                if (category.length !== 0) {
                    const product = new Product({
                        id: req.body.id,
                        name: req.body.name,
                        rawPrice: Number(req.body.rawPrice),
                        price: Number(req.body.price),
                        code: req.body.code,
                        color: req.body.color,
                        category: req.body.category,
                        description: req.body.productDescription,
                        stockCount: Number(req.body.stockCount),
                        expirationDate: req.body.expirationDate,
                        productImage: req.file.path,
                        taxMethod: req.body.taxMethod
                    });
                    product.save()
                        .then((product) => {
                            res.status(201)
                                .json({
                                    message: 'One Product is created',
                                    product: product,
                                    request: {
                                        method: 'POST',
                                        action: 'Create new Product'
                                    }
                                })
                        }).catch((err) => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        })
                } else {
                    res.status(500).
                        json({
                            error: 'Category Id not found'
                        })
                }
            }
        ).catch((err) => {
            res.status(500).
                json({ error: err });
        })

});

router.get('/:id', (req, res, next) => {
    const productId = req.params.id;
    Product.find({ id: productId }).
        select('id name rawPrice price code color category description stockCount expirationDate productImage').
        then((product) => {
            res.status(200).
                json({
                    product: product,
                    request: {
                        method: 'GET',
                        action: 'Get One Product by Id'
                    }
                })
        }).
        catch((err) => {
            res.status(500).
                json({
                    error: err
                })
        })
});
router.delete('/', (req, res, next) => {
    Product.remove({}).
        then((result) => {
            res.status(200).json({ result: result });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});
router.delete('/:id', (req, res, next) => {
    const productId = req.params.id;
    Product.remove({ id: productId }).
        then((product) => {
            res.status(200).
                json({
                    product: product,
                    request: {
                        method: 'DELETE',
                        action: 'Delete One Product By Id'
                    }
                })
        }).
        catch((err) => {
            console.log(err);
            res.status(500).
                json({
                    error: err
                })
        })
});
router.put('/:id', (req, res, next) => {
    const productId = req.params.id;
    const props = {};
    for (let property of req.body) {
        props[property.propName] = property.value;
    }
    Product.updateOne({ id: productId }, {
        $set: props
    }).then((product) => {
        res.status(200).
            json({
                product: product,
                request: {
                    method: 'PUT',
                    action: 'Update One Product'
                }
            })
    })
        .catch((err) => {
            res.status(500)
                .json({
                    error: err
                })
        })

});




export default router; 