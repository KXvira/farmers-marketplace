const Transaction = require('../models/transaction');
const Order = require('../models/order');
const logger = require('../v1.utils/log');

class TransactionController {
    async processPayment(req, res) {
        try {
            const { orderId, paymentMethod } = req.body;
    
            if (!orderId || !paymentMethod) {
                logger.warn("Validation failed: Missing orderId or paymentMethod", { orderId, paymentMethod });
                return res.status(400).json({ error: "Order ID and payment method are required" });
            }

            logger.info("Processing payment", { orderId, paymentMethod });
    
            // Check if order exists
            const order = await Order.findById(orderId);
            if (!order) {
                logger.warn("Order not found", { orderId });
                return res.status(404).json({ error: "Order not found" });
            }
    
            // Prevent duplicate payment
            const existingTransaction = await Transaction.findOne({ orderId, status: "Completed" });
            if (existingTransaction) {
                logger.warn("Duplicate payment attempt", { orderId });
                return res.status(400).json({ error: "Payment already completed for this order" });
            }
    
            // Simulate payment processing (Replace with real payment API)
            const paymentSuccess = Math.random() > 0.2; // 80% chance of success
    
            // Create a new transaction
            const transaction = new Transaction({
                orderId,
                paymentMethod,
                status: paymentSuccess ? "Completed" : "Failed"
            });
    
            await transaction.save();
            logger.info("Transaction saved", { transactionId: transaction._id, status: transaction.status });
    
            if (paymentSuccess) {
                // Update order status to "Completed"
                order.status = "Completed";
                await order.save();
                logger.info("Order status updated to Completed", { orderId });
    
                return res.status(200).json({ message: "Payment successful", transaction });
            } else {
                logger.warn("Payment failed", { orderId });
                return res.status(400).json({ message: "Payment failed", transaction });
            }
        } catch (error) {
            logger.error(`Server error during payment processing ${error.message }`);
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
}

module.exports = new TransactionController();