import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  useDeletePostMutation,
  useVoteMutation,
} from "../generated/graphql";

type FeatureProps = BoxProps & {
  post: PostSnippetFragment;
};

export const Feature: React.FC<FeatureProps> = ({ post, ...props }) => {
  const [loadingState, setLoadingState] =
    useState<"updoot-loading" | "downdoot-loading" | "not-loading">(
      "not-loading"
    );
  const [, vote] = useVoteMutation();
  const [, deletePost] = useDeletePostMutation();
  return (
    <Flex p={5} shadow="md" borderWidth="1px" {...props} alignItems="center">
      <Flex
        flexDirection="column"
        alignItems="center"
        // justifyContent="center"
        mr={6}
      >
        <IconButton
          onClick={async () => {
            setLoadingState("updoot-loading");
            await vote({
              postId: post.id,
              value: 1,
            });
            setLoadingState("not-loading");
          }}
          colorScheme={post.voteStatus === 1 ? "whatsapp" : undefined}
          isLoading={loadingState === "updoot-loading"}
          aria-label="up-button"
          mb={1}
          icon={<ChevronUpIcon w={6} h={6} />}
        />

        {post.points}
        <IconButton
          onClick={async () => {
            setLoadingState("downdoot-loading");
            await vote({
              postId: post.id,
              value: -1,
            });
            setLoadingState("not-loading");
          }}
          colorScheme={post.voteStatus === -1 ? "red" : undefined}
          isLoading={loadingState === "downdoot-loading"}
          aria-label="down-button"
          mt={1}
          icon={<ChevronDownIcon w={6} h={6} />}
        />
      </Flex>
      <Box flex={1}>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Link>
            <Heading fontSize="xl">{post.title}</Heading>
          </Link>
        </NextLink>
        <Stack direction={["column", "row"]} spacing="10px">
          <Box>Posted by:</Box>
          <Box color="whatsapp.500" fontWeight="bold">
            {post.creator.username}
          </Box>
        </Stack>
        <Flex align="center">
          <Text flex={1} mt={4}>
            {post.textSnippet}
          </Text>
          <IconButton
            aria-label="delete"
            colorScheme="red"
            onClick={() => {
              deletePost({ id: post.id });
            }}
            icon={<DeleteIcon />}
          />
        </Flex>
      </Box>
    </Flex>
  );
};
