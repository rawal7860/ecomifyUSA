import { GetServerSideProps } from "next";
import { stateData } from "@/lib/stateData";
import { ukData } from "@/lib/ukData";

const DOMAIN = "https://ecomifyusa.com";

interface SitemapEntry {
  path: string;
  priority: string;
  changefreq: string;
}

// Hand-curated marketing + transactional pages.
const STATIC_PAGES: SitemapEntry[] = [
  { path: "/",                                        priority: "1.0",  changefreq: "weekly"  },
  { path: "/pricing",                                 priority: "0.9",  changefreq: "monthly" },
  { path: "/which-state",                             priority: "0.9",  changefreq: "monthly" },
  { path: "/us-residents",                            priority: "0.8",  changefreq: "monthly" },
  { path: "/portal",                                  priority: "0.7",  changefreq: "monthly" },
  { path: "/services",                                priority: "0.8",  changefreq: "monthly" },
  { path: "/services/llc-formation-structuring",      priority: "0.7",  changefreq: "monthly" },
  { path: "/services/us-sales-tax-compliance",        priority: "0.7",  changefreq: "monthly" },
  { path: "/services/ecommerce-tax-exemptions",       priority: "0.7",  changefreq: "monthly" },
  { path: "/services/delaware-franchise-tax",         priority: "0.7",  changefreq: "monthly" },
  { path: "/services/global-ecommerce-support",       priority: "0.7",  changefreq: "monthly" },
  { path: "/services/income-tax-cleanup",             priority: "0.7",  changefreq: "monthly" },
  { path: "/services/estonia-e-residency",            priority: "0.7",  changefreq: "monthly" },
  { path: "/about",                                   priority: "0.6",  changefreq: "monthly" },
  { path: "/case-studies",                            priority: "0.6",  changefreq: "monthly" },
  { path: "/blog",                                    priority: "0.8",  changefreq: "weekly"  },
  { path: "/blog/foreign-llc-mistake",                priority: "0.7",  changefreq: "monthly" },
  { path: "/blog/how-to-get-ein-non-us-resident",     priority: "0.7",  changefreq: "monthly" },
  { path: "/blog/amazon-fba-llc-guide",               priority: "0.7",  changefreq: "monthly" },
  { path: "/blog/us-bank-account-non-resident",       priority: "0.7",  changefreq: "monthly" },
  { path: "/blog/wa-excise-tax-sst-avalara-case-study", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy-policy",                          priority: "0.3",  changefreq: "yearly"  },
  { path: "/terms-of-service",                        priority: "0.3",  changefreq: "yearly"  },
  { path: "/refund-policy",                           priority: "0.3",  changefreq: "yearly"  },
  { path: "/delivery-policy",                         priority: "0.3",  changefreq: "yearly"  },
  { path: "/payment-policy",                          priority: "0.3",  changefreq: "yearly"  },
];

// Dynamic per-state pages — high commercial intent, one URL per state code.
function getStateEntries(): SitemapEntry[] {
  return Object.keys(stateData).map((code) => ({
    path: `/state/${code.toLowerCase()}`,
    priority: "0.8",
    changefreq: "monthly",
  }));
}

// Dynamic per-UK-country pages. Multi-word countries use a hyphenated slug
// (e.g. "northern-ireland") to match the static route generated in uk/[country].tsx.
function getUkEntries(): SitemapEntry[] {
  return Object.keys(ukData).map((key) => ({
    path: `/uk/${key.toLowerCase().replace(/ /g, "-")}`,
    priority: "0.7",
    changefreq: "monthly",
  }));
}

function generateSitemap(): string {
  const today = new Date().toISOString().split("T")[0];
  const allEntries = [
    ...STATIC_PAGES,
    ...getStateEntries(),
    ...getUkEntries(),
  ];

  const urls = allEntries
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200",
  );
  res.write(generateSitemap());
  res.end();
  return { props: {} };
};

// This component is never rendered — the page is served as XML above.
export default function SitemapPage() {
  return null;
}
