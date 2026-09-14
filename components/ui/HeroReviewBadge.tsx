"use client";

import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { REVIEW_STATS } from "@/lib/reviews";

export function HeroReviewBadge() {
  return (
    <Stack
      gap="2"
      bg="rgba(11, 15, 20, 0.78)"
      borderWidth="1px"
      borderColor="border"
      borderRadius="xl"
      px="4"
      py="3"
      backdropFilter="blur(8px)"
      boxShadow="0 18px 40px rgba(0,0,0,0.55)"
      maxW="280px"
    >
      <HStack gap="1" aria-label={`${REVIEW_STATS.average} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Box
            key={i}
            as="span"
            color="accent.red"
            fontSize="md"
            lineHeight="1"
            aria-hidden
          >
            ★
          </Box>
        ))}
        <Text ml="1" fontWeight="800" fontSize="sm" color="white">
          {REVIEW_STATS.average.toFixed(1)}
        </Text>
      </HStack>
      <Text fontSize="xs" color="fg.muted" lineHeight="1.4">
        Rated <strong>{REVIEW_STATS.average.toFixed(1)} from {REVIEW_STATS.count}</strong>{" "}
        reviews on Google.
      </Text>
    </Stack>
  );
}
