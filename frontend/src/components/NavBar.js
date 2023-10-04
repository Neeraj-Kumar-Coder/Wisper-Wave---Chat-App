import React from "react";
import {
    Avatar,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { ChatState } from "../contexts/ChatProvider";
import ProfileModal from "./ProfileModal";

const NavBar = () => {
    const { user } = ChatState();

    return (
        <Flex
            as={"nav"}
            alignItems="center"
            justifyContent="space-between"
            p="0.5rem"
            backgroundColor="gray.300"
        >
            <Tooltip
                label="Enter user to search"
                hasArrow
                placement="bottom-end"
            >
                <Button leftIcon={<SearchIcon />}>Search for a user</Button>
            </Tooltip>
            <Text fontSize="xl">Wisper Wave</Text>
            <Flex alignItems="center" gap="0.5rem">
                <Menu>
                    <MenuButton>
                        <BellIcon fontSize="1.5rem" />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Sample Notification 1</MenuItem>
                        <MenuDivider />
                        <MenuItem>Sample Notification 2</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar
                            name={user.name}
                            src={user.profilePicture}
                            size="sm"
                        />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}><MenuItem>My Profile</MenuItem></ProfileModal>
                        <MenuDivider />
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
};

export default NavBar;
