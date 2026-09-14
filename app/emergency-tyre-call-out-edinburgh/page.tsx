import type { Metadata } from "next";
import { CityServicePage, buildCityMetadata } from "@/components/pages/CityServicePage";

export const metadata: Metadata = buildCityMetadata("edinburgh", "emergency-tyre-call-out");

export default function Page() {
  return <CityServicePage slug="edinburgh" variant="emergency-tyre-call-out" />;
}
