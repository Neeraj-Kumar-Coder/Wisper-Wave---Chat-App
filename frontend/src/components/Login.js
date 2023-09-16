import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

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
            <Button variant={"outline"} colorScheme="blue" w={"100%"}>
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
