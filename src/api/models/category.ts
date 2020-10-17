import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, unique: true }
});
export default mongoose.model('Category', categorySchema); 
