import { Box, Container, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/sections/FaqSection";
import TyreBrandsSection from "@/components/sections/TyreBrandsSection";
import { AppButton } from "@/components/ui/AppButton";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SITE, telHref, waHref } from "@/lib/site";
import type { SeoInternalLink, SeoPage } from "@/lib/seo/types";

function LinkCard({ link }: { link: SeoInternalLink }) {
  return (
    <Link href={link.href} style={{ display: "block", height: "100%" }}>
      <Box
        h="100%"
        p="5"
        borderWidth="1px"
        borderColor="border"
        borderRadius="lg"
        bg="bg.subtle"
        transition="border-color 0.2s, transform 0.2s"
        _hover={{ borderColor: "accent.red", transform: "translateY(-2px)" }}
      >
        <Text fontWeight="800">{link.label}</Text>
        {link.description ? (
          <Text mt="2" color="fg.muted" fontSize="sm" lineHeight="1.6">
            {link.description}
          </Text>
        ) : null}
      </Box>
    </Link>
  );
}

function LinkGrid({ links }: { links: readonly SeoInternalLink[] }) {
  if (links.length === 0) return null;
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
      {links.map((link) => (
        <LinkCard key={`${link.href}-${link.label}`} link={link} />
      ))}
    </SimpleGrid>
  );
}

function SectionHeading({ kicker, title, body }: { kicker: string; title: string; body?: string }) {
  return (
    <Stack gap="3" mb="6">
      <Text color="accent.red" fontWeight="700" letterSpacing="0.16em" fontSize="xs">
        {kicker}
      </Text>
      <Heading as="h2" fontFamily="heading" fontSize={{ base: "3xl", md: "4xl" }}>
        {title}
      </Heading>
      {body ? (
        <Text color="fg.muted" maxW="74ch" lineHeight="1.7">
          {body}
        </Text>
      ) : null}
    </Stack>
  );
}

