// Real SiBCAS structure (verified against sibcas.co.uk/page-sitemap.xml). Case studies and news are rebuilt
// on this site; every other section links out to the live site.
const live = (path = "") => `https://sibcas.co.uk/${path}`;

export const contact = {
  company: "SiBCAS Ltd",
  address: ["Easton Road", "Bathgate", "West Lothian", "EH48 2SF"],
  phone: "01506 633 122",
  phoneHref: "tel:+441506633122",
  fax: "01506 634 320",
  email: "hello@sibcas.co.uk",
  map: "https://www.google.com/maps/search/?api=1&query=SiBCAS+Ltd+Easton+Road+Bathgate+EH48+2SF",
  registered: "Registered in Scotland no. SC052604",
};

export type NavLink = { name: string; href: string };
export type MenuGroup = { id: string; label: string; title: string; blurb: string; links: NavLink[] };

export const menu: MenuGroup[] = [
  {
    id: "buildings", label: "Modular Buildings", title: "Modular Buildings",
    blurb: "Our Permaspace Modular Buildings are manufactured in house to your specific requirements. SiBCAS provides high-end modular accommodation.",
    links: [
      { name: "Modular Buildings", href: live("modular-buildings/") },
      { name: "Flexible Accommodation", href: live("flexible-accommodation/") },
      { name: "Classrooms", href: live("modular-buildings/classrooms/") },
      { name: "Office", href: live("modular-buildings/office/") },
      { name: "Health", href: live("modular-buildings/health/") },
      { name: "Buildings for Sale", href: live("units-for-sale/") },
    ],
  },
  {
    id: "sectors", label: "Sectors", title: "Sectors",
    blurb: "Our Modular Buildings are manufactured in house to your specific requirements, providing a tailored bespoke service. We design exceptional Modular Buildings to suit any function.",
    links: [
      { name: "All Sectors", href: live("sectors/") },
      { name: "Commercial", href: live("modular-buildings/commercial/") },
      { name: "Construction", href: live("modular-buildings/construction/") },
      { name: "Rail and Civils", href: live("modular-buildings/rail-and-civils/") },
      { name: "Sports Facilities", href: live("modular-buildings/sports-facilities/") },
      { name: "Procurement & Frameworks", href: live("procurement-frameworks/") },
    ],
  },
  {
    id: "site", label: "Site Accommodation", title: "Site Accommodation",
    blurb: "At SiBCAS, we’re renowned for our reliable, quality site accommodation. We have a wide range of relocatable accommodation units and site cabins for hire.",
    links: [
      { name: "Site Accommodation", href: live("site-accommodation/") },
      { name: "Portable Cabins", href: live("portable-cabins/") },
      { name: "Used Site Cabins", href: live("used-site-cabins/") },
      { name: "Used Modular Buildings for Sale", href: live("used-modular-buildings-for-sale/") },
    ],
  },
  {
    id: "work", label: "Case Studies", title: "Case Studies & News",
    blurb: "Every project, story and milestone from over fifty years of manufacturing Modular Buildings and Portable Site Cabins.",
    links: [
      { name: "Case Studies", href: "/case-studies" },
      { name: "Latest News", href: "/news" },
    ],
  },
  {
    id: "company", label: "About", title: "About SiBCAS",
    blurb: "Established in 1973, Sibcas is a family-owned and managed business.",
    links: [
      { name: "About", href: live("about/") },
      { name: "Careers", href: live("careers/") },
      { name: "Contact", href: live("contact/") },
      { name: "Policies", href: live("policies/") },
    ],
  },
];

export const footerLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Modular Buildings", href: live("modular-buildings/") },
  { name: "Site Accommodation", href: live("site-accommodation/") },
  { name: "Buildings for Sale", href: live("units-for-sale/") },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Latest News", href: "/news" },
  { name: "Careers", href: live("careers/") },
  { name: "About", href: live("about/") },
  { name: "Contact", href: live("contact/") },
  { name: "Sitemap", href: live("sitemap/") },
];

