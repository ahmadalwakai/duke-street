import { Box, Container, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";
import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box as="footer" bg="bg.subtle" borderTopWidth="1px" borderColor="border" mt="20">
      <Container maxW="6xl" py="12">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="10">
          <Stack gap="3">
            <HStack gap="3">
              <Image
                src="/logo.svg"
                alt="Duke Street Tyres logo"
                width={48}
                height={48}
              />
              <Heading as="h3" size="md" fontFamily="heading" letterSpacing="0.04em">
                {SITE.name.toUpperCase()}
              </Heading>
            </HStack>
            <Text color="fg.muted" fontSize="sm">
              24/7 mobile tyre fitting across Glasgow, Edinburgh, Dundee and nearby Scotland coverage areas.
              Cars, vans and 4x4s. Average response {SITE.responseTime}. Fully
              insured. Card, contactless and Apple Pay accepted at the kerb.
            </Text>
          </Stack>

          <Stack gap="2">
            <Heading as="h3" size="sm" fontFamily="heading" letterSpacing="0.06em">
              AREAS WE COVER
            </Heading>
            <Link href="/mobile-tyre-fitting-scotland">Scotland Coverage Areas</Link>
            <Link href="/mobile-tyre-fitting-glasgow">Mobile Tyre Fitting Glasgow</Link>
            <Link href="/mobile-tyre-fitting-edinburgh">Mobile Tyre Fitting Edinburgh</Link>
            <Link href="/mobile-tyre-fitting-dundee">Mobile Tyre Fitting Dundee</Link>
            <Link href="/emergency-tyre-call-out-glasgow">Emergency Call-Out Glasgow</Link>
            <Link href="/emergency-tyre-call-out-edinburgh">Emergency Call-Out Edinburgh</Link>
            <Link href="/emergency-tyre-call-out-dundee">Emergency Call-Out Dundee</Link>
            <Link href="/24-hour-mobile-tyre-fitting-glasgow">24 Hour Glasgow</Link>
            <Link href="/24-hour-mobile-tyre-fitting-edinburgh">24 Hour Edinburgh</Link>
            <Link href="/24-hour-mobile-tyre-fitting-dundee">24 Hour Dundee</Link>
            <Link href="/roadside-tyre-replacement-near-me">Roadside Tyre Replacement</Link>
            <Link href="/roadside-tyre-replacement-glasgow">Roadside Replacement Glasgow</Link>
            <Link href="/roadside-tyre-replacement-edinburgh">Roadside Replacement Edinburgh</Link>
            <Link href="/roadside-tyre-replacement-dundee">Roadside Replacement Dundee</Link>
          </Stack>

          <Stack gap="2">
            <Heading as="h3" size="sm" fontFamily="heading" letterSpacing="0.06em">
              CONTACT
            </Heading>
            <Text>{SITE.name}</Text>
            <Text color="fg.muted">{SITE.address.street}</Text>
            <Text color="fg.muted">
              {SITE.address.city}, {SITE.address.postalCode}
            </Text>
            <Text>
              <a
                href={SITE.googleMapsUrl}
                target="_blank"
                rel="noopener"
                style={{ color: "var(--chakra-colors-accent-red)" }}
              >
                View on Google Maps →
              </a>
            </Text>
            <Text>
              Phone:{" "}
              <TrackedPhoneLink location="footer" />
            </Text>
            <Text>
              WhatsApp:{" "}
              <Box as="span" color="accent.red">
                {SITE.whatsappDisplay}
              </Box>
            </Text>
            <Text color="fg.muted">Open 24/7</Text>
          </Stack>
        </SimpleGrid>

        <Stack mt="10" direction={{ base: "column", md: "row" }} justify="space-between" gap="3">
          <Text fontSize="xs" color="fg.muted">
            © {year} {SITE.legalName}. All rights reserved.
          </Text>
          <HStack gap="4" fontSize="xs">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <CookieSettingsButton />
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
