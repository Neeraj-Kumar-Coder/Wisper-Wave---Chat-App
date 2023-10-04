import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const guestUserDetailFiller = () => {
        setFormData({
            email: "guest.user@guest.com",
            password: "guestuser12345",
        });
    };

    const submitHandler = async () => {
        setLoading(true);

        if (!formData.email || !formData.password) {
            toast({
                title: "Enter valid credentials",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/user/login",
                formData,
                config
            );

            toast({
                title: "Login Successfull",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });

            localStorage.setItem("user-info", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            setLoading(false);
        }
    };

    return (
        <VStack spacing={5}>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type="text"
                    name="email"
                    placeholder="example@email.com"
                    onChange={onChangeHandler}
                    value={formData.email}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={onChangeHandler}
                        value={formData.password}
                    />
                    <InputRightElement w={"4.5rem"}>
                        <Button
                            h={"1.75em"}
                            size={"sm"}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                variant={"outline"}
                colorScheme="blue"
                w={"100%"}
                isLoading={loading}
                onClick={submitHandler}
            >
                Login
            </Button>
            <Button
                variant={"solid"}
                colorScheme="blue"
                w={"100%"}
                onClick={guestUserDetailFiller}
            >
                Get Guest User Details
            </Button>
        </VStack>
    );
};

export default Login;
