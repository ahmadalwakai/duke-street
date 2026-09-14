"use client";

import { Box, Container, HStack, Stack, Text } from "@chakra-ui/react";
import { SITE, telHref, waHref } from "@/lib/site";
import { AppButton } from "@/components/ui/AppButton";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { trackCallClick } from "@/lib/analytics";

export function BigCallBanner() {
  return (
    <Box
      as="section"
      py={{ base: "10", md: "12" }}
      bg="bg"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor="border"
    >
      <Container maxW="5xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap="6"
          textAlign={{ base: "center", md: "left" }}
        >
          <Stack gap="1" flex="1">
            <Text
              color="accent.red"
              fontWeight="700"
              letterSpacing="0.18em"
              fontSize="2xs"
              textTransform="uppercase"
            >
              Tap to call now
            </Text>
            <Box
              asChild
              fontFamily="heading"
              fontSize={{ base: "clamp(2.5rem, 11vw, 4rem)", md: "clamp(3rem, 6vw, 4.5rem)" }}
              lineHeight="1"
              letterSpacing="0.01em"
              color="white"
              _hover={{ color: "accent.red" }}
              transition="color 0.2s ease"
              display="inline-block"
              className="call-number-attention"
            >
              <a
                href={telHref()}
                style={{ textDecoration: "none" }}
                onClick={() => trackCallClick("big_call_banner_number")}
              >
                {SITE.phoneDisplay}
              </a>
            </Box>
            <Text color="fg.muted" fontSize="sm">
              Real fitter answers · Average response {SITE.responseTime}
            </Text>
          </Stack>

          <HStack gap="3" w={{ base: "100%", md: "auto" }} justify="center">
            <AppButton
              href={telHref()}
              variant="solidRed"
              size="xl"
              trackingLocation="big_call_banner_button"
              className="call-attention"
            >
              <PhoneIcon size={18} />
              <Box as="span" ml="2">Call</Box>
            </AppButton>
            <AppButton
              href={waHref()}
              rel="noopener"
              variant="solidGreen"
              size="xl"
              trackingLocation="big_call_banner_button"
            >
              <WhatsAppIcon size={20} />
              <Box as="span" ml="2">WhatsApp</Box>
            </AppButton>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
