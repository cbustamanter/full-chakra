import { Box, Button, Flex, Link, useColorMode } from "@chakra-ui/react";
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
        <Button mr={4} variant="link" colorScheme="linkedin">
          {data.me.username}
        </Button>
        <Button
          variant="link"
          isLoading={logoutFetching}
          colorScheme="teal"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </>
    );
  }
  return (
    <Flex p={6} background={bgColor[colorMode]}>
      <Box ml={"auto"}>
        <DarkModeSwitch mr={6} />
        {body}
      </Box>
    </Flex>
  );
};
