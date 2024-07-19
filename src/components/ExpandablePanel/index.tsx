import { IconButton, Stack } from "@fluentui/react";
import React, { useState } from "react";

interface Props {
  header: React.ReactElement;
  children: React.ReactElement;
  idx: number;
}

function ExpandablePanel({ header, children, idx }: Props) {
  const [active, setActive] = useState(false);
  return (
    <>
      <Stack
        horizontal
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ padding: 10, childrenGap: 10 }}
        styles={{
          root: {
            borderBottom: "1px solid rgb(0,55,85)",
            ...(idx === 0 && { borderTop: "1px solid rgb(0,55,85)" }),
          },
        }}
      >
        {header}
        <Stack.Item>
          <IconButton
            iconProps={{ iconName: !active ? "ChevronUp" : "ChevronDown" }}
            onClick={() => setActive(!active)}
          />
        </Stack.Item>
      </Stack>
      {active && (
        <Stack>
          <Stack.Item>{children}</Stack.Item>
        </Stack>
      )}
    </>
  );
}
export default ExpandablePanel;
