import React from "react";
import { Album } from "../../../../../model/album";
import {
  useAddPhotosMutation,
  useFetchPhotosQuery,
} from "../../../../../../store";
import {
  Stack,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Text,
} from "@fluentui/react";
import ListShimmer from "../../../../../ListShimmer";
import PhotoListItem from "./PhotoListItem";
import { Photo } from "../../../../../model/photo";

interface Props {
  album: Album;
}
function PhotoList({ album }: Props) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhotos, addPhotosResults] = useAddPhotosMutation();

  const handleOnClick = () => {
    addPhotos(album);
  };

  let content;
  if (isFetching) {
    content = <ListShimmer times={4} />;
  } else if (error) {
    content = <Text variant="medium">Error while loading albums</Text>;
  } else {
    content =
      data &&
      data.map((photo: Photo, idx: number) => {
        return (
          <Stack>
            <PhotoListItem key={idx} photo={photo} idx={idx} />
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
          <Text variant="large">Photos by {album.title}</Text>
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton onClick={handleOnClick}>
            {addPhotosResults.isLoading ? (
              <Spinner size={SpinnerSize.xSmall} />
            ) : (
              "Add Albums"
            )}
          </PrimaryButton>
        </Stack.Item>
      </Stack>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        {content}
      </Stack>
    </Stack>
  );
}
export default PhotoList;
