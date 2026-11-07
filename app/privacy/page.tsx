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
          <Text color="fg.muted">Last updated: 7 November 2026</Text>

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
            When you contact us by phone, WhatsApp or SMS we
            collect: your name, phone number, vehicle details, postcode /
            location, and any details you share about the tyre fault. When you
            accept advertising measurement, Google may receive your IP address,
            device details, page address, referring source and interactions
            such as phone or WhatsApp clicks to measure ad performance.
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
            We store your cookie choice in your browser&apos;s local storage
            under &ldquo;dst_consent_v2&rdquo;. Our Google Ads tag uses basic
            Consent Mode v2: it does not load or send measurement requests
            before you accept, or on visits where you have rejected. Earlier
            clicks are not saved for later measurement. If you accept, Google
            Ads may use advertising cookies and measure your interactions.
            This site does not install a Google Analytics property or a Google
            Tag Manager container.
          </Text>
          <Text>
            You can change your choice via &ldquo;Cookie settings&rdquo; in the
            footer. Withdrawing consent updates Google&apos;s consent status
            and reloads the page to stop the previously loaded tag. Your choice
            applies to this website; Tyre Rescue manages consent separately on
            its booking platform.
          </Text>

          <Heading as="h2" size="lg" fontFamily="heading">
            Online bookings through Tyre Rescue
          </Heading>
          <Text>
            Our online booking links take you to Tyre Rescue, which provides
            the booking platform. If you enter a tyre size on our site, we
            pass it to Tyre Rescue to start your quote. You enter your
            postcode, phone number and other booking details directly on
            Tyre Rescue. Tyre Rescue uses those details to handle your
            booking. See the{" "}
            <a
              href="https://www.tyrerescue.uk/privacy-policy"
              style={{ color: "var(--chakra-colors-accent-red)" }}
            >
              Tyre Rescue Privacy Policy
            </a>{" "}
            for details about how it handles your data.
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
            law. Advertising measurement is handled by Google under its
            retention policies; contact us for details about our account&apos;s
            current settings.
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
