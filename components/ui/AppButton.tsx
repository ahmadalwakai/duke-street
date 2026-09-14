"use client";

import {
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";
import {
  forwardRef,
  type ReactNode,
  type CSSProperties,
  type MouseEventHandler,
} from "react";
import { trackCallClick, trackWhatsAppClick } from "@/lib/analytics";

export type AppButtonVariant = "solidRed" | "solidGreen" | "ghostLight";
export type AppButtonSize = "lg" | "xl";

type CommonProps = {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  trackingLocation?: string;
  "aria-label"?: string;
};

type AnchorProps = CommonProps &
  Omit<
    ChakraButtonProps,
    "variant" | "size" | "as" | "asChild" | "children" | "onClick" | "type" | "loading"
  > & {
    href: string;
    rel?: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  };

type ButtonOnlyProps = CommonProps &
  Omit<ChakraButtonProps, "variant" | "size" | "as" | "asChild" | "children"> & {
    href?: undefined;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
  };

export type AppButtonProps = AnchorProps | ButtonOnlyProps;

function castVariant(v?: AppButtonVariant): ChakraButtonProps["variant"] {
  return v as unknown as ChakraButtonProps["variant"];
}
function castSize(s?: AppButtonSize): ChakraButtonProps["size"] {
  return s as unknown as ChakraButtonProps["size"];
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  function AppButton(props, ref) {
    if ("href" in props && props.href) {
      const {
        href,
        rel,
        target,
        variant,
        size,
        children,
        onClick,
        trackingLocation,
        ...rest
      } =
        props;
      const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        onClick?.(event);
        if (event.defaultPrevented || onClick) return;

        const location =
          trackingLocation ?? rest["aria-label"] ?? "app_button";
        if (href.startsWith("tel:")) {
          trackCallClick(location);
        } else if (href.includes("wa.me")) {
          trackWhatsAppClick(location);
        }
      };

      return (
        <ChakraButton
          asChild
          variant={castVariant(variant)}
          size={castSize(size)}
          {...rest}
        >
          <a href={href} rel={rel} target={target} onClick={handleClick}>
            {children}
          </a>
        </ChakraButton>
      );
    }
    const { variant, size, trackingLocation: _trackingLocation, ...rest } =
      props as ButtonOnlyProps;
    return (
      <ChakraButton
        ref={ref}
        variant={castVariant(variant)}
        size={castSize(size)}
        {...rest}
      />
    );
  },
);
