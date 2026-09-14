"use client";

import { useEffect } from "react";
import { trackLeadThanks } from "@/lib/analytics";

/** Renders nothing; fires a `lead_thanks` conversion event once on mount. */
export function ConversionFire() {
  useEffect(() => {
    trackLeadThanks();
  }, []);
  return null;
}
