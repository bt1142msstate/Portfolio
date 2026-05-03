#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const profileDataPath = path.join(root, "assets/js/profile-data.js");
const dateModified = "2026-05-03";

function loadProfileData() {
    const context = { window: {} };
    const source = fs.readFileSync(profileDataPath, "utf8");
    vm.runInNewContext(source, context, { filename: "profile-data.js" });
    return context.window.profileData;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function replaceGenerated(html, key, lines) {
    const start = `<!-- profile-data:${key}:start -->`;
    const end = `<!-- profile-data:${key}:end -->`;
    const pattern = new RegExp(`(\\n[ \\t]*)${escapeRegExp(start)}[\\s\\S]*?(\\n[ \\t]*)${escapeRegExp(end)}`);
    const match = html.match(pattern);

    if (!match) {
        throw new Error(`Missing generated block: ${key}`);
    }

    const indent = match[1].slice(1);
    const content = lines.map((line) => `${indent}${line}`).join("\n");

    return html.replace(pattern, `${match[1]}${start}\n${content}${match[2]}${end}`);
}

function replaceGeneratedBlock(html, key, block) {
    const start = `<!-- profile-data:${key}:start -->`;
    const end = `<!-- profile-data:${key}:end -->`;
    const pattern = new RegExp(`(\\n[ \\t]*)${escapeRegExp(start)}[\\s\\S]*?(\\n[ \\t]*)${escapeRegExp(end)}`);
    const match = html.match(pattern);

    if (!match) {
        throw new Error(`Missing generated block: ${key}`);
    }

    const indent = match[1].slice(1);
    const content = block.split("\n").map((line) => `${indent}${line}`).join("\n");

    return html.replace(pattern, `${match[1]}${start}\n${content}${match[2]}${end}`);
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderList(items) {
    return [
        "<ul>",
        ...items.map((item) => `    <li>${escapeHtml(item)}</li>`),
        "</ul>"
    ];
}

function renderSite(data) {
    const htmlPath = path.join(root, "index.html");
    let html = fs.readFileSync(htmlPath, "utf8");

    html = replaceGeneratedBlock(html, "index-jsonld", renderJsonLd(indexStructuredData(data)));
    html = replaceGenerated(html, "site-about", data.site.about.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`));
    html = replaceGenerated(html, "site-skills", data.site.skills.flatMap((group) => [
        '<div class="skill-category">',
        `    <h3>${escapeHtml(group.title)}</h3>`,
        '    <div class="skill-tags">',
        ...group.items.map((item) => `        <span>${escapeHtml(item)}</span>`),
        "    </div>",
        "</div>"
    ]));
    html = replaceGenerated(html, "site-experience", data.experience.professional.flatMap((role) => [
        '<div class="timeline-item">',
        '    <div class="timeline-marker"></div>',
        '    <div class="timeline-content">',
        '        <div class="timeline-header">',
        `            <h3>${escapeHtml(role.title)}</h3>`,
        `            <span class="timeline-date">${escapeHtml(role.date)}</span>`,
        "        </div>",
        `        <p class="timeline-company">${escapeHtml(`${role.organization} | ${role.location}`)}</p>`,
        '        <ul class="timeline-list">',
        ...role.bullets.map((item) => `            <li>${escapeHtml(item)}</li>`),
        "        </ul>",
        "    </div>",
        "</div>"
    ]));
    html = replaceGenerated(html, "site-projects", data.projects.filter((project) => project.featuredOnSite).flatMap((project) => [
        '<div class="project-card">',
        '    <div class="project-header">',
        `        <h3>${escapeHtml(project.title)}</h3>`,
        `        <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener" aria-label="View ${escapeHtml(project.title)} on GitHub" class="project-link">View on GitHub</a>`,
        "    </div>",
        `    <p class="project-type">${escapeHtml(project.siteType)}</p>`,
        `    <p class="project-description">${escapeHtml(project.siteDescription)}</p>`,
        '    <div class="project-tags">',
        ...project.siteTags.map((tag) => `        <span>${escapeHtml(tag)}</span>`),
        "    </div>",
        "</div>"
    ]));
    html = replaceGenerated(html, "site-education", data.education.flatMap((item) => [
        '<div class="education-card">',
        '    <div class="education-icon" aria-hidden="true">🎓</div>',
        `    <h3>${escapeHtml(item.degree)}</h3>`,
        ...(item.inlineHonors ? [`    <p class="education-honors">${escapeHtml(item.inlineHonors)}</p>`] : []),
        `    <p class="education-school">${escapeHtml(item.school)}</p>`,
        `    <p class="education-location">${escapeHtml(item.location)}</p>`,
        `    <p class="education-date">${escapeHtml(item.date)}</p>`,
        `    <p class="education-gpa">GPA: ${escapeHtml(item.gpa)}</p>`,
        ...(item.honorsLines ? [`    <p class="education-honors-list">${item.honorsLines.map(escapeHtml).join("<br>")}</p>`] : []),
        "</div>"
    ]));
    html = replaceGenerated(html, "site-contact-intro", [escapeHtml(data.site.contactIntro)]);
    html = replaceGenerated(html, "site-contact", [
        `<a href="mailto:${escapeHtml(data.contact.email)}" class="contact-item"><span>${escapeHtml(data.contact.email)}</span></a>`,
        `<a href="${escapeHtml(data.contact.githubUrl)}" target="_blank" rel="me noopener" class="contact-item"><span>${escapeHtml(data.contact.githubLabel)}</span></a>`,
        `<a href="${escapeHtml(data.contact.instagramUrl)}" target="_blank" rel="me noopener" class="contact-item"><span>${escapeHtml(data.contact.instagramLabel)}</span></a>`,
        `<div class="contact-item"><span>${escapeHtml(data.contact.location)}</span></div>`
    ]);

    fs.writeFileSync(htmlPath, html);
}

