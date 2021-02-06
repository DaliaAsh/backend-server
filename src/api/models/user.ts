import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userImagePath: { type: String, required: true },
    role: { type: String, required: true },
})
export default mongoose.model('User', userSchema); 