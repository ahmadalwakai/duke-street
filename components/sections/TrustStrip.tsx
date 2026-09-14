"use client";

import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { FadeUp } from "@/components/ui/FadeUp";

const CHIPS = [
  { icon: "⚡", title: "30–40 min response" },
  { icon: "🛡️", title: "Fully insured" },
  { icon: "🛞", title: "All major brands" },
  { icon: "💳", title: "Card + Apple Pay" },
] as const;

export function TrustStrip() {
  return (
    <Box as="section" bg="bg.subtle" py="6" borderBottomWidth="1px" borderColor="border">
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 2, md: 4 }} gap="3">
          {CHIPS.map((c, i) => (
            <FadeUp key={c.title} index={i}>
              <Box
                borderWidth="1px"
                borderColor="border"
                bg="bg"
                borderRadius="md"
                px="4"
                py="3"
                textAlign="center"
                fontWeight="700"
                fontSize="sm"
              >
                <Box as="span" mr="2" aria-hidden>
                  {c.icon}
                </Box>
                <Text as="span">{c.title}</Text>
              </Box>
            </FadeUp>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
