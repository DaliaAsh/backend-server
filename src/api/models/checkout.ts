import mongoose from "mongoose";
const checkoutSchema = mongoose.Schema({
    id: Number,
    date: Date,
    products: {
            productId: { type: Number, ref: 'Product' },
            unitPrice:{type:Number},
            quantity: {type:Number,default:1},
            subtotal: {type:Number}
        }
    ,
    total: Number,
    discount: Number,
    paymentAmount: Number,
    paymentMethod: String
});
export default mongoose.model('Checkout', checkoutSchema);