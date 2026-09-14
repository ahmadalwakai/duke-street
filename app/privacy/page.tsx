import type { Metadata } from "next";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { SITE } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How Duke Street Tyres collects, uses and protects your personal data under UK GDPR.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Box as="section" py={{ base: "12", md: "20" }}>
      <Container maxW="3xl">
        <Stack gap="6" color="fg">
          <Heading as="h1" fontFamily="heading" size="3xl" letterSpacing="0.02em">
            PRIVACY POLICY
          </Heading>
          <Text color="fg.muted">Last updated: 1 January 2026</Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            Who we are
          </Heading>
          <Text>
            {SITE.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this
            website at {SITE.domain}. We provide 24/7 mobile tyre fitting and
            roadside tyre replacement across Glasgow, Edinburgh and Dundee. Our
            registered place of business is {SITE.address.street},{" "}
            {SITE.address.city} {SITE.address.postalCode}.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            What data we collect
          </Heading>
          <Text>
            When you contact us by phone, WhatsApp, SMS or our quote form we
            collect: your name, phone number, vehicle details, postcode /
            location, and any details you share about the tyre fault. When you
            visit the site we may collect IP address, device type, pages
            visited, referring source and approximate location for analytics
            and ad-performance measurement.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            Lawful basis
          </Heading>
          <Text>
            We process your data on the basis of (a) your consent (cookies and
            marketing), (b) performance of a contract (dispatching a fitter to
            you), and (c) our legitimate interest in operating and improving
            our service.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            Cookies & tracking
          </Heading>
          <Text>
            We use strictly necessary cookies for the site to function, and —
            only with your consent — analytics and advertising cookies provided
            by Google (Google Analytics, Google Ads, Google Tag Manager). We
            implement Google Consent Mode v2: until you accept, no analytics,
            ad-storage, ad-user-data or ad-personalisation signals are sent.
            You can change your choice any time via the &ldquo;Cookie
            settings&rdquo; link in the footer.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            Sharing
          </Heading>
          <Text>
            We do not sell your data. We share limited operational data with
            our payment processor, our SMS / WhatsApp provider, and Google for
            ads measurement. All processors are bound by data-processing
            agreements.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            Retention
          </Heading>
          <Text>
            Job records are retained for 6 years to comply with UK accounting
            law. Marketing analytics data is retained for up to 14 months.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            Your rights
          </Heading>
          <Text>
            Under UK GDPR you may request access, rectification, erasure,
            restriction or portability of your data, and you may object to
            processing. Email us at{" "}
            <a
              href={`mailto:privacy@dukestreettyres.com`}
              style={{ color: "var(--chakra-colors-accent-red)" }}
            >
              privacy@dukestreettyres.com
            </a>
            . You also have the right to complain to the ICO at ico.org.uk.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            Contact
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
