import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { AppButton } from "@/components/ui/AppButton";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SITE, telHref, waHref } from "@/lib/site";

const TYRE_BRANDS = [
  "Michelin",
  "Pirelli",
  "Dunlop",
  "Continental",
  "Bridgestone",
  "Goodyear",
  "Uniroyal",
  "Yokohama",
  "Hankook",
  "Firestone",
  "Kumho Tyre",
] as const;

export default function TyreBrandsSection() {
  const whatsappMessage = "Hi, I need tyre options. My tyre size is:";

  return (
    <Box as="section" py={{ base: "12", md: "16" }} bg="bg">
      <Container maxW="6xl">
        <Stack gap={{ base: "7", md: "9" }}>
          <Stack gap="3" maxW="72ch">
            <Text color="accent.red" fontWeight="700" fontSize="xs">
              TYRE BRAND OPTIONS
            </Text>
            <Heading
              as="h2"
              fontFamily="heading"
              fontSize={{ base: "clamp(1.75rem, 7vw, 2.5rem)", md: "clamp(2.25rem, 4vw, 3.25rem)" }}
              lineHeight="1.1"
              color="white"
            >
              Tyre brands we offer
            </Heading>
            <Text color="fg.muted" fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
              We can supply and fit many leading tyre brands, subject to availability. Tell us your tyre size and we&rsquo;ll confirm suitable options.
            </Text>
          </Stack>

          <Grid
            as="ul"
            gridTemplateColumns={{
              base: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
              xl: "repeat(5, minmax(0, 1fr))",
            }}
            gap={{ base: "3", md: "4" }}
            listStyleType="none"
            m="0"
            p="0"
          >
            {TYRE_BRANDS.map((brand) => (
              <Box
                as="li"
                key={brand}
                minH={{ base: "76px", md: "84px" }}
                minW="0"
                display="grid"
                placeItems="center"
                px={{ base: "3", md: "4" }}
                py="4"
                borderWidth="1px"
                borderColor="border"
                borderRadius="lg"
                bg="bg.subtle"
                boxShadow="inset 0 1px 0 rgba(255,255,255,0.04)"
                textAlign="center"
              >
                <Text color="white" fontSize={{ base: "sm", md: "md" }} fontWeight="800" lineHeight="1.25" minW="0" overflowWrap="break-word">
                  {brand}
                </Text>
              </Box>
            ))}
          </Grid>

          <Stack gap="5">
            <Text color="fg.muted" fontSize="sm" lineHeight="1.6">
              Brand availability can vary by tyre size, location, and time of day.
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} gap="3" w={{ base: "100%", sm: "auto" }}>
              <AppButton
                href={telHref()}
                variant="solidRed"
                size="xl"
                w={{ base: "100%", sm: "auto" }}
                maxW="100%"
                aria-label={`Call Duke Street Tyres on ${SITE.phoneDisplay}`}
                trackingLocation="tyre_brands"
                className="call-attention"
              >
                <PhoneIcon size={18} />
                <Box as="span" ml="2">Call now</Box>
              </AppButton>
              <AppButton
                href={waHref(whatsappMessage)}
                rel="noopener"
                variant="solidGreen"
                size="xl"
                w={{ base: "100%", sm: "auto" }}
                maxW="100%"
                aria-label="Send tyre size on WhatsApp"
                trackingLocation="tyre_brands"
              >
                <WhatsAppIcon size={20} />
                <Box as="span" ml="2">WhatsApp tyre size</Box>
              </AppButton>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
