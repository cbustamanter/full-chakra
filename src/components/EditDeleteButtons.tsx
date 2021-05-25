import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeleteButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton as={Link} aria-label="delete" mr={4} icon={<EditIcon />} />
      </NextLink>

      <IconButton
        aria-label="delete"
        colorScheme="red"
        onClick={() => {
          deletePost({ id: id });
        }}
        icon={<DeleteIcon />}
      />
    </>
  );
};
