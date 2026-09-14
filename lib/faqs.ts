import type { FaqItem } from "./schema";

export const FAQS: readonly FaqItem[] = [
  {
    question: "How fast can you actually get to me?",
    answer:
      "Average on-scene time across Glasgow, Edinburgh and Dundee is 30 to 40 minutes from the moment you call. We confirm an exact ETA on the phone before we set off.",
  },
  {
    question: "Which areas do you cover?",
    answer:
      "All G postcodes in Glasgow (G1–G81), all EH postcodes in Edinburgh (EH1–EH17) and all DD postcodes in Dundee (DD1–DD11), plus the major motorways and bypasses linking them.",
  },
  {
    question: "How can I pay at the roadside?",
    answer:
      "Card, contactless and Apple Pay are all accepted on the spot. You receive a digital receipt before we drive away. No cash needed.",
  },
  {
    question: "What tyre brands do you carry?",
    answer:
      "We stock budget, mid-range and premium tyres including Michelin, Continental, Bridgestone, Pirelli, Goodyear and Dunlop, plus run-flats and reinforced van tyres. We confirm exact availability on the phone before we leave.",
  },
  {
    question: "Are you really open out of hours?",
    answer:
      "Yes. We operate 24 hours a day, 7 days a week including weekends and bank holidays, with the same pricing day or night — no surprise overnight surcharge.",
  },
  {
    question: "Can you reach me on the motorway?",
    answer:
      "Yes, we attend motorway and dual carriageway call-outs across the M8, M74, M77, M80, A720 city bypass and the Kingsway in Dundee. For your safety we ask you to wait off the carriageway behind the barrier where possible.",
  },
];

export const SCOTLAND_COVERAGE_FAQS: readonly FaqItem[] = [
  {
    question: "Which Scotland areas do you cover?",
    answer:
      "Core live coverage is strongest across Glasgow, Edinburgh and Dundee, with nearby central Scotland and route-based areas handled where tyre stock, fitter availability and safe access allow.",
  },
  {
    question: "Can I book if I am outside Glasgow, Edinburgh or Dundee?",
    answer:
      "Yes, call or WhatsApp your postcode, vehicle registration and tyre size. We will confirm whether a fitter can attend, the fitted price and a live ETA before dispatch.",
  },
  {
    question: "Do you create local offices in every town listed?",
    answer:
      "No. Duke Street Tyres is based in Glasgow and operates mobile fitting vans. Wider Scotland areas are service coverage areas, not separate branches or offices.",
  },
  {
    question: "What should I do if I am stopped on a motorway?",
    answer:
      "Move away from traffic, stand behind the barrier where possible and follow emergency guidance. We only attend where the vehicle location is safe for mobile fitting.",
  },
];
