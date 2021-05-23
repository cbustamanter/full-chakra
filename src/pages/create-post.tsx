import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant="small" minHeight="100vh" alignInternal="center">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
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
                  Create post
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(CreatePost);
