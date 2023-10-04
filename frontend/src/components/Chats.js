import React from "react";
import { ChatState } from "../contexts/ChatProvider";
import NavBar from "./NavBar";

const Chats = () => {
    const { user } = ChatState();

    return (
        <>
            <NavBar />
        </>
    );
};

export default Chats;
