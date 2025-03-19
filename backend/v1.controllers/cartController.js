const Cart = require('../models/cart');

class CartController {
    async addAndUpdateToCart(req, res) {
        const { buyerId, product } = req.body;

        try {
            const cart = await Cart.findOne({ buyerId });
            if (!cart) {
                const newCart = new Cart({ buyerId, products: [product] });
                await newCart.save();
                return res.status(201).json({message: "Cart created", newCart});
            } else {
                const productToUpdate = cart.products.find(_id);
                if (productToUpdate) {
                    if (product.quantity) {
                        productToUpdate.quantity = product.quantity;
                    }
                    await cart.save();
                    return res.status(200).json({message: "updated cart quantity", cart});
                } else {
                    cart.products.push(product);
                    await cart.save();
                    return res.status(200).json({message: "Added new product to cart", cart});
                }
            }
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred while adding to cart.' });
        }
    }

    async deleteFromCart(req, res) {
        const { buyerId, productId } = req.body;

        try {
            const cart = await Cart.findOne({ buyerId });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }

            // Filter out the product to delete
            cart.products = cart.products.filter(product => product._id.toString() !== productId.toString());
            await cart.save();
            return res.status(200).json({ message: "Product removed from cart", cart });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while deleting from cart.' });
        }
    }
}

module.exports = new CartController();