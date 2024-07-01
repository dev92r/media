import { User } from "../../../store/slices/usersSlice";
import { Stack } from "@fluentui/react";
import ExpandablePanel from "./ExpandablePanel";

interface Props {
  data: User;
  idx: number;
}

function UserListItem({ data, idx }: Props) {
  return (
    <Stack>
      <ExpandablePanel data={data} idx={idx} />
    </Stack>
  );
}

export default UserListItem;
