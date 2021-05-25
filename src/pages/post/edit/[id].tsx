import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";

const EditPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  useIsAuth();
  const [, updatePost] = useUpdatePostMutation();
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
    <Layout variant="small" minHeight="100vh" alignInternal="center">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values, { setErrors }) => {
          const { error } = await updatePost({ id: intId, input: values });
          if (!error) {
            router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="Title"
              name="title"
              placeholder="Enter a title"
            />
            <Box mt={6} mb={6}>
              <InputField
                textarea
                label="Text"
                name="text"
                placeholder="Enter a text"
              />
            </Box>
            <Flex justifyContent="flex-end" alignItems="center">
              <Box mr={4}>
                <NextLink href="/">
                  <Link>Go home</Link>
                </NextLink>
              </Box>
              <Box>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="messenger"
                >
                  update post
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(EditPost);
