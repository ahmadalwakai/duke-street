"use client";

import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FadeUp } from "@/components/ui/FadeUp";

type Tier = {
  label: string;
  from: string;
  bullet: string;
  accent: string;
  featured?: boolean;
};

const TIERS: readonly Tier[] = [
  {
    label: "Budget",
    from: "£55",
    bullet: "Quality-checked budget brand, fitted, balanced & disposed of old tyre.",
    accent: "fg.muted",
  },
  {
    label: "Mid-range",
    from: "£75",
    bullet: "Trusted mid-range brand for everyday cars and vans. Most popular.",
    accent: "accent.red",
    featured: true,
  },
  {
    label: "Premium",
    from: "£95",
    bullet: "Michelin, Continental, Goodyear & Pirelli for performance cars.",
    accent: "fg.muted",
  },
];

export function PricingStrip() {
  return (
    <Box as="section" py={{ base: "12", md: "16" }} bg="bg">
      <Container maxW="6xl">
        <Stack gap="3" mb="8" align={{ base: "flex-start", md: "center" }}>
          <Text
            color="accent.red"
            fontWeight="700"
            letterSpacing="0.16em"
            fontSize="xs"
          >
            TRANSPARENT PRICING • NO HIDDEN FEES
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
            Honest prices. Fitted at your kerb.
          </Heading>
          <Text
            color="fg.muted"
            fontSize={{ base: "md", md: "lg" }}
            textAlign={{ base: "left", md: "center" }}
            maxW="60ch"
          >
            Prices below are <strong>fully fitted</strong> — that&apos;s the tyre, balancing, valve,
            torque-check, old tyre disposal and call-out, all in. No overnight surcharge.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="5">
          {TIERS.map((t, i) => (
            <FadeUp key={t.label} index={i}>
              <Stack
                gap="3"
                p="6"
                bg={t.featured ? "bg.subtle" : "bg.subtle"}
                borderWidth={t.featured ? "2px" : "1px"}
                borderColor={t.featured ? "accent.red" : "border"}
                borderRadius="xl"
                position="relative"
                h="100%"
              >
                {t.featured ? (
                  <Box
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="accent.red"
                    color="white"
                    boxShadow="0 10px 28px rgba(225,29,46,0.28)"
                    fontSize="2xs"
                    fontWeight="800"
                    letterSpacing="0.12em"
                    textTransform="uppercase"
                    px="3"
                    py="1"
                    borderRadius="full"
                  >
                    Most popular
                  </Box>
                ) : null}
                <Text
                  fontSize="xs"
                  fontWeight="800"
                  letterSpacing="0.18em"
                  textTransform="uppercase"
                  color={t.accent}
                >
                  {t.label}
                </Text>
                <Box>
                  <Text as="span" fontSize="xs" color="fg.muted">
                    From
                  </Text>{" "}
                  <Text
                    as="span"
                    fontFamily="heading"
                    fontSize={{ base: "5xl", md: "6xl" }}
                    color="white"
                    lineHeight="1"
                  >
                    {t.from}
                  </Text>{" "}
                  <Text as="span" color="fg.muted" fontSize="sm">
                    fitted
                  </Text>
                </Box>
                <Text color="fg.muted" fontSize="sm" lineHeight="1.5">
                  {t.bullet}
                </Text>
              </Stack>
            </FadeUp>
          ))}
        </SimpleGrid>

        <Text
          mt="6"
          fontSize="xs"
          color="fg.muted"
          textAlign={{ base: "left", md: "center" }}
        >
          Final price depends on your tyre size and brand selection. We&apos;ll quote you on the phone
          before we leave the depot — no surprises at the kerb.
        </Text>
      </Container>
    </Box>
  );
}
