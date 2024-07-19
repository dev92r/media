import { IconButton, Spinner, SpinnerSize, Stack, Text } from "@fluentui/react";
import ExpandablePanel from "../../ExpandablePanel";
import { deleteUser } from "../../../store";
import { useThunk } from "../../hooks/use-thunk";
import AlbumList from "./AlbumList";
import { User } from "../../model/user";

interface Props {
  data: User;
  idx: number;
}

function UserListItem({ data, idx }: Props) {
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

  const header = (
    <>
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
        <Stack horizontal>
          <Stack.Item grow>
            <Text variant="large">{data.name}</Text>
            {deletingUserError && (
              <Text variant="large">{deletingUserError}</Text>
            )}
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </>
  );

  return (
    <ExpandablePanel header={header} idx={idx}>
      <AlbumList user={data} />
    </ExpandablePanel>
  );
}

export default UserListItem;
