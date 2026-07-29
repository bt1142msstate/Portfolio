#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(scriptDirectory, "..");
const failures = [];

function read(relativePath) {
    return fs.readFileSync(path.join(rootDirectory, relativePath), "utf8");
}

function assert(condition, message) {
    if (!condition) {
        failures.push(message);
    }
}

function run(command, argumentsList) {
    const result = spawnSync(command, argumentsList, {
        cwd: rootDirectory,
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024
    });
    assert(result.status === 0, `${command} ${argumentsList.join(" ")} failed: ${result.stderr.trim()}`);
    return result.stdout;
}

function getGeneratedContent(source, marker) {
    const start = `<!-- profile:${marker}:start -->`;
    const end = `<!-- profile:${marker}:end -->`;
    const startIndex = source.indexOf(start);
    const endIndex = source.indexOf(end);
    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
        failures.push(`Missing generated-content markers for ${marker}.`);
        return "";
    }
    return source.slice(startIndex + start.length, endIndex).trim();
}

function validateJsonLd(source, fileName) {
    const scripts = Array.from(source.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi));
    assert(scripts.length > 0, `${fileName} does not contain JSON-LD.`);
    scripts.forEach((match, index) => {
        try {
            JSON.parse(match[1]);
        } catch (error) {
            failures.push(`${fileName} JSON-LD block ${index + 1} is invalid: ${error.message}`);
        }
    });
}

function validateImages(source, fileName) {
    const images = Array.from(source.matchAll(/<img\b[^>]*>/gi), (match) => match[0]);
    assert(images.length > 0, `${fileName} does not contain crawlable img elements.`);
    images.forEach((image, index) => {
        const alt = image.match(/\balt=["']([^"']*)["']/i);
        assert(Boolean(alt && alt[1].trim()), `${fileName} image ${index + 1} has missing or empty alt text.`);
        assert(/\bsrc=["'][^"']+["']/i.test(image), `${fileName} image ${index + 1} does not have a fallback src.`);
    });
}

function localPathForUrl(url) {
    const parsed = new URL(url);
    if (parsed.hostname !== "brandontemple.com") {
        return null;
    }
    const pathname = decodeURIComponent(parsed.pathname);
    if (pathname === "/") {
        return "index.html";
    }
    if (pathname.endsWith("/")) {
        return path.join(pathname.slice(1), "index.html");
    }
    return pathname.slice(1);
}

const indexHtml = read("index.html");
const resumeHtml = read("resume/index.html");
const privacyHtml = read("privacy/index.html");
const accessibilityHtml = read("accessibility/index.html");
const robots = read("robots.txt");
const sitemap = read("sitemap.xml");

