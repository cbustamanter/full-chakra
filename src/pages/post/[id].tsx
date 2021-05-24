import { Box, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Post = ({}) => {
  const router = useRouter();
  const numId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    pause: numId === -1,
    variables: {
      id: numId,
    },
  });
  if (fetching) {
    return (
      <Layout>
        <Box>Loading...</Box>
      </Layout>
    );
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>couldn't find data</Box>
      </Layout>
    );
  }
  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Text>{data.post.text}</Text>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
