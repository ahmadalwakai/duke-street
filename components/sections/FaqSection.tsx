"use client";

import {
  Accordion,
  Box,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FadeUp } from "@/components/ui/FadeUp";
import type { FaqItem } from "@/lib/schema";

export function FaqSection({ items }: { items: readonly FaqItem[] }) {
  return (
    <Box as="section" py={{ base: "16", md: "20" }}>
      <Container maxW="3xl">
        <Stack gap="3" mb="8" textAlign="center">
          <FadeUp>
            <Text color="accent.red" fontWeight="700" letterSpacing="0.16em" fontSize="xs">
              FAQ
            </Text>
          </FadeUp>
          <FadeUp index={1}>
            <Heading as="h2" fontSize={{ base: "4xl", md: "5xl" }}>
              QUICK ANSWERS
            </Heading>
          </FadeUp>
        </Stack>
        <FadeUp>
          <Accordion.Root collapsible defaultValue={[items[0]?.question ?? ""]}>
            {items.map((item) => (
              <Accordion.Item
                key={item.question}
                value={item.question}
                borderBottomWidth="1px"
                borderColor="border"
              >
                <Accordion.ItemTrigger
                  py="4"
                  fontWeight="700"
                  fontSize="md"
                  cursor="pointer"
                >
                  <Box flex="1" textAlign="left">
                    {item.question}
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Box pb="4" color="fg.muted" fontSize="sm">
                    {item.answer}
                  </Box>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </FadeUp>
      </Container>
    </Box>
  );
}
