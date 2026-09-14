"use client";

import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SITE, telHref, waHref } from "@/lib/site";
import { AppButton } from "@/components/ui/AppButton";
import { LiveStatusBar } from "@/components/ui/LiveStatusBar";
import { HeroReviewBadge } from "@/components/ui/HeroReviewBadge";
import { BookingIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { HeroPhotos } from "@/components/sections/HeroPhotos";
import { trackCallClick, trackWhatsAppClick } from "@/lib/analytics";

type Props = {
  h1: string;
  subhead: string;
  badge?: string;
  shimmer?: boolean;
  city?: string;
};

export function Hero({
  h1,
  subhead,
  badge = "24/7 EMERGENCY • RESPONSE 30–40 MIN",
  shimmer = false,
  city,
}: Props) {
  return (
    <Box
      as="section"
      bg="bg"
      position="relative"
      overflow="hidden"
      borderBottomWidth="1px"
      borderColor="border"
    >
      <Box
        position="absolute"
        inset="0"
        bgGradient="radial(circle at 70% 30%, rgba(225,29,46,0.18), transparent 55%)"
        pointerEvents="none"
      />
      <Container maxW="6xl" py={{ base: "12", md: "20" }} px={{ base: "5", md: "6" }} position="relative">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={{ base: "10", md: "8" }}
        >
          <Stack flex="1" gap="6" w="100%" minW="0">
            <LiveStatusBar />
            <HStack
              gap="2"
              color="accent.red"
              fontSize="xs"
              fontWeight="700"
              letterSpacing="0.14em"
              wrap="wrap"
            >
              <Box w="8px" h="8px" borderRadius="full" bg="accent.red" />
              <Text>{badge}</Text>
            </HStack>
            <Heading
              as="h1"
              fontFamily="heading"
              fontSize={{ base: "clamp(2rem, 8vw, 2.75rem)", md: "clamp(3rem, 6vw, 5rem)" }}
              lineHeight="1.1"
              letterSpacing="0.005em"
              textTransform="uppercase"
              pb="0.15em"
              maxW={{ base: "12ch", md: "20ch" }}
              color="white"
              className={shimmer ? "hero-shimmer" : undefined}
            >
              {h1}
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight="1.5"
              color="fg.muted"
              w="100%"
              maxW={{ base: "34ch", md: "60ch" }}
              overflowWrap="break-word"
            >
              {subhead}
            </Text>
            <Stack
              direction={{ base: "column", sm: "row" }}
              gap="3"
              w={{ base: "100%", sm: "auto" }}
            >
              <AppButton
                href={telHref()}
                variant="solidRed"
                size="xl"
                className="call-attention hero-call-attention"
                onClick={() => trackCallClick("hero")}
              >
                <PhoneIcon size={18} />
                <Box as="span" ml="2">Call {SITE.phoneDisplay}</Box>
              </AppButton>
              <AppButton
                href="/book"
                variant="solidRed"
                size="xl"
                aria-label="Book mobile tyre fitting online"
                className="book-attention"
              >
                <BookingIcon size={19} />
                <Box as="span" ml="2">Book online</Box>
              </AppButton>
              <AppButton
                href={waHref()}
                rel="noopener"
                variant="solidGreen"
                size="xl"
                onClick={() => trackWhatsAppClick("hero")}
              >
                <WhatsAppIcon size={20} />
                <Box as="span" ml="2">WhatsApp</Box>
              </AppButton>
            </Stack>
            <HStack gap="6" color="fg.muted" fontSize="sm" wrap="wrap">
              <Text>✓ Fully insured</Text>
              <Text>✓ All major brands</Text>
              <Text>✓ Card & Apple Pay</Text>
            </HStack>
            <QuoteForm city={city} />
          </Stack>

          <Box flexShrink={0} position="relative" w={{ base: "100%", md: "480px" }}>
            <HeroPhotos city={city} />
            <Box
              position="absolute"
              bottom={{ base: "-12px", md: "-16px" }}
              left={{ base: "50%", md: "-32px" }}
              transform={{ base: "translateX(-50%)", md: "none" }}
              zIndex={2}
            >
              <HeroReviewBadge />
            </Box>
          </Box>
        </Flex>
      </Container>
      <style>{`
        @keyframes heroShimmer {
          0%   { background-position: -150% 0; }
          100% { background-position: 250% 0; }
        }
        .hero-shimmer {
          color: #ffffff;
          -webkit-text-fill-color: #ffffff;
          text-shadow: 0 0 24px rgba(225,29,46,0.18);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-shimmer { animation: none; color: #ffffff; -webkit-text-fill-color: #ffffff; }
        }
      `}</style>
    </Box>
  );
}
