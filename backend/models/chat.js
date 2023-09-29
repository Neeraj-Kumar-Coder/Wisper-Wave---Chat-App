const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "message" },
        groupAdministrator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;
