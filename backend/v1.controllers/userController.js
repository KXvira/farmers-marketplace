const User = require('../models/user');
const bcrypt= require('bcrypt');
require('dotenv').config()

class UserController {
    async register(req, res) {
        try {
            const { name, email, role, farm, address, password, phone } = req.body;

            if (role === "buyer" && farm) {
                return res.status(400).json({ message: "Buyers cannot have farm details." });
            }

            const user = new User({ name, email, role, farm, address, password, phone });
            await user.save();

            res.status(201).json({ message: "user registered successfully"});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ message: "Invalid email" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid password"});

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
            res.status(201).json({ message: "Login successful", token, id: user._id});
        } catch (error)  {
            res.status(500).json({ message: error.message });
        }
    }

    async logout(_ , res) {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    }
}

module.exports =  new UserController();
