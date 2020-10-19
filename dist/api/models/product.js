"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var productSchema = mongoose_1.default.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    rawPrice: { type: Number, required: true },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (price) {
                return price > this.rawPrice;
            },
            message: "Price has to be greater than raw price",
        },
        min: [0, "Price has to be greater than 0"],
    },
    code: { type: String, required: true, unique: true, validate: {
            validator: function (v) {
                return /[A-Z][A-Z][A-Z][-][a-z][a-z][a-z][-][0-9][0-9][0-9][0-9]/.test(v);
            },
            message: function (props) { return props.value + " is not a valid code!"; }
        }
    },
    color: { type: String, required: false },
    category: { type: Number, required: true, ref: 'Category' },
    description: { type: String, required: false },
    stockCount: { type: Number, required: false },
    expirationDate: { type: Date, required: false }
});
exports.default = mongoose_1.default.model('Product', productSchema);
