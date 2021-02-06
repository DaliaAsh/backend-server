"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var storeSchema = mongoose_1.default.Schema({
    storeId: { type: Number, required: true, unique: true },
    storeName: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    storePhone: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
});
exports.default = mongoose_1.default.model('Store', storeSchema);