assert(!/<meta\b[^>]*content=["'][^"']*\bnoindex\b/i.test(indexHtml), "Homepage contains a noindex directive.");
assert(!/<meta\b[^>]*content=["'][^"']*\bnoindex\b/i.test(resumeHtml), "Resume page contains a noindex directive.");
assert(!/<meta\b[^>]*content=["'][^"']*\bnoindex\b/i.test(privacyHtml), "Privacy page contains a noindex directive.");
assert(!/<meta\b[^>]*content=["'][^"']*\bnoindex\b/i.test(accessibilityHtml), "Accessibility page contains a noindex directive.");
assert(indexHtml.includes('<link rel="canonical" href="https://brandontemple.com/">'), "Homepage canonical URL is missing or incorrect.");
assert(resumeHtml.includes('<link rel="canonical" href="https://brandontemple.com/resume/">'), "Resume canonical URL is missing or incorrect.");
assert(privacyHtml.includes('<link rel="canonical" href="https://brandontemple.com/privacy/">'), "Privacy canonical URL is missing or incorrect.");
assert(accessibilityHtml.includes('<link rel="canonical" href="https://brandontemple.com/accessibility/">'), "Accessibility canonical URL is missing or incorrect.");
assert(indexHtml.includes('type="application/pdf" href="https://brandontemple.com/resume/brandon-temple-resume.pdf"'), "Homepage does not declare the PDF resume.");
assert(resumeHtml.includes('type="application/pdf" href="https://brandontemple.com/resume/brandon-temple-resume.pdf"'), "Resume page does not declare the PDF resume.");

[
    "hero-proof",
    "about",
    "experience",
    "projects",
    "skills",
    "education",
    "contact-intro",
    "contact-actions",
    "contact-info",
    "project-structured-data"
].forEach((marker) => {
    assert(getGeneratedContent(indexHtml, marker).length > 0, `Homepage generated content is empty for ${marker}.`);
});

[
    "resume-summary",
    "resume-contact",
    "resume-experience",
    "resume-projects",
    "resume-skills",
    "resume-education",
    "resume-additional-experience"
].forEach((marker) => {
    assert(getGeneratedContent(resumeHtml, marker).length > 0, `Resume generated content is empty for ${marker}.`);
});

[
    "Afternoon Adventure Website",
    "Query",
    "MetaTable",
    "Technology &amp; Support Services Coordinator",
    "Master of Science in Software Engineering"
].forEach((text) => {
    assert(indexHtml.includes(text), `Homepage initial HTML is missing: ${text}.`);
});

[
    "Professional Experience",
    "Technical Skills",
    "Additional Experience",
    "Brandon Vashun Temple"
].forEach((text) => {
    assert(resumeHtml.includes(text) || indexHtml.includes(text), `Initial HTML is missing identity or resume text: ${text}.`);
});

validateJsonLd(indexHtml, "index.html");
validateJsonLd(resumeHtml, "resume/index.html");
validateJsonLd(privacyHtml, "privacy/index.html");
validateJsonLd(accessibilityHtml, "accessibility/index.html");
validateImages(indexHtml, "index.html");

[indexHtml, resumeHtml, privacyHtml, accessibilityHtml].forEach((source, index) => {
    const fileName = ["index.html", "resume/index.html", "privacy/index.html", "accessibility/index.html"][index];
    assert(source.includes('href="/privacy/"'), `${fileName} does not link to the privacy policy.`);
    assert(source.includes('href="/accessibility/"'), `${fileName} does not link to the accessibility statement.`);
});

assert(/User-agent:\s*\*/i.test(robots), "robots.txt does not include a wildcard user agent.");
assert(/Allow:\s*\/\s*$/im.test(robots), "robots.txt does not allow the public site.");
assert(robots.includes("https://brandontemple.com/sitemap.xml"), "robots.txt does not declare the sitemap.");

const sitemapUrls = Array.from(sitemap.matchAll(/<(?:image:)?loc>([^<]+)<\/(?:image:)?loc>/g), (match) => match[1]);
assert(sitemapUrls.length >= 3, "sitemap.xml does not include the primary pages and assets.");
sitemapUrls.forEach((url) => {
    const localPath = localPathForUrl(url);
    assert(localPath !== null, `Sitemap URL is outside the canonical domain: ${url}`);
    if (localPath) {
        assert(fs.existsSync(path.join(rootDirectory, localPath)), `Sitemap URL does not map to a local file: ${url}`);
    }
});

const prerenderResult = spawnSync(process.execPath, ["scripts/prerender-profile-content.mjs", "--check"], {
    cwd: rootDirectory,
    encoding: "utf8"
});
assert(prerenderResult.status === 0, prerenderResult.stderr.trim() || "Pre-rendered content is out of date.");

const pdfInfo = run("pdfinfo", ["resume/brandon-temple-resume.pdf"]);
assert(/^Title:\s+Brandon Temple Resume \| Software Engineer$/m.test(pdfInfo), "PDF title metadata is missing or incorrect.");
assert(/^Author:\s+Brandon Vashun Temple$/m.test(pdfInfo), "PDF author metadata is missing or incorrect.");
assert(/^Tagged:\s+yes$/m.test(pdfInfo), "PDF is not tagged.");
assert(/^Encrypted:\s+no$/m.test(pdfInfo), "PDF is encrypted.");

const pdfText = run("pdftotext", ["resume/brandon-temple-resume.pdf", "-"]);
["Brandon Temple", "PROFESSIONAL EXPERIENCE", "PROJECTS", "TECHNICAL SKILLS", "EDUCATION"].forEach((text) => {
    assert(pdfText.includes(text), `PDF text extraction is missing: ${text}.`);
});
run("qpdf", ["--check", "resume/brandon-temple-resume.pdf"]);

if (failures.length) {
    console.error(`Crawlability validation failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
}

console.log(`Crawlability validation passed: ${sitemapUrls.length} sitemap URLs, valid JSON-LD, described images, current pre-rendered HTML, and extractable PDF content.`);
