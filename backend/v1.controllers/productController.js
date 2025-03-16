const Product = require('../models/product');
const fs = require("fs");
const path = require("path");

class ProductController {
    async addProduct(req, res) {
        try {
            const { name, category, description, price, stock, farmerId } = req.body;

            if (!req.file) {
                return res.status(400).json({ message: "Product image is required" });
            }

            const product = new Product({
                name,
                category,
                description,
                price,
                stock,
                farmerId,
                productImage: req.file.path
            });

            await product.save();
            res.status(201).json({ message: "Product created successfully", product });
        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    }

    async listProducts(req, res) {
        try {
            const { farmerId } = req.params;
    
            // Fetch all products for the given farmerId
            const products = await Product.find({ farmerId }).sort({ createdAt: -1 });
    
            if (products.length === 0) {
                return res.status(404).json({ message: "No products found for this farmer" });
            }
    
            return res.json({
                message: "Products retrieval successful",
                products
            });
    
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    async updateProduct(req, res) {
        try {
            const { id, name, category, description, price, stock, farmerId } = req.body;

            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            // Update product details
            if (name) product.name = name;
            if (category) product.category = category;
            if (description) product.description = description;
            if (price) product.price = price;
            if (stock) product.stock = stock;
            if (farmerId) product.farmerId = farmerId;
            if (req.file) product.productImage = req.file.path;

            await product.save();
            res.status(200).json({ message: "Product updated successfully", product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;

        try {
            const product = await Product.findById(id);
            
            if (!product) {
                return res.status(404).json({message: "Product not found"});
            }

            if (product.productImage) {
                const imagePath = path.join(__dirname, "../uploads", product.productImage);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await Product.findByIdAndDelete(id);

            res.status(200).json({message: "Product successfully deleted"});
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    }

    async getAllProducts(_, res) {
        try {
            // Fetch all products from the database
            const products = await Product.find().sort({ createdAt: -1 }); // Sort by latest added
    
            if (products.length === 0) {
                return res.status(404).json({ message: "No products found" });
            }
    
            res.json({
                totalProducts: products.length,
                products
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProduct(req, res) {
        const { productId } = req.params;

        try {
            const product = await Product.findOne({_id: productId});

            if (!product) {
                return res.status(404).json({ message: `No product with id: ${productId}` });
            }

            return res.status(200).json({
                message: "Product found successfully",
                product
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ProductController();