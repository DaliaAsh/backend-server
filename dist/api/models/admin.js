"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var adminSchema = mongoose_1.default.Schema({
    id: { type: Number, unique: true },
    name: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
exports.default = mongoose_1.default.model('Admin', adminSchema);
