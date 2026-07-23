#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(scriptDirectory, "..");
const profileDataSource = fs.readFileSync(path.join(rootDirectory, "assets/js/profile-data.js"), "utf8");
const profileRendererSource = fs.readFileSync(path.join(rootDirectory, "assets/js/profile-render.js"), "utf8");
const checkOnly = process.argv.includes("--check");

function createClassList() {
    return {
        add() {},
        remove() {},
        toggle() {},
        contains() {
            return false;
        }
    };
}

function createStyle() {
    return {
        setProperty() {},
        removeProperty() {}
    };
}

function createElement(id = "") {
    return {
        id,
        innerHTML: "",
        textContent: "",
        text: "",
        dataset: {},
        classList: createClassList(),
        style: createStyle(),
        children: [],
        hidden: false,
        addEventListener() {},
        setAttribute() {},
        getAttribute() {
            return null;
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        closest() {
            return null;
        },
        focus() {},
        getBoundingClientRect() {
            return { top: 0 };
        }
    };
}

function renderProfilePage(page, elementIds) {
    const elements = new Map(elementIds.map((id) => [id, createElement(id)]));
    const appendedElements = new Map();
    const body = createElement("body");
    body.dataset.page = page;

    const document = {
        body,
        head: {
            appendChild(element) {
                appendedElements.set(element.id, element);
            }
        },
        createElement() {
            return createElement();
        },
        getElementById(id) {
            return elements.get(id) || appendedElements.get(id) || null;
        },
        querySelectorAll() {
            return [];
        },
        addEventListener() {}
    };

    const window = {
        addEventListener() {},
        cancelAnimationFrame() {},
        requestAnimationFrame() {
            return 0;
        },
        matchMedia() {
            return {
                matches: true,
                addEventListener() {},
                addListener() {}
            };
        },
        setTimeout() {
            return 0;
        },
        clearTimeout() {}
    };
    window.window = window;

    const context = vm.createContext({
        console,
        document,
        window
    });

    vm.runInContext(profileDataSource, context, { filename: "assets/js/profile-data.js" });
    vm.runInContext(profileRendererSource, context, { filename: "assets/js/profile-render.js" });

    return {
        getElement(id) {
            return elements.get(id);
        },
        getAppendedElement(id) {
            return appendedElements.get(id);
        }
    };
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function replaceGeneratedBlock(source, marker, content) {
    const startMarker = `<!-- profile:${marker}:start -->`;
    const endMarker = `<!-- profile:${marker}:end -->`;
    const startIndex = source.indexOf(startMarker);
    const endIndex = source.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
        throw new Error(`Missing or invalid generated-content markers for "${marker}".`);
    }

    const lineStart = source.lastIndexOf("\n", startIndex) + 1;
    const indentation = source.slice(lineStart, startIndex);
    const formattedContent = content
        .trim()
        .split("\n")
        .map((line) => indentation + line)
        .join("\n");
    const replacement = formattedContent
        ? `${startMarker}\n${formattedContent}\n${indentation}${endMarker}`
        : `${startMarker}\n${indentation}${endMarker}`;

    return source.slice(0, startIndex) + replacement + source.slice(endIndex + endMarker.length);
}

function updateFile(relativePath, fragments) {
    const filePath = path.join(rootDirectory, relativePath);
    const original = fs.readFileSync(filePath, "utf8");
    const updated = Object.entries(fragments).reduce(
        (source, [marker, content]) => replaceGeneratedBlock(source, marker, content),
        original
    );

    if (updated === original) {
        return false;
    }

    if (!checkOnly) {
        fs.writeFileSync(filePath, updated);
    }
    return true;
}

const site = renderProfilePage("site", [
    "hero-proof",
    "about-text",
    "skills-grid",
    "experience-timeline",
    "projects-grid",
    "education-grid",
    "contact-intro",
    "contact-actions",
    "contact-info"
]);
const projectStructuredData = site.getAppendedElement("project-structured-data");
const siteChanged = updateFile("index.html", {
    "project-structured-data": `<script id="project-structured-data" type="application/ld+json">\n${JSON.stringify(JSON.parse(projectStructuredData.text), null, 4)}\n</script>`,
    "hero-proof": site.getElement("hero-proof").innerHTML,
    about: site.getElement("about-text").innerHTML,
    experience: site.getElement("experience-timeline").innerHTML,
    projects: site.getElement("projects-grid").innerHTML,
    skills: site.getElement("skills-grid").innerHTML,
    education: site.getElement("education-grid").innerHTML,
    "contact-intro": escapeHtml(site.getElement("contact-intro").textContent),
    "contact-actions": site.getElement("contact-actions").innerHTML,
    "contact-info": site.getElement("contact-info").innerHTML
});

const resume = renderProfilePage("resume", [
    "resume-summary",
    "resume-contact",
    "resume-skills",
    "resume-experience",
    "resume-additional-experience",
    "resume-education",
    "resume-projects"
]);
const resumeChanged = updateFile("resume/index.html", {
    "resume-summary": escapeHtml(resume.getElement("resume-summary").textContent),
    "resume-contact": resume.getElement("resume-contact").innerHTML,
    "resume-experience": resume.getElement("resume-experience").innerHTML,
    "resume-projects": resume.getElement("resume-projects").innerHTML,
    "resume-skills": resume.getElement("resume-skills").innerHTML,
    "resume-education": resume.getElement("resume-education").innerHTML,
    "resume-additional-experience": resume.getElement("resume-additional-experience").innerHTML
});

if (checkOnly && (siteChanged || resumeChanged)) {
    console.error("Pre-rendered profile content is out of date. Run ./scripts/prerender-profile-content.mjs.");
    process.exit(1);
}

console.log(
    siteChanged || resumeChanged
        ? checkOnly
            ? "Pre-rendered profile content is out of date."
            : "Updated pre-rendered portfolio and resume content."
        : "Pre-rendered portfolio and resume content is current."
);
