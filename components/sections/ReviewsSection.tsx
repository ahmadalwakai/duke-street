"use client";

import { Box, Container, HStack, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FadeUp } from "@/components/ui/FadeUp";
import { AppButton } from "@/components/ui/AppButton";
import { REVIEWS, REVIEW_STATS, type Review } from "@/lib/reviews";

function Stars({ value }: { value: number }) {
  return (
    <HStack gap="1" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Box
          key={i}
          as="span"
          color={i <= Math.round(value) ? "accent.red" : "border"}
          fontSize="lg"
          lineHeight="1"
          aria-hidden
        >
          ★
        </Box>
      ))}
    </HStack>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <FadeUp index={index}>
      <Stack
        gap="3"
        p="6"
        bg="bg.subtle"
        borderWidth="1px"
        borderColor="border"
        borderRadius="xl"
        h="100%"
      >
        <Stars value={review.rating} />
        <Text color="fg" fontSize="md" lineHeight="1.6">
          “{review.text}”
        </Text>
        <HStack justify="space-between" mt="auto" pt="2">
          <Text fontWeight="700" fontSize="sm">
            {review.author}
          </Text>
          <Text fontSize="xs" color="fg.muted">
            {review.date}
          </Text>
        </HStack>
      </Stack>
    </FadeUp>
  );
}

export function ReviewsSection() {
  const hasReviews = REVIEWS.length > 0;
  return (
    <Box as="section" py={{ base: "14", md: "20" }} bg="bg">
      <Container maxW="6xl">
        <Stack gap="3" mb="10" align={{ base: "flex-start", md: "center" }}>
          <Text
            color="accent.red"
            fontWeight="700"
            letterSpacing="0.16em"
            fontSize="xs"
          >
            REVIEWS • GOOGLE BUSINESS PROFILE
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "clamp(1.75rem, 6.5vw, 2.5rem)", md: "clamp(2.5rem, 5vw, 4rem)" }}
            lineHeight="1.1"
            letterSpacing="0.01em"
            textTransform="uppercase"
            pb="0.15em"
            color="white"
            textAlign={{ base: "left", md: "center" }}
          >
            What Scotland says about us.
          </Heading>
          <HStack gap="3" color="fg.muted" fontSize="sm">
            <Stars value={REVIEW_STATS.average} />
            <Text>
              {REVIEW_STATS.average.toFixed(1)} from {REVIEW_STATS.count}{" "}
              Google review{(REVIEW_STATS.count as number) === 1 ? "" : "s"}
            </Text>
          </HStack>
        </Stack>

        {hasReviews ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={`${r.author}-${i}`} review={r} index={i} />
            ))}
          </SimpleGrid>
        ) : (
          <Box
            p="8"
            borderWidth="1px"
            borderStyle="dashed"
            borderColor="border"
            borderRadius="xl"
            textAlign="center"
            color="fg.muted"
          >
            <Text fontSize="sm">
              Reviews load straight from our Google Business Profile. See the
              full list on Google below.
            </Text>
          </Box>
        )}

        <HStack justify="center" mt="10">
          <AppButton
            href={REVIEW_STATS.googleUrl}
            target="_blank"
            rel="noopener"
            variant="ghostLight"
            size="lg"
          >
            ★ See all reviews on Google
          </AppButton>
        </HStack>
      </Container>
    </Box>
  );
}
