const Users = require('../models/userModel');
const bcrypt = require('bcrypt');

const userCtrl = {
    getInfo: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Users.findById(id, { createdAt: false, updatedAt: false });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateInfo: async (req, res) => {
        const id = req.params.id;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await Users.findByIdAndUpdate(
                id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    register: async (req, res) => {
        try {
            const { username, email } = req.body;
            // check email is already exist
            const user = await Users.findOne({ email });
            if (user)
                return res
                    .status(400)
                    .json({ msg: 'The email already exists.' });

            const passwordHash = await bcrypt.hash(req.body.password, 10);
            const newUser = new Users({
                username,
                email,
                password: passwordHash,
            });

            // Save mongodb
            await newUser.save();

            return res.status(200).json({ msg: 'Register successfully!!!' });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req, res) => {
        const { email } = req.body;
        try {
            // check email is already exist
            const user = await Users.findOne({ email });
            if (!user)
                return res
                    .status(400)
                    .json({ msg: 'Incorect email or password.' });

            // check password is correct
            const isMatch = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isMatch)
                return res.status(400).json({ msg: 'Incorrect password.' });

            const { password, ...others } = user._doc;
            return res.status(200).json({ ...others });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllUser: async (req, res) => {
        try {
            const currentUserId = req.params.currentUserId;
            const users = await Users.find({ _id: { $ne: currentUserId } });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = userCtrl;
