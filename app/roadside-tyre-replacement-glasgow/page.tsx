import type { Metadata } from "next";
import { CityServicePage, buildCityMetadata } from "@/components/pages/CityServicePage";

export const metadata: Metadata = buildCityMetadata("glasgow", "roadside-tyre-replacement");

export default function Page() {
  return <CityServicePage slug="glasgow" variant="roadside-tyre-replacement" />;
}