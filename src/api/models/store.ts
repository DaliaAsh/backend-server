import mongoose from "mongoose";
const storeSchema = mongoose.Schema({
    storeId: { type: Number, required: true, unique: true },
    storeName: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    storePhone: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
})
export default mongoose.model('Store', storeSchema); 