export const legal: NavLink[] = [
  { name: "Our Policies and Procedures", href: live("policies/") },
  { name: "Privacy Notice", href: live("privacy-policy/") },
];

export const socials = [
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/sibcasltd/" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/sibcas_ltd/" },
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/profile.php?id=100094465570262" },
  { name: "X", icon: "x", href: "https://twitter.com/sibcas" },
] as const;

export const contactHref = live("contact/");

export const sectors = [
  { name: "Education", href: live("modular-buildings/classrooms/"), img: "/media/2024-09-class-room-interior-blue.jpg",
    text: "Schools and colleges face increasing demands on space, whether due to increasing pupil numbers or renovation work on existing buildings." },
  { name: "Commercial", href: live("modular-buildings/commercial/"), img: "/media/2025-03-maxilead-exterior-unit.jpg",
    text: "Businesses perform more efficiently in comfortable and secure surroundings." },
  { name: "Sport", href: live("modular-buildings/sports-facilities/"), img: "/media/2025-03-celtic-modular-unit-interior-1.jpg",
    text: "Clubhouse and changing facilities, cutting-edge gymnasia and sports therapy rooms." },
  { name: "Construction", href: live("modular-buildings/construction/"), img: "/media/2024-09-interior-unit-high-vis-jackets.jpg",
    text: "Safe, secure and efficient site accommodation for workers and management alike." },
  { name: "Rail and Civils", href: live("modular-buildings/rail-and-civils/"), img: "/media/2024-09-station-units-platform.jpg",
    text: "Robust and secure accommodation solutions for project offices, welfare facilities, and storage." },
  { name: "Health", href: live("modular-buildings/health/"), img: "/media/2023-11-york-hospital-sibcas.jpg",
    text: "SiBCAS consults closely with Trusts and staff to design modular health facilities." },
];

// The SiBCAS service, from sibcas.co.uk/about/, laid out as Dubois' feature tiles.
export const service = [
  { title: "Quality Assured", icon: "badge",
    text: "Sibcas is committed to high standards in all areas of our work and we are extremely proud to be accredited to ISO9001, ISO45001 and ISO14001, Achilles Building Confidence, SafeContractor, CHAS, Constructionline Gold, FORS Gold, Achilles UVDB, Sedex, RISQS, JOSCAR and various other bodies." },
  { title: "Process and Standards", icon: "crane",
    text: "We are extremely proud of the fact that all of our units are manufactured in-house using our qualified staff and are delivered from our own fleet of commercial vehicles and lorry mounted cranes, which allows us to provide a prompt and reliable service." },
  { title: "Turnkey Package", icon: "plan",
    text: "A full in-house design team offers the full ‘turnkey package’ which includes CAD Technicians, Project Managers, Structural Engineers, Quantity Surveyors and Estimators." },
  { title: "SHEQ Environment", icon: "leaf",
    text: "SiBCAS works conscientiously to the exacting and stringent health and safety standards of the modular building industry and construction sector. As part of this commitment, our workforce is directly employed, and we invest heavily in employee development to an excellent standard." },
];

