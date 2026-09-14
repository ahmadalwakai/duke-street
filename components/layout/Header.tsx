"use client";

import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Drawer,
  Portal,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { SITE, telHref, waHref } from "@/lib/site";
import { MarqueeStrip } from "./MarqueeStrip";
import { AppButton } from "@/components/ui/AppButton";
import { BookingIcon } from "@/components/ui/BrandIcons";

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.36 2.3.55 3.6.55a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.55 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 3.5A11.4 11.4 0 0 0 3.6 19.7L2 23l3.4-1.6A11.4 11.4 0 1 0 20 3.5Zm-8 19.1a9.6 9.6 0 0 1-4.9-1.3l-.4-.2-2 1 1-2-.2-.4A9.7 9.7 0 1 1 12 22.6Zm5.4-7.2c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.2-.7.1a7.8 7.8 0 0 1-3.8-3.4c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.7 5.9 5.1 2.2.9 3 .9 4.1.8.7-.1 2-.8 2.3-1.6.3-.8.3-1.4.2-1.6-.1-.2-.3-.3-.6-.4Z" />
    </svg>
  );
}

export function Header() {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="1000"
      backdropFilter="saturate(180%) blur(12px)"
      bg="rgba(11,15,20,0.78)"
      borderBottomWidth="1px"
      borderColor="border"
    >
      <MarqueeStrip />
      <Container maxW="7xl" py="3">
        <Flex align="center" justify="space-between">
          <Link href="/" aria-label={`${SITE.name} home`}>
            <HStack gap="2">
              <Image
                src="/logo.svg"
                alt="Duke Street Tyres logo"
                width={40}
                height={40}
                priority
              />
              <Box lineHeight="1">
                <Text
                  fontFamily="heading"
                  fontSize={{ base: "lg", md: "xl" }}
                  letterSpacing="0.04em"
                >
                  DUKE STREET TYRES
                </Text>
                <Text fontSize="2xs" color="fg.muted" letterSpacing="0.1em">
                  24/7 MOBILE FITTING
                </Text>
              </Box>
            </HStack>
          </Link>

          <HStack
            as="nav"
            aria-label="Primary navigation"
            gap="4"
            display={{ base: "none", lg: "flex" }}
            fontSize="sm"
            color="fg.muted"
          >
            <Link href="/mobile-tyre-fitting-scotland">Scotland Coverage</Link>
            <Link href="/mobile-tyre-fitting-glasgow">Glasgow</Link>
            <Link href="/mobile-tyre-fitting-edinburgh">Edinburgh</Link>
            <Link href="/mobile-tyre-fitting-dundee">Dundee</Link>
            <Link href="/roadside-tyre-replacement-near-me">Roadside Help</Link>
          </HStack>

          <HStack gap="2" display={{ base: "none", md: "flex" }}>
            <AppButton
              href={telHref()}
              variant="solidRed"
              size="lg"
              trackingLocation="header_desktop"
              className="call-attention"
            >
              <PhoneIcon />
              <Box as="span" ml="2">
                {SITE.phoneDisplay}
              </Box>
            </AppButton>
            <AppButton
              href="/book"
              variant="solidRed"
              size="lg"
              aria-label="Book mobile tyre fitting online"
              className="book-attention"
            >
              <BookingIcon size={17} />
              <Box as="span" ml="2">
                Book online
              </Box>
            </AppButton>
            <AppButton
              href={waHref()}
              variant="ghostLight"
              size="lg"
              rel="noopener"
              trackingLocation="header_desktop"
            >
              <WaIcon />
              <Box as="span" ml="2">
                WhatsApp
              </Box>
            </AppButton>
          </HStack>

          <Box display={{ base: "block", md: "none" }}>
            <IconButton
              aria-label="Open menu"
              variant="ghost"
              color="white"
              onClick={onOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Flex>
      </Container>

      <Drawer.Root open={open} onOpenChange={(e) => (e.open ? onOpen() : onClose())} placement="end">
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg="bg.subtle" color="fg">
              <Drawer.Header borderBottomWidth="1px" borderColor="border">
                <Drawer.Title>{SITE.name}</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Stack gap="3" mt="4">
                  <AppButton
                    href={telHref()}
                    variant="solidRed"
                    size="xl"
                    trackingLocation="mobile_drawer"
                    className="call-attention"
                  >
                    <PhoneIcon />
                    <Box as="span" ml="2">
                      Call {SITE.phoneDisplay}
                    </Box>
                  </AppButton>
                  <AppButton
                    href="/book"
                    variant="solidRed"
                    size="xl"
                    aria-label="Book mobile tyre fitting online"
                    className="book-attention"
                  >
                    <BookingIcon size={18} />
                    <Box as="span" ml="2">
                      Book online
                    </Box>
                  </AppButton>
                  <AppButton
                    href={waHref()}
                    rel="noopener"
                    variant="solidGreen"
                    size="xl"
                    trackingLocation="mobile_drawer"
                  >
                    <WaIcon />
                    <Box as="span" ml="2">
                      WhatsApp us
                    </Box>
                  </AppButton>
                  <Stack gap="2" mt="6">
                    <Link href="/book" onClick={onClose}>
                      Book Online
                    </Link>
                    <Link href="/mobile-tyre-fitting-scotland" onClick={onClose}>
                      Scotland Coverage
                    </Link>
                    <Link href="/mobile-tyre-fitting-glasgow" onClick={onClose}>
                      Mobile Tyre Fitting Glasgow
                    </Link>
                    <Link href="/mobile-tyre-fitting-edinburgh" onClick={onClose}>
                      Mobile Tyre Fitting Edinburgh
                    </Link>
                    <Link href="/mobile-tyre-fitting-dundee" onClick={onClose}>
                      Mobile Tyre Fitting Dundee
                    </Link>
                    <Link href="/roadside-tyre-replacement-near-me" onClick={onClose}>
                      Roadside Tyre Replacement
                    </Link>
                    <Link href="/roadside-tyre-replacement-glasgow" onClick={onClose}>
                      Roadside Tyre Replacement Glasgow
                    </Link>
                    <Link href="/roadside-tyre-replacement-edinburgh" onClick={onClose}>
                      Roadside Tyre Replacement Edinburgh
                    </Link>
                    <Link href="/roadside-tyre-replacement-dundee" onClick={onClose}>
                      Roadside Tyre Replacement Dundee
                    </Link>
                  </Stack>
                </Stack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
}
