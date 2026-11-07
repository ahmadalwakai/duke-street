"use client";

import { trackCallClick } from "@/lib/analytics";
import { SITE, telHref } from "@/lib/site";

export function TrackedPhoneLink({ location }: { location: string }) {
  return (
    <a
      href={telHref()}
      style={{ color: "var(--chakra-colors-accent-red)" }}
      onClick={() => trackCallClick(location)}
    >
      {SITE.phoneDisplay}
    </a>
  );
}
