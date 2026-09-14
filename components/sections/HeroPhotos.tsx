"use client";

import { Box, HStack, Stack } from "@chakra-ui/react";
import Image from "next/image";

type Props = { width?: number; city?: string };

/**
 * Replaces the previous decorative spinning-tyre with the real fleet van photo
 * plus a 3-photo thumbnail strip. Uses next/image with explicit dimensions so
 * CLS stays at 0; only the lead photo is `priority` (it is hero-LCP-eligible).
 */
export function HeroPhotos({ width = 480, city }: Props) {
  const place = city ?? "Glasgow, Edinburgh & Dundee";
  const thumbs = [
    {
      src: "/photos/wheel-bmw.webp",
      alt: `Premium alloy wheel after mobile tyre fitting in ${place}`,
    },
    {
      src: "/photos/puncture.webp",
      alt: `Tyre puncture from a screw — repaired or replaced kerbside in ${place}`,
    },
    {
      src: "/photos/wheel-night.webp",
      alt: `Night-time mobile tyre fitting call-out in ${place}`,
    },
  ];
  return (
    <Stack gap="3" w="100%" maxW={`${width}px`}>
      <Box
        position="relative"
        w="100%"
        aspectRatio="4 / 3"
        overflow="hidden"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="border"
        boxShadow="0 18px 48px rgba(0,0,0,0.5)"
      >
        <Image
          src="/photos/van.webp"
          alt={`Duke Street Tyres mobile fitting van — 24/7 emergency call-out in ${place}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 480px"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <HStack gap="2" w="100%">
        {thumbs.map((t) => (
          <Box
            key={t.src}
            position="relative"
            flex="1"
            aspectRatio="1 / 1"
            overflow="hidden"
            borderRadius="md"
            borderWidth="1px"
            borderColor="border"
          >
            <Image
              src={t.src}
              alt={t.alt}
              fill
              sizes="(max-width: 768px) 33vw, 160px"
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}
      </HStack>
    </Stack>
  );
}
