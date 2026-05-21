export type City = {
  slug: string;
  name: string;
  county: string;
  state: string;
  zip: string;
  distanceFromEtown: string;
  population: string;
  intro: string;
  localFlavor: string;
  popularJobs: string[];
  neighborhoods: string[];
  landmarks: string[];
  heroImage: string;
};

export const cities: City[] = [
  {
    slug: "radcliff",
    name: "Radcliff",
    county: "Hardin County",
    state: "KY",
    zip: "40160",
    distanceFromEtown: "10 minutes north of Elizabethtown",
    population: "about 23,000 residents",
    intro:
      "Radcliff sits right at the gates of Fort Knox, and the homes here see a lot more wear than the average Kentucky garage — military families moving in and out, gear being loaded, vehicles being worked on. A properly installed epoxy floor stands up to all of it, and we install them every week throughout Radcliff.",
    localFlavor:
      "Many Radcliff homes were built in the 1970s and 80s with thinner concrete slabs that have surface laitance and old paint to grind off. We come prepared for it. Our diamond-grinding rigs handle 40-year-old garage floors without issue, and our moisture-mitigating primers solve the slab-on-grade vapor problems common in homes off Wilson Road and around North Park.",
    popularJobs: [
      "2-car attached garages off Lincoln Trail Boulevard",
      "Detached workshops near Saunders Springs",
      "Auto bays for hobbyist mechanics",
      "Basement floors for finished living space",
    ],
    neighborhoods: [
      "North Park",
      "Saunders Springs",
      "Hill 'N' Dale",
      "Wilson Road area",
      "Knox Avenue corridor",
    ],
    landmarks: ["Fort Knox", "Saunders Springs Nature Preserve", "Lincoln Trail Boulevard"],
    heroImage: "/gallery/garage-flake-gray.jpg",
  },
  {
    slug: "vine-grove",
    name: "Vine Grove",
    county: "Hardin County",
    state: "KY",
    zip: "40175",
    distanceFromEtown: "15 minutes north of Elizabethtown",
    population: "about 6,400 residents",
    intro:
      "Vine Grove is a small, tight-knit community where homeowners take real pride in their property — and the garage is part of that. We've installed metallic epoxy and full-flake systems in homes from Highland Avenue to the new builds out on KY-144, and we treat every job like the neighbors will be looking at it (because they will).",
    localFlavor:
      "Newer construction in Vine Grove typically has clean, well-cured concrete that takes coatings beautifully. Older homes near the original downtown sometimes need crack filling and patch work first — we handle both as part of our standard prep, no extra trip charge for the drive from Elizabethtown.",
    popularJobs: [
      "New-construction garages in subdivisions off KY-144",
      "Older home garage refresh projects",
      "Pole barn and shop floors",
      "Patio and pool deck coatings",
    ],
    neighborhoods: [
      "Highland Avenue area",
      "Stithton",
      "KY-144 corridor",
      "Pearman Park area",
    ],
    landmarks: ["Optimist Park", "Pearman Park", "Vine Grove Lake"],
    heroImage: "/gallery/garage-metallic-blue.jpg",
  },
  {
    slug: "fort-knox",
    name: "Fort Knox",
    county: "Hardin County",
    state: "KY",
    zip: "40121",
    distanceFromEtown: "20 minutes north of Elizabethtown",
    population: "active military installation and on-post housing",
    intro:
      "We work regularly with Fort Knox area homeowners — both on-post privatized housing residents looking to upgrade their garages and off-post military families in Radcliff, Muldraugh, and Brandenburg. We understand PCS timelines and can usually schedule around a tight move date.",
    localFlavor:
      "Fort Knox-area garages take serious abuse: tools, gear, motorcycles, and vehicles being constantly worked on. We always recommend a full polyaspartic top coat in this area — it's UV-stable, chemical-resistant, and won't yellow under fluorescent shop lights. The few extra dollars per square foot pay for themselves the first time you spill brake fluid.",
    popularJobs: [
      "Off-post military family garage upgrades",
      "Motor pool and vehicle maintenance bays",
      "Hobby shop and motorcycle storage floors",
      "Quick-turnaround installs before PCS dates",
    ],
    neighborhoods: [
      "On-post Lincoln Park housing area",
      "Radcliff (off-post)",
      "Muldraugh",
      "Brandenburg",
    ],
    landmarks: ["U.S. Bullion Depository", "Patton Museum area", "General George Patton Museum"],
    heroImage: "/gallery/garage-after-poly.jpg",
  },
  {
    slug: "hodgenville",
    name: "Hodgenville",
    county: "LaRue County",
    state: "KY",
    zip: "42748",
    distanceFromEtown: "20 minutes south of Elizabethtown",
    population: "about 3,200 residents",
    intro:
      "Hodgenville — Lincoln's birthplace — is a beautiful small town with a real mix of historic homes and newer construction out toward the Lincoln Parkway. We coat garages, basements, and shop floors throughout LaRue County and treat the drive from Elizabethtown as part of the job, not an extra charge.",
    localFlavor:
      "Many Hodgenville properties have outbuildings — pole barns, equipment sheds, hobby shops — that benefit hugely from a sealed epoxy or polyaspartic floor. We've coated everything from a 12x20 backyard workshop to 3,000+ sq ft equipment barns. Sealed concrete is dramatically easier to clean, doesn't trap dust, and stops the constant dampness that ruins tools.",
    popularJobs: [
      "Pole barn and equipment shop floors",
      "Historic home basement coatings",
      "Garage epoxy in newer subdivisions",
      "Small business and retail floors downtown",
    ],
    neighborhoods: [
      "Downtown Hodgenville",
      "Lincoln Parkway corridor",
      "South Lincoln Boulevard area",
      "Lyons Road area",
    ],
    landmarks: [
      "Abraham Lincoln Birthplace National Historical Park",
      "Lincoln Square",
      "LaRue County High School area",
    ],
    heroImage: "/gallery/basement-polyaspartic.jpg",
  },
  {
    slug: "bardstown",
    name: "Bardstown",
    county: "Nelson County",
    state: "KY",
    zip: "40004",
    distanceFromEtown: "30 minutes east of Elizabethtown",
    population: "about 13,500 residents",
    intro:
      "Bardstown — the Bourbon Capital of the World — is one of our favorite places to work. Beautiful historic homes, growing new subdivisions on the east side of town, and a steady demand for high-end metallic and decorative finishes that fit the area's craftsman aesthetic. We make the drive from Elizabethtown for jobs throughout Nelson County.",
    localFlavor:
      "Bardstown homeowners often want something more than a basic gray flake garage — we install a lot of metallic epoxy in copper, slate, and pearl tones here, plus solid-color polyaspartic systems for finished basements and sunrooms. Distillery and warehouse work also comes up regularly given the bourbon industry's footprint in Nelson County.",
    popularJobs: [
      "Metallic and decorative garage finishes",
      "Finished basement floor coatings",
      "Sunroom and patio polyaspartic",
      "Distillery, rickhouse, and warehouse floor systems",
    ],
    neighborhoods: [
      "Historic Downtown Bardstown",
      "Bloomfield Road corridor",
      "Springfield Road area",
      "Boston Road / east-side subdivisions",
    ],
    landmarks: [
      "My Old Kentucky Home State Park",
      "Heaven Hill Distillery",
      "Bardstown Bourbon Company",
      "Federal Hill",
    ],
    heroImage: "/gallery/decorative-metallic.jpg",
  },
  {
    slug: "louisville",
    name: "Louisville",
    county: "Jefferson County",
    state: "KY",
    zip: "40202",
    distanceFromEtown: "45 minutes north of Elizabethtown",
    population: "about 625,000 residents in the metro",
    intro:
      "Louisville is one of our busiest service areas. From the suburbs of the East End to the historic homes in the Highlands and the booming new construction in the South End, we install premium epoxy and polyaspartic floor systems across Jefferson County every week. Same prep standards, same materials, same warranty — no travel surcharge for crossing the bridge.",
    localFlavor:
      "Louisville garages range from century-old detached structures in Old Louisville to brand-new four-car bays in Norton Commons. The older the concrete, the more critical the prep — we diamond-grind every floor, fix cracks and pitting properly, and use moisture-mitigating primers on slab-on-grade homes. We also handle a lot of commercial and warehouse work in the West End and along the I-264 corridor.",
    popularJobs: [
      "East End and Norton Commons garage epoxy",
      "Highlands and Crescent Hill basement coatings",
      "St. Matthews and Middletown decorative metallic floors",
      "Commercial and warehouse floors throughout Jefferson County",
    ],
    neighborhoods: [
      "East End / Norton Commons",
      "St. Matthews",
      "Highlands",
      "Middletown",
      "South End / Fairdale",
      "Prospect",
    ],
    landmarks: ["Churchill Downs", "Louisville Slugger Field", "Cherokee Park", "Waterfront Park"],
    heroImage: "/gallery/garage-metallic-blue.jpg",
  },
  {
    slug: "shepherdsville",
    name: "Shepherdsville",
    county: "Bullitt County",
    state: "KY",
    zip: "40165",
    distanceFromEtown: "30 minutes north of Elizabethtown",
    population: "about 13,000 residents",
    intro:
      "Shepherdsville sits right on I-65 between Elizabethtown and Louisville — making it an easy and frequent stop for our crews. Bullitt County has seen a huge wave of new construction over the past decade, and we coat dozens of garages a year throughout the area, from Bernheim Forest backroads to subdivisions off Highway 44.",
    localFlavor:
      "Bullitt County homes tend to have newer, well-poured concrete that takes coatings beautifully. Many of our Shepherdsville customers go with full-flake garage systems in earth tones to match the surrounding country aesthetic, plus polyaspartic top coats for UV stability since a lot of these garages get direct afternoon sun.",
    popularJobs: [
      "New-construction garage epoxy off Highway 44 and Highway 480",
      "Pole barn and workshop floor coatings",
      "Patio and outdoor kitchen polyaspartic",
      "Auto dealership and repair shop floors along I-65",
    ],
    neighborhoods: [
      "Downtown Shepherdsville",
      "Highway 44 corridor",
      "Hebron Estates area",
      "Mt. Washington Road",
      "Cedar Grove",
    ],
    landmarks: ["Bernheim Arboretum & Research Forest", "Paroquet Springs Conference Centre", "Pioneer Village"],
    heroImage: "/gallery/garage-flake-gray.jpg",
  },
  {
    slug: "mt-washington",
    name: "Mt Washington",
    county: "Bullitt County",
    state: "KY",
    zip: "40047",
    distanceFromEtown: "40 minutes north of Elizabethtown",
    population: "about 17,000 residents",
    intro:
      "Mt Washington is one of the fastest-growing towns in Kentucky, and a lot of the new construction we see comes with three- and four-car garages that homeowners want done right from day one. We install premium epoxy and polyaspartic systems throughout Mt Washington, from older Bardstown Road properties to the newest subdivisions off Highway 44 and Highway 31E.",
    localFlavor:
      "Most Mt Washington garages we coat are 600-1,200 sq ft with smooth, recently-poured concrete — ideal canvas for high-gloss metallic or full-flake systems. We also see a lot of demand for finished basement and bonus-room floor coatings as families convert space for home offices, gyms, and rec rooms.",
    popularJobs: [
      "Three- and four-car garages in new subdivisions",
      "Finished basement floor systems",
      "Home gym and workout-room coatings",
      "Pole barn and detached workshop floors",
    ],
    neighborhoods: [
      "Highway 44 / Bardstown Road corridor",
      "Highway 31E area",
      "Stallings Cemetery Road area",
      "Crystal Springs",
    ],
    landmarks: ["Mt Washington City Park", "Bullitt East High School", "Highway 44 commercial district"],
    heroImage: "/gallery/garage-metallic-blue.jpg",
  },
  {
    slug: "brandenburg",
    name: "Brandenburg",
    county: "Meade County",
    state: "KY",
    zip: "40108",
    distanceFromEtown: "35 minutes northwest of Elizabethtown",
    population: "about 2,800 residents",
    intro:
      "Brandenburg sits along the Ohio River in Meade County — beautiful setting, lots of rural property with substantial outbuildings, and a steady demand for tough, easy-to-clean shop and garage floors. We make the drive from Elizabethtown regularly for jobs throughout Meade County, no extra trip charge.",
    localFlavor:
      "Meade County jobs often involve larger square footage than typical suburban garages — pole barns, equipment sheds, farm shops, and detached workshops. A polyaspartic-topped epoxy system on these floors transforms them from dusty, hard-to-clean slabs into sealed, professional-grade workspaces. We've coated everything from a 400 sq ft home garage to a 4,500 sq ft farm equipment barn.",
    popularJobs: [
      "Pole barn and farm shop floor coatings",
      "Garage epoxy in subdivisions off Highway 1638",
      "Riverfront home basement floors",
      "Commercial and municipal floors in downtown Brandenburg",
    ],
    neighborhoods: [
      "Downtown Brandenburg",
      "Highway 1638 corridor",
      "Battletown area",
      "Doe Valley",
    ],
    landmarks: ["Doe Valley Resort", "Otter Creek Outdoor Recreation Area", "Brandenburg riverfront"],
    heroImage: "/gallery/garage-after-poly.jpg",
  },
  {
    slug: "leitchfield",
    name: "Leitchfield",
    county: "Grayson County",
    state: "KY",
    zip: "42754",
    distanceFromEtown: "35 minutes west of Elizabethtown",
    population: "about 7,000 residents",
    intro:
      "Leitchfield is the county seat of Grayson County and a steady stop for our crews heading west out of Elizabethtown. From garage and basement floors in town to pole barns and shop floors on properties out near Rough River and Nolin Lake, we coat residential and commercial floors across Grayson County year-round.",
    localFlavor:
      "Lake-area properties around Leitchfield often have detached garages and workshops that take serious wear — boats, jet skis, ATVs, lawn equipment, fishing gear. A properly installed epoxy or polyaspartic floor handles all of it, seals out moisture, and cleans up with a hose. We also do a lot of metallic and decorative work for finished basements and lake-house entertainment spaces.",
    popularJobs: [
      "Lake-house garage and shop coatings",
      "Pole barn and equipment shed floors",
      "Finished basement entertainment spaces",
      "Small business and restaurant floors downtown",
    ],
    neighborhoods: [
      "Downtown Leitchfield",
      "Highway 62 corridor",
      "Rough River area",
      "Nolin Lake area",
    ],
    landmarks: ["Rough River Dam State Resort Park", "Nolin Lake State Park", "Grayson County Courthouse"],
    heroImage: "/gallery/basement-polyaspartic.jpg",
  },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
