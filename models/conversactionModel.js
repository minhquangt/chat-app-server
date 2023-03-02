const mongoose = require('mongoose');

const ConversactionSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Conversaction', ConversactionSchema);
