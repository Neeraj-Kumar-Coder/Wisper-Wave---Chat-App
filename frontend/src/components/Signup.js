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

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        pic: "",
    });
    const toast = useToast();
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const uploadAndSave = async (image) => {
        setLoading(true);
        if (!image) {
            toast({
                title: "Please select an Image",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        if (image.type === "image/jpeg" || image.type === "image/png") {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "wisper_wave");
            data.append("cloud_name", "dqrynfiu3");
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dqrynfiu3/upload",
                {
                    method: "post",
                    body: data,
                }
            );

            const responseData = await response.json();
            setFormData({ ...formData, pic: responseData.url.toString() });
            setLoading(false);
            return;
        }

        toast({
            title: "Please select a valid Image",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
        setLoading(false);
    };

    const submitHandler = async () => {
        setLoading(true);
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            toast({
                title: "Please fill all the required fields",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Password don't match",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const payload = formData;
            delete payload.confirmPassword;
            const { data } = await axios.post(
                "/api/user/signup",
                payload,
                config
            );

            toast({
                title: "Registeration Successfull",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });

            localStorage.setItem("user-info", JSON.stringify(data));

            setLoading(false);

            navigate("/chats");
        } catch (error) {}
    };

    return (
        <VStack spacing={5}>
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    placeholder="Thomas Shelby"
                    name="name"
                    onChange={onChangeHandler}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type="text"
                    placeholder="thomas.shelby@birmingham.com"
                    name="email"
                    onChange={onChangeHandler}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={onChangeHandler}
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
            <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        onChange={onChangeHandler}
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
            <FormControl>
                <FormLabel>Upload Profile Picture</FormLabel>
                <Input
                    p={"0.28rem"}
                    type="file"
                    accept="image/*"
                    name="pic"
                    onChange={(e) => uploadAndSave(e.target.files[0])}
                />
            </FormControl>
            <Button
                variant={"solid"}
                colorScheme="blue"
                w={"100%"}
                isLoading={loading}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;
