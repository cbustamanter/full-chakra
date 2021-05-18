import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <Container height="100vh" justifyContent="center">
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await forgotPassword(values);
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>
                If an account with that email exists, we sent you an email.
              </Box>
            ) : (
              <Form>
                <InputField
                  label="Email"
                  name="email"
                  placeholder="cesar@hola.com"
                  type="email"
                />
                <Flex mt={4} alignItems="center">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="messenger"
                  >
                    Login
                  </Button>
                </Flex>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </Container>
  );
};
export default withUrqlClient(createUrqlClient)(ForgotPassword);
