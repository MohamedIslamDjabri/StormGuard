export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  category: 'hail' | 'wind' | 'tree' | 'leak' | 'emergency';
  categoryLabel: string;
  tag: string;
  tagColor?: string;
  summary: string;
  fullDetails?: string;
  responseTime: string;
  insuranceMetric?: string;
  imageUrl: string;
  afterImageUrl?: string;
  imageAlt: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  roleOrLocation: string;
  rating: number;
  quote: string;
  verified: boolean;
}

export interface ServiceArea {
  id: string;
  name: string;
  county: string;
  zipCodes: string[];
  averageResponseMinutes: number;
  activeCrews: number;
  highlight: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'storm-damage' | 'emergency-repairs' | 'inspections' | 'insurance' | 'leaks';
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  metric: string;
  icon: string;
}

export interface TriageOption {
  id: string;
  label: string;
  iconName: string;
  category: 'critical' | 'urgent' | 'standard';
  badgeTitle: string;
  description: string;
  eta: string;
  actionCta: string;
}

export const SITE_CONFIG = {
  name: "StormGuard Roofing",
  legalName: "StormGuard Roofing Logistics LLC",
  tagline: "Tactical Roof Logistics",
  headline: "Storm Damage? We Respond Fast.",
  subheadline: "Fast emergency roofing response, rapid tarping, precision assessments, and end-to-end insurance claim support after severe wind, hail, and catastrophic storm breach across Central Texas.",
  phone: "(555) 718-STORM",
  phoneRaw: "5557187867",
  email: "help@stormguardroofing.com",
  address: "8140 MoPac Expy, Suite 250, Austin, TX 78759",
  hours: "24/7/365 Emergency Command & Mobile Units",
  license: "Licensed & Insured #TX-90281",
  primaryCta: "Request Emergency Inspection",
  secondaryCta: "Call (555) 718-STORM",
  brandMessage: "When the Storm Hits, We've Got You Covered.",
  positioning: "Storm damage response, emergency roof repair, roof inspections, and insurance claim guidance.",
  logoUrl: "https://lh3.googleusercontent.com/aida/AEtjO1Vl2JmhJ97RAhpEHH7o3LEDiwhcpuo1uFLqnQ-YUPbG-cSYoSMDeut8TbCb-x0mdWIg4GB9ZVAUJtWKz2PX1sCSj1dvtU6cjh4lGfxWg-YUXzoF_XYs5hwQUfdq-sCk20Bcwh6hER7Bh_YXwmD9_ZI5CX-_IzMh9WYowYS7FW4GIqAt505uzUntnz46tpjwQItslC454j1f8vSMhTbGfjuRdJqOvKzo7UGReT5vNAggw7_39MYkfRgqkIc",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBABtB5K2sfyJ_w3TM9wJc-ikY8giFhvhGafRkgwuvHkEOxDxIj69wc73Bn3Ll9qnpBtiixWUecqOGrvNWtFQqTdX0ZDwZHXI6ZsPXiPXp7Os3F1BFflVUvWjAqvp0QHyaWsSlYYZSOS630L0YPjKaoICSRiMf1CUucOkl4c2WqdbMlpi_ymGU8eiTOcOSZRigx6IWB1PjOjQRS0hzHwxOJxC8LIYgs5JXUIX2v5m5Pz1NiY-W1DwnR",
  heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXa7KVS60_KiG_inLMgbSxhdw1M-rBhzEdgBkFqQQXF8IvAXZv1UbXCy3FV13qqm_aTta1RXKBbuOcGEJ3mfvhkQdAMT1xyBwvd-lZTbIOb8Mz8g7KtMtdrwGXHXQ0Clu160eCKgmrIzjeaKnUNjRM4tp4de6f2E2IxAPMbxT4NpPuo4-Ydwozt_H5-2wjOozvBqDajRUnZhZCmQyiwOEy8nW0IjDNAHeqU1unQUATF6xO1GxMoJ2N",
  coverageRadius: "60 Miles from Austin Core",
  averageDispatchMinutes: 38,
};

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Storm Damage", href: "/storm-damage" },
  { label: "Emergency Repair", href: "/emergency-roof-repair" },
  { label: "Roof Inspection", href: "/roof-inspection" },
  { label: "Insurance Claims", href: "/insurance-claims" },
  { label: "Projects", href: "/projects" },
  { label: "FAQ", href: "/faq" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact", href: "/contact" },
];

