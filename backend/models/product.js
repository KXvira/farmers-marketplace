const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true,
        enum: [
            "Fruits",
            "Vegetables",
            "Grains",
            "Dairy",
            "Meat",
            "Poultry",
            "Seafood"
        ]
    },
    unit: {
        type: String,
        default: "Kg",
        enum: [
            "Kg",
            "Pieces",
            "Liters"
        ]
    },
    description: {
        type: String,
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    farmerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    productImage: {
        type: String,
        required: true
    },
    approved: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
