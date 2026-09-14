import type { Metadata } from "next";
import { CityServicePage, buildCityMetadata } from "@/components/pages/CityServicePage";

export const metadata: Metadata = buildCityMetadata("edinburgh", "roadside-tyre-replacement");

export default function Page() {
  return <CityServicePage slug="edinburgh" variant="roadside-tyre-replacement" />;
}