export const TRUST_BADGES = [
  { label: "Licensed & Insured", icon: "ShieldCheck", desc: "TX-90281 Master Contractor" },
  { label: "Local Storm Units", icon: "MapPin", desc: "Central Texas Rapid Vans" },
  { label: "Free Inspection", icon: "ClipboardCheck", desc: "4K Drone & Thermal Scan" },
  { label: "Insurance Navigators", icon: "FileText", desc: "Direct Carrier Coordination" },
];

export const STATS = [
  { value: "24/7", label: "Rapid Dispatch", sublabel: "Units rolling across Austin metro" },
  { value: "15+", label: "Years Field Command", sublabel: "Texas storm restoration specialists" },
  { value: "1,000+", label: "Roofs Restored", sublabel: "Over $18M in claims approved" },
  { value: "4.9/5", label: "520+ Homeowner Reviews", sublabel: "BBB A+ Accredited Contractor" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Tell Us What Happened",
    description: "Select storm event, approximate hail diameter, missing shingle counts, and water leaks.",
    metric: "Takes ~45 Seconds",
    icon: "AlertCircle",
  },
  {
    number: "02",
    title: "Safety Assessment",
    description: "Rapid structural triage reviewing interior ceiling sagging, power line proximity, and attic saturation.",
    metric: "Structural Triage",
    icon: "ShieldAlert",
  },
  {
    number: "03",
    title: "Urgency Categorization",
    description: "Instant algorithmic assignment: Critical (2-Hr Tarping), Urgent (Same-day Scan), or Standard (72-hr Rebuild).",
    metric: "Automated Dispatch Queue",
    icon: "Zap",
  },
  {
    number: "04",
    title: "Crew & Claim Prep",
    description: "Crew mobilizes while our estimators assemble drone photogrammetry and itemized line items for your insurance carrier.",
    metric: "Full Claim Recovery",
    icon: "FileCheck",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "storm-restoration",
    slug: "storm-damage",
    title: "Storm Damage Restoration",
    shortDesc: "High-velocity wind and hail reconstruction. Full decking replacement, synthetic underlayment, and Class 4 impact shingles engineered for severe Texas storm cycles.",
    fullDesc: "Severe Texas storms generate microbursts, straight-line winds, and convective hail storms that shatter granular defenses. Our storm damage restoration program replaces damaged substrates with architectural impact-rated shingle assemblies designed to withstand up to 130 mph winds and Class 4 hail.",
    icon: "CloudLightning",
    features: [
      "Class 4 Impact Resistant Shingles",
      "Decking & Structural Rafter Rebuild",
      "50-Year Non-Prorated Warranty",
    ],
    ctaLabel: "Book Storm Restoration",
    ctaHref: "/storm-damage",
  },
  {
    id: "emergency-tarping",
    slug: "emergency-roof-repair",
    title: "Emergency Roof Tarping & Repair",
    shortDesc: "2-hour guaranteed rapid-response tarping to stop active moisture intrusion, protect interior finishes, and prevent ongoing insurance claim exclusions.",
    fullDesc: "When rainwater penetrates your roof decking, structural wood rot and drywall collapse can occur within hours. Our 24/7 mobile units arrive equipped with heavy-duty reinforced woven polyethylene tarps anchored via zero-puncture compression battens to preserve the integrity of your remaining roof.",
    icon: "AlertTriangle",
    badge: "2-Hour Response",
    features: [
      "Heavy-Duty Reinforced Sandbagged Tarps",
      "Zero-Puncture Fastening Methods",
      "Insurer-Approved Emergency Invoicing",
    ],
    ctaLabel: "Dispatch 2-Hour Crew",
    ctaHref: "/emergency-roof-repair",
  },
  {
    id: "drone-inspection",
    slug: "roof-inspection",
    title: "Comprehensive Drone Inspection",
    shortDesc: "High-resolution 4K aerial photogrammetry coupled with FLIR infrared thermal moisture detection to uncover hidden leaks and hail fractures.",
    fullDesc: "Climbing hail-damaged or steep pitch roofs can damage fragile shingles further. We deploy autonomous 4K drone sweeps coupled with FLIR high-contrast thermal imaging to pinpoint moisture underneath underlayment and map every single hail strike to the millimeter.",
    icon: "Crosshair",
    features: [
      "3D Digital Twin Roof Model",
      "Thermal Infrared Sub-Deck Scans",
      "Adjuster-Ready PDF Forensic Report",
    ],
    ctaLabel: "Schedule Drone Inspection",
    ctaHref: "/roof-inspection",
  },
  {
    id: "hail-mitigation",
    slug: "hail-damage",
    title: "Hail Impact Mitigation",
    shortDesc: "Micro-fractures from golf ball and baseball-sized hail degrade UV protective granules. We identify subtle bruises insurance adjusters routinely miss.",
    fullDesc: "Even small hail creates subtle micro-fissures in fiberglass shingle matting that let ultraviolet light degrade the waterproofing bitumen layer. Our hail damage specialists inspect soft metals (gutters, flashing, vents) and test shingle elasticity to build comprehensive claim documentation.",
    icon: "Disc",
    features: [
      "Granule Loss & Asphalt Bruise Mapping",
      "Gutter & Vent Soft-Metal Strike Tests",
      "Full Replacement Claims Advocacy",
    ],
    ctaLabel: "Assess Hail Damage",
    ctaHref: "/storm-damage#hail",
  },
  {
    id: "wind-restoration",
    slug: "wind-damage",
    title: "High-Wind Shingle Restoration",
    shortDesc: "Gale force winds break shingle adhesive seals and rip entire sections away. We provide seamless color and texture matching plus hurricane nail re-fastening.",
    fullDesc: "Texas derecho events and gust fronts peel back shingles along windward eaves and ridge lines. We restore torn planes, re-adhere broken thermal sealant tabs, and install ring-shanked coil nails into rafter centers to ensure future high-wind survivability.",
    icon: "Wind",
    features: [
      "130 MPH Wind-Rated Shingle Systems",
      "Ridge Cap & Fascia Metal Repair",
      "Seal-Tab Thermal Adhesion Bonding",
    ],
    ctaLabel: "Repair Wind Damage",
    ctaHref: "/storm-damage#wind",
  },
  {
    id: "leak-sealing",
    slug: "leak-repair",
    title: "Active Leak & Penetration Sealing",
    shortDesc: "Immediate interior containment and roof boot, chimney, and valley flash re-soldering to stop mold progression and protect your family and electronics.",
    fullDesc: "Penetrations like pipe jacks, chimneys, HVAC curbs, and skylights are primary failure points during high precipitation squalls. Our field teams reseal compromised counter-flashing, replace cracked neoprene boots with lead or copper sleeves, and dry interior wet pockets.",
    icon: "Droplets",
    features: [
      "Attic Water Extraction Coordination",
      "Step Flashing & Chimney Cricket Fix",
      "Anti-Microbial Barrier Application",
    ],
    ctaLabel: "Stop Active Leaks",
    ctaHref: "/emergency-roof-repair#leak",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-round-rock",
    title: "Severe Hail Pitted Shingles → Class 4 Impact Roof",
    location: "ROUND ROCK, TX",
    category: "hail",
    categoryLabel: "Hail Impact",
    tag: "HAIL EVENT: 2.25\"",
    tagColor: "error",
    summary: "Deep granule bruises compromised 80% of roof plane. We provided emergency tarps during rain, navigated full insurer total-loss approval ($28,400 payout), and installed 130mph impact-rated Owens Corning Duration Storm shingles.",
    fullDetails: "Following a supercell hail storm tracking across Williamson County, baseball-sized hail punctured asphalt shingles down to fiberglass matting. Our drone sweep created an adjuster-ready heat map, securing a 100% total replacement approval within 7 days.",
    responseTime: "42 Minutes",
    insuranceMetric: "$28,400 Payout Approved",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB891uegjcaNZBLgFF071C0_OfvghFeWM22RhYxUEUM60qmoDJxw5R1sW3Ktk8zoavvejFLROXgUYhSUDulcjaoaMUSQRMBMiI36-tUWxIn8eRJ3l-Z6b-Rimb-Q3Jy4UN12fheLbfgCPHZpnv_ie_jvMnocirJl-P45gCAOAW6vBOz9qsZxtEKEzDkLp3NdXAHzqNYLTftJiGpYEznKPfgqAa1yZVVScg9sgI86wBaXTbBvUogF1Qp",
    imageAlt: "Close-up comparison of hail-dented dark asphalt roof shingle bruised by hail versus architectural replacement",
  },
  {
    id: "proj-south-austin",
    title: "Tree Limb Puncture → Full Rafter Rebuild",
    location: "SOUTH AUSTIN, TX",
    category: "tree",
    categoryLabel: "Structural Breach",
    tag: "PUNCTURE & BREACH",
    tagColor: "error",
    summary: "A 900-lb Live Oak branch pierced through bedroom ceiling during 60mph wind shear. StormGuard deployed crane removal, secured a waterproof heavy tarp within 90 minutes, and completely rebuilt 4 snapped rafters.",
    fullDetails: "Straight-line microburst winds snapped a mature oak branch directly onto a 2-story home in South Austin. Our emergency dispatch team mobilized with structural engineering braces, crane removal specialists, and 40-mil reinforced vinyl tarps before rainfall penetrated drywall.",
    responseTime: "Under 2 Hours",
    insuranceMetric: "$41,500 Full Restoration",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB42uVH1WBYmkpCZ3kmU-9RTI3kNtVJZsnQha99Am7YOV2Bq7VFuBzlcqDIGGVzl5rJLS1A2tfin5X05o7CQ6U8u1ePPA_reuOp4LxmMDhvJY59DuQYlESrALUDWA_AWeWolAhIkxNhcg_JyTAj7r50oz-2bR6JkhzMFhRd8k7JtqeKqJjUf2LrVeCRuQagTQuQID3PKrbeVkyU5cY_iVXLUlHLVgwnwsRoPC2QWeIiZIz8svJVpAf5",
    imageAlt: "Residential roof crushed by large oak tree branch with heavy blue storm tarping installed and rebuilt rafters",
  },
  {
    id: "proj-cedar-park",
    title: "Wind Tear-Off → 100% Insurance Replacement",
    location: "CEDAR PARK, TX",
    category: "wind",
    categoryLabel: "Wind Shear",
    tag: "65 MPH WIND SHEAR",
    tagColor: "error",
    summary: "Straight-line derecho winds lifted ridge lines and stripped 35 feet of windward exposure. StormGuard mobilized thermal imaging to substantiate insulation water damage, unlocking complete roof and attic recovery.",
    fullDetails: "When 65+ mph wind gusts ripped entire courses of shingles off the roof deck, water poured into the master suite. Our adjusters met with the carrier field rep on-site, demonstrating unsealed starter strips across the entire perimeter and securing full system replacement.",
    responseTime: "35 Minutes",
    insuranceMetric: "$34,120 Recovery",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO37SfnqxOEHgSIoV38Wwf2HlMJaCZu4pD6ES4zQSl1dSWky8y49xpnFiaI4J-VQweE1GhQ01fJ03BYxL-72RZYoP0bLHQTE3LQgae2yc-REStZBeBMeJriGNYGXnU5gicIzhlh7lFPW-AUbN9E3icxpaYHO1ESXpL5_JEVNQBTlGtdvZZ-cTVybtPtCKTTNEtBN1wyBeiHGZjj3lRtq1xOYJmGwnZdCcm29vwygOdFzEXHERdUC-Y",
    imageAlt: "Large suburban home roof with missing shingles peeled back by high velocity wind storm showing black underlayment",
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Marcus Vance",
    roleOrLocation: "Steiner Ranch • Austin, TX",
    rating: 5,
    quote: "Hail cracked through our skylight at 9:30 PM. I used their AI triage tool and had two technicians on my roof securing emergency tarps by 10:20 PM. They saved our hardwood floors.",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Elena Rodriguez",
    roleOrLocation: "Teravista • Round Rock, TX",
    rating: 5,
    quote: "Our insurance carrier initially offered only $1,800 for patch repairs. StormGuard's drone forensic scan documented unseen shingle fractures and got the adjuster to approve an entire $31,000 replacement.",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Col. David Sterling (Ret.)",
    roleOrLocation: "Georgetown, TX",
    rating: 5,
    quote: "Tactical precision describes them best. No sketchy door knocking, just professional diagnostic tablets, transparent drone photos, and clean military-grade execution. Outstanding team.",
    verified: true,
  },
  {
    id: "rev-4",
    name: "Sarah Jenkins",
    roleOrLocation: "Cedar Park, TX",
    rating: 5,
    quote: "During the April hail squall, tree branches tore our chimney cricket apart. StormGuard was on site in 45 minutes, stopped the water flow, and dealt directly with State Farm. Zero stress.",
    verified: true,
  },
];

