(function () {
    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function githubIconSvg(size) {
        return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' +
            '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>' +
            "</svg>";
    }

    function instagramIconSvg(size) {
        return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">' +
            '<rect x="3" y="3" width="18" height="18" rx="5"/>' +
            '<circle cx="12" cy="12" r="4"/>' +
            '<circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>' +
            "</svg>";
    }

    function renderList(items) {
        return items.map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
        }).join("");
    }

    function renderSite() {
        var data = window.profileData;
        var aboutText = document.getElementById("about-text");
        var skillsGrid = document.getElementById("skills-grid");
        var experienceTimeline = document.getElementById("experience-timeline");
        var projectsGrid = document.getElementById("projects-grid");
        var educationGrid = document.getElementById("education-grid");
        var contactIntro = document.getElementById("contact-intro");
        var contactInfo = document.getElementById("contact-info");
        if (!aboutText || !skillsGrid || !experienceTimeline || !projectsGrid || !educationGrid || !contactIntro || !contactInfo) {
            return;
        }

        aboutText.innerHTML = data.site.about.map(function (paragraph) {
            return "<p>" + escapeHtml(paragraph) + "</p>";
        }).join("");

        skillsGrid.innerHTML = data.site.skills.map(function (group) {
            return '<div class="skill-category">' +
                "<h3>" + escapeHtml(group.title) + "</h3>" +
                '<div class="skill-tags">' +
                group.items.map(function (item) {
                    return "<span>" + escapeHtml(item) + "</span>";
                }).join("") +
                "</div>" +
                "</div>";
        }).join("");

        experienceTimeline.innerHTML = data.experience.professional.map(function (role) {
            return '<div class="timeline-item">' +
                '<div class="timeline-marker"></div>' +
                '<div class="timeline-content">' +
                '<div class="timeline-header">' +
                "<h3>" + escapeHtml(role.title) + "</h3>" +
                '<span class="timeline-date">' + escapeHtml(role.date) + "</span>" +
                "</div>" +
                '<p class="timeline-company">' + escapeHtml(role.organization + " | " + role.location) + "</p>" +
                '<ul class="timeline-list">' + renderList(role.bullets) + "</ul>" +
                "</div>" +
                "</div>";
        }).join("");

        projectsGrid.innerHTML = data.projects.filter(function (project) {
            return project.featuredOnSite;
        }).map(function (project) {
            return '<div class="project-card">' +
                '<div class="project-header">' +
                "<h3>" + escapeHtml(project.title) + "</h3>" +
                '<a href="' + escapeHtml(project.githubUrl) + '" target="_blank" rel="noopener" aria-label="View ' + escapeHtml(project.title) + ' on GitHub" class="project-link">' +
                githubIconSvg(20) +
                "</a>" +
                "</div>" +
                '<p class="project-type">' + escapeHtml(project.siteType) + "</p>" +
                '<p class="project-description">' + escapeHtml(project.siteDescription) + "</p>" +
                '<div class="project-tags">' +
                project.siteTags.map(function (tag) {
                    return "<span>" + escapeHtml(tag) + "</span>";
                }).join("") +
                "</div>" +
                "</div>";
        }).join("");

        educationGrid.innerHTML = data.education.map(function (item) {
            var inlineHonors = item.inlineHonors ? '<p class="education-honors">' + escapeHtml(item.inlineHonors) + "</p>" : "";
            var honorsList = item.honorsLines ? '<p class="education-honors-list">' + item.honorsLines.map(escapeHtml).join("<br>") + "</p>" : "";
            return '<div class="education-card">' +
                '<div class="education-icon" aria-hidden="true">🎓</div>' +
                "<h3>" + escapeHtml(item.degree) + "</h3>" +
                inlineHonors +
                '<p class="education-school">' + escapeHtml(item.school) + "</p>" +
                '<p class="education-location">' + escapeHtml(item.location) + "</p>" +
                '<p class="education-date">' + escapeHtml(item.date) + "</p>" +
                '<p class="education-gpa">GPA: ' + escapeHtml(item.gpa) + "</p>" +
                honorsList +
                "</div>";
        }).join("");

        contactIntro.textContent = data.site.contactIntro;
        contactInfo.innerHTML =
            '<a href="mailto:' + escapeHtml(data.contact.email) + '" class="contact-item">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">' +
            '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>' +
            '<polyline points="22,6 12,13 2,6"/>' +
            "</svg>" +
            "<span>" + escapeHtml(data.contact.email) + "</span>" +
            "</a>" +
            '<a href="' + escapeHtml(data.contact.githubUrl) + '" target="_blank" rel="me noopener" class="contact-item">' +
            githubIconSvg(24) +
            "<span>" + escapeHtml(data.contact.githubLabel) + "</span>" +
            "</a>" +
            '<a href="' + escapeHtml(data.contact.instagramUrl) + '" target="_blank" rel="me noopener" class="contact-item">' +
            instagramIconSvg(24) +
            "<span>" + escapeHtml(data.contact.instagramLabel) + "</span>" +
            "</a>" +
            '<div class="contact-item">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">' +
            '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>' +
            '<circle cx="12" cy="10" r="3"/>' +
            "</svg>" +
            "<span>" + escapeHtml(data.contact.location) + "</span>" +
            "</div>";
    }

    function renderResume() {
        var data = window.profileData;
        var summary = document.getElementById("resume-summary");
        var contact = document.getElementById("resume-contact");
        var skills = document.getElementById("resume-skills");
        var experience = document.getElementById("resume-experience");
        var additionalExperience = document.getElementById("resume-additional-experience");
        var education = document.getElementById("resume-education");
        var projects = document.getElementById("resume-projects");
        if (!summary || !contact || !skills || !experience || !additionalExperience || !education || !projects) {
            return;
        }

        summary.textContent = data.resume.summary;
        contact.innerHTML =
            "<p>" + escapeHtml(data.contact.location) + "</p>" +
            '<p><a href="mailto:' + escapeHtml(data.contact.email) + '">' + escapeHtml(data.contact.email) + "</a></p>" +
            '<p><a href="' + escapeHtml(data.contact.githubUrl) + '">' + escapeHtml(data.contact.githubLabel) + "</a></p>";

        skills.innerHTML = data.resume.skills.map(function (group) {
            return "<p><span>" + escapeHtml(group.label) + "</span> " + escapeHtml(group.value) + "</p>";
        }).join("");

        experience.innerHTML = data.experience.professional.map(function (role) {
            return '<article class="entry">' +
                '<div class="entry-header">' +
                "<div>" +
                "<h3>" + escapeHtml(role.title) + "</h3>" +
                '<p class="meta">' + escapeHtml(role.organization + " | " + role.location) + "</p>" +
                "</div>" +
                '<p class="date">' + escapeHtml(role.date) + "</p>" +
                "</div>" +
                "<ul>" + renderList(role.bullets) + "</ul>" +
                "</article>";
        }).join("");

        additionalExperience.innerHTML = data.experience.additional.map(function (role) {
            return '<article class="entry compact">' +
                '<div class="entry-header">' +
                "<div>" +
                "<h3>" + escapeHtml(role.title) + "</h3>" +
                '<p class="meta">' + escapeHtml(role.organization) + "</p>" +
                "</div>" +
                '<p class="date">' + escapeHtml(role.date) + "</p>" +
                "</div>" +
                "<ul>" + renderList(role.bullets) + "</ul>" +
                "</article>";
        }).join("");

        education.innerHTML = data.education.map(function (item) {
            var degree = item.resumeDegree || item.degree;
            var honors = item.honorsLines ? item.honorsLines.map(function (line) {
                return '<p class="detail">' + escapeHtml(line) + "</p>";
            }).join("") : "";
            return '<article class="entry compact">' +
                '<div class="entry-header">' +
                "<div>" +
                "<h3>" + escapeHtml(degree) + "</h3>" +
                '<p class="meta">' + escapeHtml(item.school) + "</p>" +
                "</div>" +
                '<p class="date">' + escapeHtml(item.date) + "</p>" +
                "</div>" +
                '<p class="detail">' + escapeHtml(item.location + " | GPA: " + item.gpa) + "</p>" +
                honors +
                "</article>";
        }).join("");

        projects.innerHTML = data.projects.filter(function (project) {
            return project.featuredOnResume;
        }).map(function (project) {
            return '<article class="project">' +
                "<h3>" + escapeHtml(project.title) + "</h3>" +
                '<p class="project-subtitle">' + escapeHtml(project.resumeSubtitle) + "</p>" +
                "<p>" + escapeHtml(project.resumeDescription) + "</p>" +
                '<p class="project-link"><a href="' + escapeHtml(project.githubUrl) + '">' + escapeHtml(project.githubUrl.replace(/^https?:\/\//, "")) + "</a></p>" +
                "</article>";
        }).join("");
    }

    if (document.body && document.body.dataset.page === "site") {
        renderSite();
    }

    if (document.body && document.body.dataset.page === "resume") {
        renderResume();
    }
})();
