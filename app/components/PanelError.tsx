import React from "react";

import { Callout } from "@radix-ui/themes";

export const PanelError = ({ message }: { message: string }) => {
  return (
    <Callout.Root color="red" className="mb-5">
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};
