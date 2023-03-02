const Messages = require('../models/messageModel');

const messageCtrl = {
    createMessage: async (req, res) => {
        try {
            const { conversactionId, sender, text } = req.body;
            const newmessage = new Messages({
                conversactionId, sender, text
            });
            const savedMessage = await newmessage.save();
            return res.status(200).json(savedMessage);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getMessage: async (req, res) => {
        try {
            const messages = await Messages.find({
                conversactionId: req.params.conversactionId
            }, { createdAt: false, updatedAt: false });
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = messageCtrl;
