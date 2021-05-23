import { Flex, Heading } from "@chakra-ui/layout";
import { Button, Input, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };

  return (
    <>
      <Container minHeight="100vh" justifyContent="center">
        <Flex
          flexDirection="column"
          p={14}
          rounded={6}
          background={bgColor[colorMode]}
        >
          <Heading mb={4}>Login</Heading>
          <Input
            placeholder="user@hola.com"
            variant="filled"
            mb={3}
            type="email"
          />
          <Input
            placeholder="********"
            variant="filled"
            mb={6}
            type="password"
          />
          <Button colorScheme="messenger">Login</Button>
        </Flex>
      </Container>
    </>
  );
};
export default Login;
