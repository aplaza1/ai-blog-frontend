import {GetServerSideProps} from "next";
import {getBlogPosts} from "../api/data-service-api-client";

export default function Sitemap() {
    return null
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const xml = await generateSiteMap();
    ctx.res.setHeader('Content-Type', 'text/xml');
    ctx.res.write(xml);
    ctx.res.end();
    return {
        props: {},
    }
}

async function generateSiteMap(): Promise<string> {
    const pages = await getBlogPosts();
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages.map(page => {
            return `
              <url>
                <loc>https://www.postscribbled.com/posts/${page.title}</loc>
              </url>
            `;
        })
        .join('')}
    </urlset>`;
}