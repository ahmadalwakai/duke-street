import type { Metadata } from "next";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { SITE } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms governing use of Duke Street Tyres website and our mobile tyre fitting services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Box as="section" py={{ base: "12", md: "20" }}>
      <Container maxW="3xl">
        <Stack gap="6" color="fg">
          <Heading as="h1" fontFamily="heading" size="3xl" letterSpacing="0.02em">
            TERMS &amp; CONDITIONS
          </Heading>
          <Text color="fg.muted">Last updated: 1 January 2026</Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            1. Service
          </Heading>
          <Text>
            {SITE.legalName} provides mobile tyre fitting and roadside tyre
            replacement on a 24/7 call-out basis across Glasgow, Edinburgh,
            Dundee and the Scottish central belt, subject to fitter
            availability and safe access to your vehicle.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            2. Quotes &amp; pricing
          </Heading>
          <Text>
            Prices quoted by phone or WhatsApp are valid for 24 hours and
            assume normal access. Final price is confirmed before fitting
            begins. Payment is due on completion by card, contactless or Apple
            Pay. Cash is accepted at the fitter&rsquo;s discretion.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            3. Fitting &amp; safety
          </Heading>
          <Text>
            All fitting is carried out by trained fitters using calibrated
            torque equipment. We will refuse work where the vehicle, location
            or weather makes safe fitting impossible. In such cases a call-out
            fee may still apply.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            4. Warranty
          </Heading>
          <Text>
            New tyres carry the manufacturer&rsquo;s warranty. Our fitting work
            is guaranteed for 30 days against workmanship defects. Punctures,
            kerb damage or impact damage are not covered.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            5. Cancellation
          </Heading>
          <Text>
            If a fitter has already been dispatched, a call-out fee may apply
            to cover travel. Please cancel as early as possible.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            6. Liability
          </Heading>
          <Text>
            Our liability is limited to the value of the work performed. We
            are not liable for indirect or consequential loss. Nothing in
            these terms limits our liability for death or personal injury
            caused by negligence, or for any liability that cannot be limited
            by law.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            7. Governing law
          </Heading>
          <Text>
            These terms are governed by the law of Scotland and any disputes
            are subject to the exclusive jurisdiction of the Scottish courts.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            8. Contact
          </Heading>
          <Text>
            {SITE.legalName} · {SITE.address.street}, {SITE.address.city}{" "}
            {SITE.address.postalCode} · Phone {SITE.phoneDisplay}.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
