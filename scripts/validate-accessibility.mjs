#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(scriptDirectory, "..");
const failures = [];
const pages = [
    ["index.html", fs.readFileSync(path.join(rootDirectory, "index.html"), "utf8")],
    ["resume/index.html", fs.readFileSync(path.join(rootDirectory, "resume/index.html"), "utf8")],
    ["privacy/index.html", fs.readFileSync(path.join(rootDirectory, "privacy/index.html"), "utf8")],
    ["accessibility/index.html", fs.readFileSync(path.join(rootDirectory, "accessibility/index.html"), "utf8")]
];
const siteCss = fs.readFileSync(path.join(rootDirectory, "assets/css/site.css"), "utf8");
const portfolioCss = fs.readFileSync(path.join(rootDirectory, "assets/css/portfolio.css"), "utf8");
const siteScript = fs.readFileSync(path.join(rootDirectory, "assets/js/site.js"), "utf8");
const profileScript = fs.readFileSync(path.join(rootDirectory, "assets/js/profile-render.js"), "utf8");

function assert(condition, message) {
    if (!condition) {
        failures.push(message);
    }
}

function count(source, pattern) {
    return Array.from(source.matchAll(pattern)).length;
}

pages.forEach(([fileName, source]) => {
    assert(/<html\b[^>]*\blang=["']en["']/i.test(source), `${fileName} is missing an English document language.`);
    assert(/<title>[^<]+<\/title>/i.test(source), `${fileName} is missing a descriptive title.`);
    assert(count(source, /<h1\b/gi) === 1, `${fileName} must contain exactly one h1.`);
    assert(/<main\b/i.test(source), `${fileName} is missing a main landmark.`);
    assert(/href=["']#[^"']+["'][^>]*>Skip to /i.test(source), `${fileName} is missing a skip link.`);
    assert(source.includes('href="/privacy/"'), `${fileName} is missing the privacy policy link.`);
    assert(source.includes('href="/accessibility/"'), `${fileName} is missing the accessibility statement link.`);
});

const indexHtml = pages[0][1];
assert(/aria-label=["']Primary navigation["']/i.test(indexHtml), "Primary navigation is missing its accessible label.");
assert(/id=["']primary-navigation["']/i.test(indexHtml), "Primary navigation links are missing.");
assert(/role=["']dialog["'][^>]*aria-modal=["']true["']/i.test(indexHtml), "Project details must use modal dialog semantics.");
assert(!/<iframe\b[^>]*\btitle=["']\s*["']/i.test(indexHtml), "An iframe has an empty title.");

[siteCss, portfolioCss].forEach((css) => {
    assert(css.includes("@media (prefers-reduced-motion: reduce)"), "Reduced-motion styles are missing.");
    assert(css.includes("@media (prefers-contrast: more)"), "Increased-contrast styles are missing.");
    assert(css.includes("@media (forced-colors: active)"), "Forced-colors support is missing.");
    assert(css.includes(":focus-visible"), "Visible keyboard focus styles are missing.");
});

assert(/event\.key === ["']Escape["']/.test(profileScript), "The project dialog cannot be dismissed with Escape.");
assert(/setAttribute\(["']aria-current["'], ["']location["']\)/.test(siteScript), "Same-page navigation does not expose the current location.");
assert(profileScript.includes("trapModalFocus"), "Modal dialogs do not contain keyboard focus.");
assert(profileScript.includes("setModalBackgroundInert"), "Modal dialogs do not make background content inert.");

if (failures.length) {
    console.error(`Accessibility structure validation failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
}

console.log(`Accessibility structure validation passed for ${pages.length} pages.`);
