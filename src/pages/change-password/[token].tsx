import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient, WithUrqlProps } from "next-urql";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FunctionComponent, PropsWithChildren, useState } from "react";
import { Container } from "../../components/Container";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Container height="100vh" justifyContent="center">
      <Wrapper variant="small">
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              newPassword: values.newPassword,
              token,
            });
            if (response.data?.changePassword?.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword?.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={4}>
                <InputField
                  label="New Password"
                  name="newPassword"
                  placeholder="*********"
                  type="password"
                />
                {tokenError ? (
                  <Alert mt={4} status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>{tokenError}</AlertTitle>
                    <NextLink href="/forgot-password">
                      <Link>Click Here to recover!</Link>
                    </NextLink>
                    <CloseButton position="absolute" right="8px" top="8px" />
                  </Alert>
                ) : null}
              </Box>
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="messenger"
              >
                Change Password
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(
  ChangePassword as FunctionComponent<
    PropsWithChildren<WithUrqlProps | { token: string }>
  >
);
