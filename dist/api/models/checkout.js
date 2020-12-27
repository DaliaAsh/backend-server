"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var checkoutSchema = mongoose_1.default.Schema({
    id: Number,
    date: Date,
    products: {
        productId: { type: Number, ref: 'Product' },
        unitPrice: { type: Number },
        quantity: { type: Number, default: 1 },
        subtotal: { type: Number }
    },
    total: Number,
    discount: Number,
    paymentAmount: Number,
    paymentMethod: String
});
exports.default = mongoose_1.default.model('Checkout', checkoutSchema);
