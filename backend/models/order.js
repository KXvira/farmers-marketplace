const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    buyerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    product: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    status: { 
        type: String, 
        enum: ["Pending", "Completed", "Cancelled"], 
        default: "Pending" 
    },
    totalAmount: { 
        type: Number, 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
