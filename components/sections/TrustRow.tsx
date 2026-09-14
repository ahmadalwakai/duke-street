import {
  Box,
  Container,
  HStack,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const TYRE_BRANDS = [
  "MICHELIN",
  "PIRELLI",
  "CONTINENTAL",
  "BRIDGESTONE",
  "GOODYEAR",
  "DUNLOP",
  "AVON",
  "HANKOOK",
];

const PAYMENTS = ["VISA", "MASTERCARD", "AMEX", "APPLE PAY", "GOOGLE PAY"];

/**
 * Pure-CSS trust row: tyre-brand wordmarks + accepted payment methods.
 * No external images required (keeps LCP tight). Brand names are factual
 * statements of stock availability, not endorsements.
 */
export function TrustRow() {
  return (
    <Box as="section" bg="bg.subtle" borderTopWidth="1px" borderBottomWidth="1px" borderColor="border">
      <Container maxW="6xl" py={{ base: "8", md: "10" }}>
        <Stack gap="6">
          <Stack gap="2" textAlign="center">
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="0.18em"
              color="accent.red"
            >
              FITTED ON THE SPOT — ALL MAJOR BRANDS
            </Text>
          </Stack>
          <Wrap justify="center" gap={{ base: "4", md: "8" }}>
            {TYRE_BRANDS.map((b) => (
              <WrapItem key={b}>
                <Text
                  fontFamily="heading"
                  letterSpacing="0.08em"
                  fontSize={{ base: "md", md: "lg" }}
                  color="fg.muted"
                  _hover={{ color: "white" }}
                  transition="color 120ms"
                >
                  {b}
                </Text>
              </WrapItem>
            ))}
          </Wrap>

          <HStack
            justify="center"
            gap={{ base: "3", md: "6" }}
            wrap="wrap"
            pt="2"
            borderTopWidth="1px"
            borderColor="border"
          >
            <Text fontSize="xs" color="fg.muted" letterSpacing="0.12em">
              WE ACCEPT
            </Text>
            {PAYMENTS.map((p) => (
              <Box
                key={p}
                px="3"
                py="1"
                borderWidth="1px"
                borderColor="border"
                borderRadius="md"
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.1em"
                color="fg"
                bg="bg"
              >
                {p}
              </Box>
            ))}
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
