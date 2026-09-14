import type { Metadata } from "next";
import { CityServicePage, buildCityMetadata } from "@/components/pages/CityServicePage";

export const metadata: Metadata = buildCityMetadata("dundee", "mobile-tyre-fitting");

export default function Page() {
  return <CityServicePage slug="dundee" variant="mobile-tyre-fitting" />;
}
