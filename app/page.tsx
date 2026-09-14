import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TrustRow } from "@/components/sections/TrustRow";
import { BigCallBanner } from "@/components/sections/BigCallBanner";
import { PricingStrip } from "@/components/sections/PricingStrip";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyUs } from "@/components/sections/WhyUs";
import { CoverageSection } from "@/components/sections/CoverageSection";
import TyreBrandsSection from "@/components/sections/TyreBrandsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { CityIntro } from "@/components/sections/CityIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, localBusinessSchema } from "@/lib/schema";
import { CITIES } from "@/lib/cities";
import { FAQS } from "@/lib/faqs";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Mobile Tyre Fitting Glasgow, Edinburgh & Dundee | 24/7 Emergency",
  description:
    "24/7 mobile tyre fitting & emergency call-out across Glasgow, Edinburgh and Dundee. Average response 30–40 mins. Card & Apple Pay accepted at the kerb.",
  path: "/",
});

export default function HomePage() {
  const glasgow = CITIES.glasgow;
  return (
    <>
      <Hero
        h1="MOBILE TYRE FITTING IN GLASGOW, EDINBURGH & DUNDEE"
        subhead="24/7 emergency call-out. We come to your kerb, car park, driveway or roadside with the right tyre on the van. Average on-scene time 30–40 minutes."
        shimmer
      />
      <TrustRow />
      <TrustStrip />
      <BigCallBanner />
      <CityIntro
        city={glasgow}
        heading="Based in Glasgow. Rolling across the central belt."
        intro={glasgow.intros["mobile-tyre-fitting"]}
      />
      <PricingStrip />
      <HowItWorks />
      <WhyUs />
      <CoverageSection activeCity="glasgow" />
      <TyreBrandsSection />
      <ReviewsSection />
      <FaqSection items={FAQS} />
      <CtaBlock />
      <JsonLd data={[localBusinessSchema("glasgow"), faqSchema(FAQS)]} />
    </>
  );
}
