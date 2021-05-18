import { Container } from "../components/Container";
import React from "react";
import { Navbar } from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Container height="100vh">
        <Navbar />
        {!data ? (
          <div>Loading...</div>
        ) : (
          data.posts.map((post) => <div key={post.id}>{post.title}</div>)
        )}
      </Container>
      ;
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
