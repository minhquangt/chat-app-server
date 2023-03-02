const Conversactions = require('../models/conversactionModel');

const conversactionCtrl = {
    createConversaction: async (req, res) => {
        try {
            const { senderId, receiverId } = req.body;
            const newConversaction = new Conversactions({
                members: [senderId, receiverId],
            });
            const savedConversation = await newConversaction.save();
            return res.status(200).json(savedConversation);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getConversaction: async (req, res) => {
        try {
            const conversactions = await Conversactions.find({
                members: { $in: [req.params.id] },
            });
            return res.status(200).json(conversactions);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = conversactionCtrl;
