import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true
    },
    address: {
        type: Array,
    },
    status: {
        type: String
    }
}, {timestamps: true});

const Order = mongoose.model('order', orderSchema);
export {Order};