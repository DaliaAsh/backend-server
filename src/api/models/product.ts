import mongoose from "mongoose";
const productSchema = mongoose.Schema({
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
    code: { type: String, required: true, unique: true,
        validate: {
            validator: function(v) {
              return /[A-Z][A-Z][A-Z][-][a-z][a-z][a-z][-][0-9][0-9][0-9][0-9]/.test(v);
            },
            message: props => `${props.value} is not a valid code!`
          }
    },
    color: { type: String, required: false },
    categoryId: { type: Number, required: true, ref: 'Category' },
    description: { type: String, required: false },
    stockCount: { type: Number, required: false },
    expirationDate: { type: Date, required: false }
});
export default mongoose.model('Product', productSchema); 