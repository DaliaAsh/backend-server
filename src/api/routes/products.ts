import express from "express";
import Product from "../models/product";
const router = express.Router();
router.get('/', (req, res, next) => {
    Product.find({}).
        select('id name rawPrice price code color categoryId description stockCount expirationDate').
        then((products) => {
            res.status(200).json({
                length :products.length,
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

router.post('/', (req, res, next) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        rawPrice: req.body.rawPrice,
        price: req.body.price,
        code: req.body.code,
        color: req.body.color,
        categoryId: req.body.categoryId,
        description: req.body.description,
        stockCount: req.body.stockCount,
        expirationDate: req.body.expirationDate
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
            res.status(500).json({
                error: err
            })
        })
});

router.get('/:id', (req, res, next) => {
    const productId = req.params.id;
    Product.find({ id: productId }).
        select('id name rawPrice price code color categoryId description stockCount expirationDate').
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
                product:product,
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