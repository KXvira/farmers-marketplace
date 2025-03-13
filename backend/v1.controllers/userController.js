const User = require('../models/user');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const { email, password, role } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ message: "Invalid email" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid password"});

            if (user.role !== role) {
                return res.status(401).json({ message: "Invalid role"});
            }

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

    async editProfile(req, res) {
        const { id, name, email, farm, address, password, phone } = req.body;

        try {
            const user = await User.findOne({_id: id});
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (name) user.name = name;
            if (email) user.email = email;
            if (phone) user.phone = phone;
            if (password) user.password = password;

            if (user.role === "farmer") {
                if (farm) user.farm = farm;
            }
    
            if (user.role === "buyer") {
                if (address) user.address = address;
            }

            await user.save();

            res.status(200).json({ message: "Profile updated successfully", user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async viewFarmer(req, res) {
        const { farmerId } = req.params;

        try {
            const farmer = await User.findOne({_id: farmerId}).select("name phone farm");
            console.log(farmer);

            if (!farmer) {
                return res.status(404).json({ message: "Farmer not found" });
            }

            return res.status(200).json(farmer);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async viewProfile(req, res) {
        const { userId } = req.params;

        try {
            const user = await User.findOne({_id: userId});

            if (!user) {
                return res.status(404).json({ message: `No user with id: ${userId}` });
            }

            return res.status(200).json({ message: "User profile successfully retrieved", user});
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports =  new UserController();
