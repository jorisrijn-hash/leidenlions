/**
 * Single source of truth for club data used across the site.
 *
 * NOTE ON CONTENT: team blurbs and division tags below are placeholder copy,
 * written to be safe and generic. Verify divisions/levels with the club and
 * replace blurbs with real text before launch. Names, the rink address and the
 * category structure match the current leiden-lions.nl site.
 */

export const site = {
  name: "Leiden Lions",
  fullName: "IJshockeyclub Leiden Lions",
  domain: "leiden-lions.nl",
  url: "https://www.leiden-lions.nl",
  tagline: "De snelste teamsport ter wereld",
  rink: {
    // Name confirmed from the club's own hero. TODO: verify street/postal for
    // IJshal De Vliet; the values below may still be the old Vondellaan hall.
    name: "IJshal De Vliet",
    street: "Vondellaan 41",
    postal: "2332 AA Leiden",
  },
  season: "Elke zaterdag, oktober tot en met maart",
  email: "info@leiden-lions.nl",
} as const;

export type TeamCategory = "jeugd" | "senioren";

export type Team = {
  slug: string;
  name: string;
  category: TeamCategory;
  /** Short badge label, e.g. "U7". */
  short?: string;
  /** Human age range, factually derived from the U-category. */
  age?: string;
  /** Level tag. Placeholder where unverified. */
  level: string;
  blurb: string;
};

export const jeugdTeams: Team[] = [
  {
    slug: "u7",
    name: "U7",
    category: "jeugd",
    short: "U7",
    age: "t/m 6 jaar",
    level: "Instroom",
    blurb:
      "De eerste stappen op het ijs. Schaatsen leren, vallen en opstaan, en vooral heel veel plezier maken.",
  },
  {
    slug: "u9",
    name: "U9",
    category: "jeugd",
    short: "U9",
    age: "7 t/m 8 jaar",
    level: "Fun & competitief",
    blurb:
      "Veel spelers zijn nieuw in de sport. Het draait om spelplezier en de basis van het ijshockey onder de knie krijgen.",
  },
  {
    slug: "u11",
    name: "U11",
    category: "jeugd",
    short: "U11",
    age: "9 t/m 10 jaar",
    level: "Competitief",
    blurb:
      "Techniek, tempo en teamspel komen samen. De U11 speelt een volle competitie tegen clubs uit de regio.",
  },
  {
    slug: "u15",
    name: "U15",
    category: "jeugd",
    short: "U15",
    age: "11 t/m 14 jaar",
    level: "Competitief",
    blurb:
      "Snel, fysiek en tactisch. De U15 speelt in een landelijke poule met wedstrijden door heel Nederland.",
  },
  {
    slug: "jr-u17",
    name: "JR U17",
    category: "jeugd",
    short: "U17",
    age: "15 t/m 16 jaar",
    level: "Junioren",
    blurb:
      "De laatste stap voor de senioren. Junioren spelen op hoog tempo en bereiden zich voor op het grote werk.",
  },
];

export const seniorenTeams: Team[] = [
  {
    slug: "leiden-islanders",
    name: "Leiden Islanders",
    category: "senioren",
    level: "Competitie",
    blurb: "Seniorenteam dat uitkomt in de landelijke competitie.",
  },
  {
    slug: "leiden-lions",
    name: "Leiden Lions",
    category: "senioren",
    level: "Competitie",
    blurb: "Het vlaggenschip van de club. Ijshockey op het hoogste niveau binnen de vereniging.",
  },
  {
    slug: "leiden-gladiators",
    name: "Leiden Gladiators",
    category: "senioren",
    level: "Competitie",
    blurb: "Seniorenteam met een fanatieke, strijdlustige inslag.",
  },
  {
    slug: "leiden-key-town-tigers",
    name: "Leiden Key Town Tigers",
    category: "senioren",
    level: "Competitie",
    blurb: "Competitieteam dat elke wedstrijd vol gaat voor de overwinning.",
  },
  {
    slug: "leiden-blues",
    name: "Leiden Blues",
    category: "senioren",
    level: "5e divisie",
    blurb:
      "Een gemengd team met een grote diversiteit aan niveaus, leeftijden en nationaliteiten. Beginnen kan hier op elk moment.",
  },
  {
    slug: "leiden-meiden",
    name: "Leiden Meiden",
    category: "senioren",
    level: "Dames",
    blurb: "Het damesteam van de club. Voor vrouwen die willen leren of al jaren op het ijs staan.",
  },
  {
    slug: "leiden-rusty-blades",
    name: "Leiden Rusty Blades",
    category: "senioren",
    level: "Recreatief",
    blurb: "Recreatief ijshockey voor de wat oudere en ervaren garde. Sportief en gezellig.",
  },
  {
    slug: "leiden-blues-recreanten",
    name: "Leiden Blues recreanten",
    category: "senioren",
    level: "Recreatief",
    blurb: "Het recreantenteam van de Blues. Zonder competitiedruk, met veel speelplezier.",
  },
  {
    slug: "leiden-ducks",
    name: "Leiden Ducks",
    category: "senioren",
    level: "Recreatief",
    blurb: "Recreatief team voor wie het spel wil spelen zonder de wekelijkse competitie.",
  },
];

