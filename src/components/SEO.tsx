import Head from "next/head";

interface SEOProps {
  /** Page title — required to prevent the "Hello World" fallback ever shipping. */
  title: string;
  /** Page meta description — required for the same reason. */
  description: string;
  /** Absolute URL for the page. Used for canonical, og:url, twitter:url. */
  url?: string;
  /** Absolute or root-relative path to the OG image. Defaults to /og-image.png. */
  image?: string;
  /** Optional JSON-LD object(s) to embed as a structured-data script. */
  jsonLd?: object | object[];
  /** Set true on pages that should never appear in search (login, dashboard, checkout, etc.). */
  noIndex?: boolean;
}

const DEFAULT_IMAGE = "/og-image.png";

/**
 * Per-page SEO component. Use this on every page.
 * Renders title, meta description, canonical, OG, Twitter, optional JSON-LD.
 */
export function SEO({
  title,
  description,
  url,
  image = DEFAULT_IMAGE,
  jsonLd,
  noIndex,
}: SEOProps) {
  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="icon" href="/favicon.ico" />
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="ecomifyUSA" />
      {url && <meta property="og:url" content={url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD structured data */}
      {jsonLdArray.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}

/**
 * Re-usable schema builders so individual pages don't have to remember the shape.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ecomifyUSA",
  url: "https://ecomifyusa.com",
  logo: "https://ecomifyusa.com/og-image.png",
  description:
    "US LLC formation, EIN for non-residents, and tax compliance for international e-commerce sellers.",
  sameAs: [],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@ecomifyusa.com",
      telephone: "+1-307-218-0376",
      areaServed: "Worldwide",
      availableLanguage: ["en"],
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "500",
    bestRating: "5",
  },
};

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** BlogPosting / Article schema for blog posts. */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    url: opts.url,
    image: opts.image ?? "https://ecomifyusa.com/og-image.png",
    datePublished: opts.datePublished ?? "2026-01-01",
    dateModified: opts.dateModified ?? opts.datePublished ?? "2026-01-01",
    author: { "@type": "Organization", name: "ecomifyUSA", url: "https://ecomifyusa.com" },
    publisher: {
      "@type": "Organization",
      name: "ecomifyUSA",
      logo: { "@type": "ImageObject", url: "https://ecomifyusa.com/og-image.png" },
    },
  };
}

/** Service schema for service pages. */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@type": "Organization", name: "ecomifyUSA", url: "https://ecomifyusa.com" },
    areaServed: "Worldwide",
    ...(opts.price
      ? { offers: { "@type": "Offer", price: opts.price, priceCurrency: "USD" } }
      : {}),
  };
}

/** BreadcrumbList schema. Pass [{name, url}] in order from Home → current. */
export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
