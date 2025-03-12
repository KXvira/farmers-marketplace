const Order = require('../models/order')

class OrderController {
    async placeOrder(req, res) {
        try {
            const { buyerId, items } = req.body;
    
            if (!buyerId || !items || items.length === 0) {
                return res.status(400).json({ message: "Buyer ID and at least one item are required" });
            }
    
            let totalAmount = 0;
    
            // Validate products and calculate total price
            for (let item of items) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
                }
    
                if (product.stock < item.quantity) {
                    return res.status(400).json({ message: `Not enough stock for ${product.name}` });
                }
    
                item.price = product.price;
                totalAmount += item.price * item.quantity;
    
                // Reduce stock
                product.stock -= item.quantity;
                await product.save();
            }
    
            const order = new Order({
                buyerId,
                items,
                totalAmount,
                status: "Pending"
            });
    
            await order.save();
            res.status(201).json({ message: "Order placed successfully", order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async cancelOrder(req, res) {
        try {
            const { orderId } = req.params;
            const order = await Order.findById(orderId);
    
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
    
            if (order.status !== "Pending") {
                return res.status(400).json({ message: "Only pending orders can be canceled" });
            }
    
            // Restore stock for canceled items
            for (let item of order.items) {
                const product = await Product.findById(item.productId);
                if (product) {
                    product.stock += item.quantity;
                    await product.save();
                }
            }
    
            order.status = "Cancelled";
            await order.save();
    
            res.json({ message: "Order canceled successfully", order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { orderId } = req.params;
            const { status } = req.body;
    
            if (!["Pending", "Completed", "Cancelled"].includes(status)) {
                return res.status(400).json({ message: "Invalid status update" });
            }
    
            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
    
            order.status = status;
            await order.save();
    
            res.json({ message: `Order status updated to ${status}`, order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async viewSales(req, res) {
        try {
            const { farmerId } = req.params;
    
            // Find all completed orders containing products sold by this farmer
            const orders = await Order.find({ status: "Completed" }).populate("items.productId");
    
            // Filter orders to only include products from this farmer
            let sales = [];
            let totalRevenue = 0;
    
            orders.forEach(order => {
                order.items.forEach(item => {
                    if (item.productId.farmerId.toString() === farmerId) {
                        sales.push({
                            orderId: order._id,
                            productId: item.productId._id,
                            productName: item.productId.name,
                            quantitySold: item.quantity,
                            totalEarnings: item.quantity * item.price,
                            orderDate: order.createdAt,
                        });
    
                        totalRevenue += item.quantity * item.price;
                    }
                });
            });
    
            if (sales.length === 0) {
                return res.status(404).json({ message: "No sales found for this farmer" });
            }
    
            res.json({ totalRevenue, sales });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new OrderController();
