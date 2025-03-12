const Product = require('../models/product')

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
            const page = parseInt(req.query.page) || 1; // Default page is 1
            const limit = parseInt(req.query.limit) || 10; // Default limit is 10
            const skip = (page - 1) * limit;

            // Get total count of products for pagination metadata
            const totalProducts = await Product.countDocuments({ farmerId });

            // Fetch paginated products
            const products = await Product.find({ farmerId })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }); // Sort by latest added

            if (products.length === 0) {
                return res.status(404).json({ message: "No products found for this farmer" });
            }

            res.json({
                currentPage: page,
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
                products
            });

            res.status(201).json({message: "Products retrieval successful", products});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, category, description, price, stock, farmerId } = req.body;

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

    async searchProducts(req, res) {
        try {
            const { category, page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = req.query;

            if (!category) {
                return res.status(400).json({ error: "Category is required" });
            }

            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            // Filtering by category
            const filter = { category };

            // Sorting
            const sortOrder = order === "asc" ? 1 : -1;
            const sortCriteria = {};
            sortCriteria[sortBy] = sortOrder;

            // Get total count for pagination metadata
            const totalProducts = await Product.countDocuments(filter);

            // Fetch filtered and sorted products
            const products = await Product.find(filter)
                .skip(skip)
                .limit(limitNum)
                .sort(sortCriteria);

            if (products.length === 0) {
                return res.status(404).json({ message: "No products found in this category" });
            }

            res.json({
                currentPage: pageNum,
                totalPages: Math.ceil(totalProducts / limitNum),
                totalProducts,
                products
            });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
}

module.exports = new ProductController();