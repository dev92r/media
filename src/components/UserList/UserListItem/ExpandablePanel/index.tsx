import { Stack, Text, IconButton, Spinner, SpinnerSize } from "@fluentui/react";
import React, { useState } from "react";
import { deleteUser } from "../../../../store";
import { User } from "../../../../store/slices/usersSlice";
import { useThunk } from "../../../hooks/use-thunk";
import AlbumList from "./AlbumList";

interface Props {
  data: User;
  idx: number;
}

function ExpandablePanel({ data, idx }: Props) {
  const [active, setActive] = useState(false);
  const {
    runThunk: doDeleteUser,
    isLoading: isUserDeleting,
    error: deletingUserError,
  } = useThunk({
    thunk: deleteUser,
  });
  const handleOnDelete = (user: User) => {
    doDeleteUser(user);
  };
  return (
    <>
      <Stack
        horizontal
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ padding: 10, childrenGap: 10 }}
        styles={{
          root: {
            cursor: "pointer",
            borderBottom: "1px solid rgb(0,55,85)",
            ...(idx === 0 && { borderTop: "1px solid rgb(0,55,85)" }),
          },
        }}
        onClick={() => setActive(!active)}
      >
        <Stack.Item>
          {isUserDeleting ? (
            <Spinner size={SpinnerSize.xSmall} />
          ) : (
            <IconButton
              iconProps={{ iconName: "Delete" }}
              onClick={() => handleOnDelete(data)}
            />
          )}
        </Stack.Item>
        <Stack.Item grow>
          <Text variant="large">{data.name}</Text>
          {deletingUserError && (
            <Text variant="large">{deletingUserError}</Text>
          )}
        </Stack.Item>
        <Stack.Item>
          <IconButton
            iconProps={{ iconName: !active ? "ChevronUp" : "ChevronDown" }}
          />
        </Stack.Item>
      </Stack>
      {active && (
        <Stack>
          <AlbumList data={data} />
        </Stack>
      )}
    </>
  );
}
export default ExpandablePanel;
