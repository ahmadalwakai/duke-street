"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { telHref } from "@/lib/site";
import { BookingIcon, PhoneIcon } from "@/components/ui/BrandIcons";
import { trackCallClick } from "@/lib/analytics";

export function StickyCallBar() {
  const [shown, setShown] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: shown ? 0 : 100 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1100,
      }}
      role="region"
      aria-label="Quick contact"
    >
      <Box
        display={{ base: "flex", md: "none" }}
        h="64px"
        pb="env(safe-area-inset-bottom)"
      >
        <Box
          asChild
          flex="1.12"
          bg="accent.red"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="800"
          className="sticky-call-attention"
          animation={reduce ? undefined : "stickyCallPulse 1.28s cubic-bezier(0.45, 0, 0.25, 1) infinite"}
        >
          <a
            href={telHref()}
            aria-label="Call now"
            onClick={() => trackCallClick("sticky_mobile_bar")}
          >
            <HStack gap="2">
              <PhoneIcon size={18} />
              <Text fontSize="sm">Call</Text>
            </HStack>
          </a>
        </Box>
        <Box
          asChild
          flex="0.88"
          bg="brand.redDark"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="800"
          className="sticky-book-button"
        >
          <Link href="/book" aria-label="Book mobile tyre fitting online">
            <HStack gap="2">
              <BookingIcon size={18} />
              <Text fontSize="sm">Book</Text>
            </HStack>
          </Link>
        </Box>
      </Box>
    </motion.div>
  );
}
