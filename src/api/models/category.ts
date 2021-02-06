import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, unique: true },
    categoryImage: { type: String, required: true }
});
export default mongoose.model('Category', categorySchema); 
