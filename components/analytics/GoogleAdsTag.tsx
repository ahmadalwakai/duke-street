"use client";

import { useEffect } from "react";
import { CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY, syncGoogleAdsConsent } from "@/lib/analytics";

export function GoogleAdsTag() {
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== CONSENT_STORAGE_KEY && event.key !== null) return;
      delete window.dstConsent;
      syncGoogleAdsConsent();
    };
    syncGoogleAdsConsent();
    window.addEventListener(CONSENT_CHANGE_EVENT, syncGoogleAdsConsent);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, syncGoogleAdsConsent);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return null;
}
