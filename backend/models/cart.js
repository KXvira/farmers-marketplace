const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.model("Cart", CartSchema);
