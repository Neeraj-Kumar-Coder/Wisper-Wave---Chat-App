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

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <VStack spacing={5}>
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Thomas Shelby" />
            </FormControl>
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
            <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
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
            <FormControl>
                <FormLabel>Upload Profile Picture</FormLabel>
                <Input p={1.5} type="file" accept="image/*" />
            </FormControl>
            <Button variant={"solid"} colorScheme="blue" w={"100%"}>
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;
