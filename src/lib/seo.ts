/** Production site URL — used for canonical and Open Graph URLs */
export const SITE_ORIGIN = "https://www.asliprep.com";

export type PageSeoConfig = {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
};

// ── Asli Prep SEO spec (same fields as Next.js `metadata`; used by SeoHead) ──

/** Home — https://www.asliprep.com */
export const metadataHome = {
  title: "Asli Prep Foundation | JEE NEET Olympiad for Schools",
  description:
    "Asli Prep Foundation — India's trusted school partner for JEE, NEET & Olympiad prep. AI-powered learning for Classes 6–10. Partner your school today.",
  keywords: [
    "JEE NEET Olympiad school partner",
    "school integrated coaching",
    "AI learning India",
  ],
  alternates: {
    canonical: "https://www.asliprep.com",
  },
} as const;

/** About — https://www.asliprep.com/about */
export const metadataAbout = {
  title: "About Asli Prep | School Partner for JEE NEET India",
  description:
    "Learn about Asli Prep Foundation — empowering students with JEE, NEET & Olympiad preparation through AI-powered learning for schools across India.",
  keywords: ["Asli Prep Foundation about", "JEE NEET coaching India schools"],
  alternates: {
    canonical: "https://www.asliprep.com/about",
  },
} as const;

/** Flattened for `<SeoHead />` on the home page */
export const seoHome: PageSeoConfig = {
  title: metadataHome.title,
  description: metadataHome.description,
  keywords: [...metadataHome.keywords],
  canonical: metadataHome.alternates.canonical,
};

/** Contact section on home — https://www.asliprep.com/#contact */
export const metadataContact = {
  title: "Contact Asli Prep Foundation | Hyderabad EdTech",
  description:
    "Contact Asli Prep Foundation, Hyderabad. Partner your school for JEE, NEET & Olympiad preparation. Call or email our team today.",
  keywords: ["Contact Asli Prep Foundation", "EdTech Hyderabad contact"],
  alternates: {
    canonical: "https://www.asliprep.com/#contact",
  },
} as const;

/** Flattened for `<SeoHead />` when URL hash is `#contact` (Index page) */
export const seoContact: PageSeoConfig = {
  title: metadataContact.title,
  description: metadataContact.description,
  keywords: [...metadataContact.keywords],
  canonical: metadataContact.alternates.canonical,
};

/** Flattened for `<SeoHead />` on `/about` */
export const seoAbout: PageSeoConfig = {
  title: metadataAbout.title,
  description: metadataAbout.description,
  keywords: [...metadataAbout.keywords],
  canonical: metadataAbout.alternates.canonical,
};

/** For Schools — https://www.asliprep.com/for-schools */
export const metadataForSchools = {
  title: "Asli Prep for Schools | JEE NEET Classes 6–10 India",
  description:
    "Partner with Asli Prep Foundation for integrated JEE, NEET & Olympiad prep. Alpha, Beta, Gamma modules designed for Classes 6–10 schools in India.",
  keywords: ["JEE NEET prep for schools India", "school partnership coaching"],
  alternates: {
    canonical: "https://www.asliprep.com/for-schools",
  },
} as const;

/** Meet VIDYA — https://www.asliprep.com/meet-vidya */
export const metadataMeetVidya = {
  title: "Meet VIDYA | AI Tutor for JEE NEET Olympiad Prep",
  description:
    "Meet VIDYA — AI tutor for JEE, NEET & Olympiad prep. Get personalized learning, smart assessments & 24/7 doubt solving for students.",
  keywords: ["VIDYA AI tutor JEE NEET", "AI learning assistant India"],
  alternates: {
    canonical: "https://www.asliprep.com/meet-vidya",
  },
} as const;

/** Flattened for `<SeoHead />` on `/for-schools` */
export const seoForSchools: PageSeoConfig = {
  title: metadataForSchools.title,
  description: metadataForSchools.description,
  keywords: [...metadataForSchools.keywords],
  canonical: metadataForSchools.alternates.canonical,
};

/** Flattened for `<SeoHead />` on `/meet-vidya` */
export const seoMeetVidya: PageSeoConfig = {
  title: metadataMeetVidya.title,
  description: metadataMeetVidya.description,
  keywords: [...metadataMeetVidya.keywords],
  canonical: metadataMeetVidya.alternates.canonical,
};

/** Resources — https://www.asliprep.com/resources */
export const metadataResources = {
  title: "JEE NEET Olympiad Resources | Asli Prep Foundation",
  description:
    "Access JEE, NEET & Olympiad study resources including practice papers, concept videos, and structured learning materials for students.",
  keywords: [
    "JEE NEET study resources India",
    "Olympiad preparation material",
  ],
  alternates: {
    canonical: "https://www.asliprep.com/resources",
  },
} as const;

/** Flattened for `<SeoHead />` on `/resources` */
export const seoResources: PageSeoConfig = {
  title: metadataResources.title,
  description: metadataResources.description,
  keywords: [...metadataResources.keywords],
  canonical: metadataResources.alternates.canonical,
};

/** Gallery — https://www.asliprep.com/gallery */
export const metadataGallery = {
  title: "Asli Prep Gallery | School Programs, Events & Learning",
  description:
    "Explore Asli Prep Foundation gallery showcasing school programs, classroom sessions, student engagement, and JEE, NEET & Olympiad learning activities.",
  keywords: [
    "Asli Prep gallery",
    "school programs JEE NEET",
    "classroom learning India",
    "student activities Asli Prep",
  ],
  alternates: {
    canonical: "https://www.asliprep.com/gallery",
  },
} as const;

/** Flattened for `<SeoHead />` on `/gallery` */
export const seoGallery: PageSeoConfig = {
  title: metadataGallery.title,
  description: metadataGallery.description,
  keywords: [...metadataGallery.keywords],
  canonical: metadataGallery.alternates.canonical,
};

/** 404 — combine with `canonical={SITE_ORIGIN + pathname}` in NotFound */
export const seoNotFoundMeta: Omit<PageSeoConfig, "canonical"> = {
  title: "Page Not Found | Asli Prep Foundation",
  description:
    "The page you are looking for does not exist. Return to Asli Prep Foundation for JEE, NEET & Olympiad school programs.",
  keywords: ["Asli Prep"],
};

export const seoAdmin = {
  title: "Admin | Asli Prep Foundation",
  description: "Asli Prep admin dashboard.",
  keywords: [] as string[],
  canonical: `${SITE_ORIGIN}/admin`,
};
