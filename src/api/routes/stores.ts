import express from "express";
import Store from "../models/store";
const router = express.Router();
router.get("/", (req, res) => {
    Store.find().select('storeId storeName email storePhone country city ').then((stores) => {
        console.log(stores);
        res.status(200).json({
            length: stores.length,
            stores: stores,
            request: {
                method: "GET",
                action: "Get all stores"
            }
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})
router.post("/", (req, res, next) => {
    console.log(req.body);
    const store = new Store({
        storeId: Number(req.body.storeId),
        storeName: req.body.storeName,
        email: req.body.email,
        storePhone: Number(req.body.storePhone),
        city: req.body.city,
        country: req.body.country
    })
    store.save().then((store) => {
        res.status(201).json({
            store: {
                storeName: store.storeName,
                email: store.email
            },
            request: {
                method: 'POST',
                action: 'Add new Store'
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
    Store.remove({}).then(() => {
        res.status(200).json({
            action: "Delete All stores"
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
})
export default router; 