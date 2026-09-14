import type { SVGProps } from "react";

/** Official-style WhatsApp glyph (white). Wrap in a green container for the brand mark. */
export function WhatsAppIcon({
  size = 18,
  ...rest
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      {...rest}
    >
      <path d="M27.2 4.7A15.7 15.7 0 0 0 4.4 25.1L2 30l5.1-1.3A15.7 15.7 0 1 0 27.2 4.7ZM16 28.6a13 13 0 0 1-6.6-1.8l-.5-.3-3 .8.8-2.9-.3-.5A12.9 12.9 0 1 1 16 28.6Zm7.5-9.7c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.7-.2-.9.2-.3.4-1.1 1.3-1.3 1.6-.2.2-.5.3-.9.1a10.4 10.4 0 0 1-3-1.9 11.5 11.5 0 0 1-2.1-2.6c-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.6.1-.3.1-.5 0-.7l-1.2-2.9c-.3-.7-.6-.6-.9-.6h-.7a1.5 1.5 0 0 0-1.1.5 4.5 4.5 0 0 0-1.4 3.3 7.8 7.8 0 0 0 1.6 4.2c.2.3 2.7 4.1 6.5 5.7a22 22 0 0 0 2.2.8 5.3 5.3 0 0 0 2.4.2 4 4 0 0 0 2.6-1.8 3.3 3.3 0 0 0 .2-1.8c-.1-.2-.4-.3-.8-.5Z" />
    </svg>
  );
}

/** Phone receiver glyph. */
export function PhoneIcon({
  size = 18,
  ...rest
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...rest}
    >
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.36 2.3.55 3.6.55a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.55 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
    </svg>
  );
}

/** Simple booking/calendar glyph. */
export function BookingIcon({
  size = 18,
  ...rest
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8 14 2 2 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
