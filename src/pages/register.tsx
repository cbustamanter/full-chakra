import React from "react";
import { Container } from "../components/Container";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Container height="100vh" justifyContent="center">
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "", email: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ options: values });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                label="Username"
                name="username"
                placeholder="bigpun"
              />
              <Box mt={6} mb={6}>
                <InputField
                  label="Email"
                  name="email"
                  placeholder="cesar@hola.com"
                  type="email"
                />
              </Box>
              <Box mt={6} mb={6}>
                <InputField
                  label="Password"
                  name="password"
                  placeholder="*********"
                  type="password"
                />
              </Box>
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="messenger"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
