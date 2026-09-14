"use client";

import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FadeUp } from "@/components/ui/FadeUp";

const STEPS = [
  {
    n: "01",
    title: "Call or WhatsApp",
    body: "Tell us your reg, postcode and the tyre size on the sidewall. We confirm price and ETA in one quick chat — no forms.",
  },
  {
    n: "02",
    title: "We roll to you",
    body: "A fully kitted mobile fitting van leaves immediately. Average on-scene time across Glasgow, Edinburgh and Dundee is 30–40 minutes.",
  },
  {
    n: "03",
    title: "Fitted, balanced, gone",
    body: "Tyre fitted, balanced and torqued to spec. Pay by card, contactless or Apple Pay at the kerb. Digital receipt before we leave.",
  },
] as const;

export function HowItWorks() {
  return (
    <Box as="section" py={{ base: "16", md: "20" }}>
      <Container maxW="6xl">
        <Stack gap="3" mb="10" textAlign={{ base: "left", md: "center" }}>
          <FadeUp>
            <Text color="accent.red" fontWeight="700" letterSpacing="0.16em" fontSize="xs">
              HOW IT WORKS
            </Text>
          </FadeUp>
          <FadeUp index={1}>
            <Heading as="h2" fontSize={{ base: "4xl", md: "5xl" }}>
              ONE CALL. ON THE WAY.
            </Heading>
          </FadeUp>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          {STEPS.map((s, i) => (
            <FadeUp key={s.n} index={i}>
              <Box
                p="6"
                borderWidth="1px"
                borderColor="border"
                bg="bg.subtle"
                borderRadius="lg"
                h="100%"
              >
                <Text
                  fontFamily="heading"
                  color="accent.red"
                  fontSize="4xl"
                  letterSpacing="0.04em"
                >
                  {s.n}
                </Text>
                <Heading as="h3" size="md" mt="2" mb="2">
                  {s.title}
                </Heading>
                <Text color="fg.muted" fontSize="sm">
                  {s.body}
                </Text>
              </Box>
            </FadeUp>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
