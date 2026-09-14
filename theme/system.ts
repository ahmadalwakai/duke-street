"use client";

import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
  className: "ds-btn",
  base: {
    fontWeight: "700",
    letterSpacing: "0.02em",
    borderRadius: "md",
    transitionProperty: "background-color, transform, box-shadow",
    transitionDuration: "0.2s",
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "accent.red",
      outlineOffset: "2px",
    },
  },
  variants: {
    variant: {
      solidRed: {
        bg: "brand.red",
        color: "white",
        boxShadow: "0 10px 28px rgba(225,29,46,0.24)",
        _hover: {
          bg: "#C8101F",
          transform: "translateY(-2px)",
          boxShadow: "0 16px 38px rgba(225,29,46,0.34)",
        },
        _active: {
          bg: "#A30D19",
          transform: "translateY(0) scale(0.98)",
          boxShadow: "0 6px 18px rgba(225,29,46,0.22)",
        },
        width: { base: "100%", md: "auto" },
      },
      solidGreen: {
        bg: "brand.green",
        color: "white",
        boxShadow: "0 10px 28px rgba(37,211,102,0.22)",
        _hover: {
          bg: "#1DA851",
          transform: "translateY(-2px)",
          boxShadow: "0 16px 38px rgba(37,211,102,0.3)",
        },
        _active: {
          bg: "#178A42",
          transform: "translateY(0) scale(0.98)",
          boxShadow: "0 6px 18px rgba(37,211,102,0.18)",
        },
        width: { base: "100%", md: "auto" },
      },
      ghostLight: {
        bg: "transparent",
        color: "white",
        borderWidth: "1px",
        borderColor: "whiteAlpha.400",
        _hover: {
          bg: "whiteAlpha.200",
          borderColor: "accent.red",
          transform: "translateY(-2px)",
        },
        _active: { transform: "translateY(0) scale(0.98)" },
      },
    },
    size: {
      lg: { px: "6", py: "3", fontSize: "lg", h: "12" },
      xl: { px: "8", py: "4", fontSize: "xl", h: "14" },
    },
  },
});

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          dark: { value: "#0B0F14" },
          darkAlt: { value: "#11161D" },
          red: { value: "#E11D2E" },
          redDark: { value: "#A30D19" },
          green: { value: "#25D366" },
        },
      },
      fonts: {
        body: { value: "var(--font-inter), system-ui, sans-serif" },
        heading: { value: "var(--font-bebas), Impact, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: "{colors.brand.dark}" },
          subtle: { value: "{colors.brand.darkAlt}" },
        },
        fg: {
          DEFAULT: { value: "#F5F7FA" },
          muted: { value: "#9BA3AF" },
        },
        accent: {
          red: { value: "{colors.brand.red}" },
          green: { value: "{colors.brand.green}" },
        },
        border: {
          DEFAULT: { value: "rgba(255,255,255,0.08)" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
  globalCss: {
    "html, body": {
      bg: "bg",
      color: "fg",
      fontFamily: "body",
    },
    "h1, h2, h3, h4": {
      fontFamily: "heading",
      letterSpacing: "0.01em",
      lineHeight: "1.05",
      paddingBottom: "0.1em",
      textWrap: "balance",
    },
  },
});

export const system = createSystem(defaultConfig, config);
