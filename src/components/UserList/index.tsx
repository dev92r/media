import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, addUser, fetchUsers } from "../../store";
import {
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
} from "@fluentui/react";
import ListShimmer from "../ListShimmer";
import { useThunk } from "../hooks/use-thunk";
import UserListItem from "./UserListItem";

function UsersList() {
  const {
    runThunk: doFetchUsers,
    isLoading: isUserLoading,
    error: loadingUserError,
  } = useThunk({
    thunk: fetchUsers,
  });

  const {
    runThunk: doCreateUser,
    isLoading: isUserCreating,
    error: creatingUserError,
  } = useThunk({
    thunk: addUser,
  });

  const { data } = useSelector((state: RootState) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleOnClick = () => {
    doCreateUser();
  };

  return (
    <Stack>
      <Stack horizontal tokens={{ padding: 10 }}>
        <Stack.Item grow>
          <Text variant="xLarge">Users</Text>
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton onClick={handleOnClick}>
            {isUserCreating ? (
              <Spinner size={SpinnerSize.xSmall} />
            ) : (
              "Add Users"
            )}
          </PrimaryButton>
          <Text variant="medium">{creatingUserError}</Text>
        </Stack.Item>
      </Stack>
      <Stack>
        {isUserLoading && (
          <Stack.Item>
            <ListShimmer times={5} />
          </Stack.Item>
        )}
        {data.length > 0 && (
          <Stack.Item>
            {data.map((user, idx) => {
              return <UserListItem key={idx} data={user} idx={idx} />;
            })}
          </Stack.Item>
        )}
        {loadingUserError && <Stack.Item>{loadingUserError}</Stack.Item>}
      </Stack>
    </Stack>
  );
}
export default UsersList;
