import React from "react";
import ExpandablePanel from "../../../../ExpandablePanel";
import { Stack, IconButton, Text, Spinner, SpinnerSize } from "@fluentui/react";
import { Album } from "../../../../model/album";
import { useDeleteAlbumMutation } from "../../../../../store";
import PhotoList from "./PhotoList";

interface Props {
  album: Album;
  idx: number;
}

function AlbumListItem({ album, idx }: Props) {
  const [deleteAlbum, results] = useDeleteAlbumMutation(); //find type assetion

  const header = (
    <>
      <Stack.Item>
        {results.isLoading ? (
          <Spinner size={SpinnerSize.xSmall} />
        ) : (
          <IconButton
            iconProps={{ iconName: "Delete" }}
            onClick={() => deleteAlbum(album)}
          />
        )}
      </Stack.Item>
      <Stack.Item grow>
        <Stack horizontal>
          <Stack.Item grow>
            <Text variant="large">{album.title}</Text>
            {results.error && <Text variant="large">Error deleting album</Text>}
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </>
  );
  return (
    <ExpandablePanel header={header} idx={idx}>
      <PhotoList album={album}></PhotoList>
    </ExpandablePanel>
  );
}
export default AlbumListItem;
