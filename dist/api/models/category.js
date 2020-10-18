"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var categorySchema = mongoose_1.default.Schema({
    id: { type: Number, unique: true },
    name: { type: String, unique: true }
});
exports.default = mongoose_1.default.model('Category', categorySchema);