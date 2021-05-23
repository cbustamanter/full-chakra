import { Box, BoxProps, Heading, Text } from "@chakra-ui/react";
import React from "react";

type FeatureProps = BoxProps & {
  title: string;
  desc: string;
};

export const Feature: React.FC<FeatureProps> = ({ title, desc, ...props }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...props}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
};
