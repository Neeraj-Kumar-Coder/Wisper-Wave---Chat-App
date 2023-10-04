import React, { useEffect } from "react";
import {
    Container,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("user-info");
        if (userInfo) navigate("/chats");
    }, [navigate]);

    return (
        <Container centerContent>
            <Heading textAlign={"center"} my={10}>
                Wisper Wave
            </Heading>
            <Tabs variant={"soft-rounded"} isFitted w={"100%"}>
                <TabList>
                    <Tab>Login</Tab>
                    <Tab>Sign Up</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Signup />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default Home;
