"use client";

import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { SITE, telHref, waHref } from "@/lib/site";
import { FadeUp } from "@/components/ui/FadeUp";
import { AppButton } from "@/components/ui/AppButton";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { trackCallClick } from "@/lib/analytics";

export function CtaBlock({ city }: { city?: string }) {
  const where = city ?? "Glasgow, Edinburgh & Dundee";
  return (
    <Box as="section" bg="accent.red" color="white" py={{ base: "14", md: "20" }}>
      <Container maxW="4xl" textAlign="center">
        <FadeUp>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "clamp(2rem, 8vw, 3rem)", md: "clamp(3rem, 6vw, 5rem)" }}
            lineHeight="1.1"
            pb="0.15em"
          >
            FLAT TYRE IN {where.toUpperCase()}?
          </Heading>
        </FadeUp>
        <FadeUp index={1}>
          <Text mt="4" fontSize={{ base: "md", md: "lg" }} opacity="0.92">
            One call. We are on the way in minutes. Average response{" "}
            {SITE.responseTime}, 24/7, every day.
          </Text>
        </FadeUp>
        <FadeUp index={2}>
          <Box
            asChild
            display="inline-flex"
            alignItems="center"
            gap="3"
            mt="8"
            fontFamily="heading"
            fontSize={{ base: "clamp(2.75rem, 12vw, 4.5rem)", md: "clamp(4rem, 8vw, 6rem)" }}
            lineHeight="1"
            letterSpacing="0.01em"
            color="white"
            _hover={{ opacity: 0.9 }}
            className="call-number-attention"
          >
            <a
              href={telHref()}
              style={{ textDecoration: "none" }}
              onClick={() => trackCallClick(`cta_block_number_${city ?? "home"}`)}
            >
              <PhoneIcon size={48} />
              <Box as="span">{SITE.phoneDisplay}</Box>
            </a>
          </Box>
        </FadeUp>
        <FadeUp index={3}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            justify="center"
            gap="3"
            mt="6"
          >
            <AppButton
              href={telHref()}
              size="xl"
              bg="white"
              color="accent.red"
              fontWeight="800"
              _hover={{ bg: "blackAlpha.100" }}
              w={{ base: "100%", sm: "auto" }}
              trackingLocation={`cta_block_button_${city ?? "home"}`}
              className="call-attention call-attention-inverted"
            >
              <PhoneIcon size={18} />
              <Box as="span" ml="2">Tap to call now</Box>
            </AppButton>
            <AppButton
              href={waHref()}
              rel="noopener"
              variant="solidGreen"
              size="xl"
              trackingLocation={`cta_block_button_${city ?? "home"}`}
            >
              <WhatsAppIcon size={20} />
              <Box as="span" ml="2">WhatsApp now</Box>
            </AppButton>
          </Stack>
        </FadeUp>
        <FadeUp index={4}>
          <Text mt="6" fontSize="sm" opacity="0.85">
            ✓ Open right now · ✓ Real fitter answers · ✓ No overnight surcharge
          </Text>
        </FadeUp>
      </Container>
    </Box>
  );
}
