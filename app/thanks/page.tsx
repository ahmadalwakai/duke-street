import type { Metadata } from "next";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { SITE, telHref, waHref } from "@/lib/site";
import { AppButton } from "@/components/ui/AppButton";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ConversionFire } from "@/components/analytics/ConversionFire";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Thanks — we'll call you back",
  description:
    "Your request has been received. A Duke Street Tyres fitter will call you back shortly.",
  path: "/thanks",
  robots: { index: false, follow: false },
});

export default function ThanksPage() {
  return (
    <Box as="section" py={{ base: "16", md: "24" }} textAlign="center">
      <Container maxW="2xl">
        <Stack gap="6" align="center">
          <Box
            w="64px"
            h="64px"
            borderRadius="full"
            bg="accent.green"
            color="white"
            display="grid"
            placeItems="center"
            fontSize="3xl"
            fontWeight="900"
          >
            ✓
          </Box>
          <Heading as="h1" fontFamily="heading" size="3xl" letterSpacing="0.02em">
            REQUEST RECEIVED
          </Heading>
          <Text color="fg.muted" fontSize="lg" maxW="50ch">
            Thanks — a fitter will call you back within a few minutes. If
            it&rsquo;s urgent, please ring us directly on the number below.
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} gap="3">
            <AppButton
              href={telHref()}
              variant="solidRed"
              size="xl"
              trackingLocation="thanks_page"
            >
              <PhoneIcon size={18} />
              <Box as="span" ml="2">Call {SITE.phoneDisplay}</Box>
            </AppButton>
            <AppButton
              href={waHref()}
              rel="noopener"
              variant="solidGreen"
              size="xl"
              trackingLocation="thanks_page"
            >
              <WhatsAppIcon size={20} />
              <Box as="span" ml="2">WhatsApp</Box>
            </AppButton>
          </Stack>
        </Stack>
      </Container>
      <ConversionFire />
    </Box>
  );
}
