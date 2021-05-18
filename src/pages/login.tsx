import React from "react";
import { Container } from "../components/Container";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Spacer } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Container height="100vh" justifyContent="center">
      <Wrapper variant="small">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            if (response.data?.login?.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login?.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                label="Username Or Email"
                name="usernameOrEmail"
                placeholder="username or email"
              />
              <Box mt={6} mb={6}>
                <InputField
                  label="Password"
                  name="password"
                  placeholder="*********"
                  type="password"
                />
              </Box>
              <Flex alignItems="center">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="messenger"
                >
                  Login
                </Button>
                <Spacer />
                <NextLink href="/forgot-password">
                  <Link>Forgot my password</Link>
                </NextLink>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
