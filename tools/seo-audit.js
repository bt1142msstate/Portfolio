#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteOrigin = "https://www.brandontemple.com";
const failures = [];

function read(filePath) {
    return fs.readFileSync(path.join(root, filePath), "utf8");
}

function assert(condition, message) {
    if (!condition) {
        failures.push(message);
    }
}

function getAttribute(html, tagPattern, attr) {
    const tag = html.match(tagPattern)?.[0] || "";
    return tag.match(new RegExp(`${attr}=["']([^"']+)["']`, "i"))?.[1] || "";
}

function auditPage(filePath, expectedCanonical, requiredText) {
    const html = read(filePath);
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] || "";
    const description = getAttribute(html, /<meta\s+name=["']description["'][^>]*>/i, "content");
    const robots = getAttribute(html, /<meta\s+name=["']robots["'][^>]*>/i, "content");
    const canonical = getAttribute(html, /<link\s+rel=["']canonical["'][^>]*>/i, "href");
    const jsonLdBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>\s*([\s\S]*?)\s*<\/script>/gi)];

    assert(title.length > 10, `${filePath} needs a useful title`);
    assert(description.length >= 120 && description.length <= 220, `${filePath} description should be specific and search-snippet sized`);
    assert(robots.toLowerCase().includes("index") && robots.toLowerCase().includes("follow"), `${filePath} must allow indexing and following`);
    assert(canonical === expectedCanonical, `${filePath} canonical must be ${expectedCanonical}`);
    assert(jsonLdBlocks.length > 0, `${filePath} needs JSON-LD structured data`);

    for (const block of jsonLdBlocks) {
        try {
            JSON.parse(block[1]);
        } catch (error) {
            failures.push(`${filePath} has invalid JSON-LD: ${error.message}`);
        }
    }

    for (const text of requiredText) {
        assert(html.includes(text), `${filePath} raw HTML should include "${text}"`);
    }
}

function auditRobots() {
    const robots = read("robots.txt");
    assert(/User-agent:\s*\*/i.test(robots), "robots.txt must target all crawlers");
    assert(/Allow:\s*\//i.test(robots), "robots.txt must allow crawling");
    assert(!/Disallow:\s*\//i.test(robots), "robots.txt must not disallow the site root");
    assert(robots.includes(`${siteOrigin}/sitemap.xml`), "robots.txt must point to the sitemap");
}

function auditSitemap() {
    const sitemap = read("sitemap.xml");
    const requiredUrls = [
        `${siteOrigin}/`,
        `${siteOrigin}/resume/`,
        `${siteOrigin}/resume/brandon-temple-resume.pdf`,
        `${siteOrigin}/llms.txt`
    ];

    for (const url of requiredUrls) {
        assert(sitemap.includes(`<loc>${url}</loc>`), `sitemap.xml must include ${url}`);
    }
}

function auditLlms() {
    const llms = read("llms.txt");
    const requiredText = [
        "Brandon Vashun Temple",
        "https://www.brandontemple.com/resume/",
        "Ady Resolver",
        "Machine Learning",
        "bt1142@msstate.edu"
    ];

    for (const text of requiredText) {
        assert(llms.includes(text), `llms.txt should include "${text}"`);
    }
}

function auditLocalLinks(filePath) {
    const html = read(filePath);
    const links = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);

    for (const link of links) {
        if (/^(https?:|mailto:|tel:|#)/i.test(link)) {
            continue;
        }

        if (link.startsWith("/")) {
            assertPathExists(link.slice(1), `${filePath} references missing root path ${link}`);
            continue;
        }

        assertPathExists(path.normalize(path.join(path.dirname(filePath), link)), `${filePath} references missing local path ${link}`);
    }
}

function assertPathExists(target, message) {
    const absolutePath = path.join(root, target);

    if (fs.existsSync(absolutePath)) {
        return;
    }

    if (fs.existsSync(path.join(absolutePath, "index.html"))) {
        return;
    }

    failures.push(message);
}

auditPage("index.html", `${siteOrigin}/`, [
    "Brandon Vashun Temple",
    "MSU Libraries",
    "Ady Resolver",
    "Machine Learning",
    "/resume/"
]);
auditPage("resume/index.html", `${siteOrigin}/resume/`, [
    "Brandon Vashun Temple",
    "Technology &amp; Support Services Coordinator",
    "Ady Resolver",
    "Outstanding ECCC CS Student Award"
]);
auditRobots();
auditSitemap();
auditLlms();
auditLocalLinks("index.html");
auditLocalLinks("resume/index.html");

if (failures.length > 0) {
    console.error("SEO audit failed:");
    for (const failure of failures) {
        console.error(`- ${failure}`);
    }
    process.exit(1);
}

console.log("SEO audit passed: crawlable content, metadata, JSON-LD, sitemap, robots, and local links look valid.");
