"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var checkoutSchema = mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('Checkout', checkoutSchema);
