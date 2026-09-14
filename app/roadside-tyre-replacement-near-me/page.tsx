import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";
import { FAQS } from "@/lib/faqs";

const path = "/roadside-tyre-replacement-near-me";

export const metadata: Metadata = buildPageMetadata({
  title: "Roadside Tyre Replacement Near Me | 24/7 Scotland",
  description:
    "Roadside tyre replacement near you across Glasgow, Edinburgh and Dundee. 24/7. Average response 30–40 mins. Card & Apple Pay accepted at the kerb.",
  path,
});

export default function Page() {
  return (
    <>
      <Hero
        h1="ROADSIDE TYRE REPLACEMENT NEAR ME"
        subhead="One number, three cities. Wherever you are stranded across Glasgow, Edinburgh or Dundee, we roll a fully stocked mobile workshop to your kerb in 30–40 minutes."
        badge="🚨 NEAREST FITTER • 24/7"
      />
      <TrustStrip />
      <HowItWorks />
      <CoverageSection />
      <FaqSection items={FAQS} />
      <CtaBlock />
      <JsonLd
        data={[
          localBusinessSchema(),
          serviceSchema("Roadside Tyre Replacement Near Me", undefined, path),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Roadside Tyre Replacement Near Me", path },
          ]),
        ]}
      />
    </>
  );
}
