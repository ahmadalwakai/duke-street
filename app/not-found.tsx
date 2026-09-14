import Link from "next/link";
import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import { SITE, telHref } from "@/lib/site";
import { AppButton } from "@/components/ui/AppButton";

export default function NotFound() {
  return (
    <Container maxW="3xl" py="24" textAlign="center">
      <Stack gap="6" align="center">
        <Heading as="h1" fontSize={{ base: "5xl", md: "7xl" }}>
          PAGE NOT FOUND
        </Heading>
        <Text color="fg.muted">
          That page does not exist — but if you have a flat right now, we are
          one tap away.
        </Text>
        <Stack direction={{ base: "column", sm: "row" }} gap="3">
          <AppButton
            href={telHref()}
            variant="solidRed"
            size="xl"
            trackingLocation="not_found"
          >
            📞 Call {SITE.phoneDisplay}
          </AppButton>
          <Link href="/" style={{ textDecoration: "none" }}>
            <AppButton variant="ghostLight" size="xl">
              Back to home
            </AppButton>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
