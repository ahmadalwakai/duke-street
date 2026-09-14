import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { FadeUp } from "@/components/ui/FadeUp";
import type { City } from "@/lib/cities";

export function CityIntro({
  city,
  intro,
  heading,
}: {
  city: City;
  intro: string;
  heading: string;
}) {
  return (
    <Box as="section" py={{ base: "14", md: "20" }}>
      <Container maxW="3xl">
        <FadeUp>
          <Text color="accent.red" fontWeight="700" letterSpacing="0.16em" fontSize="xs">
            {city.name.toUpperCase()} • {city.postcodes[0]}–
            {city.postcodes[city.postcodes.length - 1]}
          </Text>
        </FadeUp>
        <FadeUp index={1}>
          <Heading
            as="h2"
            mt="3"
            fontFamily="heading"
            fontSize={{ base: "clamp(1.75rem, 6.5vw, 2.5rem)", md: "clamp(2.5rem, 5vw, 4rem)" }}
            lineHeight="1.1"
            letterSpacing="0.01em"
            textTransform="uppercase"
            pb="0.15em"
            maxW="22ch"
            color="white"
          >
            {heading}
          </Heading>
        </FadeUp>
        <FadeUp index={2}>
          <Stack gap="4" mt="6" color="fg.muted" fontSize={{ base: "md", md: "lg" }}>
            <Text>{intro}</Text>
          </Stack>
        </FadeUp>
      </Container>
    </Box>
  );
}
