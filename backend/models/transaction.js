const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Order", 
        required: true
    },
    status: { 
        type: String, 
        enum: ["Pending", "Completed", "Failed"], 
        default: "Pending" 
    },
    paymentMethod: { 
        type: String, 
        enum: ["Mpesa", "Credit Card", "Cash"], 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
