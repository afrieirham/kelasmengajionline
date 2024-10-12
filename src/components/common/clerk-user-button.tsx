import { UserButton } from "@clerk/nextjs";
import React from "react";

function ClerkUserButton() {
  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonTrigger: "bg-white py-1.5 px-2 border-2 border-zinc-200",
        },
      }}
    />
  );
}

export default ClerkUserButton;
