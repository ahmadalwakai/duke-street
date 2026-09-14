"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });
}

export function LiveStatusBar() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setTime(formatTime(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <HStack
      gap="3"
      px="3"
      py="2"
      bg="rgba(16, 185, 129, 0.12)"
      borderWidth="1px"
      borderColor="rgba(16, 185, 129, 0.45)"
      borderRadius="full"
      width="fit-content"
    >
      <Box position="relative" w="10px" h="10px">
        <Box
          position="absolute"
          inset="0"
          borderRadius="full"
          bg="#10b981"
          boxShadow="0 0 0 0 rgba(16,185,129,0.6)"
          animation="liveDot 1.6s ease-out infinite"
        />
      </Box>
      <Text
        fontSize="xs"
        fontWeight="800"
        color="white"
        letterSpacing="0.08em"
        textTransform="uppercase"
      >
        Open now
      </Text>
      <Box w="1px" h="12px" bg="whiteAlpha.300" />
      <Text fontSize="xs" color="fg.muted" fontWeight="600">
        Fitter on call · {time ?? "24/7"}
      </Text>
      <style>{`
        @keyframes liveDot {
          0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
          70%  { box-shadow: 0 0 0 10px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
      `}</style>
    </HStack>
  );
}
