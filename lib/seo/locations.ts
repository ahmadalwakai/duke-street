import { ADDITIONAL_SCOTLAND_LOCATION_SEEDS } from "./scotland-location-seeds";
import type { SeoLocation } from "./types";

type LocationSeed = {
  readonly slug: string;
  readonly name: string;
  readonly type?: SeoLocation["type"];
  readonly parentSlug?: string;
  readonly councilArea: string;
  readonly region: string;
  readonly postcodeExamples: readonly string[];
  readonly nearbyLocations: readonly string[];
  readonly keyRoads: readonly string[];
  readonly landmarks: readonly string[];
  readonly latitude?: number;
  readonly longitude?: number;
  readonly priority?: SeoLocation["priority"];
  readonly coverageStatus?: SeoLocation["coverageStatus"];
  readonly indexable?: boolean;
  readonly contentDepth?: SeoLocation["contentDepth"];
  readonly localProofNotes?: readonly string[];
  readonly disabledReason?: string;
};

type AreaTuple = readonly [
  slug: string,
  name: string,
  postcodeExamples: readonly string[],
  landmarks: readonly string[],
  nearbyLocations: readonly string[],
];

type RoadTuple = readonly [
  slug: string,
  name: string,
  landmarks: readonly string[],
  nearbyNames: readonly string[],
];

export const SCOTLAND_SEO_CONTEXT = {
  country: "Scotland",
  regions: [
    "Glasgow and Clyde",
    "Edinburgh and Lothians",
    "Tayside",
    "Fife",
    "Ayrshire",
    "Lanarkshire",
    "Forth Valley",
    "West Scotland",
  ],
  councils: [
    "Glasgow City",
    "City of Edinburgh",
    "Dundee City",
    "Renfrewshire",
    "East Renfrewshire",
    "North Lanarkshire",
    "South Lanarkshire",
    "West Dunbartonshire",
    "East Dunbartonshire",
    "West Lothian",
    "Falkirk",
    "Stirling",
    "Clackmannanshire",
    "Perth and Kinross",
    "Fife",
    "East Ayrshire",
    "South Ayrshire",
    "North Ayrshire",
    "Inverclyde",
    "Midlothian",
    "East Lothian",
  ],
} as const;

function makeLocation(seed: LocationSeed): SeoLocation {
  return {
    slug: seed.slug,
    name: seed.name,
    type: seed.type ?? "town",
    ...(seed.parentSlug ? { parentSlug: seed.parentSlug } : {}),
    councilArea: seed.councilArea,
    region: seed.region,
    postcodeExamples: seed.postcodeExamples,
    nearbyLocations: seed.nearbyLocations,
    keyRoads: seed.keyRoads,
    landmarks: seed.landmarks,
    ...(typeof seed.latitude === "number" ? { latitude: seed.latitude } : {}),
    ...(typeof seed.longitude === "number" ? { longitude: seed.longitude } : {}),
    priority: seed.priority ?? 3,
    coverageStatus: seed.coverageStatus ?? "nearby",
    indexable: seed.indexable ?? true,
    contentDepth: seed.contentDepth ?? "medium",
    ...(seed.localProofNotes ? { localProofNotes: seed.localProofNotes } : {}),
    ...(seed.disabledReason ? { disabledReason: seed.disabledReason } : {}),
  };
}

const CORE_CITY_LOCATIONS: readonly SeoLocation[] = [
  makeLocation({
    slug: "glasgow",
    name: "Glasgow",
    type: "city",
    councilArea: "Glasgow City",
    region: "Glasgow and Clyde",
    postcodeExamples: ["G1", "G31", "G40", "G51", "G81"],
    nearbyLocations: ["paisley", "clydebank", "rutherglen", "east-kilbride", "bearsden", "renfrew"],
    keyRoads: ["M8", "M74", "M77", "M80", "A82"],
    landmarks: ["Duke Street", "Glasgow Green", "Celtic Park", "Merchant City", "Braehead"],
    latitude: 55.8642,
    longitude: -4.2518,
    priority: 1,
    coverageStatus: "core",
    contentDepth: "strong",
    localProofNotes: ["Business base and existing core coverage area."],
  }),
  makeLocation({
    slug: "edinburgh",
    name: "Edinburgh",
    type: "city",
    councilArea: "City of Edinburgh",
    region: "Edinburgh and Lothians",
    postcodeExamples: ["EH1", "EH6", "EH12", "EH16", "EH17"],
    nearbyLocations: ["leith", "portobello", "musselburgh", "dalkeith", "livingston", "dunfermline"],
    keyRoads: ["A720", "M8", "A1", "A90"],
    landmarks: ["Princes Street", "Royal Mile", "Murrayfield", "Ocean Terminal", "Edinburgh Park"],
    latitude: 55.9533,
    longitude: -3.1883,
    priority: 1,
    coverageStatus: "core",
    contentDepth: "strong",
    localProofNotes: ["Existing core EH postcode coverage area."],
  }),
  makeLocation({
    slug: "dundee",
    name: "Dundee",
    type: "city",
    councilArea: "Dundee City",
    region: "Tayside",
    postcodeExamples: ["DD1", "DD2", "DD4", "DD5", "DD11"],
    nearbyLocations: ["broughty-ferry", "lochee", "monifieth", "perth", "leven"],
    keyRoads: ["A90", "A92", "Kingsway", "Tay Road Bridge"],
    landmarks: ["Dundee Waterfront", "V&A Dundee", "Ninewells Hospital", "Broughty Ferry"],
    latitude: 56.462,
    longitude: -2.9707,
    priority: 1,
    coverageStatus: "core",
    contentDepth: "strong",
    localProofNotes: ["Existing core DD postcode coverage area."],
  }),
];