function renderResume(data) {
    const htmlPath = path.join(root, "resume/index.html");
    let html = fs.readFileSync(htmlPath, "utf8");

    html = replaceGeneratedBlock(html, "resume-jsonld", renderJsonLd(resumeStructuredData(data)));
    html = replaceGenerated(html, "resume-summary", [escapeHtml(data.resume.summary)]);
    html = replaceGenerated(html, "resume-contact", [
        `<p>${escapeHtml(data.contact.location)}</p>`,
        `<p><a href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a></p>`,
        `<p><a href="${escapeHtml(data.contact.githubUrl)}">${escapeHtml(data.contact.githubLabel)}</a></p>`
    ]);
    html = replaceGenerated(html, "resume-skills", data.resume.skills.map((group) => `<p><span>${escapeHtml(group.label)}</span> ${escapeHtml(group.value)}</p>`));
    html = replaceGenerated(html, "resume-experience", renderResumeEntries(data.experience.professional));
    html = replaceGenerated(html, "resume-additional-experience", renderResumeEntries(data.experience.additional, true));
    html = replaceGenerated(html, "resume-education", data.education.flatMap((item) => {
        const degree = item.resumeDegree || item.degree;
        return [
            '<article class="entry compact">',
            '    <div class="entry-header">',
            "        <div>",
            `            <h3>${escapeHtml(degree)}</h3>`,
            `            <p class="meta">${escapeHtml(item.school)}</p>`,
            "        </div>",
            `        <p class="date">${escapeHtml(item.date)}</p>`,
            "    </div>",
            `    <p class="detail">${escapeHtml(`${item.location} | GPA: ${item.gpa}`)}</p>`,
            ...(item.honorsLines || []).map((line) => `    <p class="detail">${escapeHtml(line)}</p>`),
            "</article>"
        ];
    }));
    html = replaceGenerated(html, "resume-projects", data.projects.filter((project) => project.featuredOnResume).flatMap((project) => [
        '<article class="project">',
        `    <h3>${escapeHtml(project.title)}</h3>`,
        `    <p class="project-subtitle">${escapeHtml(project.resumeSubtitle)}</p>`,
        `    <p>${escapeHtml(project.resumeDescription)}</p>`,
        `    <p class="project-link"><a href="${escapeHtml(project.githubUrl)}">${escapeHtml(project.githubUrl.replace(/^https?:\/\//, ""))}</a></p>`,
        "</article>"
    ]));

    fs.writeFileSync(htmlPath, html);
}

function renderLlms(data) {
    const featuredProjects = data.projects.filter((project) => project.featuredOnSite);
    const lines = [
        "# Brandon Temple",
        "",
        "Official site: https://www.brandontemple.com/",
        "",
        "Brandon Vashun Temple, publicly branded as Brandon Temple, is a software engineer and M.S. candidate at Mississippi State University in Starkville, Mississippi.",
        "",
        "## Primary Pages",
        "",
        "- Portfolio: https://www.brandontemple.com/",
        "- Resume: https://www.brandontemple.com/resume/",
        "- Resume PDF: https://www.brandontemple.com/resume/brandon-temple-resume.pdf",
        "",
        "## Official Profiles",
        "",
        `- GitHub: ${data.contact.githubUrl}`,
        `- Instagram: ${data.contact.instagramUrl}`,
        "",
        "## Current Focus",
        "",
        "- Desktop applications and internal tools",
        "- Browser-based reporting systems",
        "- File-processing and metadata extraction utilities",
        "- Data export workflows",
        "- Practical Machine Learning and address resolution",
        "",
        "## Featured Projects",
        "",
        ...featuredProjects.map((project) => `- ${project.title}: ${project.siteDescription}`),
        "",
        "## Education",
        "",
        ...data.education.map((item) => `- ${item.degree}, ${item.school}, ${item.date}.`),
        "",
        "## Contact",
        "",
        `Email: ${data.contact.email}`,
        ""
    ];

    fs.writeFileSync(path.join(root, "llms.txt"), lines.join("\n"));
}

