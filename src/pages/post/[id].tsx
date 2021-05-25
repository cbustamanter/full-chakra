import { Box, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeleteButtons } from "../../components/EditDeleteButtons";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();
  if (fetching) {
    return (
      <Layout minHeight="100vh">
        <Box>Loading...</Box>
      </Layout>
    );
  }
  if (!data?.post) {
    return (
      <Layout minHeight="100vh">
        <Box>couldn't find data</Box>
      </Layout>
    );
  }
  return (
    <Layout minHeight="100vh">
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>
        <Text>{data.post.text}</Text>
      </Box>
      <EditDeleteButtons id={data.post.id} creatorId={data.post.creator.id} />
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
