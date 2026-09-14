"use client";

import { Box } from "@chakra-ui/react";

export function CookieSettingsButton() {
  return (
    <Box asChild color="accent.red" cursor="pointer">
      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("dst:open-consent"));
          }
        }}
        style={{
          background: "transparent",
          border: 0,
          padding: 0,
          font: "inherit",
          cursor: "pointer",
        }}
      >
        Cookie settings
      </button>
    </Box>
  );
}