function renderResumeEntries(roles, compact = false) {
    return roles.flatMap((role) => [
        `<article class="entry${compact ? " compact" : ""}">`,
        '    <div class="entry-header">',
        "        <div>",
        `            <h3>${escapeHtml(role.title)}</h3>`,
        `            <p class="meta">${escapeHtml(compact ? role.organization : `${role.organization} | ${role.location}`)}</p>`,
        "        </div>",
        `        <p class="date">${escapeHtml(role.date)}</p>`,
        "    </div>",
        ...renderList(role.bullets).map((line) => `    ${line}`),
        "</article>"
    ]);
}

function renderJsonLd(data) {
    return [
        '<script type="application/ld+json">',
        JSON.stringify(data, null, 4).split("\n").map((line) => `    ${line}`).join("\n"),
        "</script>"
    ].join("\n");
}

function indexStructuredData(data) {
    const personId = "https://www.brandontemple.com/#person";
    const siteId = "https://www.brandontemple.com/#website";

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": siteId,
                "url": "https://www.brandontemple.com/",
                "name": "Brandon Temple",
                "description": "Official portfolio and resume site for Brandon Vashun Temple.",
                "inLanguage": "en-US",
                "publisher": { "@id": personId }
            },
            {
                "@type": "ProfilePage",
                "@id": "https://www.brandontemple.com/#webpage",
                "url": "https://www.brandontemple.com/",
                "name": "Brandon Temple | Software Engineer",
                "description": "Portfolio and resume for Brandon Vashun Temple, a software engineer focused on desktop tools, internal web apps, reporting systems, data export workflows, and practical machine learning projects.",
                "isPartOf": { "@id": siteId },
                "about": { "@id": personId },
                "mainEntity": { "@id": personId },
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": "https://www.brandontemple.com/assets/images/social-preview.png",
                    "width": 1200,
                    "height": 630
                },
                "inLanguage": "en-US",
                "dateModified": dateModified
            },
            personStructuredData(data, personId),
            projectItemList(data)
        ]
    };
}

function resumeStructuredData(data) {
    const personId = "https://www.brandontemple.com/#person";

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.brandontemple.com/resume/#webpage",
                "url": "https://www.brandontemple.com/resume/",
                "name": "Brandon Temple Resume | Software Engineer",
                "description": "Resume for Brandon Vashun Temple, software engineer focused on desktop tools, internal web apps, reporting workflows, data export, and practical machine learning applications.",
                "about": { "@id": personId },
                "mainEntity": { "@id": personId },
                "isPartOf": { "@id": "https://www.brandontemple.com/#website" },
                "associatedMedia": {
                    "@type": "MediaObject",
                    "url": "https://www.brandontemple.com/resume/brandon-temple-resume.pdf",
                    "encodingFormat": "application/pdf"
                },
                "inLanguage": "en-US",
                "dateModified": dateModified
            },
            personStructuredData(data, personId)
        ]
    };
}

function personStructuredData(data, personId) {
    const schools = [...new Set(data.education.map((item) => item.school))];

    return {
        "@type": "Person",
        "@id": personId,
        "name": "Brandon Vashun Temple",
        "givenName": "Brandon",
        "additionalName": "Vashun",
        "familyName": "Temple",
        "alternateName": [
            "Brandon Temple",
            "brandonvtemple",
            "bt1142msstate"
        ],
        "url": "https://www.brandontemple.com/",
        "image": "https://www.brandontemple.com/assets/images/social-preview.png",
        "email": `mailto:${data.contact.email}`,
        "jobTitle": "Software Engineer",
        "description": "Software engineer and M.S. candidate at Mississippi State University building desktop tools, internal web apps, reporting systems, data export workflows, and practical machine learning projects.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Starkville",
            "addressRegion": "MS",
            "addressCountry": "US"
        },
        "worksFor": {
            "@type": "Organization",
            "name": "MSU Libraries"
        },
        "alumniOf": schools.map((school) => ({
            "@type": "CollegeOrUniversity",
            "name": school
        })),
        "sameAs": [
            data.contact.githubUrl,
            data.contact.instagramUrl
        ],
        "knowsAbout": [
            "C#",
            "Python",
            "JavaScript",
            ".NET",
            "WPF",
            "WinUI 3",
            "SQL",
            "Machine Learning",
            "Address Resolution",
            "Reporting Tools",
            "Workflow Automation",
            "REST APIs"
        ],
        "hasOccupation": {
            "@type": "Occupation",
            "name": "Software Engineer",
            "skills": data.resume.skills.map((group) => group.value).join(", ")
        }
    };
}

function projectItemList(data) {
    return {
        "@type": "ItemList",
        "@id": "https://www.brandontemple.com/#featured-projects",
        "name": "Featured software projects by Brandon Temple",
        "itemListElement": data.projects.filter((project) => project.featuredOnSite).map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "SoftwareSourceCode",
                "name": project.title,
                "description": project.siteDescription,
                "codeRepository": project.githubUrl,
                "programmingLanguage": project.siteTags[0],
                "about": project.siteTags
            }
        }))
    };
}

const data = loadProfileData();
renderSite(data);
renderResume(data);
renderLlms(data);
console.log("Rendered static portfolio, resume, and llms.txt content from assets/js/profile-data.js");
