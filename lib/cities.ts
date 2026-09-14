export type CitySlug = "glasgow" | "edinburgh" | "dundee";

export type PageVariant =
  | "mobile-tyre-fitting"
  | "emergency-tyre-call-out"
  | "24-hour-mobile-tyre-fitting"
  | "roadside-tyre-replacement";

export type LocalFaq = {
  readonly question: string;
  readonly answer: string;
};

export type City = {
  readonly slug: CitySlug;
  readonly name: string;
  readonly countyOrRegion: string;
  readonly postcodes: readonly string[];
  readonly postcodeExamples: readonly string[];
  readonly nearbyAreas: readonly string[];
  readonly keyRoads: readonly string[];
  readonly landmarks: readonly string[];
  readonly lat: number;
  readonly lng: number;
  readonly mapsEmbed: string;
  readonly intros: Readonly<Record<PageVariant, string>>;
  readonly metaTitles: Readonly<Record<PageVariant, string>>;
  readonly metaDescriptions: Readonly<Record<PageVariant, string>>;
  readonly faqs: readonly LocalFaq[];
  readonly priority: number;
  readonly enabled: boolean;
  readonly indexable: boolean;
};

export type ScotlandServiceArea = {
  readonly slug: string;
  readonly name: string;
  readonly countyOrRegion: string;
  readonly postcodeExamples: readonly string[];
  readonly nearbyAreas: readonly string[];
  readonly keyRoads: readonly string[];
  readonly localLandmarks: readonly string[];
  readonly serviceIntro: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly faqs: readonly LocalFaq[];
  readonly priority: number;
  readonly enabled: boolean;
  readonly indexable: boolean;
};

export const CITY_SLUGS: readonly CitySlug[] = ["glasgow", "edinburgh", "dundee"];

export const CITY_SERVICE_VARIANTS: readonly PageVariant[] = [
  "mobile-tyre-fitting",
  "emergency-tyre-call-out",
  "24-hour-mobile-tyre-fitting",
  "roadside-tyre-replacement",
];

const G_POSTCODES = Array.from({ length: 81 }, (_, i) => `G${i + 1}`);
const EH_POSTCODES = Array.from({ length: 17 }, (_, i) => `EH${i + 1}`);
const DD_POSTCODES = Array.from({ length: 11 }, (_, i) => `DD${i + 1}`);

