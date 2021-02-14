import express from "express";
import Checkout from "../models/checkout";
const router = express.Router();
router.post("/", (req, res) => {
    console.log(req.body)
    const checkout = new Checkout({
        checkoutId: req.body.checkoutId,
        clientName: req.body.clientName,
        barCodeScanner: req.body.barCodeScanner,
        productsOrders: req.body.productsOrders,
        total: req.body.total,
        itemsNumber: req.body.itemsNumber
    });
    checkout.save().then((checkout) => {
        if (checkout) {
            res.status(201).json({
                msg: "checkout added",
                checkout: checkout,
                method: "POST"
            })
        }
    }).catch((err) => {
        res.status(500).json({
            err: err,
            msg: "error in adding checkout"
        })
    })
})
router.get("/", (req, res) => {
    Checkout.find({}).select('checkoutId clientName total barCodeScanner productsOrders total itemsNumber').then((checkouts) => {
        res.status(200).json({
            method: "Fetch All Checkouts",
            checkouts: checkouts
        })
    }).catch((err) => {
        res.status(500).json({
            err: err,
            msg: "an error occur while fetching all checkouts"
        })
    })
})

router.delete("/", (req, res) => {
    Checkout.remove({}).then(() => {
        res.status(200).json({
            msg: "DELETE ALL CHECKOUTS"
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
})
export default router; 
