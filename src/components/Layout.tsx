import { FlexProps } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "./Wrapper";

type LayoutProps = FlexProps & {
  variant?: "small" | "regular";
  alignInternal?: "center" | "unset";
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant,
  alignInternal,
  ...props
}) => {
  return (
    <Container {...props}>
      <Navbar />
      <Flex mx={4} alignItems={alignInternal} minHeight="80vh">
        <Wrapper variant={variant}>{children}</Wrapper>
      </Flex>
    </Container>
  );
};