export const CITIES: Readonly<Record<CitySlug, City>> = {
  glasgow: {
    slug: "glasgow",
    name: "Glasgow",
    countyOrRegion: "Glasgow City",
    postcodes: G_POSTCODES,
    postcodeExamples: ["G1", "G31", "G40", "G51", "G81"],
    nearbyAreas: ["Paisley", "Clydebank", "Rutherglen", "East Kilbride", "Bearsden"],
    keyRoads: ["M8", "M74", "M77", "M80", "Clydeside Expressway"],
    landmarks: [
      "Duke Street",
      "Dennistoun",
      "Bridgeton",
      "Parkhead",
      "Merchant City",
      "Glasgow Green",
      "Celtic Park",
      "the M8",
      "the M74",
      "Silverburn",
      "Braehead",
    ],
    lat: 55.8642,
    lng: -4.2518,
    mapsEmbed:
      "https://www.google.com/maps?q=3,10+Gateside+St,+Glasgow+G31+1PD&output=embed",
    intros: {
      "mobile-tyre-fitting":
        "Stuck with a flat in Glasgow? Duke Street Tyres rolls out a fully-stocked mobile workshop straight to your door, kerbside, car park or office bay — anywhere from Dennistoun and Bridgeton to Parkhead, Merchant City, the West End and out toward Silverburn or Braehead. Our local fitters live and breathe the G postcodes (G1 through G81), so we know the rat-runs around Glasgow Green, the choke points on the M8 and the back streets behind Celtic Park. We carry premium, mid-range and budget tyres for cars, vans and 4x4s, plus run-flats, all-seasons and winter rubber, all balanced on calibrated wheel-weights. Most jobs across Glasgow are wrapped up in around 30 to 40 minutes from the moment we pick up the phone — no recovery truck, no long wait at a depot, no queueing for a fitting bay. Card, contactless and Apple Pay are all accepted on the spot, and we send a digital receipt before we drive away. From a single puncture in Shawlands to a full set of four in the East End, every job is fully insured, torqued to manufacturer spec and tidied up before we leave. Whether it is the morning school run on Alexandra Parade or a midnight breakdown at the Forge, we are the Glasgow mobile tyre crew that actually answers the phone. Call now or send a quick WhatsApp with your reg, your postcode and the size on the sidewall.",
      "emergency-tyre-call-out":
        "Blowout on the Clydeside Expressway? Sidewall split outside Celtic Park? Duke Street Tyres runs a true emergency tyre call-out service across Glasgow — day, night, weekend, bank holiday, it makes no difference to us. We are based right on Duke Street in the East End, which means we are minutes from the M8, M74 and M77 slip roads, with quick reach into Dennistoun, Bridgeton, Calton and Parkhead, and routes out to Pollok, Govan and the Southside without getting tangled in city centre traffic. Pick up the phone or fire over a WhatsApp and a fitter is rolling within minutes, not hours, with the right size already on the van. Typical on-scene time across the G postcodes is 30 to 40 minutes, often quicker inside the inner ring. We carry a deep range of stock — passenger, SUV, light commercial and run-flats — so the job gets done in one visit rather than a tow plus a return trip. Every emergency job is fully insured, torqued by hand, and finished with a quick visual check of the spare wheel and surrounding tyres so you do not get caught out twice in the same week. Pay by card, contactless or Apple Pay roadside and drive away with a digital receipt. When the AA queue is two hours deep, call the Glasgow team that actually turns up.",
      "24-hour-mobile-tyre-fitting":
        "When the rest of Glasgow is shut, Duke Street Tyres is wide awake. Our 24 hour mobile tyre fitting service covers every G postcode from G1 in the city centre out to G81 in Clydebank, including Dennistoun, Bridgeton, Parkhead, Shettleston, the Merchant City, the West End and the Southside. Night shift workers leaving the Royal Infirmary, taxi drivers finishing on Sauchiehall Street, HGV drivers parked up near Junction 15 of the M8 — we have you covered around the clock with a fully kitted mobile fitting van and a real human on the end of the phone. Average response across the city sits at 30 to 40 minutes, and we stock everything from budget brands to premium Michelin, Continental, Bridgestone and Pirelli, plus run-flats and reinforced van tyres. Every overnight job is fully insured, torqued to manufacturer spec and balanced on the spot using calibrated equipment, exactly the same standard as our daytime work. Card, contactless and Apple Pay accepted at 3am the same way they are at 3pm. No depot trip, no waiting until the morning, no premium hidden behind small print — just one transparent price quoted up front on the call. If you are stranded anywhere from Glasgow Green to the M74, ring Duke Street Tyres now and we will be on the way before the kettle boils.",
      "roadside-tyre-replacement":
        "Roadside tyre replacement in Glasgow needs a fitter who understands where a safe stop is possible. Duke Street Tyres covers city-centre streets, residential bays and safer pull-ins around the M8, M74, M77 and Clydeside Expressway, bringing the tyre, balancing kit and torque tools to you. Call or WhatsApp with your registration, tyre size and exact location, and we will confirm the safest approach, the fitted price and a live ETA before dispatch. We regularly help drivers near Duke Street, Bridgeton, Parkhead, Glasgow Green, the Merchant City and the Southside, plus nearby areas including Paisley, Clydebank and Rutherglen when coverage allows. If you are on a motorway or dual carriageway, move behind the barrier where possible and call from a safe place before any work starts.",
    },
    metaTitles: {
      "mobile-tyre-fitting": "Mobile Tyre Fitting Glasgow | 24/7 Call-Out",
      "emergency-tyre-call-out": "Emergency Mobile Tyre Fitting Glasgow | 24/7 Roadside",
      "24-hour-mobile-tyre-fitting": "24 Hour Mobile Tyre Fitting Glasgow | Open Now",
      "roadside-tyre-replacement": "Roadside Tyre Replacement Glasgow | Mobile Fitter",
    },
    metaDescriptions: {
      "mobile-tyre-fitting":
        "Mobile tyre fitting in Glasgow, G1-G81. 24/7 emergency call-outs, cars, vans and 4x4s. Card and Apple Pay accepted at the kerb.",
      "emergency-tyre-call-out":
        "Emergency mobile tyre fitting in Glasgow with roadside call-out for punctures, blowouts and sidewall damage. Call Duke Street Tyres 24/7.",
      "24-hour-mobile-tyre-fitting":
        "24 hour mobile tyre fitting in Glasgow. Real fitter on the phone day or night, with budget, mid-range and premium tyres available.",
      "roadside-tyre-replacement":
        "Roadside tyre replacement in Glasgow for flats, punctures and blowouts. Mobile fitting across G postcodes, the M8, M74 and nearby areas.",
    },
    faqs: [
      {
        question: "What should I send before a Glasgow call-out?",
        answer:
          "Send your registration, exact Glasgow postcode or roadside location, tyre size if visible, and a photo of the damaged tyre if you can do that safely.",
      },
      {
        question: "Can you attend Glasgow motorway breakdowns?",
        answer:
          "We can attend safe call-outs around the M8, M74, M77 and M80, but you should move away from traffic and follow police or recovery guidance if the vehicle is in a live lane.",
      },
    ],
    priority: 1,
    enabled: true,
    indexable: true,
  },
  edinburgh: {
    slug: "edinburgh",
    name: "Edinburgh",
    countyOrRegion: "City of Edinburgh",
    postcodes: EH_POSTCODES,
    postcodeExamples: ["EH1", "EH6", "EH12", "EH16", "EH17"],
    nearbyAreas: ["Leith", "Portobello", "Musselburgh", "Livingston", "Dunfermline"],
    keyRoads: ["A720", "M8", "A1", "A90", "Queensferry Road"],
    landmarks: [
      "Princes Street",
      "Leith",
      "Newington",
      "Morningside",
      "Corstorphine",
      "Portobello",
      "the Royal Mile",
      "Murrayfield",
      "the A720 city bypass",
      "Edinburgh Park",
      "Ocean Terminal",
    ],
    lat: 55.9533,
    lng: -3.1883,
    mapsEmbed:
      "https://www.google.com/maps?q=Edinburgh+EH1&output=embed",
    intros: {
      "mobile-tyre-fitting":
        "Need a tyre changed in Edinburgh without losing half a day at a fitting bay? Duke Street Tyres dispatches a mobile workshop directly to you across every EH postcode from EH1 in the Old Town out to EH17 in Gilmerton. Whether you are parked up near Princes Street, working a shift at the Royal Infirmary in Little France, doing the school run in Morningside or Corstorphine, or stuck on the A720 bypass slip near Sheriffhall, we come to your kerb with the correct size already on the van. Our Edinburgh-savvy fitters know the awkward parking realities of the New Town setts, the limited stopping outside Murrayfield on match days and the quick routes through Leith, Portobello and Newington. We stock car, SUV, van, run-flat and all-season tyres from budget value brands right up to Michelin, Continental and Bridgestone, all balanced and torqued to manufacturer spec. Most Edinburgh call-outs are done and dusted in 30 to 40 minutes, with a transparent price quoted on the phone before we set off — no surprise capital city surcharge. Card, Apple Pay and contactless are all welcomed on the doorstep and a digital receipt lands before we pull away. From Ocean Terminal to Edinburgh Park, we are the mobile tyre crew Edinburgh drivers actually trust.",
      "emergency-tyre-call-out":
        "Edinburgh traffic stops the moment a tyre lets go on the Queensferry Road or the A720. Duke Street Tyres runs a proper emergency tyre call-out service across the capital, covering everywhere from EH1 around the Royal Mile out to EH17 in Gilmerton, with rapid reach into Leith, Newington, Corstorphine and the city bypass. Pick up the phone or send a WhatsApp with your reg and postcode and a fully equipped fitter is rolling, not pencilling you in for tomorrow. Typical Edinburgh on-scene times are 30 to 40 minutes, with extra speed through the night when the bypass is clear. We carry a deep, ready-to-fit stock of passenger, SUV, light commercial and run-flat tyres so most call-outs are completed in a single visit — no truck recovery, no overnight wait. Every emergency job is fully insured, hand-torqued and finished with a quick safety scan of your remaining tyres and spare so you do not end up on the hard shoulder again next week. Card, contactless and Apple Pay accepted roadside, digital receipt sent immediately. When you need help in Edinburgh right now — not a four-hour breakdown queue — Duke Street Tyres is the number to call.",
      "24-hour-mobile-tyre-fitting":
        "Edinburgh does not stop and neither do we. Duke Street Tyres operates a 24 hour mobile tyre fitting service covering the full sweep of EH postcodes, from EH1 in the heart of the Old Town through Leith, Portobello and Newington, out to Corstorphine, Edinburgh Park and the A720 city bypass. Late-shift staff finishing at the Royal Infirmary, hospitality workers off the back of a Grassmarket shift, HGV drivers laid up near the Sheriffhall roundabout — every one of them can ring the same number at 3am and get a real fitter, not a call centre. We aim to be on scene in 30 to 40 minutes anywhere inside the bypass and stock everything from budget tyres to Michelin, Continental, Pirelli and Bridgestone, including run-flats, all-seasons and reinforced van rubber. Each overnight job is fully insured, balanced with calibrated equipment and torqued exactly to manufacturer spec, identical to the daytime service. There is no out-of-hours surcharge buried in the small print — the price quoted on the phone is the price you pay, by card, contactless or Apple Pay. From Murrayfield to Ocean Terminal, Duke Street Tyres keeps Edinburgh moving while the rest of the city sleeps.",
      "roadside-tyre-replacement":
        "A flat tyre in Edinburgh can turn awkward quickly, especially around the New Town, Leith, the A720 city bypass or the tight streets near the Royal Mile. Duke Street Tyres brings roadside tyre replacement to safe kerbsides, car parks and pull-ins across EH postcodes, with tyres for cars, vans, SUVs and run-flats checked before we set off. Send your registration, location and tyre size by phone or WhatsApp, and we will confirm the fitted price and live ETA. We cover central Edinburgh, Newington, Corstorphine, Portobello, Murrayfield, Edinburgh Park and nearby routes toward Livingston, Musselburgh and Dunfermline when service coverage allows.",
    },
    metaTitles: {
      "mobile-tyre-fitting": "Mobile Tyre Fitting Edinburgh | 24/7 Call-Out",
      "emergency-tyre-call-out": "Emergency Tyre Call-Out Edinburgh | 24/7 Roadside",
      "24-hour-mobile-tyre-fitting": "24 Hour Mobile Tyre Fitting Edinburgh | Open Now",
      "roadside-tyre-replacement": "Roadside Tyre Replacement Edinburgh | Mobile Fitter",
    },
    metaDescriptions: {
      "mobile-tyre-fitting":
        "Mobile tyre fitting in Edinburgh, EH1-EH17. 24/7 call-outs for cars, vans and 4x4s across the city and bypass routes.",
      "emergency-tyre-call-out":
        "Emergency tyre call-out in Edinburgh for punctures, blowouts and roadside tyre damage. Call or WhatsApp Duke Street Tyres 24/7.",
      "24-hour-mobile-tyre-fitting":
        "24 hour mobile tyre fitting in Edinburgh across EH postcodes. Roadside, driveway and car park fitting with card payments accepted.",
      "roadside-tyre-replacement":
        "Roadside tyre replacement in Edinburgh across EH postcodes, the A720, Leith, Newington, Corstorphine and nearby service areas.",
    },
    faqs: [
      {
        question: "Can you fit tyres in Edinburgh city-centre streets?",
        answer:
          "Yes, where there is safe access. Tell us about parking restrictions, tight streets or loading bays when you call so the fitter can plan the safest stop.",
      },
      {
        question: "Do you cover the Edinburgh bypass?",
        answer:
          "We cover safe call-outs around the A720 and connecting routes. If you are on a live carriageway, move behind the barrier and follow emergency guidance first.",
      },
    ],
    priority: 2,
    enabled: true,
    indexable: true,
  },
  dundee: {
    slug: "dundee",
    name: "Dundee",
    countyOrRegion: "Dundee City",
    postcodes: DD_POSTCODES,
    postcodeExamples: ["DD1", "DD2", "DD4", "DD5", "DD11"],
    nearbyAreas: ["Broughty Ferry", "Lochee", "Monifieth", "Arbroath", "Perth"],
    keyRoads: ["A90", "A92", "Kingsway", "Tay Road Bridge", "Riverside Drive"],
    landmarks: [
      "the V&A",
      "the Discovery Point",
      "Broughty Ferry",
      "Lochee",
      "Ninewells Hospital",
      "the Tay Road Bridge",
      "Stobswell",
      "Menzieshill",
      "the Kingsway",
      "Dundee Waterfront",
    ],
    lat: 56.462,
    lng: -2.9707,
    mapsEmbed:
      "https://www.google.com/maps?q=Dundee+DD1&output=embed",
    intros: {
      "mobile-tyre-fitting":
        "Looking for mobile tyre fitting in Dundee that actually shows up? Duke Street Tyres covers every DD postcode from DD1 in the city centre and the waterfront, right through to DD11 out toward Arbroath. Our fitters know the city like the back of their hand — the awkward one-way runs around the V&A and Discovery Point, the residential streets of Stobswell and Broughty Ferry, the staff car parks at Ninewells Hospital and the slip roads on and off the Kingsway. We bring the workshop to you with cars, SUVs, vans and run-flats in stock on the van, plus all-seasons and winter tyres for the colder months over the Sidlaws. Most Dundee jobs are completed in 30 to 40 minutes from the time you call, with a clear price agreed on the phone before we set off — no surprise charges when the wheel comes off. Card, contactless and Apple Pay all welcome at the kerb, digital receipt straight to your phone before we pull away. Whether it is a slow puncture spotted in the school run queue at Lochee or a full set of four for the family car in Menzieshill, Duke Street Tyres is the mobile tyre service Dundee drivers come back to.",
      "emergency-tyre-call-out":
        "Tyre let go on the Tay Road Bridge? Sidewall sliced on the Kingsway? Duke Street Tyres provides a true emergency tyre call-out service right across Dundee, covering DD1 through DD11 and the surrounding Tayside routes. We are dialled into the city — the chokepoint at the bridge approach, the tight residential lanes around Stobswell, the hospital traffic at Ninewells and the long, fast stretches of dual carriageway out toward Broughty Ferry and Arbroath. One phone call or WhatsApp gets a fully stocked mobile fitting van rolling, not added to a queue. Typical on-scene response is 30 to 40 minutes, faster overnight when the city is quieter. We carry a working depot in the back of the van — passenger, SUV, light commercial and run-flat tyres — so most Dundee emergencies are sorted on the first visit without any need for recovery. Each job is fully insured, hand-torqued, and finished with a quick check of your remaining tyres so a near miss does not become a repeat call out. Card, contactless and Apple Pay accepted on the spot. When Dundee needs help with a tyre right now, this is the number that picks up.",
      "24-hour-mobile-tyre-fitting":
        "Dundee never fully sleeps — and neither does Duke Street Tyres. Our 24 hour mobile tyre fitting service covers DD1 to DD11, from the city centre and waterfront right out to Broughty Ferry, Lochee, Menzieshill and the dual carriageways flanking the Kingsway. Night shift nurses finishing at Ninewells, taxi drivers winding up in the city centre, HGV drivers laid up near the Tay Road Bridge — they can all ring the same number at 4am and reach a real fitter on the line, not a recorded message. Average response across Dundee sits at 30 to 40 minutes, often faster after midnight when the roads clear. The mobile workshop carries everything from budget tyres to premium Michelin, Continental and Bridgestone, plus run-flats, all-seasons and reinforced van rubber, all torqued to manufacturer spec and balanced with calibrated equipment. There is no inflated overnight surcharge — the price quoted on the call is the price you pay, by card, contactless or Apple Pay. From the V&A to the Sidlaws, Duke Street Tyres keeps Dundee rolling round the clock so you do not lose a working day to a flat tyre.",
      "roadside-tyre-replacement":
        "Roadside tyre replacement in Dundee covers the moments when a flat stops you near the Waterfront, Ninewells, Broughty Ferry, the Kingsway or the Tay Road Bridge approach. Duke Street Tyres sends a mobile fitting van with the tyre stock, balancing kit and torque tools needed to get you moving without a depot visit where safe access is available. Call or WhatsApp with your registration, tyre size and exact DD postcode or roadside location. We will confirm availability, fitted price and a live ETA before dispatch, including nearby routes toward Monifieth, Arbroath and Perth when coverage allows.",
    },
    metaTitles: {
      "mobile-tyre-fitting": "Mobile Tyre Fitting Dundee | 24/7 Call-Out",
      "emergency-tyre-call-out": "Emergency Tyre Call-Out Dundee | 24/7 Roadside",
      "24-hour-mobile-tyre-fitting": "24 Hour Mobile Tyre Fitting Dundee | Open Now",
      "roadside-tyre-replacement": "Roadside Tyre Replacement Dundee | Mobile Fitter",
    },
    metaDescriptions: {
      "mobile-tyre-fitting":
        "Mobile tyre fitting in Dundee, DD1-DD11. 24/7 call-outs for cars, vans and SUVs across the city, Kingsway and nearby routes.",
      "emergency-tyre-call-out":
        "Emergency tyre call-out in Dundee for punctures, blowouts and roadside tyre damage. Call or WhatsApp for live availability.",
      "24-hour-mobile-tyre-fitting":
        "24 hour mobile tyre fitting in Dundee across DD postcodes. Roadside, driveway and car park fitting with card payments accepted.",
      "roadside-tyre-replacement":
        "Roadside tyre replacement in Dundee across DD postcodes, the Kingsway, Tay Road Bridge, Waterfront and nearby Tayside routes.",
    },
    faqs: [
      {
        question: "Can you attend Dundee call-outs near the Kingsway?",
        answer:
          "Yes, where there is safe access around the Kingsway, A90, A92 and nearby car parks. If the vehicle is exposed to traffic, move to a safer place first.",
      },
      {
        question: "Do you cover Broughty Ferry and nearby Dundee areas?",
        answer:
          "Yes, we cover Broughty Ferry, Lochee, Stobswell, Menzieshill and nearby DD postcodes when tyre stock and fitter availability match the job.",
      },
    ],
    priority: 3,
    enabled: true,
    indexable: true,
  },
};

