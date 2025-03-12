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
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
