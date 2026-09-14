"use client";

import {
  Box,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { CITIES, CITY_SLUGS, ENABLED_SCOTLAND_SERVICE_AREAS } from "@/lib/cities";
import { SITE } from "@/lib/site";
import { FadeUp } from "@/components/ui/FadeUp";

const MAP_ZOOM = 16;

function lngToTileX(lng: number, zoom: number): number {
  return ((lng + 180) / 360) * 2 ** zoom;
}

function latToTileY(lat: number, zoom: number): number {
  const rad = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** zoom;
}

function serviceMapPoint(city: (typeof CITIES)[keyof typeof CITIES]) {
  if (city.slug === "glasgow") {
    return {
      lat: SITE.geo.lat,
      lng: SITE.geo.lng,
      label: SITE.address.street,
      address: `${SITE.address.street}, ${SITE.address.city} ${SITE.address.postalCode}, UK`,
      url: SITE.googleMapsShortUrl,
    };
  }

  return {
    lat: city.lat,
    lng: city.lng,
    label: city.name,
    address: `${city.name} mobile tyre fitting coverage`,
    url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${city.name}, Scotland`)}`,
  };
}

function RealServiceMap({ city }: { city: (typeof CITIES)[keyof typeof CITIES] }) {
  const point = serviceMapPoint(city);
  const centerX = lngToTileX(point.lng, MAP_ZOOM);
  const centerY = latToTileY(point.lat, MAP_ZOOM);
  const originX = Math.floor(centerX) - 1;
  const originY = Math.floor(centerY) - 1;
  const markerLeft = ((centerX - originX) / 3) * 100;
  const markerTop = ((centerY - originY) / 3) * 100;
  const tiles = [-1, 0, 1].flatMap((row) =>
    [-1, 0, 1].map((col) => ({
      key: `${row}-${col}`,
      x: originX + col + 1,
      y: originY + row + 1,
    })),
  );

  return (
    <Box
      position="relative"
      borderWidth="1px"
      borderColor="border"
      borderRadius="lg"
      overflow="hidden"
      bg="#EEF3F8"
      minH={{ base: "420px", md: "520px" }}
      boxShadow="0 24px 60px rgba(0,0,0,0.34)"
    >
      <Box
        aria-label={`${city.name} service area map`}
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gridTemplateRows="repeat(3, 1fr)"
        h="100%"
        minH={{ base: "420px", md: "520px" }}
      >
        {tiles.map((tile) => (
          <Box
            key={tile.key}
            style={{
              backgroundImage: `url(https://tile.openstreetmap.org/${MAP_ZOOM}/${tile.x}/${tile.y}.png)`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          />
        ))}
      </Box>

      <Box
        position="absolute"
        inset="0"
        bg="linear-gradient(180deg, rgba(255,255,255,0.03), rgba(11,15,20,0.08))"
        pointerEvents="none"
      />

      <Box
        className="real-map-pin"
        position="absolute"
        left={`${markerLeft}%`}
        top={`${markerTop}%`}
        transform="translate(-50%, -50%) rotate(-45deg)"
        w="36px"
        h="36px"
        borderRadius="999px 999px 999px 0"
        bg="accent.red"
        border="3px solid white"
        boxShadow="0 16px 34px rgba(0,0,0,0.34)"
        aria-hidden
      >
        <Box
          position="absolute"
          inset="8px"
          bg="white"
          borderRadius="999px"
        />
      </Box>

      <Box
        position="absolute"
        left={{ base: "12px", md: "20px" }}
        top={{ base: "12px", md: "20px" }}
        maxW={{ base: "calc(100% - 24px)", md: "330px" }}
        bg="rgba(255,255,255,0.96)"
        color="#111827"
        borderRadius="md"
        boxShadow="0 18px 42px rgba(0,0,0,0.18)"
        px="4"
        py="3"
      >
        <Stack gap="2">
          <Box>
            <Text fontWeight="900" fontSize="md">
              {point.label}
            </Text>
            <Text color="#4B5563" fontSize="sm" lineHeight="1.4">
              {point.address}
            </Text>
          </Box>
          <HStack gap="2">
            <Box
              asChild
              bg="#2563EB"
              color="white"
              borderRadius="999px"
              px="4"
              py="2"
              fontWeight="800"
              fontSize="sm"
              lineHeight="1"
            >
              <a href={point.url} target="_blank" rel="noopener">
                Open in Maps
              </a>
            </Box>
            <Box w="34px" h="34px" borderRadius="999px" display="grid" placeItems="center" bg="#EEF2FF" color="#2563EB" fontWeight="900">
              ↗
            </Box>
          </HStack>
        </Stack>
      </Box>

      <Text
        position="absolute"
        right="10px"
        bottom="8px"
        color="#4B5563"
        fontSize="10px"
        bg="rgba(255,255,255,0.72)"
        px="2"
        py="1"
        borderRadius="sm"
      >
        © OpenStreetMap contributors
      </Text>
    </Box>
  );
}

export function CoverageSection({ activeCity }: { activeCity?: string }) {
  const mapCity = activeCity && CITIES[activeCity as keyof typeof CITIES]
    ? CITIES[activeCity as keyof typeof CITIES]
    : CITIES.glasgow;
  return (
    <Box as="section" py={{ base: "16", md: "20" }} bg="bg.subtle">
      <Container maxW="6xl">
        <Stack gap="3" mb="10" textAlign={{ base: "left", md: "center" }}>
          <FadeUp>
            <Text color="accent.red" fontWeight="700" letterSpacing="0.16em" fontSize="xs">
              WHERE WE COVER
            </Text>
          </FadeUp>
          <FadeUp index={1}>
            <Heading as="h2" fontSize={{ base: "4xl", md: "5xl" }}>
              GLASGOW · EDINBURGH · DUNDEE
            </Heading>
          </FadeUp>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6" mb="10">
          {CITY_SLUGS.map((slug, i) => {
            const c = CITIES[slug];
            return (
              <FadeUp key={slug} index={i}>
                <Link href={`/mobile-tyre-fitting-${slug}`} style={{ display: "block" }}>
                  <Box
                    p="6"
                    borderWidth="1px"
                    borderColor="border"
                    borderRadius="lg"
                    bg="bg"
                    h="100%"
                    transition="border-color 0.2s, transform 0.2s"
                    _hover={{ borderColor: "accent.red", transform: "translateY(-2px)" }}
                  >
                    <Heading as="h3" size="lg" fontFamily="heading" letterSpacing="0.04em">
                      {c.name.toUpperCase()}
                    </Heading>
                    <Text mt="2" fontSize="sm" color="fg.muted">
                      Covering {c.postcodes[0]}–{c.postcodes[c.postcodes.length - 1]} including{" "}
                      {c.landmarks.slice(0, 3).join(", ")}.
                    </Text>
                    <Text mt="3" color="accent.red" fontSize="sm" fontWeight="700">
                      View {c.name} service →
                    </Text>
                  </Box>
                </Link>
              </FadeUp>
            );
          })}
        </SimpleGrid>

        <FadeUp>
          <Box mb="10" p="6" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg">
            <Stack gap="3">
              <Heading as="h3" size="md" fontFamily="heading" letterSpacing="0.04em">
                WIDER SCOTLAND COVERAGE
              </Heading>
              <Text color="fg.muted" fontSize="sm" lineHeight="1.7">
                Priority nearby areas include {ENABLED_SCOTLAND_SERVICE_AREAS.slice(3, 15).map((area) => area.name).join(", ")}. Availability depends on tyre stock, fitter position and safe access.
              </Text>
              <Link href="/mobile-tyre-fitting-scotland">
                <Text color="accent.red" fontSize="sm" fontWeight="800">
                  View Scotland coverage areas →
                </Text>
              </Link>
            </Stack>
          </Box>
        </FadeUp>

        <FadeUp>
          <RealServiceMap city={mapCity} />
        </FadeUp>
      </Container>
    </Box>
  );
}
