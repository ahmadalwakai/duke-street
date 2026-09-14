"use client";

import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { AppButton, type AppButtonVariant } from "@/components/ui/AppButton";
import { trackQuoteSubmit } from "@/lib/analytics";
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

function normalizeTyreSize(value: string): string {
  const compact = value.trim().toUpperCase().replace(/\s+/g, "");
  const match = compact.match(/^(\d{3})\/(\d{2,3})R?(\d{2})$/);
  return match ? `${match[1]}/${match[2]}R${match[3]}` : compact;
}

export function QuoteForm({
  city,
  title = "GET A 60-SECOND QUOTE",
  description = "Three quick details. We'll start your live booking.",
  submitLabel = "Start live booking",
  submitVariant = "solidRed",
}: Props) {
  const [postcode, setPostcode] = useState("");
  const [size, setSize] = useState("");
  const [phone, setPhone] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("service", "fitting");
    if (postcode.trim()) params.set("postcode", postcode.trim());
    if (size.trim()) params.set("size", normalizeTyreSize(size));
    if (phone.trim()) params.set("phone", phone.trim());

    trackQuoteSubmit({ city: city ?? "home" });
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
      <form onSubmit={onSubmit}>
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

          <SimpleGrid columns={{ base: 1, sm: 3 }} gap="2">
            <input
              type="text"
              placeholder="Postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              autoComplete="postal-code"
              required
              aria-label="Postcode"
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Tyre size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              aria-label="Tyre size"
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              autoComplete="tel"
              required
              aria-label="Mobile number"
              style={inputStyle}
            />
          </SimpleGrid>

          <AppButton
            type="submit"
            variant={submitVariant}
            size="xl"
            className="book-attention"
          >
            {submitLabel}
          </AppButton>

          <Text fontSize="xs" color="fg.muted">
            By submitting you agree to our{" "}
            <Box asChild color="accent.red">
              <Link href="/privacy">Privacy Policy</Link>
            </Box>
            . No spam — we only contact you about your tyre.
          </Text>
        </Stack>
      </form>
    </Box>
  );
}
