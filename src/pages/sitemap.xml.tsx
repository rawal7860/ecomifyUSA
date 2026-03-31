import { GetServerSideProps } from "next";

const DOMAIN = "https://ecomifyusa.com";

const PAGES = [
    { path: "/",                                        priority: "1.0",  changefreq: "weekly"  },
    { path: "/pricing",                                 priority: "0.9",  changefreq: "monthly" },
    { path: "/checkout",                                priority: "0.9",  changefreq: "monthly" },
    { path: "/which-state",                             priority: "0.8",  changefreq: "monthly" },
    { path: "/us-residents",                            priority: "0.8",  changefreq: "monthly" },
    { path: "/blog",                                    priority: "0.8",  changefreq: "weekly"  },
    { path: "/blog/foreign-llc-mistake",                priority: "0.7",  changefreq: "monthly" },
    { path: "/services",                                priority: "0.8",  changefreq: "monthly" },
    { path: "/services/llc-formation-structuring",      priority: "0.7",  changefreq: "monthly" },
    { path: "/services/us-sales-tax-compliance",        priority: "0.7",  changefreq: "monthly" },
    { path: "/services/ecommerce-tax-exemptions",       priority: "0.7",  changefreq: "monthly" },
    { path: "/services/delaware-franchise-tax",         priority: "0.7",  changefreq: "monthly" },
    { path: "/services/global-ecommerce-support",       priority: "0.7",  changefreq: "monthly" },
    { path: "/services/income-tax-cleanup",             priority: "0.7",  changefreq: "monthly" },
    { path: "/about",                                   priority: "0.6",  changefreq: "monthly" },
    { path: "/case-studies",                            priority: "0.6",  changefreq: "monthly" },
    { path: "/privacy-policy",                          priority: "0.3",  changefreq: "yearly"  },
    { path: "/terms-of-service",                        priority: "0.3",  changefreq: "yearly"  },
    { path: "/refund-policy",                           priority: "0.3",  changefreq: "yearly"  },
    { path: "/delivery-policy",                         priority: "0.3",  changefreq: "yearly"  },
    { path: "/payment-policy",                          priority: "0.3",  changefreq: "yearly"  },
];

function generateSitemap(): string {
    const today = new Date().toISOString().split("T")[0];
    const urls = PAGES.map(
        ({ path, priority, changefreq }) => `
  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    ).join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=43200");
    res.write(generateSitemap());
    res.end();
    return { props: {} };
};

// This component is never rendered — the page is served as XML above
export default function SitemapPage() {
    return null;
}
