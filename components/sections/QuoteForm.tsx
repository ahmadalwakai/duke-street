"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { AppButton, type AppButtonVariant } from "@/components/ui/AppButton";
import { trackBookingStart } from "@/lib/analytics";
import { bookingHref } from "@/lib/site";

type Props = {
  city?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  submitVariant?: AppButtonVariant;
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "48px",
  padding: "0 14px",
  background: "var(--chakra-colors-bg)",
  color: "var(--chakra-colors-fg)",
  border: "1px solid var(--chakra-colors-border)",
  borderRadius: "8px",
  fontSize: "16px",
  fontFamily: "inherit",
  outline: "none",
};

const tyreSizePattern = String.raw`\s*\d{3}\s*\/\s*\d{2,3}\s*[rR]?\s*\d{2}\s*`;

function normalizeTyreSize(value: string): string | undefined {
  const compact = value.trim().toUpperCase().replace(/\s+/g, "");
  const match = compact.match(/^(\d{3})\/(\d{2,3})R?(\d{2})$/);
  return match ? `${match[1]}/${match[2]}R${match[3]}` : undefined;
}

export function QuoteForm({
  city,
  title = "GET A 60-SECOND QUOTE",
  description = "Add your tyre size if you know it to start your quote.",
  submitLabel = "Start live booking",
  submitVariant = "solidRed",
}: Props) {
  const [tyreSize, setTyreSize] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const size = normalizeTyreSize(tyreSize);
    const params = new URLSearchParams({ service: "fitting" });
    if (size) params.set("size", size);

    trackBookingStart({ city: city ?? "home" });
    window.location.assign(bookingHref(params));
  }

  return (
    <Box
      asChild
      bg="bg.subtle"
      borderWidth="1px"
      borderColor="border"
      borderRadius="xl"
      p={{ base: "4", md: "5" }}
      boxShadow="0 8px 28px rgba(0,0,0,0.35)"
    >
      <form action="/book" onSubmit={onSubmit}>
        <Stack gap="3">
          <Stack gap="1">
            <Heading
              as="h2"
              fontFamily="heading"
              fontSize={{ base: "xl", md: "2xl" }}
              letterSpacing="0.02em"
              color="white"
            >
              {title}
            </Heading>
            <Text color="fg.muted" fontSize="sm">
              {description}
            </Text>
          </Stack>

          <input
            type="text"
            placeholder="Tyre size, e.g. 205/55R16"
            value={tyreSize}
            onChange={(e) => setTyreSize(e.target.value)}
            pattern={tyreSizePattern}
            title="Enter a tyre size like 205/55R16"
            aria-label="Tyre size (optional)"
            style={inputStyle}
          />

          <AppButton
            type="submit"
            variant={submitVariant}
            size="xl"
            className="book-attention"
          >
            {submitLabel}
          </AppButton>

          <Text fontSize="xs" color="fg.muted">
            Enter your postcode and phone number on Tyre Rescue to complete your booking.{" "}
            <Box asChild color="accent.red">
              <Link href="/privacy">Privacy Policy</Link>
            </Box>
            .
          </Text>
        </Stack>
      </form>
    </Box>
  );
}