export const SCOTLAND_SERVICE_AREAS: readonly ScotlandServiceArea[] = [
  {
    slug: "glasgow",
    name: "Glasgow",
    countyOrRegion: "Glasgow City",
    postcodeExamples: ["G1", "G31", "G40", "G81"],
    nearbyAreas: ["Paisley", "Clydebank", "Rutherglen", "East Kilbride"],
    keyRoads: ["M8", "M74", "M77", "M80"],
    localLandmarks: ["Duke Street", "Glasgow Green", "Celtic Park"],
    serviceIntro: "Core Glasgow coverage for mobile tyre fitting, emergency call-outs and roadside replacement across G postcodes.",
    metaTitle: "Mobile Tyre Fitting Glasgow | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting and roadside tyre replacement across Glasgow G postcodes, major motorways and nearby towns.",
    faqs: [],
    priority: 1,
    enabled: true,
    indexable: true,
  },
  {
    slug: "edinburgh",
    name: "Edinburgh",
    countyOrRegion: "City of Edinburgh",
    postcodeExamples: ["EH1", "EH6", "EH12", "EH17"],
    nearbyAreas: ["Leith", "Portobello", "Livingston", "Dunfermline"],
    keyRoads: ["A720", "M8", "A1", "A90"],
    localLandmarks: ["Princes Street", "Royal Mile", "Murrayfield"],
    serviceIntro: "Edinburgh coverage for kerbside, car park and safe roadside tyre replacement across EH postcodes.",
    metaTitle: "Mobile Tyre Fitting Edinburgh | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting and emergency roadside tyre replacement across Edinburgh, EH postcodes and the A720 city bypass.",
    faqs: [],
    priority: 2,
    enabled: true,
    indexable: true,
  },
  {
    slug: "dundee",
    name: "Dundee",
    countyOrRegion: "Dundee City",
    postcodeExamples: ["DD1", "DD2", "DD4", "DD11"],
    nearbyAreas: ["Broughty Ferry", "Lochee", "Monifieth", "Perth"],
    keyRoads: ["A90", "A92", "Kingsway", "Tay Road Bridge"],
    localLandmarks: ["Dundee Waterfront", "Ninewells Hospital", "V&A Dundee"],
    serviceIntro: "Dundee coverage for DD postcode tyre call-outs, including the Kingsway and safe stops near the Tay Road Bridge.",
    metaTitle: "Mobile Tyre Fitting Dundee | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting and roadside tyre replacement across Dundee, DD postcodes, the Kingsway and nearby Tayside routes.",
    faqs: [],
    priority: 3,
    enabled: true,
    indexable: true,
  },
  {
    slug: "paisley",
    name: "Paisley",
    countyOrRegion: "Renfrewshire",
    postcodeExamples: ["PA1", "PA2", "PA3"],
    nearbyAreas: ["Renfrew", "Linwood", "Johnstone", "Glasgow Airport"],
    keyRoads: ["M8", "A737", "A761"],
    localLandmarks: ["Paisley Abbey", "Glasgow Airport", "Royal Alexandra Hospital"],
    serviceIntro: "Paisley is treated as a nearby high-priority coverage area for Glasgow-side mobile tyre fitting and airport-route call-outs.",
    metaTitle: "Mobile Tyre Fitting Paisley | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Paisley, Renfrewshire, Glasgow Airport routes and nearby PA postcodes.",
    faqs: [],
    priority: 4,
    enabled: true,
    indexable: false,
  },
  {
    slug: "east-kilbride",
    name: "East Kilbride",
    countyOrRegion: "South Lanarkshire",
    postcodeExamples: ["G74", "G75"],
    nearbyAreas: ["Rutherglen", "Cambuslang", "Hamilton", "Newton Mearns"],
    keyRoads: ["A725", "A726", "M77", "M74"],
    localLandmarks: ["East Kilbride Shopping Centre", "Hairmyres Hospital", "Calderglen"],
    serviceIntro: "East Kilbride coverage supports South Lanarkshire drivers needing mobile tyre help near retail parks, estates and commuter roads.",
    metaTitle: "Mobile Tyre Fitting East Kilbride | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around East Kilbride, Hairmyres, the A725 and nearby South Lanarkshire areas.",
    faqs: [],
    priority: 5,
    enabled: true,
    indexable: false,
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    countyOrRegion: "South Lanarkshire",
    postcodeExamples: ["ML3"],
    nearbyAreas: ["Motherwell", "Bellshill", "Blantyre", "East Kilbride"],
    keyRoads: ["M74", "A725", "A723"],
    localLandmarks: ["Hamilton town centre", "Strathclyde Country Park", "Hamilton Racecourse"],
    serviceIntro: "Hamilton coverage focuses on M74-side call-outs, town-centre parking areas and nearby Lanarkshire towns.",
    metaTitle: "Mobile Tyre Fitting Hamilton | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Hamilton, the M74, A725 and nearby South Lanarkshire service areas.",
    faqs: [],
    priority: 6,
    enabled: true,
    indexable: false,
  },
  {
    slug: "motherwell",
    name: "Motherwell",
    countyOrRegion: "North Lanarkshire",
    postcodeExamples: ["ML1"],
    nearbyAreas: ["Hamilton", "Bellshill", "Wishaw", "Coatbridge"],
    keyRoads: ["M74", "A723", "A721"],
    localLandmarks: ["Strathclyde Country Park", "Motherwell town centre", "Ravenscraig"],
    serviceIntro: "Motherwell coverage supports North Lanarkshire drivers around ML postcodes and M74-linked routes.",
    metaTitle: "Mobile Tyre Fitting Motherwell | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Motherwell, ML1, Strathclyde Country Park and nearby Lanarkshire towns.",
    faqs: [],
    priority: 7,
    enabled: true,
    indexable: false,
  },
  {
    slug: "clydebank",
    name: "Clydebank",
    countyOrRegion: "West Dunbartonshire",
    postcodeExamples: ["G81"],
    nearbyAreas: ["Dumbarton", "Bearsden", "Milngavie", "Glasgow West End"],
    keyRoads: ["A82", "A814", "Great Western Road"],
    localLandmarks: ["Clyde Shopping Centre", "Golden Jubilee Hospital", "Queens Quay"],
    serviceIntro: "Clydebank coverage connects west Glasgow call-outs with the A82 corridor and West Dunbartonshire service areas.",
    metaTitle: "Mobile Tyre Fitting Clydebank | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Clydebank, G81, the A82, Queens Quay and nearby west Glasgow areas.",
    faqs: [],
    priority: 8,
    enabled: true,
    indexable: false,
  },
  {
    slug: "cumbernauld",
    name: "Cumbernauld",
    countyOrRegion: "North Lanarkshire",
    postcodeExamples: ["G67", "G68"],
    nearbyAreas: ["Airdrie", "Coatbridge", "Falkirk", "Glasgow"],
    keyRoads: ["M80", "A80", "A73"],
    localLandmarks: ["Cumbernauld town centre", "Broadwood", "Westerwood"],
    serviceIntro: "Cumbernauld coverage is useful for M80 corridor tyre problems and North Lanarkshire commuter routes.",
    metaTitle: "Mobile Tyre Fitting Cumbernauld | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Cumbernauld, G67, G68, the M80 and nearby North Lanarkshire areas.",
    faqs: [],
    priority: 9,
    enabled: true,
    indexable: false,
  },
  {
    slug: "livingston",
    name: "Livingston",
    countyOrRegion: "West Lothian",
    postcodeExamples: ["EH54"],
    nearbyAreas: ["Bathgate", "Broxburn", "Edinburgh", "Falkirk"],
    keyRoads: ["M8", "A71", "A899"],
    localLandmarks: ["The Centre Livingston", "Livingston Designer Outlet", "St John's Hospital"],
    serviceIntro: "Livingston coverage supports West Lothian drivers on the M8 corridor between Glasgow and Edinburgh.",
    metaTitle: "Mobile Tyre Fitting Livingston | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Livingston, EH54, the M8, A71 and nearby West Lothian areas.",
    faqs: [],
    priority: 10,
    enabled: true,
    indexable: false,
  },
  {
    slug: "falkirk",
    name: "Falkirk",
    countyOrRegion: "Falkirk",
    postcodeExamples: ["FK1", "FK2"],
    nearbyAreas: ["Grangemouth", "Larbert", "Stenhousemuir", "Stirling"],
    keyRoads: ["M9", "M876", "A9", "A803"],
    localLandmarks: ["The Kelpies", "Falkirk Wheel", "Falkirk town centre"],
    serviceIntro: "Falkirk coverage helps drivers around the M9, M876 and central Scotland routes linking Glasgow, Edinburgh and Stirling.",
    metaTitle: "Mobile Tyre Fitting Falkirk | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Falkirk, FK postcodes, the M9, M876 and nearby central Scotland towns.",
    faqs: [],
    priority: 11,
    enabled: true,
    indexable: false,
  },
  {
    slug: "stirling",
    name: "Stirling",
    countyOrRegion: "Stirling",
    postcodeExamples: ["FK7", "FK8", "FK9"],
    nearbyAreas: ["Bridge of Allan", "Bannockburn", "Falkirk", "Dunblane"],
    keyRoads: ["M9", "A84", "A91", "A905"],
    localLandmarks: ["Stirling Castle", "University of Stirling", "Forthside"],
    serviceIntro: "Stirling coverage is planned around central Scotland routes where safe roadside access and tyre availability can be confirmed.",
    metaTitle: "Mobile Tyre Fitting Stirling | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Stirling, FK postcodes, the M9 and nearby central Scotland towns.",
    faqs: [],
    priority: 12,
    enabled: true,
    indexable: false,
  },
  {
    slug: "perth",
    name: "Perth",
    countyOrRegion: "Perth and Kinross",
    postcodeExamples: ["PH1", "PH2"],
    nearbyAreas: ["Scone", "Dundee", "Dunfermline", "Stirling"],
    keyRoads: ["M90", "A9", "A85", "A90"],
    localLandmarks: ["Perth city centre", "Broxden Roundabout", "Scone Palace"],
    serviceIntro: "Perth coverage supports longer central Scotland routes, with live availability checked before dispatch.",
    metaTitle: "Mobile Tyre Fitting Perth | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Perth, PH postcodes, Broxden, the M90, A9 and A90 routes.",
    faqs: [],
    priority: 13,
    enabled: true,
    indexable: false,
  },
  {
    slug: "kirkcaldy",
    name: "Kirkcaldy",
    countyOrRegion: "Fife",
    postcodeExamples: ["KY1", "KY2"],
    nearbyAreas: ["Glenrothes", "Dunfermline", "Leven", "Cowdenbeath"],
    keyRoads: ["A92", "A910", "A921"],
    localLandmarks: ["Kirkcaldy Esplanade", "Victoria Hospital", "Fife Central Retail Park"],
    serviceIntro: "Kirkcaldy coverage supports Fife drivers around A92 routes and safe stops near town-centre and hospital areas.",
    metaTitle: "Mobile Tyre Fitting Kirkcaldy | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Kirkcaldy, KY postcodes, the A92 and nearby Fife towns.",
    faqs: [],
    priority: 14,
    enabled: true,
    indexable: false,
  },
  {
    slug: "dunfermline",
    name: "Dunfermline",
    countyOrRegion: "Fife",
    postcodeExamples: ["KY11", "KY12"],
    nearbyAreas: ["Rosyth", "Inverkeithing", "Kirkcaldy", "Edinburgh"],
    keyRoads: ["M90", "A823", "A985"],
    localLandmarks: ["Dunfermline Abbey", "Queen Margaret Hospital", "Fife Leisure Park"],
    serviceIntro: "Dunfermline coverage connects Fife call-outs with the M90 and routes toward Edinburgh and Kirkcaldy.",
    metaTitle: "Mobile Tyre Fitting Dunfermline | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Dunfermline, Rosyth, KY postcodes, the M90 and nearby Fife routes.",
    faqs: [],
    priority: 15,
    enabled: true,
    indexable: false,
  },
  {
    slug: "kilmarnock",
    name: "Kilmarnock",
    countyOrRegion: "East Ayrshire",
    postcodeExamples: ["KA1", "KA3"],
    nearbyAreas: ["Irvine", "Ayr", "Stewarton", "Prestwick"],
    keyRoads: ["A77", "A71", "M77"],
    localLandmarks: ["Kilmarnock town centre", "Crosshouse Hospital", "Rugby Park"],
    serviceIntro: "Kilmarnock coverage supports Ayrshire drivers on A77 and M77-linked routes where a safe fit is possible.",
    metaTitle: "Mobile Tyre Fitting Kilmarnock | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Kilmarnock, KA postcodes, the A77, A71 and nearby Ayrshire towns.",
    faqs: [],
    priority: 16,
    enabled: true,
    indexable: false,
  },
  {
    slug: "ayr",
    name: "Ayr",
    countyOrRegion: "South Ayrshire",
    postcodeExamples: ["KA7", "KA8"],
    nearbyAreas: ["Prestwick", "Troon", "Irvine", "Kilmarnock"],
    keyRoads: ["A77", "A70", "A719"],
    localLandmarks: ["Ayr town centre", "Ayr Racecourse", "Prestwick Airport"],
    serviceIntro: "Ayr coverage is handled as an Ayrshire service area with availability confirmed before longer dispatches.",
    metaTitle: "Mobile Tyre Fitting Ayr | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Ayr, Prestwick, KA postcodes and the A77 corridor.",
    faqs: [],
    priority: 17,
    enabled: true,
    indexable: false,
  },
  {
    slug: "irvine",
    name: "Irvine",
    countyOrRegion: "North Ayrshire",
    postcodeExamples: ["KA11", "KA12"],
    nearbyAreas: ["Kilwinning", "Troon", "Kilmarnock", "Ayr"],
    keyRoads: ["A78", "A71", "A737"],
    localLandmarks: ["Irvine Harbour", "Rivergate", "Eglinton Country Park"],
    serviceIntro: "Irvine coverage supports North Ayrshire calls around KA postcodes, retail parks and coastal routes.",
    metaTitle: "Mobile Tyre Fitting Irvine | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Irvine, KA postcodes, the A78 and nearby North Ayrshire towns.",
    faqs: [],
    priority: 18,
    enabled: true,
    indexable: false,
  },
  {
    slug: "greenock",
    name: "Greenock",
    countyOrRegion: "Inverclyde",
    postcodeExamples: ["PA15", "PA16"],
    nearbyAreas: ["Port Glasgow", "Gourock", "Paisley", "Renfrew"],
    keyRoads: ["A8", "M8", "A78"],
    localLandmarks: ["Greenock town centre", "Ocean Terminal", "Inverclyde Royal Hospital"],
    serviceIntro: "Greenock coverage supports Inverclyde drivers on A8 and M8-linked routes when mobile stock and timing match.",
    metaTitle: "Mobile Tyre Fitting Greenock | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Greenock, Inverclyde, PA postcodes, the A8 and nearby Port Glasgow.",
    faqs: [],
    priority: 19,
    enabled: true,
    indexable: false,
  },
  {
    slug: "coatbridge",
    name: "Coatbridge",
    countyOrRegion: "North Lanarkshire",
    postcodeExamples: ["ML5"],
    nearbyAreas: ["Airdrie", "Bellshill", "Motherwell", "Glasgow"],
    keyRoads: ["M8", "A725", "A89"],
    localLandmarks: ["Coatbridge town centre", "Faraday Retail Park", "Drumpellier Country Park"],
    serviceIntro: "Coatbridge coverage supports North Lanarkshire drivers close to the M8, A725 and nearby retail parks.",
    metaTitle: "Mobile Tyre Fitting Coatbridge | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Coatbridge, ML5, the M8, A725 and nearby Lanarkshire towns.",
    faqs: [],
    priority: 20,
    enabled: true,
    indexable: false,
  },
  {
    slug: "airdrie",
    name: "Airdrie",
    countyOrRegion: "North Lanarkshire",
    postcodeExamples: ["ML6"],
    nearbyAreas: ["Coatbridge", "Bellshill", "Cumbernauld", "Motherwell"],
    keyRoads: ["A89", "A73", "M8"],
    localLandmarks: ["Airdrie town centre", "Monklands Hospital", "Airdrie Retail Park"],
    serviceIntro: "Airdrie coverage connects ML postcode call-outs with Coatbridge, Cumbernauld and M8-side routes.",
    metaTitle: "Mobile Tyre Fitting Airdrie | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Airdrie, ML6, Monklands Hospital, the A89 and nearby Lanarkshire routes.",
    faqs: [],
    priority: 21,
    enabled: true,
    indexable: false,
  },
  {
    slug: "bellshill",
    name: "Bellshill",
    countyOrRegion: "North Lanarkshire",
    postcodeExamples: ["ML4"],
    nearbyAreas: ["Motherwell", "Hamilton", "Coatbridge", "Uddingston"],
    keyRoads: ["M8", "M74", "A725"],
    localLandmarks: ["Bellshill town centre", "Strathclyde Business Park", "Mossend"],
    serviceIntro: "Bellshill coverage is useful for business park, depot and M8/M74 corridor tyre call-outs.",
    metaTitle: "Mobile Tyre Fitting Bellshill | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Bellshill, ML4, Strathclyde Business Park, the M8 and M74 corridors.",
    faqs: [],
    priority: 22,
    enabled: true,
    indexable: false,
  },
  {
    slug: "renfrew",
    name: "Renfrew",
    countyOrRegion: "Renfrewshire",
    postcodeExamples: ["PA4"],
    nearbyAreas: ["Paisley", "Braehead", "Glasgow Airport", "Clydebank"],
    keyRoads: ["M8", "A8", "A741"],
    localLandmarks: ["Braehead", "Renfrew town centre", "Glasgow Airport"],
    serviceIntro: "Renfrew coverage supports airport, Braehead and M8-side tyre call-outs near west Glasgow.",
    metaTitle: "Mobile Tyre Fitting Renfrew | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Renfrew, Braehead, PA4, Glasgow Airport routes and the M8.",
    faqs: [],
    priority: 23,
    enabled: true,
    indexable: false,
  },
  {
    slug: "rutherglen",
    name: "Rutherglen",
    countyOrRegion: "South Lanarkshire",
    postcodeExamples: ["G73"],
    nearbyAreas: ["Cambuslang", "Glasgow Southside", "East Kilbride", "Hamilton"],
    keyRoads: ["M74", "A730", "A749"],
    localLandmarks: ["Rutherglen Main Street", "Oatlands", "Cuningar Loop"],
    serviceIntro: "Rutherglen coverage supports south-east Glasgow and South Lanarkshire drivers near the M74 corridor.",
    metaTitle: "Mobile Tyre Fitting Rutherglen | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Rutherglen, G73, the M74 and nearby Cambuslang and Glasgow Southside areas.",
    faqs: [],
    priority: 24,
    enabled: true,
    indexable: false,
  },
  {
    slug: "bearsden",
    name: "Bearsden",
    countyOrRegion: "East Dunbartonshire",
    postcodeExamples: ["G61"],
    nearbyAreas: ["Milngavie", "Clydebank", "Anniesland", "Glasgow West End"],
    keyRoads: ["A81", "A809", "Great Western Road"],
    localLandmarks: ["Bearsden Cross", "Hillfoot", "Kilmardinny Loch"],
    serviceIntro: "Bearsden coverage supports north-west Glasgow suburbs and routes toward Milngavie and Clydebank.",
    metaTitle: "Mobile Tyre Fitting Bearsden | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Bearsden, G61, Milngavie, Great Western Road and nearby west Glasgow areas.",
    faqs: [],
    priority: 25,
    enabled: true,
    indexable: false,
  },
  {
    slug: "milngavie",
    name: "Milngavie",
    countyOrRegion: "East Dunbartonshire",
    postcodeExamples: ["G62"],
    nearbyAreas: ["Bearsden", "Clydebank", "Strathblane", "Glasgow West End"],
    keyRoads: ["A81", "A809", "A82"],
    localLandmarks: ["Milngavie town centre", "West Highland Way start", "Mugdock Road"],
    serviceIntro: "Milngavie coverage supports north-west suburban calls where safe access and tyre stock can be confirmed.",
    metaTitle: "Mobile Tyre Fitting Milngavie | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Milngavie, G62, Bearsden, the A81 and nearby East Dunbartonshire routes.",
    faqs: [],
    priority: 26,
    enabled: true,
    indexable: false,
  },
  {
    slug: "newton-mearns",
    name: "Newton Mearns",
    countyOrRegion: "East Renfrewshire",
    postcodeExamples: ["G77"],
    nearbyAreas: ["Giffnock", "Clarkston", "East Kilbride", "Glasgow Southside"],
    keyRoads: ["M77", "A726", "A77"],
    localLandmarks: ["The Avenue", "Whitecraigs", "Mearns Cross"],
    serviceIntro: "Newton Mearns coverage supports East Renfrewshire drivers near M77 commuter routes and residential areas.",
    metaTitle: "Mobile Tyre Fitting Newton Mearns | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Newton Mearns, G77, the M77 and nearby East Renfrewshire areas.",
    faqs: [],
    priority: 27,
    enabled: true,
    indexable: false,
  },
  {
    slug: "cambuslang",
    name: "Cambuslang",
    countyOrRegion: "South Lanarkshire",
    postcodeExamples: ["G72"],
    nearbyAreas: ["Rutherglen", "East Kilbride", "Uddingston", "Glasgow East End"],
    keyRoads: ["M74", "A724", "A749"],
    localLandmarks: ["Cambuslang Main Street", "Newton", "Kirkhill"],
    serviceIntro: "Cambuslang coverage supports M74-side call-outs and South Lanarkshire routes close to Glasgow's east side.",
    metaTitle: "Mobile Tyre Fitting Cambuslang | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Cambuslang, G72, the M74, Rutherglen and nearby South Lanarkshire areas.",
    faqs: [],
    priority: 28,
    enabled: true,
    indexable: false,
  },
  {
    slug: "dumbarton",
    name: "Dumbarton",
    countyOrRegion: "West Dunbartonshire",
    postcodeExamples: ["G82"],
    nearbyAreas: ["Clydebank", "Alexandria", "Balloch", "Helensburgh"],
    keyRoads: ["A82", "A814", "A811"],
    localLandmarks: ["Dumbarton Castle", "Dumbarton Central", "Loch Lomond Gateway"],
    serviceIntro: "Dumbarton coverage supports A82 corridor calls where fitter availability and safe roadside access can be confirmed.",
    metaTitle: "Mobile Tyre Fitting Dumbarton | Duke Street Tyres",
    metaDescription: "Mobile tyre fitting coverage around Dumbarton, G82, the A82 and nearby West Dunbartonshire routes.",
    faqs: [],
    priority: 29,
    enabled: true,
    indexable: false,
  },
];

export const ENABLED_SCOTLAND_SERVICE_AREAS = SCOTLAND_SERVICE_AREAS.filter(
  (area) => area.enabled,
);

export const INDEXABLE_SCOTLAND_SERVICE_AREAS = SCOTLAND_SERVICE_AREAS.filter(
  (area) => area.indexable,
);

export function getCity(slug: string): City | null {
  if ((CITY_SLUGS as readonly string[]).includes(slug)) {
    return CITIES[slug as CitySlug];
  }
  return null;
}