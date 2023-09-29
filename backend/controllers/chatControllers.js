const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat");
const User = require("../models/user");

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("User ID not found in the request");
        return res.sendStatus(401);
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user.id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({
                _id: createdChat._id,
            }).populate("users", "-password");

            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const fetchChats = asyncHandler(async (req, res) => {
    try {
        let chats = await Chat.find({
            users: { $elemMatch: { $eq: req.user.id } },
        })
            .populate("users", "-password")
            .populate("groupAdministrator", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        chats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name pic email",
        });

        res.status(200).send(chats);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send("Please fill all the fields");
    }

    const users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdministrator: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdministrator", "-password");

        res.status(200).send(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const renameGroupChat = asyncHandler(async (req, res) => {
    const { groupChatId, groupChatNewName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        groupChatId,
        {
            chatName: groupChatNewName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdministrator", "-password");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
});

const addToGroup = asyncHandler(async (req, res) => {
    const { groupChatId, userIdToAdd } = req.body;

    const added = await Chat.findByIdAndUpdate(
        groupChatId,
        {
            $push: { users: userIdToAdd },
        },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdministrator", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
});

module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    addToGroup,
};
