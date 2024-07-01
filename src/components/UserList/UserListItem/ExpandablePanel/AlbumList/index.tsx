import { Stack, PrimaryButton, Text } from "@fluentui/react";
import React from "react";
import { User } from "../../../../../store/slices/usersSlice";
interface Props {
  data: User;
}
function AlbumList({ data }: Props) {
  return (
    <Stack
      tokens={{ padding: 20 }}
      styles={{
        root: {
          borderBottom: "1px solid rgb(0,55,85)",
        },
      }}
    >
      <Stack horizontal>
        <Stack.Item grow>
          <Text variant="large">Albums by {data.name}</Text>
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton>Add Albums</PrimaryButton>
        </Stack.Item>
      </Stack>
      <Stack></Stack>
    </Stack>
  );
}

export default AlbumList;