export const SERVICE_AREAS: ServiceArea[] = [
  {
    id: "austin",
    name: "Austin (Central, South & North)",
    county: "Travis County",
    zipCodes: ["78701", "78702", "78703", "78704", "78745", "78749", "78759", "78758"],
    averageResponseMinutes: 32,
    activeCrews: 6,
    highlight: "Primary Rapid Response Hub & Drone Command Center",
  },
  {
    id: "round-rock",
    name: "Round Rock",
    county: "Williamson County",
    zipCodes: ["78664", "78665", "78681"],
    averageResponseMinutes: 38,
    activeCrews: 4,
    highlight: "High Hail Convection Corridor Specialist Squad",
  },
  {
    id: "cedar-park",
    name: "Cedar Park",
    county: "Williamson County",
    zipCodes: ["78613", "78630"],
    averageResponseMinutes: 40,
    activeCrews: 3,
    highlight: "Severe Wind Shear & Hill Country Rapid Tarp Squad",
  },
  {
    id: "georgetown",
    name: "Georgetown",
    county: "Williamson County",
    zipCodes: ["78626", "78628", "78633"],
    averageResponseMinutes: 45,
    activeCrews: 3,
    highlight: "Sun City & North Williamson Storm Readiness Team",
  },
  {
    id: "pflugerville",
    name: "Pflugerville",
    county: "Travis County",
    zipCodes: ["78660", "78691"],
    averageResponseMinutes: 35,
    activeCrews: 3,
    highlight: "Fast Eastern Travis Expressway Response Unit",
  },
  {
    id: "leander",
    name: "Leander & Liberty Hill",
    county: "Williamson County",
    zipCodes: ["78641", "78642"],
    averageResponseMinutes: 48,
    activeCrews: 2,
    highlight: "Rapid Heavy Tarping & Tree Puncture Unit",
  },
  {
    id: "kyle-buda",
    name: "Kyle & Buda",
    county: "Hays County",
    zipCodes: ["78640", "78610"],
    averageResponseMinutes: 42,
    activeCrews: 3,
    highlight: "I-35 South Corridor Dedicated Mobile Command",
  },
  {
    id: "lakeway",
    name: "Lakeway & Lake Travis",
    county: "Travis County",
    zipCodes: ["78734", "78738", "78732"],
    averageResponseMinutes: 44,
    activeCrews: 2,
    highlight: "Tile & Metal Roof Luxury Estate Storm Restoration",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How fast can your crew get a tarp on my roof?",
    answer: "For active leaks and severe puncture emergencies, our mobile response vans maintain an average Central Texas arrival time of 38-50 minutes. We secure commercial-grade UV-resistant sandbagged tarps that meet strict insurance guidelines to mitigate further damage without driving destructive nails into undamaged tiles or shingles.",
    category: "emergency-repairs",
  },
  {
    id: "faq-2",
    question: "Does my homeowner insurance cover emergency roof tarping?",
    answer: "Yes. Almost all standard homeowner policies have a mandatory 'Mitigation of Damages' clause requiring you to prevent ongoing water entry. Emergency tarping costs are billed directly to your insurance under reasonable temporary repairs and are covered in addition to total roof replacement limits.",
    category: "insurance",
  },
  {
    id: "faq-3",
    question: "Will you meet my insurance adjuster on-site?",
    answer: "Absolutely. Having a licensed roofing commander walk the roof alongside the adjuster ensures all subtle hail fractures, collateral gutter damage, and decking punctures are documented on the official Xactimate scope, preventing underpaid claims or partial patching denials.",
    category: "insurance",
  },
  {
    id: "faq-4",
    question: "Why is a drone inspection better than an adjuster ladder check?",
    answer: "Drones capture thousands of sub-millimeter data points across steep or fragile pitches where human inspectors cannot safely walk. Coupled with FLIR thermal sensors, we can detect water pooled underneath intact shingles days before it manifests as interior ceiling stains.",
    category: "inspections",
  },
  {
    id: "faq-5",
    question: "How do I know if my roof has hail damage if I don't see leaks?",
    answer: "Hail creates hidden impact bruises that crush the fiberglass matting beneath the shingle surface. Over 2 to 6 months of intense Texas sunlight, the displaced granules wash off into gutters, the asphalt boils away, and massive leaks erupt long after the storm passed.",
    category: "storm-damage",
  },
  {
    id: "faq-6",
    question: "What should I do immediately if water is dripping through my ceiling?",
    answer: "1) Place a bucket or plastic bin beneath the drip. 2) If the drywall ceiling is bulging with pooled water, carefully poke a small hole in the center with a screwdriver to release water into the container and prevent a catastrophic ceiling collapse. 3) Call StormGuard Roofing at (555) 718-STORM for immediate tarp deployment.",
    category: "leaks",
  },
  {
    id: "faq-7",
    question: "Can I replace my roof with Class 4 impact shingles through insurance?",
    answer: "Yes! When an insurance carrier approves a full roof replacement, you only pay your standard deductible. Most homeowners choose to upgrade to Class 4 impact-resistant shingles, which not only resist future hail up to 2 inches but also qualify for up to 25%-35% annual homeowner insurance premium discounts across Texas.",
    category: "insurance",
  },
  {
    id: "faq-8",
    question: "How long do I have to file a storm damage claim in Texas?",
    answer: "Most Texas insurance policies allow between 12 to 24 months from the date of the storm event to file a claim. However, delaying allows weather weathering to make hail impact marks look like normal wear and tear, which adjusters can deny. We recommend scheduling an inspection within 30 days of any severe convective storm.",
    category: "storm-damage",
  },
];