export function ProgrammaticSeoPage({ page }: { page: SeoPage }) {
  const whatsappMessage = `Hi, I need ${page.service.shortLabel.toLowerCase()} in ${page.location.name}`;
  return (
    <>
      <Box as="section" bg="bg" borderBottomWidth="1px" borderColor="border">
        <Container maxW="6xl" py={{ base: "12", md: "18" }}>
          <Stack gap="7" maxW="4xl">
            <Stack gap="3">
              <HStack gap="2" color="accent.red" fontSize="xs" fontWeight="700" letterSpacing="0.14em" wrap="wrap">
                <Box w="8px" h="8px" borderRadius="full" bg="accent.red" />
                <Text>{page.service.shortLabel.toUpperCase()} SERVICE AREA</Text>
              </HStack>
              <Heading
                as="h1"
                fontFamily="heading"
                fontSize={{ base: "clamp(2rem, 8vw, 2.8rem)", md: "clamp(3rem, 6vw, 5rem)" }}
                lineHeight="1.08"
                maxW="18ch"
                color="white"
              >
                {page.h1.toUpperCase()}
              </Heading>
              <Text color="fg.muted" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.6" maxW="68ch">
                {page.description}
              </Text>
            </Stack>

            <Stack direction={{ base: "column", sm: "row" }} gap="3" w={{ base: "100%", sm: "auto" }}>
              <AppButton
                href={telHref()}
                variant="solidRed"
                size="xl"
                trackingLocation={`programmatic_hero_${page.location.slug}`}
                className="call-attention"
              >
                <PhoneIcon size={18} />
                <Box as="span" ml="2">Call {SITE.phoneDisplay}</Box>
              </AppButton>
              <AppButton
                href={waHref(whatsappMessage)}
                rel="noopener"
                variant="solidGreen"
                size="xl"
                trackingLocation={`programmatic_hero_${page.location.slug}`}
              >
                <WhatsAppIcon size={20} />
                <Box as="span" ml="2">WhatsApp</Box>
              </AppButton>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
              <Box p="5" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg.subtle">
                <Text color="accent.red" fontSize="xs" fontWeight="800" letterSpacing="0.12em">SERVICE</Text>
                <Text mt="2" fontWeight="800">{page.service.label}</Text>
              </Box>
              <Box p="5" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg.subtle">
                <Text color="accent.red" fontSize="xs" fontWeight="800" letterSpacing="0.12em">AREA</Text>
                <Text mt="2" fontWeight="800">{page.location.name}</Text>
              </Box>
              <Box p="5" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg.subtle">
                <Text color="accent.red" fontSize="xs" fontWeight="800" letterSpacing="0.12em">ACCESS</Text>
                <Text mt="2" fontWeight="800">Confirmed before dispatch</Text>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <Box as="section" py={{ base: "12", md: "16" }}>
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap="8" alignItems="start">
            <Box gridColumn={{ base: "auto", lg: "span 2" }}>
              <SectionHeading
                kicker="LOCAL SERVICE SUMMARY"
                title={`${page.service.label.toUpperCase()} FOR ${page.location.name.toUpperCase()}`}
              />
              <Text color="fg.muted" fontSize="lg" lineHeight="1.8">
                {page.intro}
              </Text>
            </Box>
            <Box p="5" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg.subtle">
              <Heading as="h2" size="md" fontFamily="heading" letterSpacing="0.04em">
                BEFORE YOU CALL
              </Heading>
              <Stack as="ul" gap="3" mt="4" pl="0" listStyleType="none">
                {page.beforeYouCall.map((item) => (
                  <Text as="li" key={item} color="fg.muted" fontSize="sm" lineHeight="1.6">
                    {item}
                  </Text>
                ))}
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <TyreBrandsSection />

      <Box as="section" py={{ base: "12", md: "16" }} bg="bg.subtle">
        <Container maxW="6xl">
          <SectionHeading
            kicker="AREAS NEARBY"
            title="NEARBY MOBILE TYRE HELP"
            body="Check nearby areas if your vehicle is just outside this location or close to a connecting route."
          />
          <LinkGrid links={page.nearbyLinks} />
        </Container>
      </Box>

      <Box as="section" py={{ base: "12", md: "16" }}>
        <Container maxW="6xl">
          <SectionHeading
            kicker="COMMON TYRE HELP NEARBY"
            title="RELATED SERVICES IN THIS AREA"
            body="Choose the closest match for the tyre problem before calling or sending a WhatsApp message."
          />
          <LinkGrid links={page.relatedServiceLinks} />
        </Container>
      </Box>

      <FaqSection items={page.faqs} />

      <Box as="section" py={{ base: "12", md: "16" }} bg="bg.subtle">
        <Container maxW="6xl">
          <SectionHeading
            kicker="MORE COVERAGE"
            title="SCOTLAND TYRE SERVICE AREAS"
            body="Quick routes to core cities and nearby service areas for mobile tyre fitting support."
          />
          <LinkGrid links={page.priorityCoverageLinks} />
        </Container>
      </Box>

      <Box as="section" bg="accent.red" color="white" py={{ base: "12", md: "16" }}>
        <Container maxW="4xl" textAlign="center">
          <Stack gap="5" align="center">
            <Heading as="h2" fontFamily="heading" fontSize={{ base: "3xl", md: "5xl" }}>
              NEED TYRE HELP IN {page.location.name.toUpperCase()}?
            </Heading>
            <Text opacity="0.92" maxW="64ch">
              Call or WhatsApp with your registration, tyre size and exact location. We confirm availability, fitted price and safe access before dispatch.
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} gap="3" w={{ base: "100%", sm: "auto" }}>
              <AppButton
                href={telHref()}
                size="xl"
                bg="white"
                color="accent.red"
                fontWeight="800"
                _hover={{ bg: "blackAlpha.100" }}
                trackingLocation={`programmatic_bottom_${page.location.slug}`}
                className="call-attention call-attention-inverted"
              >
                <PhoneIcon size={18} />
                <Box as="span" ml="2">Call now</Box>
              </AppButton>
              <AppButton
                href={waHref(whatsappMessage)}
                rel="noopener"
                variant="solidGreen"
                size="xl"
                trackingLocation={`programmatic_bottom_${page.location.slug}`}
              >
                <WhatsAppIcon size={20} />
                <Box as="span" ml="2">WhatsApp</Box>
              </AppButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <JsonLd data={[...page.schema]} />
    </>
  );
}
