import { Hero } from "@/components/sections/Hero";
import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TrustRow } from "@/components/sections/TrustRow";
import { BigCallBanner } from "@/components/sections/BigCallBanner";
import { PricingStrip } from "@/components/sections/PricingStrip";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyUs } from "@/components/sections/WhyUs";
import { CoverageSection } from "@/components/sections/CoverageSection";
import TyreBrandsSection from "@/components/sections/TyreBrandsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { CityIntro } from "@/components/sections/CityIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  CITIES,
  CITY_SERVICE_VARIANTS,
  CITY_SLUGS,
  getCity,
  type City,
  type CitySlug,
  type PageVariant,
} from "@/lib/cities";
import { FAQS } from "@/lib/faqs";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";
import { getLegacyCanonicalPath } from "@/lib/seo/services";

type Copy = {
  h1: (cityUpper: string) => string;
  badge?: string;
  introHeading: (cityName: string) => string;
  subhead: (cityName: string, landmarks: string) => string;
  serviceName: (cityName: string) => string;
};

const COPY: Record<PageVariant, Copy> = {
  "mobile-tyre-fitting": {
    h1: (c) => `MOBILE TYRE FITTING ${c}`,
    introHeading: (c) => `${c}'s 24/7 mobile tyre crew.`,
    subhead: (c, l) =>
      `We come to you anywhere across ${c} — ${l} and every postcode in between. Average on-scene time 30–40 minutes, day or night.`,
    serviceName: (c) => `Mobile Tyre Fitting ${c}`,
  },
  "emergency-tyre-call-out": {
    h1: (c) => `EMERGENCY TYRE CALL-OUT ${c}`,
    badge: "🚨 EMERGENCY ROADSIDE • 24/7",
    introHeading: (c) => `${c} flat tyre? We come to you.`,
    subhead: (c, l) =>
      `Blowout, puncture or sidewall split anywhere in ${c}? We roll a fully stocked van to you, 24/7, with the right size already on board (${l}). Average on-scene 30–40 minutes.`,
    serviceName: (c) => `Emergency Tyre Call-Out ${c}`,
  },
  "24-hour-mobile-tyre-fitting": {
    h1: (c) => `24 HOUR MOBILE TYRE FITTING ${c}`,
    badge: "🌙 OPEN 24/7 • NO OVERNIGHT SURCHARGE",
    introHeading: (c) => `${c} tyre fitting, day or night.`,
    subhead: (c, l) =>
      `Open all night, every night across ${c} (${l}). Same price 3am as 3pm. Average response 30–40 minutes with the right tyre on the van.`,
    serviceName: (c) => `24 Hour Mobile Tyre Fitting ${c}`,
  },
  "roadside-tyre-replacement": {
    h1: (c) => `ROADSIDE TYRE REPLACEMENT ${c}`,
    badge: "🚨 ROADSIDE REPLACEMENT • 24/7",
    introHeading: (c) => `${c} roadside tyre help without the depot run.`,
    subhead: (c, l) =>
      `Flat tyre, puncture or blowout in ${c}? We bring a mobile fitting van to safe kerbsides, car parks and roadside locations around ${l}. Call for a live ETA and fitted price before dispatch.`,
    serviceName: (c) => `Roadside Tyre Replacement ${c}`,
  },
};

const LINK_LABELS: Record<PageVariant, string> = {
  "mobile-tyre-fitting": "Mobile tyre fitting",
  "emergency-tyre-call-out": "Emergency tyre call-out",
  "24-hour-mobile-tyre-fitting": "24 hour mobile fitting",
  "roadside-tyre-replacement": "Roadside tyre replacement",
};

