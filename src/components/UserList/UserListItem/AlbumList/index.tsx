import {
  Stack,
  PrimaryButton,
  Text,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../../../../store";
import AlbumListItem from "./AlbumListItem";
import ListShimmer from "../../../ListShimmer";
import { User } from "../../../model/user";

interface Props {
  user: User;
}
function AlbumList({ user }: Props) {
  const { data: albums, isFetching, error } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleOnClick = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <ListShimmer times={4} />;
  } else if (error) {
    content = <Text variant="medium">Error while loading albums</Text>;
  } else {
    content =
      albums &&
      albums.map((album, idx) => {
        return (
          <Stack>
            <AlbumListItem key={idx} album={album} idx={idx}></AlbumListItem>
          </Stack>
        );
      });
  }

  return (
    <Stack
      tokens={{ padding: "20px 30px 40px 30px" }}
      styles={{
        root: {
          borderBottom: "1px solid rgb(0,55,85)",
        },
      }}
    >
      <Stack horizontal styles={{ root: { marginBottom: 30 } }}>
        <Stack.Item grow>
          <Text variant="large">Albums by {user.name}</Text>
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton onClick={handleOnClick}>
            {results.isLoading ? (
              <Spinner size={SpinnerSize.xSmall} />
            ) : (
              "Add Albums"
            )}
          </PrimaryButton>
        </Stack.Item>
      </Stack>
      {content}
    </Stack>
  );
}

export default AlbumList;
