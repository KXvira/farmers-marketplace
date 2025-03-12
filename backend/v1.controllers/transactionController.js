const Transaction = require('../models/transaction');

class TransactionController {
    async processPayment(req, res) {
        try {
            const { orderId, paymentMethod } = req.body;
    
            if (!orderId || !paymentMethod) {
                return res.status(400).json({ error: "Order ID and payment method are required" });
            }
    
            // Check if order exists
            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ error: "Order not found" });
            }
    
            // Prevent duplicate payment
            const existingTransaction = await Transaction.findOne({ orderId, status: "Completed" });
            if (existingTransaction) {
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
    
            if (paymentSuccess) {
                // Update order status to "Completed"
                order.status = "Completed";
                await order.save();
    
                return res.status(200).json({ message: "Payment successful", transaction });
            } else {
                return res.status(400).json({ error: "Payment failed", transaction });
            }
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
}

module.exports = new TransactionController();