const CENTRAL_SCOTLAND_TOWNS: readonly SeoLocation[] = [
  makeLocation({ slug: "paisley", name: "Paisley", councilArea: "Renfrewshire", region: "West Scotland", postcodeExamples: ["PA1", "PA2", "PA3"], nearbyLocations: ["renfrew", "johnstone", "linwood", "glasgow"], keyRoads: ["M8", "A737", "A761"], landmarks: ["Paisley Abbey", "Glasgow Airport", "Royal Alexandra Hospital"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "east-kilbride", name: "East Kilbride", councilArea: "South Lanarkshire", region: "Lanarkshire", postcodeExamples: ["G74", "G75"], nearbyLocations: ["hamilton", "rutherglen", "cambuslang", "newton-mearns"], keyRoads: ["A725", "A726", "M77", "M74"], landmarks: ["East Kilbride Shopping Centre", "Hairmyres Hospital", "Calderglen"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "hamilton", name: "Hamilton", councilArea: "South Lanarkshire", region: "Lanarkshire", postcodeExamples: ["ML3"], nearbyLocations: ["motherwell", "bellshill", "larkhall", "east-kilbride"], keyRoads: ["M74", "A725", "A723"], landmarks: ["Hamilton town centre", "Strathclyde Country Park", "Hamilton Racecourse"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "motherwell", name: "Motherwell", councilArea: "North Lanarkshire", region: "Lanarkshire", postcodeExamples: ["ML1"], nearbyLocations: ["hamilton", "wishaw", "bellshill", "coatbridge"], keyRoads: ["M74", "A723", "A721"], landmarks: ["Strathclyde Country Park", "Ravenscraig", "Motherwell town centre"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "clydebank", name: "Clydebank", councilArea: "West Dunbartonshire", region: "Glasgow and Clyde", postcodeExamples: ["G81"], nearbyLocations: ["dumbarton", "bearsden", "milngavie", "glasgow"], keyRoads: ["A82", "A814", "Great Western Road"], landmarks: ["Clyde Shopping Centre", "Golden Jubilee Hospital", "Queens Quay"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "cumbernauld", name: "Cumbernauld", councilArea: "North Lanarkshire", region: "Lanarkshire", postcodeExamples: ["G67", "G68"], nearbyLocations: ["airdrie", "coatbridge", "falkirk", "glasgow"], keyRoads: ["M80", "A80", "A73"], landmarks: ["Cumbernauld town centre", "Broadwood", "Westerwood"], priority: 2 }),
  makeLocation({ slug: "livingston", name: "Livingston", councilArea: "West Lothian", region: "Edinburgh and Lothians", postcodeExamples: ["EH54"], nearbyLocations: ["bathgate", "broxburn", "linlithgow", "edinburgh"], keyRoads: ["M8", "A71", "A899"], landmarks: ["The Centre Livingston", "Livingston Designer Outlet", "St John's Hospital"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "falkirk", name: "Falkirk", councilArea: "Falkirk", region: "Forth Valley", postcodeExamples: ["FK1", "FK2"], nearbyLocations: ["grangemouth", "larbert", "bonnybridge", "stirling"], keyRoads: ["M9", "M876", "A9", "A803"], landmarks: ["The Kelpies", "Falkirk Wheel", "Falkirk town centre"], priority: 2, contentDepth: "strong" }),
  makeLocation({ slug: "stirling", name: "Stirling", type: "city", councilArea: "Stirling", region: "Forth Valley", postcodeExamples: ["FK7", "FK8", "FK9"], nearbyLocations: ["alloa", "falkirk", "bonnybridge", "perth"], keyRoads: ["M9", "A84", "A91", "A905"], landmarks: ["Stirling Castle", "University of Stirling", "Forthside"], priority: 2 }),
  makeLocation({ slug: "perth", name: "Perth", type: "city", councilArea: "Perth and Kinross", region: "Tayside", postcodeExamples: ["PH1", "PH2"], nearbyLocations: ["dundee", "stirling", "dunfermline", "kirkcaldy"], keyRoads: ["M90", "A9", "A85", "A90"], landmarks: ["Perth city centre", "Broxden Roundabout", "Scone Palace"], priority: 2 }),
  makeLocation({ slug: "kirkcaldy", name: "Kirkcaldy", councilArea: "Fife", region: "Fife", postcodeExamples: ["KY1", "KY2"], nearbyLocations: ["glenrothes", "dunfermline", "leven", "cowdenbeath"], keyRoads: ["A92", "A910", "A921"], landmarks: ["Kirkcaldy Esplanade", "Victoria Hospital", "Fife Central Retail Park"], priority: 2 }),
  makeLocation({ slug: "dunfermline", name: "Dunfermline", type: "city", councilArea: "Fife", region: "Fife", postcodeExamples: ["KY11", "KY12"], nearbyLocations: ["cowdenbeath", "kirkcaldy", "linlithgow", "edinburgh"], keyRoads: ["M90", "A823", "A985"], landmarks: ["Dunfermline Abbey", "Queen Margaret Hospital", "Fife Leisure Park"], priority: 2 }),
  makeLocation({ slug: "kilmarnock", name: "Kilmarnock", councilArea: "East Ayrshire", region: "Ayrshire", postcodeExamples: ["KA1", "KA3"], nearbyLocations: ["irvine", "ayr", "barrhead", "glasgow"], keyRoads: ["A77", "A71", "M77"], landmarks: ["Kilmarnock town centre", "Crosshouse Hospital", "Rugby Park"], priority: 2 }),
  makeLocation({ slug: "ayr", name: "Ayr", councilArea: "South Ayrshire", region: "Ayrshire", postcodeExamples: ["KA7", "KA8"], nearbyLocations: ["irvine", "kilmarnock", "gourock", "greenock"], keyRoads: ["A77", "A70", "A719"], landmarks: ["Ayr town centre", "Ayr Racecourse", "Prestwick Airport"], priority: 2 }),
  makeLocation({ slug: "irvine", name: "Irvine", councilArea: "North Ayrshire", region: "Ayrshire", postcodeExamples: ["KA11", "KA12"], nearbyLocations: ["kilmarnock", "ayr", "greenock", "paisley"], keyRoads: ["A78", "A71", "A737"], landmarks: ["Irvine Harbour", "Rivergate", "Eglinton Country Park"], priority: 2 }),
  makeLocation({ slug: "greenock", name: "Greenock", councilArea: "Inverclyde", region: "West Scotland", postcodeExamples: ["PA15", "PA16"], nearbyLocations: ["port-glasgow", "gourock", "paisley", "renfrew"], keyRoads: ["A8", "M8", "A78"], landmarks: ["Greenock town centre", "Ocean Terminal", "Inverclyde Royal Hospital"], priority: 2 }),
  makeLocation({ slug: "coatbridge", name: "Coatbridge", councilArea: "North Lanarkshire", region: "Lanarkshire", postcodeExamples: ["ML5"], nearbyLocations: ["airdrie", "bellshill", "motherwell", "glasgow"], keyRoads: ["M8", "A725", "A89"], landmarks: ["Coatbridge town centre", "Faraday Retail Park", "Drumpellier Country Park"], priority: 2 }),
  makeLocation({ slug: "airdrie", name: "Airdrie", councilArea: "North Lanarkshire", region: "Lanarkshire", postcodeExamples: ["ML6"], nearbyLocations: ["coatbridge", "bellshill", "cumbernauld", "motherwell"], keyRoads: ["A89", "A73", "M8"], landmarks: ["Airdrie town centre", "Monklands Hospital", "Airdrie Retail Park"], priority: 2 }),
  makeLocation({ slug: "bellshill", name: "Bellshill", councilArea: "North Lanarkshire", region: "Lanarkshire", postcodeExamples: ["ML4"], nearbyLocations: ["motherwell", "hamilton", "coatbridge", "rutherglen"], keyRoads: ["M8", "M74", "A725"], landmarks: ["Bellshill town centre", "Strathclyde Business Park", "Mossend"], priority: 2 }),
  makeLocation({ slug: "renfrew", name: "Renfrew", councilArea: "Renfrewshire", region: "West Scotland", postcodeExamples: ["PA4"], nearbyLocations: ["paisley", "linwood", "clydebank", "glasgow"], keyRoads: ["M8", "A8", "A741"], landmarks: ["Braehead", "Renfrew town centre", "Glasgow Airport"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "rutherglen", name: "Rutherglen", councilArea: "South Lanarkshire", region: "Lanarkshire", postcodeExamples: ["G73"], nearbyLocations: ["cambuslang", "glasgow", "east-kilbride", "hamilton"], keyRoads: ["M74", "A730", "A749"], landmarks: ["Rutherglen Main Street", "Oatlands", "Cuningar Loop"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "bearsden", name: "Bearsden", councilArea: "East Dunbartonshire", region: "Glasgow and Clyde", postcodeExamples: ["G61"], nearbyLocations: ["milngavie", "clydebank", "bishopbriggs", "glasgow"], keyRoads: ["A81", "A809", "Great Western Road"], landmarks: ["Bearsden Cross", "Hillfoot", "Kilmardinny Loch"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "milngavie", name: "Milngavie", councilArea: "East Dunbartonshire", region: "Glasgow and Clyde", postcodeExamples: ["G62"], nearbyLocations: ["bearsden", "clydebank", "bishopbriggs", "glasgow"], keyRoads: ["A81", "A809", "A82"], landmarks: ["Milngavie town centre", "West Highland Way start", "Mugdock Road"], priority: 2 }),
  makeLocation({ slug: "newton-mearns", name: "Newton Mearns", councilArea: "East Renfrewshire", region: "Glasgow and Clyde", postcodeExamples: ["G77"], nearbyLocations: ["giffnock", "clarkston", "east-kilbride", "glasgow"], keyRoads: ["M77", "A726", "A77"], landmarks: ["The Avenue", "Whitecraigs", "Mearns Cross"], priority: 2 }),
  makeLocation({ slug: "cambuslang", name: "Cambuslang", councilArea: "South Lanarkshire", region: "Lanarkshire", postcodeExamples: ["G72"], nearbyLocations: ["rutherglen", "east-kilbride", "hamilton", "glasgow"], keyRoads: ["M74", "A724", "A749"], landmarks: ["Cambuslang Main Street", "Newton", "Kirkhill"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "dumbarton", name: "Dumbarton", councilArea: "West Dunbartonshire", region: "West Scotland", postcodeExamples: ["G82"], nearbyLocations: ["clydebank", "glasgow", "milngavie", "greenock"], keyRoads: ["A82", "A814", "A811"], landmarks: ["Dumbarton Castle", "Dumbarton Central", "Loch Lomond Gateway"], priority: 2 }),
  makeLocation({ slug: "wishaw", name: "Wishaw", councilArea: "North Lanarkshire", region: "Lanarkshire", postcodeExamples: ["ML2"], nearbyLocations: ["motherwell", "hamilton", "bellshill", "larkhall"], keyRoads: ["A71", "A721", "M74"], landmarks: ["Wishaw town centre", "Wishaw General Hospital", "Cambusnethan"], priority: 2 }),
  makeLocation({ slug: "larkhall", name: "Larkhall", councilArea: "South Lanarkshire", region: "Lanarkshire", postcodeExamples: ["ML9"], nearbyLocations: ["hamilton", "motherwell", "wishaw", "east-kilbride"], keyRoads: ["M74", "A72", "A71"], landmarks: ["Larkhall town centre", "Merryton", "Chatelherault Country Park"], priority: 2 }),
  makeLocation({ slug: "bishopbriggs", name: "Bishopbriggs", councilArea: "East Dunbartonshire", region: "Glasgow and Clyde", postcodeExamples: ["G64"], nearbyLocations: ["glasgow", "bearsden", "milngavie", "cumbernauld"], keyRoads: ["A803", "M80", "Kirkintilloch Road"], landmarks: ["Bishopbriggs town centre", "Strathkelvin Retail Park", "Cadder"], priority: 1, contentDepth: "strong" }),
  makeLocation({ slug: "barrhead", name: "Barrhead", councilArea: "East Renfrewshire", region: "Glasgow and Clyde", postcodeExamples: ["G78"], nearbyLocations: ["paisley", "giffnock", "newton-mearns", "glasgow"], keyRoads: ["A736", "M77", "Aurs Road"], landmarks: ["Barrhead Main Street", "Dams to Darnley", "Hurlet"], priority: 2 }),
  makeLocation({ slug: "giffnock", name: "Giffnock", councilArea: "East Renfrewshire", region: "Glasgow and Clyde", postcodeExamples: ["G46"], nearbyLocations: ["clarkston", "newton-mearns", "barrhead", "glasgow"], keyRoads: ["A77", "Braidholm Road", "Fenwick Road"], landmarks: ["Giffnock town centre", "Rouken Glen Park", "Whitecraigs"], priority: 2 }),
  makeLocation({ slug: "clarkston", name: "Clarkston", councilArea: "East Renfrewshire", region: "Glasgow and Clyde", postcodeExamples: ["G76"], nearbyLocations: ["giffnock", "newton-mearns", "east-kilbride", "glasgow"], keyRoads: ["A727", "A77", "M77"], landmarks: ["Clarkston Toll", "Williamwood", "Busby"], priority: 2 }),
  makeLocation({ slug: "erskine", name: "Erskine", councilArea: "Renfrewshire", region: "West Scotland", postcodeExamples: ["PA8"], nearbyLocations: ["renfrew", "paisley", "clydebank", "dumbarton"], keyRoads: ["M8", "A726", "Erskine Bridge"], landmarks: ["Erskine Bridge", "Bridgewater Shopping Centre", "Bargarran"], priority: 2 }),
  makeLocation({ slug: "johnstone", name: "Johnstone", councilArea: "Renfrewshire", region: "West Scotland", postcodeExamples: ["PA5"], nearbyLocations: ["paisley", "linwood", "renfrew", "barrhead"], keyRoads: ["A737", "A761", "M8"], landmarks: ["Johnstone town centre", "Johnstone station", "Cochrane Castle"], priority: 2 }),
  makeLocation({ slug: "linwood", name: "Linwood", councilArea: "Renfrewshire", region: "West Scotland", postcodeExamples: ["PA3"], nearbyLocations: ["paisley", "johnstone", "renfrew", "erskine"], keyRoads: ["A737", "M8", "A761"], landmarks: ["Linwood town centre", "Phoenix Retail Park", "Linwood Moss"], priority: 2 }),
  makeLocation({ slug: "gourock", name: "Gourock", councilArea: "Inverclyde", region: "West Scotland", postcodeExamples: ["PA19"], nearbyLocations: ["greenock", "port-glasgow", "paisley", "renfrew"], keyRoads: ["A770", "A78", "A8"], landmarks: ["Gourock town centre", "Gourock ferry terminal", "Cardwell Bay"], priority: 3 }),
  makeLocation({ slug: "port-glasgow", name: "Port Glasgow", councilArea: "Inverclyde", region: "West Scotland", postcodeExamples: ["PA14"], nearbyLocations: ["greenock", "gourock", "paisley", "clydebank"], keyRoads: ["A8", "M8", "A761"], landmarks: ["Port Glasgow town centre", "Newark Castle", "Gallagher Shopping Park"], priority: 3 }),
  makeLocation({ slug: "bonnybridge", name: "Bonnybridge", councilArea: "Falkirk", region: "Forth Valley", postcodeExamples: ["FK4"], nearbyLocations: ["falkirk", "larbert", "cumbernauld", "stirling"], keyRoads: ["M876", "A803", "M80"], landmarks: ["Bonnybridge town centre", "Forth and Clyde Canal", "Dennyloanhead"], priority: 3 }),
  makeLocation({ slug: "grangemouth", name: "Grangemouth", councilArea: "Falkirk", region: "Forth Valley", postcodeExamples: ["FK3"], nearbyLocations: ["falkirk", "larbert", "linlithgow", "alloa"], keyRoads: ["M9", "A904", "A905"], landmarks: ["Grangemouth town centre", "Grangemouth docks", "Zetland Park"], priority: 3 }),
  makeLocation({ slug: "larbert", name: "Larbert", councilArea: "Falkirk", region: "Forth Valley", postcodeExamples: ["FK5"], nearbyLocations: ["falkirk", "bonnybridge", "grangemouth", "stirling"], keyRoads: ["M876", "M9", "A9"], landmarks: ["Forth Valley Royal Hospital", "Larbert station", "Stenhousemuir"], priority: 3 }),
  makeLocation({ slug: "alloa", name: "Alloa", councilArea: "Clackmannanshire", region: "Forth Valley", postcodeExamples: ["FK10"], nearbyLocations: ["stirling", "falkirk", "dunfermline", "kirkcaldy"], keyRoads: ["A907", "A91", "A977"], landmarks: ["Alloa town centre", "Alloa Tower", "Clackmannan Road"], priority: 3 }),
  makeLocation({ slug: "cowdenbeath", name: "Cowdenbeath", councilArea: "Fife", region: "Fife", postcodeExamples: ["KY4"], nearbyLocations: ["dunfermline", "kirkcaldy", "glenrothes", "leven"], keyRoads: ["A92", "B981", "M90"], landmarks: ["Cowdenbeath town centre", "Central Park", "Hill of Beath"], priority: 3 }),
  makeLocation({ slug: "glenrothes", name: "Glenrothes", councilArea: "Fife", region: "Fife", postcodeExamples: ["KY6", "KY7"], nearbyLocations: ["kirkcaldy", "leven", "cowdenbeath", "dunfermline"], keyRoads: ["A92", "A911", "A910"], landmarks: ["Glenrothes town centre", "Kingdom Shopping Centre", "Riverside Park"], priority: 3 }),
  makeLocation({ slug: "leven", name: "Leven", councilArea: "Fife", region: "Fife", postcodeExamples: ["KY8"], nearbyLocations: ["glenrothes", "kirkcaldy", "dundee", "cowdenbeath"], keyRoads: ["A915", "A911", "A92"], landmarks: ["Leven town centre", "Leven beach", "Methil"], priority: 3 }),
  makeLocation({ slug: "musselburgh", name: "Musselburgh", councilArea: "East Lothian", region: "Edinburgh and Lothians", postcodeExamples: ["EH21"], nearbyLocations: ["edinburgh", "portobello", "dalkeith", "bonnyrigg"], keyRoads: ["A1", "A720", "A199"], landmarks: ["Musselburgh Racecourse", "Fisherrow", "Queen Margaret University"], priority: 2 }),
  makeLocation({ slug: "dalkeith", name: "Dalkeith", councilArea: "Midlothian", region: "Edinburgh and Lothians", postcodeExamples: ["EH22"], nearbyLocations: ["edinburgh", "bonnyrigg", "penicuik", "musselburgh"], keyRoads: ["A68", "A7", "A720"], landmarks: ["Dalkeith town centre", "Dalkeith Country Park", "Eskbank"], priority: 2 }),
  makeLocation({ slug: "penicuik", name: "Penicuik", councilArea: "Midlothian", region: "Edinburgh and Lothians", postcodeExamples: ["EH26"], nearbyLocations: ["edinburgh", "dalkeith", "bonnyrigg", "livingston"], keyRoads: ["A701", "A702", "A720"], landmarks: ["Penicuik town centre", "Glencorse", "Pentland Hills"], priority: 3 }),
  makeLocation({ slug: "bonnyrigg", name: "Bonnyrigg", councilArea: "Midlothian", region: "Edinburgh and Lothians", postcodeExamples: ["EH19"], nearbyLocations: ["dalkeith", "edinburgh", "penicuik", "musselburgh"], keyRoads: ["A7", "A6094", "A720"], landmarks: ["Bonnyrigg town centre", "Eskbank", "Lasswade"], priority: 3 }),
  makeLocation({ slug: "bathgate", name: "Bathgate", councilArea: "West Lothian", region: "Edinburgh and Lothians", postcodeExamples: ["EH48"], nearbyLocations: ["livingston", "broxburn", "linlithgow", "falkirk"], keyRoads: ["M8", "A89", "A801"], landmarks: ["Bathgate town centre", "Bathgate station", "Pyramids Business Park"], priority: 2 }),
  makeLocation({ slug: "broxburn", name: "Broxburn", councilArea: "West Lothian", region: "Edinburgh and Lothians", postcodeExamples: ["EH52"], nearbyLocations: ["livingston", "bathgate", "linlithgow", "edinburgh"], keyRoads: ["M8", "A89", "A899"], landmarks: ["Broxburn town centre", "Uphall", "Almondell"], priority: 2 }),
  makeLocation({ slug: "linlithgow", name: "Linlithgow", councilArea: "West Lothian", region: "Edinburgh and Lothians", postcodeExamples: ["EH49"], nearbyLocations: ["falkirk", "livingston", "bathgate", "dunfermline"], keyRoads: ["M9", "A803", "A706"], landmarks: ["Linlithgow Palace", "Linlithgow Loch", "Linlithgow station"], priority: 2 }),
];

const GLASGOW_DISTRICTS: readonly SeoLocation[] = ([
  ["city-centre", "City Centre", ["G1", "G2"], ["Merchant City", "Buchanan Street", "Glasgow Central"], ["finnieston", "west-end", "east-end"]],
  ["west-end", "West End", ["G11", "G12"], ["Byres Road", "Kelvingrove", "University of Glasgow"], ["finnieston", "partick", "hillhead"]],
  ["east-end", "East End", ["G31", "G40"], ["Duke Street", "Celtic Park", "The Forge"], ["dennistoun", "bridgeton", "parkhead"]],
  ["southside", "Southside", ["G41", "G42"], ["Shawlands", "Pollokshields", "Queen's Park"], ["shawlands", "pollokshields", "govanhill"]],
  ["north-glasgow", "North Glasgow", ["G21", "G22"], ["Springburn", "Possilpark", "Bishopbriggs"], ["springburn", "possilpark", "maryhill"]],
  ["finnieston", "Finnieston", ["G3"], ["Argyle Street", "SEC", "Kelvingrove"], ["west-end", "partick", "city-centre"]],
  ["partick", "Partick", ["G11"], ["Partick station", "Dumbarton Road", "Kelvingrove"], ["west-end", "hillhead", "finnieston"]],
  ["hillhead", "Hillhead", ["G12"], ["Byres Road", "University of Glasgow", "Ashton Lane"], ["partick", "hyndland", "kelvinside"]],
  ["hyndland", "Hyndland", ["G12"], ["Hyndland Road", "Hyndland station", "Clarence Drive"], ["hillhead", "kelvinside", "partick"]],
  ["kelvinside", "Kelvinside", ["G12", "G20"], ["Great Western Road", "Botanic Gardens", "Queen Margaret Drive"], ["hillhead", "maryhill", "hyndland"]],
  ["maryhill", "Maryhill", ["G20"], ["Maryhill Road", "Firhill", "Wyndford"], ["kelvinside", "north-glasgow", "springburn"]],
  ["dennistoun", "Dennistoun", ["G31"], ["Duke Street", "Alexandra Parade", "Glasgow Royal Infirmary"], ["east-end", "bridgeton", "city-centre"]],
  ["bridgeton", "Bridgeton", ["G40"], ["Bridgeton Cross", "Glasgow Green", "Dalmarnock"], ["dennistoun", "parkhead", "gorbals"]],
  ["parkhead", "Parkhead", ["G31", "G40"], ["Celtic Park", "The Forge", "London Road"], ["bridgeton", "shettleston", "east-end"]],
  ["shettleston", "Shettleston", ["G32"], ["Shettleston Road", "Tollcross", "Sandyhills"], ["parkhead", "baillieston", "east-end"]],
  ["baillieston", "Baillieston", ["G69"], ["Baillieston Main Street", "Easterhouse", "M8"], ["shettleston", "coatbridge", "east-end"]],
  ["shawlands", "Shawlands", ["G41"], ["Kilmarnock Road", "Queen's Park", "Pollokshaws"], ["southside", "pollokshields", "cathcart"]],
  ["pollokshields", "Pollokshields", ["G41"], ["Maxwell Park", "Pollokshields East", "St Andrews Drive"], ["shawlands", "govanhill", "gorbals"]],
  ["govanhill", "Govanhill", ["G42"], ["Victoria Road", "Queen's Park", "Cathcart Road"], ["pollokshields", "gorbals", "southside"]],
  ["gorbals", "Gorbals", ["G5"], ["Crown Street", "Laurieston", "Glasgow Green"], ["city-centre", "bridgeton", "govanhill"]],
  ["cathcart", "Cathcart", ["G44"], ["Cathcart Road", "Linn Park", "Mount Florida"], ["shawlands", "mount-florida", "clarkston"]],
  ["mount-florida", "Mount Florida", ["G42"], ["Hampden Park", "Cathcart Road", "Battlefield"], ["cathcart", "shawlands", "govanhill"]],
  ["cardonald", "Cardonald", ["G52"], ["Paisley Road West", "Mosspark", "Hillington"], ["govan", "pollok", "paisley"]],
  ["pollok", "Pollok", ["G53"], ["Silverburn", "Pollok Country Park", "Crookston"], ["cardonald", "shawlands", "barrhead"]],
  ["govan", "Govan", ["G51"], ["Govan Road", "Queen Elizabeth University Hospital", "Ibrox"], ["ibrox", "cardonald", "finnieston"]],
  ["ibrox", "Ibrox", ["G51"], ["Ibrox Stadium", "Paisley Road West", "Cessnock"], ["govan", "finnieston", "cardonald"]],
  ["drumchapel", "Drumchapel", ["G15"], ["Drumchapel Shopping Centre", "Great Western Road", "Bearsden"], ["clydebank", "bearsden", "maryhill"]],
  ["springburn", "Springburn", ["G21"], ["Springburn Shopping Centre", "Petershill", "Barnhill"], ["north-glasgow", "possilpark", "bishopbriggs"]],
  ["possilpark", "Possilpark", ["G22"], ["Saracen Street", "Possilpark station", "Milton"], ["springburn", "maryhill", "north-glasgow"]],
] satisfies readonly AreaTuple[]).map(([slug, name, postcodeExamples, landmarks, nearbyLocations]) => makeLocation({
  slug,
  name,
  type: "neighbourhood",
  parentSlug: "glasgow",
  councilArea: "Glasgow City",
  region: "Glasgow and Clyde",
  postcodeExamples,
  nearbyLocations,
  keyRoads: ["M8", "M74", "M77", "M80"],
  landmarks,
  priority: 1,
  coverageStatus: "core",
  contentDepth: "strong",
}));

const EDINBURGH_DISTRICTS: readonly SeoLocation[] = ([
  ["city-centre", "City Centre", ["EH1", "EH2"], ["Princes Street", "Waverley", "Royal Mile"], ["new-town", "old-town", "haymarket"]],
  ["leith", "Leith", ["EH6"], ["Leith Walk", "The Shore", "Ocean Terminal"], ["new-town", "portobello", "canonmills"]],
  ["new-town", "New Town", ["EH2", "EH3"], ["George Street", "Queen Street", "Stockbridge"], ["city-centre", "stockbridge", "canonmills"]],
  ["old-town", "Old Town", ["EH1"], ["Royal Mile", "Grassmarket", "Holyrood"], ["city-centre", "marchmont", "haymarket"]],
  ["haymarket", "Haymarket", ["EH12"], ["Haymarket station", "Morrison Street", "West End"], ["dalry", "gorgie", "city-centre"]],
  ["gorgie", "Gorgie", ["EH11"], ["Gorgie Road", "Tynecastle", "Saughton"], ["dalry", "haymarket", "corstorphine"]],
  ["dalry", "Dalry", ["EH11"], ["Dalry Road", "Haymarket", "Fountainbridge"], ["haymarket", "gorgie", "morningside"]],
  ["morningside", "Morningside", ["EH10"], ["Morningside Road", "The Meadows", "Church Hill"], ["bruntsfield", "marchmont", "corstorphine"]],
  ["bruntsfield", "Bruntsfield", ["EH10"], ["Bruntsfield Links", "Holy Corner", "The Meadows"], ["morningside", "marchmont", "old-town"]],
  ["marchmont", "Marchmont", ["EH9"], ["Marchmont Road", "The Meadows", "Warrender Park"], ["bruntsfield", "morningside", "old-town"]],
  ["portobello", "Portobello", ["EH15"], ["Portobello High Street", "Portobello Beach", "Joppa"], ["leith", "craigmillar", "musselburgh"]],
  ["corstorphine", "Corstorphine", ["EH12"], ["Corstorphine Road", "Edinburgh Zoo", "Gyle"], ["murrayfield", "gorgie", "south-queensferry"]],
  ["murrayfield", "Murrayfield", ["EH12"], ["Murrayfield Stadium", "Roseburn", "Corstorphine Road"], ["corstorphine", "haymarket", "stockbridge"]],
  ["stockbridge", "Stockbridge", ["EH3"], ["Raeburn Place", "Dean Village", "Inverleith"], ["new-town", "canonmills", "murrayfield"]],
  ["canonmills", "Canonmills", ["EH3", "EH7"], ["Canonmills Bridge", "Inverleith", "Broughton"], ["stockbridge", "new-town", "leith"]],
  ["craigmillar", "Craigmillar", ["EH16"], ["Craigmillar Castle", "Niddrie", "Royal Infirmary"], ["portobello", "dalkeith", "old-town"]],
  ["south-queensferry", "South Queensferry", ["EH30"], ["Forth Road Bridge", "Queensferry Crossing", "Dalmeny"], ["corstorphine", "linlithgow", "dunfermline"]],
] satisfies readonly AreaTuple[]).map(([slug, name, postcodeExamples, landmarks, nearbyLocations]) => makeLocation({
  slug,
  name,
  type: "district",
  parentSlug: "edinburgh",
  councilArea: "City of Edinburgh",
  region: "Edinburgh and Lothians",
  postcodeExamples,
  nearbyLocations,
  keyRoads: ["A720", "M8", "A1", "A90"],
  landmarks,
  priority: 1,
  coverageStatus: "core",
  contentDepth: "strong",
}));

const DUNDEE_DISTRICTS: readonly SeoLocation[] = ([
  ["city-centre", "City Centre", ["DD1"], ["Dundee Waterfront", "V&A Dundee", "Discovery Point"], ["west-end", "stobswell", "lochee"]],
  ["west-end", "West End", ["DD2"], ["Perth Road", "University of Dundee", "Ninewells"], ["city-centre", "lochee", "invergowrie"]],
  ["broughty-ferry", "Broughty Ferry", ["DD5"], ["Broughty Ferry Beach", "Brook Street", "Broughty Castle"], ["monifieth", "douglas", "city-centre"]],
  ["lochee", "Lochee", ["DD2"], ["Lochee High Street", "Camperdown", "Ninewells"], ["west-end", "charleston", "city-centre"]],
  ["stobswell", "Stobswell", ["DD3"], ["Albert Street", "Morgan Academy", "Dens Road"], ["city-centre", "douglas", "fintry"]],
  ["douglas", "Douglas", ["DD4"], ["Douglas Road", "Claypotts", "Baldovie"], ["broughty-ferry", "fintry", "stobswell"]],
  ["fintry", "Fintry", ["DD4"], ["Fintry Road", "Whitfield", "Douglas"], ["douglas", "stobswell", "broughty-ferry"]],
  ["charleston", "Charleston", ["DD2"], ["Charleston Drive", "Lochee", "Menzieshill"], ["lochee", "west-end", "invergowrie"]],
  ["monifieth", "Monifieth", ["DD5"], ["Monifieth High Street", "Blue Seaway", "Broughty Ferry"], ["broughty-ferry", "dundee", "leven"]],
  ["invergowrie", "Invergowrie", ["DD2"], ["Invergowrie station", "Riverside Drive", "Technology Park"], ["west-end", "lochee", "perth"]],
] satisfies readonly AreaTuple[]).map(([slug, name, postcodeExamples, landmarks, nearbyLocations]) => makeLocation({
  slug,
  name,
  type: "district",
  parentSlug: "dundee",
  councilArea: "Dundee City",
  region: "Tayside",
  postcodeExamples,
  nearbyLocations,
  keyRoads: ["A90", "A92", "Kingsway", "Tay Road Bridge"],
  landmarks,
  priority: 1,
  coverageStatus: "core",
  contentDepth: "strong",
}));

function postcodeArea(
  code: string,
  parentSlug: string,
  councilArea: string,
  region: string,
  nearbyLocations: readonly string[],
  keyRoads: readonly string[],
): SeoLocation {
  return makeLocation({
    slug: code.toLowerCase(),
    name: `${code} postcode area`,
    type: "postcodeArea",
    parentSlug,
    councilArea,
    region,
    postcodeExamples: [code],
    nearbyLocations,
    keyRoads,
    landmarks: [`${code} local streets`, `${parentSlug.replace(/-/g, " ")} service area`],
    priority: parentSlug === "glasgow" || parentSlug === "edinburgh" || parentSlug === "dundee" ? 2 : 3,
    coverageStatus: parentSlug === "glasgow" || parentSlug === "edinburgh" || parentSlug === "dundee" ? "core" : "nearby",
    contentDepth: "medium",
    localProofNotes: ["Postcode-led service area page; availability is confirmed before dispatch."],
  });
}

const POSTCODE_AREAS: readonly SeoLocation[] = [
  ...[
    "G1", "G2", "G3", "G4", "G5", "G11", "G12", "G13", "G15", "G20", "G21", "G22", "G31", "G32", "G40", "G41", "G42", "G43", "G44", "G46", "G51", "G52", "G53", "G61", "G62", "G64", "G67", "G68", "G72", "G73", "G74", "G75", "G77", "G81", "G82",
  ].map((code) => postcodeArea(code, "glasgow", "Glasgow City", "Glasgow and Clyde", ["glasgow", "paisley", "clydebank", "rutherglen"], ["M8", "M74", "M77", "M80", "A82"])),
  ...[
    "EH1", "EH2", "EH3", "EH4", "EH5", "EH6", "EH7", "EH8", "EH9", "EH10", "EH11", "EH12", "EH15", "EH16", "EH17", "EH21", "EH22", "EH26", "EH30", "EH48", "EH49", "EH52", "EH54",
  ].map((code) => postcodeArea(code, "edinburgh", "City of Edinburgh", "Edinburgh and Lothians", ["edinburgh", "musselburgh", "dalkeith", "livingston"], ["A720", "M8", "A1", "A90"])),
  ...["DD1", "DD2", "DD3", "DD4", "DD5", "DD11"].map((code) => postcodeArea(code, "dundee", "Dundee City", "Tayside", ["dundee", "monifieth", "perth", "leven"], ["A90", "A92", "Kingsway", "Tay Road Bridge"])),
  ...["PA1", "PA2", "PA3", "PA4", "PA14", "PA15", "PA16"].map((code) => postcodeArea(code, "paisley", "Renfrewshire", "West Scotland", ["paisley", "renfrew", "greenock", "johnstone"], ["M8", "A737", "A8"])),
  ...["ML1", "ML2", "ML3", "ML4", "ML5", "ML6", "ML9"].map((code) => postcodeArea(code, "motherwell", "North Lanarkshire", "Lanarkshire", ["motherwell", "hamilton", "bellshill", "airdrie"], ["M74", "M8", "A725"])),
  ...["FK1", "FK2", "FK3", "FK4", "FK5", "FK7", "FK8", "FK9", "FK10"].map((code) => postcodeArea(code, "falkirk", "Falkirk", "Forth Valley", ["falkirk", "stirling", "larbert", "grangemouth"], ["M9", "M876", "A9"])),
  ...["KY1", "KY2", "KY4", "KY6", "KY7", "KY8", "KY11", "KY12"].map((code) => postcodeArea(code, "kirkcaldy", "Fife", "Fife", ["kirkcaldy", "dunfermline", "glenrothes", "leven"], ["A92", "M90", "A910"])),
  ...["KA1", "KA3", "KA7", "KA8", "KA11", "KA12"].map((code) => postcodeArea(code, "kilmarnock", "East Ayrshire", "Ayrshire", ["kilmarnock", "ayr", "irvine", "paisley"], ["A77", "A71", "M77"])),
];

const ROAD_CORRIDORS: readonly SeoLocation[] = ([
  ["m8", "M8 corridor", ["Glasgow", "Livingston", "Edinburgh"], ["Glasgow", "Paisley", "Livingston", "Edinburgh"]],
  ["m74", "M74 corridor", ["Glasgow", "Rutherglen", "Hamilton"], ["Glasgow", "Hamilton", "Motherwell", "Larkhall"]],
  ["m77", "M77 corridor", ["Glasgow", "Newton Mearns", "Kilmarnock"], ["Glasgow", "Newton Mearns", "Kilmarnock", "Ayr"]],
  ["m80", "M80 corridor", ["Glasgow", "Cumbernauld", "Stirling"], ["Glasgow", "Cumbernauld", "Falkirk", "Stirling"]],
  ["m90", "M90 corridor", ["Dunfermline", "Perth", "Fife"], ["Dunfermline", "Perth", "Kirkcaldy", "Edinburgh"]],
  ["a9", "A9 corridor", ["Stirling", "Perth", "central Scotland"], ["Stirling", "Perth", "Falkirk", "Alloa"]],
  ["a90", "A90 corridor", ["Dundee", "Perth", "Edinburgh approaches"], ["Dundee", "Perth", "Dunfermline", "Edinburgh"]],
  ["a720", "A720 city bypass", ["Edinburgh", "Dalkeith", "Musselburgh"], ["Edinburgh", "Dalkeith", "Musselburgh", "Penicuik"]],
  ["a82", "A82 corridor", ["Glasgow", "Clydebank", "Dumbarton"], ["Glasgow", "Clydebank", "Dumbarton", "Bearsden"]],
  ["a8", "A8 corridor", ["Greenock", "Port Glasgow", "Renfrew"], ["Greenock", "Port Glasgow", "Renfrew", "Paisley"]],
  ["a725", "A725 corridor", ["East Kilbride", "Bellshill", "Coatbridge"], ["East Kilbride", "Bellshill", "Coatbridge", "Hamilton"]],
  ["a737", "A737 corridor", ["Paisley", "Johnstone", "Irvine routes"], ["Paisley", "Johnstone", "Linwood", "Irvine"]],
  ["a71", "A71 corridor", ["Kilmarnock", "Livingston", "Lanarkshire"], ["Kilmarnock", "Irvine", "Livingston", "Wishaw"]],
  ["a77", "A77 corridor", ["Glasgow", "Kilmarnock", "Ayr"], ["Glasgow", "Newton Mearns", "Kilmarnock", "Ayr"]],
  ["a92", "A92 corridor", ["Dundee", "Kirkcaldy", "Fife"], ["Dundee", "Kirkcaldy", "Glenrothes", "Leven"]],
] satisfies readonly RoadTuple[]).map(([slug, name, landmarks, nearbyNames]) => makeLocation({
  slug,
  name,
  type: "roadCorridor",
  councilArea: "Scotland",
  region: "Scotland road corridors",
  postcodeExamples: [],
  nearbyLocations: nearbyNames.map((item) => item.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")),
  keyRoads: [name.split(" ")[0]],
  landmarks,
  priority: 2,
  coverageStatus: "nearby",
  contentDepth: "medium",
  localProofNotes: ["Route-led page uses careful safe-access wording and does not promise live-lane attendance."],
}));

const FUTURE_SCOTLAND_LOCATIONS: readonly SeoLocation[] = [
  makeLocation({ slug: "aberdeen", name: "Aberdeen", type: "city", councilArea: "Aberdeen City", region: "North East Scotland", postcodeExamples: ["AB10", "AB11"], nearbyLocations: ["dundee", "perth"], keyRoads: ["A90", "A96"], landmarks: ["Aberdeen city centre", "Union Street"], priority: 5, coverageStatus: "future", indexable: false, contentDepth: "thin", disabledReason: "Coverage not confirmed" }),
  makeLocation({ slug: "inverness", name: "Inverness", type: "city", councilArea: "Highland", region: "Highlands", postcodeExamples: ["IV1", "IV2"], nearbyLocations: ["perth", "dundee"], keyRoads: ["A9", "A82"], landmarks: ["Inverness city centre", "River Ness"], priority: 5, coverageStatus: "future", indexable: false, contentDepth: "thin", disabledReason: "Coverage not confirmed" }),
  makeLocation({ slug: "dumfries", name: "Dumfries", type: "town", councilArea: "Dumfries and Galloway", region: "South Scotland", postcodeExamples: ["DG1", "DG2"], nearbyLocations: ["ayr", "kilmarnock"], keyRoads: ["A75", "A76"], landmarks: ["Dumfries town centre", "Whitesands"], priority: 5, coverageStatus: "future", indexable: false, contentDepth: "thin", disabledReason: "Coverage not confirmed" }),
];

const ADDITIONAL_SCOTLAND_LOCATIONS: readonly SeoLocation[] = ADDITIONAL_SCOTLAND_LOCATION_SEEDS.map(makeLocation);

export const SEO_LOCATIONS: readonly SeoLocation[] = [
  ...CORE_CITY_LOCATIONS,
  ...CENTRAL_SCOTLAND_TOWNS,
  ...GLASGOW_DISTRICTS,
  ...EDINBURGH_DISTRICTS,
  ...DUNDEE_DISTRICTS,
  ...POSTCODE_AREAS,
  ...ROAD_CORRIDORS,
  ...ADDITIONAL_SCOTLAND_LOCATIONS,
  ...FUTURE_SCOTLAND_LOCATIONS,
];

export const INDEXABLE_SEO_LOCATIONS: readonly SeoLocation[] = SEO_LOCATIONS.filter(
  (location) => location.indexable,
);

export function getLocationKey(location: SeoLocation): string {
  return location.parentSlug ? `${location.parentSlug}/${location.slug}` : location.slug;
}

function getRoadCorridorAnchorSlug(location: SeoLocation): string | null {
  if (location.type !== "roadCorridor") return null;
  const cityAnchor = location.nearbyLocations.find((slug) => getDirectSeoLocation(slug)?.type === "city");
  if (cityAnchor) return cityAnchor;
  return location.nearbyLocations.find((slug) => Boolean(getDirectSeoLocation(slug))) ?? null;
}

export function getLocationPathSegments(location: SeoLocation): readonly string[] {
  const roadCorridorAnchorSlug = getRoadCorridorAnchorSlug(location);
  if (roadCorridorAnchorSlug) return [roadCorridorAnchorSlug, location.slug];
  return location.parentSlug ? [location.parentSlug, location.slug] : [location.slug];
}

export function getSeoLocation(slug: string, parentSlug?: string): SeoLocation | null {
  return SEO_LOCATIONS.find((location) => {
    if (location.slug !== slug) return false;
    return (location.parentSlug ?? undefined) === parentSlug;
  }) ?? null;
}

export function getDirectSeoLocation(slug: string): SeoLocation | null {
  return getSeoLocation(slug);
}

export function getChildSeoLocation(parentSlug: string, childSlug: string): SeoLocation | null {
  return getSeoLocation(childSlug, parentSlug);
}

export function getParentSeoLocation(location: SeoLocation): SeoLocation | null {
  return location.parentSlug ? getDirectSeoLocation(location.parentSlug) : null;
}

export function getLocationDisplayName(location: SeoLocation): string {
  const parent = getParentSeoLocation(location);
  if (!parent) return location.name;
  if (location.type === "postcodeArea") return `${location.name} ${parent.name}`;
  return `${location.name} ${parent.name}`;
}

export function findLocationsBySlugs(
  slugs: readonly string[],
  parentSlug?: string,
): readonly SeoLocation[] {
  const matches: SeoLocation[] = [];
  for (const slug of slugs) {
    const scoped = parentSlug ? getSeoLocation(slug, parentSlug) : null;
    const direct = getDirectSeoLocation(slug);
    const match = scoped ?? direct;
    if (match && !matches.some((item) => getLocationKey(item) === getLocationKey(match))) {
      matches.push(match);
    }
  }
  return matches;
}

export function getPriorityLocations(limit: number): readonly SeoLocation[] {
  return INDEXABLE_SEO_LOCATIONS.filter((location) => !location.parentSlug && location.type !== "postcodeArea")
    .sort((left, right) => left.priority - right.priority || left.name.localeCompare(right.name))
    .slice(0, limit);
}