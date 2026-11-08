"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppButton } from "@/components/ui/AppButton";
import { readStoredConsent, setConsent } from "@/lib/analytics";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (!stored) setOpen(true);
    const handler = () => setOpen(true);
    window.addEventListener("dst:open-consent", handler);
    return () => window.removeEventListener("dst:open-consent", handler);
  }, []);

  if (!open) return null;

  function acceptAll() {
    setConsent({
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
      functionality_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted",
    });
    setOpen(false);
  }

  function rejectAll() {
    setConsent({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      personalization_storage: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    });
    setOpen(false);
  }

  return (
    <Box
      position="fixed"
      bottom={{ base: "72px", md: "16px" }}
      left={{ base: "8px", md: "16px" }}
      right={{ base: "8px", md: "16px" }}
      zIndex={1400}
      bg="bg.subtle"
      borderWidth="1px"
      borderColor="border"
      borderRadius="xl"
      boxShadow="0 12px 40px rgba(0,0,0,0.45)"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <Container maxW="6xl" py={{ base: "3", md: "4" }} px={{ base: "3", md: "6" }}>
        <Stack
          direction={{ base: "column", md: "row" }}
          gap={{ base: "3", md: "4" }}
          align={{ base: "stretch", md: "center" }}
        >
          <Stack flex="1" gap="1">
            <Text fontWeight="700">We use cookies</Text>
            <Text color="fg.muted" fontSize={{ base: "xs", md: "sm" }} lineHeight="1.45">
              We save your cookie choice on this device. Our Google Ads tag sets no advertising cookies unless you accept; until then it sends only cookieless, anonymised signals. You can change your choice in the footer. See our{" "}
              <Link
                href="/privacy"
                style={{ color: "var(--chakra-colors-accent-red)" }}
              >
                Privacy Policy
              </Link>
              .
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 2, md: 2 }} gap="2" minW={{ md: "300px" }}>
            <AppButton onClick={rejectAll} variant="ghostLight" size="lg">
              Reject all
            </AppButton>
            <AppButton onClick={acceptAll} variant="solidRed" size="lg">
              Accept all
            </AppButton>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
