const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    buyerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    items: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Product", 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            }
        }
    ],
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
