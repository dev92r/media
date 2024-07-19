import { Icon, Image, Stack } from "@fluentui/react";
import React from "react";
import { Photo } from "../../../../../../model/photo";
import { useDeletePhotosMutation } from "../../../../../../../store";

interface Props {
  photo: Photo;
  idx: number;
}

function PhotoListItem({ photo }: Props) {
  const [deletePhoto, results] = useDeletePhotosMutation();
  const handleDelete = () => {
    deletePhoto(photo);
  };
  return (
    <Stack
      onClick={handleDelete}
      styles={{
        root: {
          position: "relative",
          cursor: "pointer",
          selectors: {
            ":hover": {
              "#delete": {
                display: "flex",
              },
            },
          },
        },
      }}
    >
      <Image
        src={photo.url}
        alt="random pic"
        styles={{ root: { height: 50, width: 50 } }}
      />
      <Stack
        id="delete"
        styles={{
          root: {
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "red",
            display: "none",
          },
        }}
        verticalAlign="center"
        horizontalAlign="center"
      >
        <Icon iconName="Delete" />
      </Stack>
    </Stack>
  );
}

export default PhotoListItem;
