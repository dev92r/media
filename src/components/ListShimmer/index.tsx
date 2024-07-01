import React from "react";
import { Shimmer, ShimmerElementType, Stack } from "@fluentui/react";
interface Props {
  times: number;
}
function ListShimmer({ times }: Props) {
  const shimmer = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <Shimmer
          key={i}
          styles={{ root: { marginTop: 12 } }}
          shimmerElements={[{ type: ShimmerElementType.line, height: 40 }]}
        />
      );
    });
  return <Stack>{shimmer}</Stack>;
}

export default ListShimmer;
