import mongoose from "mongoose";
const checkoutSchema = mongoose.Schema({
    checkoutId: { type: Number, required: true, unique: true },
    clientName: { type: String },
    barCodeScanner: { type: String },
    productsOrders: [
        {
            productName: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            id: { type: String, required: true, unique: true },
        }
    ],
    total: { type: Number, required: true },
    itemsNumber: { type: Number, required: true },
});
export default mongoose.model('Checkout', checkoutSchema);