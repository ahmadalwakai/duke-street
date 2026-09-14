import type { Metadata } from "next";
import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TrustRow } from "@/components/sections/TrustRow";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import {
  ENABLED_SCOTLAND_SERVICE_AREAS,
  INDEXABLE_SCOTLAND_SERVICE_AREAS,
} from "@/lib/cities";
import { SCOTLAND_COVERAGE_FAQS } from "@/lib/faqs";
import { breadcrumbSchema, faqSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";

const path = "/mobile-tyre-fitting-scotland";
const indexableAreaSlugs = new Set(INDEXABLE_SCOTLAND_SERVICE_AREAS.map((area) => area.slug));

export const metadata: Metadata = buildPageMetadata({
  title: "Mobile Tyre Fitting Scotland | Local Coverage Areas",
  description:
    "Mobile tyre fitting coverage across Glasgow, Edinburgh, Dundee and priority central Scotland towns. Call for live availability, fitted price and ETA.",
  path,
});

function areaHref(slug: string): string | null {
  return indexableAreaSlugs.has(slug) ? `/mobile-tyre-fitting-${slug}` : null;
}

export default function ScotlandCoveragePage() {
  return (
    <>
      <Hero
        h1="MOBILE TYRE FITTING SCOTLAND"
        subhead="Mobile tyre fitting and roadside tyre replacement across Glasgow, Edinburgh, Dundee and nearby central Scotland service areas. Call with your reg, tyre size and postcode for live availability, fitted price and ETA."
        badge="SCOTLAND COVERAGE • CALL FOR LIVE ETA"
        shimmer
      />
      <TrustRow />
      <TrustStrip />
      <Box as="section" py={{ base: "14", md: "20" }}>
        <Container maxW="6xl">
          <Stack gap="3" mb="8">
            <Text color="accent.red" fontWeight="700" letterSpacing="0.16em" fontSize="xs">
              SCOTLAND SERVICE AREAS
            </Text>
            <Heading as="h2" fontFamily="heading" fontSize={{ base: "4xl", md: "5xl" }}>
              CORE COVERAGE, WITHOUT FAKE BRANCHES
            </Heading>
            <Text color="fg.muted" maxW="72ch">
              Duke Street Tyres is based in Glasgow and runs mobile tyre fitting vans across live service areas. The towns below are coverage areas, not separate offices. Availability depends on tyre stock, fitter position and safe access.
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="5">
            {ENABLED_SCOTLAND_SERVICE_AREAS.map((area) => {
              const href = areaHref(area.slug);
              const card = (
                <Box p="5" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg.subtle" h="100%">
                  <Text color="accent.red" fontWeight="800" fontSize="xs" letterSpacing="0.12em">
                    {area.countyOrRegion.toUpperCase()}
                  </Text>
                  <Heading as="h3" mt="2" size="lg" fontFamily="heading" letterSpacing="0.04em">
                    {area.name.toUpperCase()}
                  </Heading>
                  <Text mt="3" color="fg.muted" fontSize="sm" lineHeight="1.6">
                    {area.serviceIntro}
                  </Text>
                  <Text mt="3" color="fg.muted" fontSize="sm">
                    Postcodes: {area.postcodeExamples.join(", ")}
                  </Text>
                  <Text mt="1" color="fg.muted" fontSize="sm">
                    Roads: {area.keyRoads.join(", ")}
                  </Text>
                  <Text mt="1" color="fg.muted" fontSize="sm">
                    Nearby: {area.nearbyAreas.slice(0, 4).join(", ")}
                  </Text>
                  {href ? (
                    <Text mt="4" color="accent.red" fontSize="sm" fontWeight="800">
                      View {area.name} service page
                    </Text>
                  ) : null}
                </Box>
              );
              return href ? (
                <Link key={area.slug} href={href} style={{ display: "block" }}>
                  {card}
                </Link>
              ) : (
                <Box key={area.slug}>{card}</Box>
              );
            })}
          </SimpleGrid>
        </Container>
      </Box>
      <HowItWorks />
      <CoverageSection activeCity="glasgow" />
      <FaqSection items={SCOTLAND_COVERAGE_FAQS} />
      <CtaBlock />
      <JsonLd
        data={[
          localBusinessSchema(),
          serviceSchema("Mobile Tyre Fitting Scotland", undefined, path),
          faqSchema(SCOTLAND_COVERAGE_FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Mobile Tyre Fitting Scotland", path },
          ]),
        ]}
      />
    </>
  );
}