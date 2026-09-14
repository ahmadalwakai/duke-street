"use client";

import { Box } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
import { waHref } from "@/lib/site";
import { trackWhatsAppClick } from "@/lib/analytics";

export function WhatsAppFab() {
  const reduce = useReducedMotion();
  return (
    <Box
      asChild
      display={{ base: "none", md: "grid" }}
      placeItems="center"
      position="fixed"
      right="6"
      bottom="6"
      zIndex="1100"
      w="64px"
      h="64px"
      borderRadius="full"
      bg="accent.green"
      color="white"
      boxShadow="0 8px 24px rgba(37,211,102,0.45)"
      _hover={{ transform: "scale(1.05)" }}
      transition="transform 0.2s"
      _before={
        reduce
          ? undefined
          : {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "full",
              border: "2px solid rgba(37,211,102,0.55)",
              animation: "waPulse 2s ease-out infinite",
            }
      }
    >
      <a
        href={waHref()}
        rel="noopener"
        aria-label="Chat on WhatsApp"
        onClick={() => trackWhatsAppClick("whatsapp_fab")}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20 3.5A11.4 11.4 0 0 0 3.6 19.7L2 23l3.4-1.6A11.4 11.4 0 1 0 20 3.5Zm-2.6 11.9c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.2-.7.1a7.8 7.8 0 0 1-3.8-3.4c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.7 5.9 5.1 2.2.9 3 .9 4.1.8.7-.1 2-.8 2.3-1.6.3-.8.3-1.4.2-1.6-.1-.2-.3-.3-.6-.4Z" />
        </svg>
        <style>{`
          @keyframes waPulse {
            0% { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(1.6); opacity: 0; }
          }
        `}</style>
      </a>
    </Box>
  );
}
