import type { Metadata } from "next";
import { CityServicePage, buildCityMetadata } from "@/components/pages/CityServicePage";

export const metadata: Metadata = buildCityMetadata("edinburgh", "24-hour-mobile-tyre-fitting");

export default function Page() {
  return <CityServicePage slug="edinburgh" variant="24-hour-mobile-tyre-fitting" />;
}
