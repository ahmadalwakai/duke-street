"use client";

import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FadeUp } from "@/components/ui/FadeUp";

const REASONS = [
  {
    icon: "⏱️",
    title: "30–40 min average response",
    body: "Real on-scene times across Glasgow, Edinburgh and Dundee — not call-centre estimates.",
  },
  {
    icon: "🌙",
    title: "Truly 24/7. No overnight surcharge.",
    body: "Same fair price at 3am as 3pm. A real fitter answers the phone, every time.",
  },
  {
    icon: "🚐",
    title: "Fully-stocked vans",
    body: "Premium, mid-range and budget tyres on board for cars, vans and 4×4s — including run-flats.",
  },
  {
    icon: "🛡️",
    title: "Fully insured & torque-checked",
    body: "Every fit balanced on calibrated equipment and torqued to manufacturer spec, every time.",
  },
  {
    icon: "💳",
    title: "Card, contactless & Apple Pay",
    body: "Pay at the kerb. Digital receipt sent before we drive away.",
  },
  {
    icon: "⭐",
    title: "5-star Google reputation",
    body: "Hundreds of Scottish drivers trust us — see the reviews further down the page.",
  },
] as const;

export function WhyUs() {
  return (
    <Box as="section" py={{ base: "14", md: "20" }} bg="bg.subtle">
      <Container maxW="6xl">
        <Stack gap="3" mb="10" align={{ base: "flex-start", md: "center" }}>
          <Text
            color="accent.red"
            fontWeight="700"
            letterSpacing="0.16em"
            fontSize="xs"
          >
            WHY DRIVERS PICK US
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "clamp(1.75rem, 6.5vw, 2.5rem)", md: "clamp(2.25rem, 4.5vw, 3.25rem)" }}
            lineHeight="1.1"
            letterSpacing="0.01em"
            textTransform="uppercase"
            pb="0.15em"
            color="white"
            textAlign={{ base: "left", md: "center" }}
          >
            Built for emergencies. Priced for everyone.
          </Heading>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="5">
          {REASONS.map((r, i) => (
            <FadeUp key={r.title} index={i}>
              <Stack
                gap="3"
                p="6"
                bg="bg"
                borderWidth="1px"
                borderColor="border"
                borderRadius="xl"
                h="100%"
              >
                <Box fontSize="2xl" aria-hidden>
                  {r.icon}
                </Box>
                <Heading
                  as="h3"
                  fontFamily="heading"
                  fontSize="xl"
                  letterSpacing="0.02em"
                  textTransform="uppercase"
                  color="white"
                  lineHeight="1.15"
                >
                  {r.title}
                </Heading>
                <Text color="fg.muted" fontSize="sm" lineHeight="1.6">
                  {r.body}
                </Text>
              </Stack>
            </FadeUp>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
