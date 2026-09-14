import type { Metadata } from "next";
import { CityServicePage, buildCityMetadata } from "@/components/pages/CityServicePage";

export const metadata: Metadata = buildCityMetadata("glasgow", "mobile-tyre-fitting");

export default function Page() {
  return <CityServicePage slug="glasgow" variant="mobile-tyre-fitting" />;
}
