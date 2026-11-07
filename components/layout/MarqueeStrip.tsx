"use client";

import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

const TEXT =
  "🚨 24/7 EMERGENCY MOBILE TYRE FITTING • GLASGOW • EDINBURGH • DUNDEE";

export function MarqueeStrip() {
  const reduce = useReducedMotion();
  const items = `${TEXT}   `.repeat(6);
  return (
    <Box
      bg="accent.red"
      color="white"
      fontSize="xs"
      fontWeight="700"
      letterSpacing="0.08em"
      overflow="hidden"
      h="28px"
      display="flex"
      alignItems="center"
      role="presentation"
    >
      {reduce ? (
        <Box px="3" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {TEXT}
        </Box>
      ) : (
        <motion.div
          aria-hidden
          style={{ whiteSpace: "nowrap", display: "inline-block" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {items + items}
        </motion.div>
      )}
    </Box>
  );
}
