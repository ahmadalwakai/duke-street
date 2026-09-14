import type { Metadata } from "next";
import { CityServicePage, buildCityMetadata } from "@/components/pages/CityServicePage";

export const metadata: Metadata = buildCityMetadata("edinburgh", "mobile-tyre-fitting");

export default function Page() {
  return <CityServicePage slug="edinburgh" variant="mobile-tyre-fitting" />;
}
