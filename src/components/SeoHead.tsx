import { Helmet } from "react-helmet-async";
import type { PageSeoConfig } from "@/lib/seo";

const DEFAULT_OG_IMAGE = "https://www.asliprep.com/images/mainImage.png";

type SeoHeadProps = PageSeoConfig & {
  /** Set for admin, 404, or other pages that should not be indexed */
  noindex?: boolean;
  /** Override default OG/Twitter image */
  ogImage?: string;
};

export function SeoHead({
  title,
  description,
  keywords,
  canonical,
  noindex = false,
  ogImage = DEFAULT_OG_IMAGE,
}: SeoHeadProps) {
  const kw = keywords.length > 0 ? keywords.join(", ") : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {kw && <meta name="keywords" content={kw} />}
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Asli Prep Foundation" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