export const TRIAGE_OPTIONS: Record<string, TriageOption> = {
  hail: {
    id: 'hail',
    label: '🌪️ Hail Impact (1.5"+)',
    iconName: 'Disc',
    category: 'urgent',
    badgeTitle: 'URGENT: HIGH HAIL CONVECTION FRACTURE',
    description: 'Hail impacts above 1.5" crack fiberglass matting beneath asphalt shingles. Even without immediate dripping, water pools and rots decking over 3-6 weeks. Free drone scan recommended.',
    eta: 'Available Inspection Slot: Today at 2:00 PM',
    actionCta: 'Book Drone Scan Slot',
  },
  wind: {
    id: 'wind',
    label: '💨 Wind / Shingles Blown Off',
    iconName: 'Wind',
    category: 'urgent',
    badgeTitle: 'HIGH RISK: EXPOSED DECKING VULNERABILITY',
    description: 'Missing shingles expose the organic underlayment to sun degradation and subsequent rain deluge. Immediate sealing or shingle replacement required before next weather system.',
    eta: 'Crew Dispatch Window: 1-2 Hours',
    actionCta: 'Request Shingle Matching Crew',
  },
  leak: {
    id: 'leak',
    label: '💧 Active Roof Leak',
    iconName: 'Droplet',
    category: 'critical',
    badgeTitle: 'CRITICAL: ACTIVE WATER PENETRATION RISK',
    description: 'Active leak indications risk structural wood rot and drywall collapse within 12-24 hours. Immediate emergency tarp stabilization and thermal imaging moisture scan advised.',
    eta: 'Est. Mobile Crew Tarp ETA: 35-50 Min',
    actionCta: 'Lock In Rapid Tarping Dispatch',
  },
  tree: {
    id: 'tree',
    label: '🌲 Fallen Tree / Debris',
    iconName: 'AlertOctagon',
    category: 'critical',
    badgeTitle: 'CRITICAL: STRUCTURAL RAFTER BREACH',
    description: 'Heavy limb puncture threatens ceiling collapse and severed electrical lines. Immediate crane stabilization, safety isolation, and heavy-duty 40-mil tarp enclosure required.',
    eta: 'Heavy Crane & Tarp Crew: 45 Min Dispatch',
    actionCta: 'Dispatch Emergency Structural Unit',
  },
  stain: {
    id: 'stain',
    label: '⚠️ Ceiling Water Stain',
    iconName: 'AlertTriangle',
    category: 'urgent',
    badgeTitle: 'URGENT: HIDDEN ATTIC MOISTURE ACCUMULATION',
    description: 'Ceiling discoloration indicates water has already penetrated roof underlayment and saturated attic insulation. High risk of hazardous mold colonization if not remediated.',
    eta: 'FLIR Thermal Moisture Crew: Today',
    actionCta: 'Schedule Thermal Moisture Scan',
  },
  inspect: {
    id: 'inspect',
    label: '❓ Not Sure / Free Drone Scan',
    iconName: 'HelpCircle',
    category: 'standard',
    badgeTitle: 'STANDARD: PREVENTATIVE DRONE TELEMETRY SCAN',
    description: 'Storm passed through your neighborhood but damage is not visible from the ground. Our autonomous drone scan builds a 3D digital twin to verify shingle integrity.',
    eta: 'Next Available Drone Flight: Tomorrow 9:00 AM',
    actionCta: 'Reserve Free Drone Scan',
  },
};
