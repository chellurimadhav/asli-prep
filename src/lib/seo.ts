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
export const seoResources: PageSeoConfig = {
  title: "Free Resources | Study Materials & Guides | Asli Prep",
  description:
    "Free sample materials, guides, and updates for JEE, NEET & Olympiad prep. Request resources and stay updated with Asli Prep Foundation.",
  keywords: [
    "JEE NEET free resources",
    "Olympiad study materials India",
    "Asli Prep downloads",
  ],
  canonical: `${SITE_ORIGIN}/resources`,
};

/** Gallery — https://www.asliprep.com/gallery */
export const seoGallery: PageSeoConfig = {
  title: "Gallery & Videos | Asli Prep Foundation",
  description:
    "Watch promo videos and highlights from Asli Prep Foundation — JEE, NEET & Olympiad programs for schools across India.",
  keywords: ["Asli Prep videos", "school coaching gallery", "JEE NEET promo"],
  canonical: `${SITE_ORIGIN}/gallery`,
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
