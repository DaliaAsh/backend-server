import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})
export default mongoose.model('Admin', adminSchema); 