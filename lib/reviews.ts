export type Review = {
  /** Reviewer display name as shown on Google. */
  author: string;
  /** Star rating, 1-5 (Google reviews are integers). */
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date or human "3 months ago" string from the review. */
  date: string;
  /** Full review body text. */
  text: string;
  /** Optional city tag for filtering. */
  city?: "glasgow" | "edinburgh" | "dundee";
};

/**
 * Reviews are loaded directly from our live Google Business Profile via the
 * "See all reviews on Google" CTA. We do NOT hardcode review text on the
 * site — that would breach the UK Digital Markets, Competition and Consumers
 * Act 2024 ban on fake / misleading consumer reviews, and ASA rules on
 * substantiation.
 *
 * If a real Google Reviews integration (Trustindex / Elfsight / Google
 * Places API) is added later, populate this array from that live source at
 * build time only — do not hand-author entries.
 */
export const REVIEWS: readonly Review[] = [];

/** Aggregate stats — taken from the live Google Business Profile listing. */
export const REVIEW_STATS = {
  /** Average star rating shown on the Google listing. */
  average: 5.0,
  /** Total review count shown on the Google Business Profile. */
  count: 154,
  /** Direct deep-link to the Google Business Profile reviews tab. */
  googleUrl:
    "https://maps.app.goo.gl/sqZLL3ArLuSmnsJj7?g_st=ic",
  /** Short share URL from Google Maps. */
  googleShortUrl: "https://maps.app.goo.gl/sqZLL3ArLuSmnsJj7?g_st=ic",
} as const;
