const Order = require('../models/order');
const Product = require('../models/order');
const Cart = require('../models/cart');
const logger = require('../v1.utils/log');

class OrderController {
    async placeOrder(req, res) {
        try {
            const { buyerId } = req.body;
    
            if (!buyerId) {
                logger.warn("Place order attempt without buyerId.");
                return res.status(400).json({ message: "Buyer ID is required" });
            }
    
            logger.info(`Fetching cart for buyer: ${buyerId}`);
            const cart = await Cart.findOne({ buyerId }).select('products');
    
            if (!cart || cart.products.length === 0) {
                logger.warn(`Cart is empty for buyer: ${buyerId}`);
                return res.status(401).json({ message: "Cart Empty" });
            }
    
            let orders = [];
    
            // Validate products and process the order
            for (let item of cart.products) {
                logger.info(`Processing product ${item._id} for buyer: ${buyerId}`);
                const product = await Product.findById(item._id);
    
                if (!product) {
                    logger.error(`Product with ID ${item._id} not found for buyer: ${buyerId}`);
                    return res.status(404).json({ message: `Product with ID ${item._id} not found` });
                }
    
                if (product.stock < item.quantity) {
                    logger.warn(`Insufficient stock for ${product.name} (ID: ${item._id}), buyer: ${buyerId}`);
                    return res.status(400).json({ message: `Not enough stock for ${product.name}` });
                }
    
                // Reduce stock
                product.stock -= item.quantity;
                await product.save();
                logger.info(`Stock updated for product ${product._id}. Remaining stock: ${product.stock}`);
    
                // Create order
                const order = new Order({
                    buyerId,
                    product: item,
                    totalAmount: product.price * item.quantity,
                    status: "Pending"
                });
    
                await order.save();
                logger.info(`Order placed for product ${item._id}, buyer: ${buyerId}`);
    
                orders.push(order);
            }
    
            // Clear the cart
            await Cart.findOneAndUpdate({ buyerId }, { products: [] });
            logger.info(`Cart cleared for buyer: ${buyerId}`);
    
            res.status(201).json({ message: "Orders placed successfully", orders });
    
        } catch (error) {
            logger.error(`Error placing order for buyer: ${req.body.buyerId} - ${error.message}`);
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
    
            // Restore stock for the canceled product
            const product = await Product.findById(order.product._id);
            if (product) {
                product.stock += order.product.quantity; // Restore the stock
                await product.save();
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
    
            // Find all completed orders
            const orders = await Order.find({ status: "Completed" }).populate("product");
    
            let sales = [];
            let totalRevenue = 0;
    
            orders.forEach(order => {
                if (order.product.farmerId.toString() === farmerId) {
                    const product = order.product;
    
                    sales.push({
                        orderId: order._id,
                        productId: product._id,
                        productName: product.name,
                        quantitySold: product.quantity,
                        totalEarnings: product.quantity * product.price,
                        orderDate: order.createdAt,
                    });
    
                    totalRevenue += product.quantity * product.price;
                }
            });
    
            if (sales.length === 0) {
                return res.status(404).json({ message: "No sales found for this farmer" });
            }
    
            res.json({ totalRevenue, sales });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async viewOrders(req, res) {
        try {
            const { farmerId } = req.params;
    
            // Find all orders that are either pending or completed
            const orders = await Order.find({ status: { $in: ["Pending", "Completed"] } })
                .populate("product");
    
            let farmerOrders = [];
    
            orders.forEach(order => {
                if (order.product.farmerId.toString() === farmerId) {
                    farmerOrders.push({
                        orderId: order._id,
                        buyerId: order.buyerId,
                        productId: order.product._id,
                        productName: order.product.name,
                        quantity: order.product.quantity,
                        totalAmount: order.totalAmount,
                        status: order.status,
                        orderDate: order.createdAt,
                    });
                }
            });
    
            if (farmerOrders.length === 0) {
                return res.status(404).json({ message: "No orders found for your products" });
            }
    
            res.json({ totalOrders: farmerOrders.length, orders: farmerOrders });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }    
}

module.exports = new OrderController();
