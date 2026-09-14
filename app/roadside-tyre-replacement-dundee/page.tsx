import type { Metadata } from "next";
import { CityServicePage, buildCityMetadata } from "@/components/pages/CityServicePage";

export const metadata: Metadata = buildCityMetadata("dundee", "roadside-tyre-replacement");

export default function Page() {
  return <CityServicePage slug="dundee" variant="roadside-tyre-replacement" />;
}