export const allTeams = [...jeugdTeams, ...seniorenTeams];

export function teamBySlug(category: TeamCategory, slug: string) {
  return allTeams.find((t) => t.category === category && t.slug === slug);
}

/** Primary navigation model. Dropdown groups render as mega-menu columns. */
export type NavLink = { label: string; href: string };
export type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href: string; children: NavLink[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Jeugd",
    href: "/jeugd",
    children: jeugdTeams.map((t) => ({ label: t.name, href: `/jeugd/${t.slug}` })),
  },
  {
    label: "Senioren",
    href: "/senioren",
    children: seniorenTeams.map((t) => ({ label: t.name, href: `/senioren/${t.slug}` })),
  },
  { label: "IJshockeyschool", href: "/ijshockeyschool" },
];

/**
 * Hero highlights: the club's key messages (previously the rotating hero
 * slides on leiden-lions.nl). Rendered as a prominent "Uitgelicht" row on the
 * home page. Items with a `body` also get a /nieuws/[slug] detail page; items
 * with an external `href` link straight there.
 */
export type Highlight = {
  slug?: string;
  kicker: string;
  title: string;
  blurb: string;
  image: string;
  href: string;
  body?: string[];
};

export const highlights: Highlight[] = [
  {
    slug: "keel-en-nekbescherming",
    kicker: "Veiligheid",
    title: "Verplichte keel- en nekbescherming",
    blurb: "Keel- en nekbescherming is verplicht voor alle spelers, op elke training en wedstrijd.",
    image: "/photos/action-goalie.webp",
    href: "/nieuws/keel-en-nekbescherming",
    body: [
      "Voor de veiligheid van onze spelers is een keel- en nekbeschermer verplicht tijdens alle trainingen en wedstrijden bij Leiden Lions.",
      "Heb je nog geen bescherming of twijfel je over de juiste uitrusting? Neem contact met ons op, dan helpen we je graag op weg voordat je het ijs op gaat.",
    ],
  },
  {
    slug: "ijshal-de-vliet",
    kicker: "Onze thuisbasis",
    title: "IJshal De Vliet",
    blurb: "Leiden Lions traint en speelt in IJshal De Vliet in Leiden.",
    image: "/photos/rink.webp",
    href: "/nieuws/ijshal-de-vliet",
    body: [
      "Onze thuisbasis is IJshal De Vliet in Leiden. Hier vinden alle trainingen en thuiswedstrijden plaats.",
      "Kom gerust een keer langs op zaterdag om de sfeer te proeven en het team aan het werk te zien.",
    ],
  },
  {
    kicker: "Jeugd",
    title: "Word lid van een jeugdteam",
    blurb: "Van U7 tot de junioren U17: er is altijd plek voor nieuwe spelers op het ijs.",
    image: "/photos/jeugd-kids.webp",
    href: "/jeugd",
  },
];

/** Highlights that have their own /nieuws/[slug] detail page. */
export const newsHighlights = highlights.filter(
  (h): h is Highlight & { slug: string; body: string[] } => Boolean(h.slug && h.body)
);

export function highlightBySlug(slug: string) {
  return newsHighlights.find((h) => h.slug === slug);
}
