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
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
