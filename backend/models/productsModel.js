import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    numReview: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Products = mongoose.model('product', productSchema);
export {Products};