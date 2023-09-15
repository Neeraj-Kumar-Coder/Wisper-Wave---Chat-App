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
    return (
        <VStack spacing={5}>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="text" placeholder="example@email.com" />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={showPassword ? "text" : "password"} />
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
            <Button variant={"solid"} colorScheme="blue" w={"100%"}>
                Get Guest User Details
            </Button>
        </VStack>
    );
};

export default Login;
