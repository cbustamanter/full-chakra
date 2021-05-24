import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.200", dark: "gray.800" };
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={4}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={2}>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <NextLink href="/create-post">
          <Button mr={2} colorScheme="whatsapp" as={Link}>
            create post
          </Button>
        </NextLink>
        <Button mr={4} variant="link" colorScheme="messenger">
          {data.me.username}
        </Button>
        <Button
          variant="link"
          isLoading={logoutFetching}
          colorScheme="red"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </>
    );
  }
  return (
    <Flex p={6} background={bgColor[colorMode]} align="center">
      <NextLink href="/">
        <Link>
          <Heading>Home</Heading>
        </Link>
      </NextLink>
      <Box ml={"auto"}>
        {body}
        <DarkModeSwitch ml={6} />
      </Box>
    </Flex>
  );
};
