import React from "react";
import { Album } from "../../../../../model/album";

interface Props {
  album: Album;
}
function PhotoList({ album }: Props) {
  return <h1>Photo List</h1>;
}
export default PhotoList;
