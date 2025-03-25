const Cart = require('../models/cart');
const logger = require('../v1.utils/log');

class CartController {
    async addAndUpdateToCart(req, res) {
        const { buyerId, product } = req.body;

        // Ensure product and product._id are valid
        if (!product || !product._id) {
            return res.status(400).json({ message: 'Invalid product data.' });
        }

        try {
            logger.info(`Processing cart update for buyer: ${buyerId}`);
            const cart = await Cart.findOne({ buyerId });
            if (!cart) {
                logger.info(`Creating new cart for buyer: ${buyerId}`);
                const newCart = new Cart({ buyerId, products: [product] });
                await newCart.save();
                return res.status(201).json({message: "Cart created", newCart});
            } else {
                logger.info(`Updating existing cart for buyer: ${buyerId}`);

                if (!Array.isArray(cart.products)) {
                    return res.status(500).json({ message: 'Cart products structure is invalid.' });
                }

                logger.info(`Cart structure: ${JSON.stringify(cart)}`);

                const productIndex = cart.products.findIndex((p) => p._id.toString() === product._id.toString());
                if (productIndex !== -1) {
                    if (product.quantity && typeof product.quantity === "number") {
                        logger.info(`Updating quantity of product ${product._id} in cart for buyer: ${buyerId}`);
                        cart.products[productIndex].quantity = product.quantity;
                        console.log(productIndex);
                        console.log(cart.products[productIndex].quantity);
                        cart.markModified('products');
                        await cart.save();
                        console.log("already save");
                        return res.status(200).json({ message: "Updated cart quantity", cart });
                    }
                    logger.warn(`Product ${product._id} already exists in cart for buyer: ${buyerId}, no quantity update provided.`);
                    return res.status(404).json({message: "Product already exists in cart"});
                } else {
                    logger.info(`Adding new product ${product._id} to cart for buyer: ${buyerId}`);
                    cart.products.push(product);
                    await cart.save();
                    return res.status(200).json({message: "Added new product to cart", cart});
                }
            }
        } catch (error) {
            logger.error(`Error updating cart for buyer: ${buyerId} - ${error.message}`);
            return res.status(500).json({ message: 'An error occurred while adding to cart.' });
        }
    }

    async viewCart(req, res) {
        const {buyerId} = req.params;

        try {
            logger.info(`Fetching cart for buyer: ${buyerId}`);
            const cart = await Cart.findOne({buyerId}).select('products');
            if (!cart) {
                logger.warn(`Cart not found for buyer: ${buyerId}`);
                return res.status(404).json({message: "Cart is empty"});
            }

            logger.info(`Cart retrieved successfully for buyer: ${buyerId}`);
            return res.status(200).json({message: "Cart successfully retrieved", cart});

        } catch (error) {
            logger.error(`Error retrieving cart for buyer: ${buyerId} - ${error.message}`);
            return res.status(500).json({ message: 'An error occurred while viewing cart.' });
        }
    }

    async deleteFromCart(req, res) {
        const { buyerId, productId } = req.body;

        try {
            logger.info(`Deleting product ${productId} from cart for buyer: ${buyerId}`);
            const cart = await Cart.findOne({ buyerId });
            if (!cart) {
                logger.warn(`Cart not found for buyer: ${buyerId}`);
                return res.status(404).json({ message: "Cart not found" });
            }
            // Check if the product exists in the cart
            const productExists = cart.products.some(product => product._id.toString() === productId.toString());

            if (!productExists) {
                logger.warn(`Product ${productId} not found in cart for buyer: ${buyerId}`);
                return res.status(404).json({ message: "Product not found in cart" });
            }

            // Filter out the product to delete
            cart.products = cart.products.filter(product => product._id.toString() !== productId.toString());
            await cart.save();

            logger.info(`Product ${productId} successfully removed from cart for buyer: ${buyerId}`);
            return res.status(200).json({ message: "Product removed from cart", cart });
        } catch (error) {
            logger.error(`Error deleting product ${productId} from cart for buyer: ${buyerId} - ${error.message}`);
            return res.status(500).json({ message: 'An error occurred while deleting from cart.' });
        }
    }
}

module.exports = new CartController();