function CityInternalLinks({ city, variant }: { city: City; variant: PageVariant }) {
  const relatedServices = CITY_SERVICE_VARIANTS.filter((item) => item !== variant);
  const nearbyCities = CITY_SLUGS.filter((slug) => slug !== city.slug);
  return (
    <Box as="section" py={{ base: "12", md: "14" }} bg="bg.subtle">
      <Container maxW="6xl">
        <Stack gap="3" mb="6">
          <Text color="accent.red" fontWeight="700" letterSpacing="0.16em" fontSize="xs">
            LOCAL LINKS
          </Text>
          <Heading as="h2" fontFamily="heading" fontSize={{ base: "3xl", md: "4xl" }}>
            RELATED TYRE HELP IN {city.name.toUpperCase()}
          </Heading>
          <Text color="fg.muted" maxW="70ch">
            Choose the closest match for your situation, or check nearby Scotland coverage if you are just outside {city.name}.
          </Text>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
          {relatedServices.map((item) => (
            <Link key={item} href={`/${item}-${city.slug}`} style={{ display: "block" }}>
              <Box p="5" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg" h="100%">
                <Text fontWeight="800">{LINK_LABELS[item]} {city.name}</Text>
                <Text mt="2" color="fg.muted" fontSize="sm">
                  See service details, local coverage, FAQs and call options.
                </Text>
              </Box>
            </Link>
          ))}
          <Link href="/roadside-tyre-replacement-near-me" style={{ display: "block" }}>
            <Box p="5" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg" h="100%">
              <Text fontWeight="800">Roadside tyre replacement near me</Text>
              <Text mt="2" color="fg.muted" fontSize="sm">
                For urgent searches when you need the nearest available fitter.
              </Text>
            </Box>
          </Link>
          <Link href="/mobile-tyre-fitting-scotland" style={{ display: "block" }}>
            <Box p="5" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg" h="100%">
              <Text fontWeight="800">Scotland coverage areas</Text>
              <Text mt="2" color="fg.muted" fontSize="sm">
                Check nearby towns, key roads and wider central Scotland coverage.
              </Text>
            </Box>
          </Link>
          {nearbyCities.map((slug) => {
            const nearby = CITIES[slug];
            return (
              <Link key={slug} href={`/mobile-tyre-fitting-${slug}`} style={{ display: "block" }}>
                <Box p="5" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg" h="100%">
                  <Text fontWeight="800">Mobile tyre fitting {nearby.name}</Text>
                  <Text mt="2" color="fg.muted" fontSize="sm">
                    Nearby city coverage for {nearby.postcodeExamples.join(", ")} and surrounding routes.
                  </Text>
                </Box>
              </Link>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

type Props = { slug: CitySlug; variant: PageVariant };

export function CityServicePage({ slug, variant }: Props) {
  const c = getCity(slug);
  if (!c) return null;
  const copy = COPY[variant];
  const landmarks = c.landmarks.slice(0, 4).join(", ");
  const path = getLegacyCanonicalPath(variant, slug);
  const pageFaqs = [...FAQS, ...c.faqs];
  return (
    <>
      <Hero
        h1={copy.h1(c.name.toUpperCase())}
        subhead={copy.subhead(c.name, landmarks)}
        shimmer
        city={c.name}
        {...(copy.badge ? { badge: copy.badge } : {})}
      />
      <TrustRow />
      <TrustStrip />
      <BigCallBanner />
      <CityIntro
        city={c}
        heading={copy.introHeading(c.name)}
        intro={CITIES[slug].intros[variant]}
      />
      <TyreBrandsSection />
      <CityInternalLinks city={c} variant={variant} />
      <PricingStrip />
      <HowItWorks />
      <WhyUs />
      <CoverageSection activeCity={slug} />
      <ReviewsSection />
      <FaqSection items={pageFaqs} />
      <CtaBlock city={c.name} />
      <JsonLd
        data={[
          localBusinessSchema(slug),
          serviceSchema(copy.serviceName(c.name), slug, path),
          faqSchema(pageFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: copy.serviceName(c.name), path },
          ]),
        ]}
      />
    </>
  );
}

export function buildCityMetadata(slug: CitySlug, variant: PageVariant) {
  const c = getCity(slug);
  if (!c) return {};
  const path = getLegacyCanonicalPath(variant, slug);
  return buildPageMetadata({
    title: c.metaTitles[variant],
    description: c.metaDescriptions[variant],
    path,
  });
}