export const accreditations = [
  { name: "SafeContractor", src: "/brand/safe-contractor-logo.jpg" },
  { name: "NQA ISO 9001", src: "/brand/NQA-ISO-9001-Logo-UKAS.jpg" },
  { name: "NQA ISO 45001", src: "/brand/NQA-ISO-45001-Logo-UKAS.jpg" },
  { name: "NQA ISO 14001", src: "/brand/NQA-ISO-14001-Logo-UKAS.jpg" },
  { name: "NICEIC", src: "/brand/nice-ic-logo.jpg" },
  { name: "Cyber Essentials Plus", src: "/brand/Cyber-Essentials-Plus-Logo-web.jpg" },
  { name: "CLOCS", src: "/brand/clocs-logo.jpg" },
  { name: "CHAS", src: "/brand/chas-logo.jpg" },
  { name: "ALLMI", src: "/brand/allmi-logo.jpg" },
  { name: "Constructionline Gold Member", src: "/brand/constructionline-gold-member-logo.jpg" },
  { name: "MPBA", src: "/brand/mpba-logo.jpg" },
  { name: "Achilles Building Confidence", src: "/brand/achilles-building-confidence-audited-logo.jpg" },
  { name: "Achilles UVDB Silver Plus", src: "/brand/achilles-uvdb-silver-plus-logo.jpg" },
  { name: "Lantra Awards", src: "/brand/lantra-awards-logo-sibcas.png" },
  { name: "NHS SBS Framework Supplier", src: "/brand/NHS-SBS-FWA-Supplier-RGB-gold.svg" },
];

// Testimonials exactly as published on the sibcas.co.uk homepage. `slug` ties each to its testimonial post.
export const testimonials = [
  { slug: "silsden-health-centre", name: "Silsden Health Centre", role: "",
    quote: ["Throughout the installation the team from SIBCAS were always on hand and responded quickly and efficiently to all request for information, and alterations. We were kept fully informed throughout and the building was even ready ahead of schedule. The on site team understood that we needed to minimise disruption to our patients and they worked with us making suggestions and alternations to their scheme of work to make sure that this was the case."] },
  { slug: "york-hospital", name: "York Hospital", role: "",
    quote: [
      "I would like to thank the SiBCAS team for the way they carried out the delivery and installation of the units at York Hospital. It was an extremely difficult operation right in front of the Emergency Department and all deliveries were achieved with no disruption to the hospital or the ED itself.",
      "It just goes to show that all the pre-planning and traffic management systems agreed prior to the works and included within the RAMS were well worth all the time and effort, deliveries on site were timed to the minute.",
      "The Trusts Capital Planning Department, the Emergency Department and Car Parking and Security have all commented on how seamless the works were carried out.",
    ] },
  { slug: "rolls-crescent-school-music-room-manchester", name: "Kay Roche", role: "Rolls Crescent School - Music Room Manchester",
    quote: ["The Sibcas team were proactive in providing us with high quality, fit for purpose accommodation, which was delivered on time. I would recommend them without hesitation"] },
  { slug: "kier-construction", name: "Chris Bennett, Senior Projects Manager", role: "Kier Construction (Northern)",
    quote: ["Significant project milestones were achieved through the key partnership approach from SIBCAS. Their ability to react and overcome barriers to success ensured that we were able to meet the key project deadlines and to stay within budget constraints."] },
  { slug: "east-manchester-academy", name: "Guy Hutchence", role: "East Manchester Academy",
    quote: ["The PE Department are delighted with their new environment, being particularly impressed by the space at their disposal and the quality of finish, which exceeded their expectations."] },
  { slug: "drapers-academy-london", name: "Sanmi Osunlola – Project Manager, E.C Harris", role: "Drapers Academy London",
    quote: ["Very proactive contractor delivered project on time and on budget despite programme issues as a result of the review of government policy on academies in summer of 2010. Pleasure to work with and would use again."] },
];

export const cities = ["Aberdeen", "Belfast", "Birmingham", "Bradford", "Bristol", "Cardiff", "Coventry", "Derby", "Dundee", "Edinburgh", "Glasgow", "Inverness", "Leeds", "Leicester", "Liverpool", "London", "Manchester", "Newcastle upon Tyne", "Nottingham", "Perth", "Reading", "Sheffield", "Southampton", "Stirling", "Stoke-on-Trent"];

// Each city links to the live temporary-office page that exists for it (Dundee has its own modular page).
export const cityHref = (city: string) => city === "Dundee"
  ? live("modular-buildings-dundee/")
  : live(`modular-buildings/temporary-office-${city.toLowerCase().replace(/ /g, "-")}/`);
