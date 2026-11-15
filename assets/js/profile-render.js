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

    function externalLinkIconSvg(size) {
        return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
            '<path d="M7 17 17 7"/>' +
            '<path d="M9 7h8v8"/>' +
            '<path d="M19 19H5V5h6"/>' +
            "</svg>";
    }

    function linkedinIconSvg(size) {
        return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' +
            '<path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8.25h4.5V23h-4.5V8.25zM8 8.25h4.31v2.02h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-7.24c0-1.73-.03-3.95-2.4-3.95-2.41 0-2.78 1.88-2.78 3.82V23H8V8.25z"/>' +
            "</svg>";
    }

    function instagramIconSvg(size) {
        return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">' +
            '<rect x="3" y="3" width="18" height="18" rx="5"/>' +
            '<circle cx="12" cy="12" r="4"/>' +
            '<circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>' +
            "</svg>";
    }

    function redditIconSvg(size) {
        return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
            '<circle cx="12" cy="13" r="6"/>' +
            '<path d="M14.8 7.6 16 4.5l3 .7"/>' +
            '<circle cx="9.5" cy="12.5" r=".7" fill="currentColor" stroke="none"/>' +
            '<circle cx="14.5" cy="12.5" r=".7" fill="currentColor" stroke="none"/>' +
            '<path d="M9.5 15.5c1.5 1 3.5 1 5 0"/>' +
            '<path d="M5.7 10.5 4 9.2"/>' +
            '<path d="M18.3 10.5 20 9.2"/>' +
            "</svg>";
    }

    function indeedIconSvg(size) {
        return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">' +
            '<circle cx="12" cy="5" r="1.8" fill="currentColor" stroke="none"/>' +
            '<path d="M12 10v9"/>' +
            '<path d="M8.5 12.5c1-1.2 2.2-1.8 3.5-1.8s2.5.6 3.5 1.8"/>' +
            "</svg>";
    }

    function renderList(items) {
        return items.map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
        }).join("");
    }

    function slugify(value) {
        return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    function getAbsoluteSiteUrl(value) {
        if (/^https?:\/\//i.test(value)) {
            return value;
        }
        return "https://brandontemple.com/" + String(value).replace(/^\/+/, "");
    }

    function getSkillLink(data, label) {
        return data.site.skillLinks && data.site.skillLinks[label]
            ? data.site.skillLinks[label]
            : "";
    }

    function getSkillDescription(data, label) {
        return data.site.skillDetails && data.site.skillDetails[label]
            ? data.site.skillDetails[label]
            : "This is a technical concept or tool connected to practical software, automation, data systems, or project work.";
    }

    function findSkillCategory(data, label) {
        var matchingGroup = data.site.skills.find(function (group) {
            return group.items.indexOf(label) !== -1;
        });
        return matchingGroup ? matchingGroup.title : "Project concept";
    }

    function findRelatedProjects(data, label) {
        return data.projects.filter(function (project) {
            return project.featuredOnSite && project.siteTags && project.siteTags.indexOf(label) !== -1;
        });
    }

    function renderRelatedProjects(projects) {
        if (!projects.length) {
            return '<p class="skill-overlay-empty">Related across MSU Libraries tooling, coursework, project work, or Brandon&apos;s engineering workflow.</p>';
        }

        return '<ul class="skill-overlay-work-list">' + projects.map(function (project) {
            var href = getPublicProjectUrl(project);
            var projectName = href
                ? '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(project.title) + "</a>"
                : '<span class="skill-overlay-project-name">' + escapeHtml(project.title) + "</span>";
            return '<li>' +
                projectName +
                '<span>' + escapeHtml(project.siteType) + "</span>" +
                "</li>";
        }).join("") + "</ul>";
    }

    function renderSkillPill(data, label, className) {
        var href = getSkillLink(data, label);
        var linkAttribute = href ? ' data-skill-link="' + escapeHtml(href) + '"' : "";

        return '<button type="button" class="' + escapeHtml(className) + '" data-skill-label="' + escapeHtml(label) + '"' + linkAttribute + ' aria-haspopup="dialog" aria-label="Open details for ' + escapeHtml(label) + '">' + escapeHtml(label) + "</button>";
    }

    var modalBackgroundState = [];

    function setModalBackgroundInert(overlay, isInert) {
        if (isInert) {
            modalBackgroundState = Array.prototype.slice.call(document.body.children)
                .filter(function (element) {
                    return element !== overlay && element.tagName !== "SCRIPT" && element.tagName !== "STYLE";
                })
                .map(function (element) {
                    var state = { element: element, inert: element.inert };
                    element.inert = true;
                    return state;
                });
            return;
        }

        modalBackgroundState.forEach(function (state) {
            state.element.inert = state.inert;
        });
        modalBackgroundState = [];
    }

    function getFocusableElements(container) {
        return Array.prototype.slice.call(container.querySelectorAll(
            'button:not([disabled]):not([hidden]), a[href]:not([hidden]), iframe:not([hidden]), input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])'
        )).filter(function (element) {
            return !element.closest("[hidden]") && window.getComputedStyle(element).visibility !== "hidden";
        });
    }

    function trapModalFocus(event, overlay, panel) {
        if (event.key !== "Tab") {
            return;
        }

        var focusable = getFocusableElements(overlay);
        if (!focusable.length) {
            event.preventDefault();
            panel.focus();
            return;
        }

        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        var activeElement = document.activeElement;
        if (event.shiftKey && (activeElement === first || activeElement === panel || !overlay.contains(activeElement))) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && (activeElement === last || !overlay.contains(activeElement))) {
            event.preventDefault();
            first.focus();
        }
    }

    var activeSkillTrigger = null;

    function openSkillOverlay(data, label, trigger) {
        var overlay = document.getElementById("skill-overlay");
        var panel = document.getElementById("skill-overlay-panel");
        var eyebrow = document.getElementById("skill-overlay-eyebrow");
        var title = document.getElementById("skill-overlay-title");
        var description = document.getElementById("skill-overlay-description");
        var related = document.getElementById("skill-overlay-related");
        var externalLink = document.getElementById("skill-overlay-link");
        var href = getSkillLink(data, label);

        if (!overlay || !panel || !eyebrow || !title || !description || !related || !externalLink) {
            return;
        }

        activeSkillTrigger = trigger || null;
        eyebrow.textContent = findSkillCategory(data, label);
        title.textContent = label;
        description.textContent = getSkillDescription(data, label);
        related.innerHTML = '<p class="skill-overlay-label">Related work</p>' + renderRelatedProjects(findRelatedProjects(data, label));

        if (href) {
            externalLink.href = href;
            externalLink.textContent = "Read external reference";
            externalLink.setAttribute("aria-label", "Read an external reference for " + label + " in a new tab");
            externalLink.hidden = false;
        } else {
            externalLink.removeAttribute("aria-label");
            externalLink.hidden = true;
        }

        overlay.hidden = false;
        overlay.classList.add("is-open");
        document.body.classList.add("skill-overlay-open");
        setModalBackgroundInert(overlay, true);
        window.requestAnimationFrame(function () {
            var closeButton = overlay.querySelector(".skill-overlay-close");
            (closeButton || panel).focus({ preventScroll: true });
        });
    }

    function closeSkillOverlay() {
        var overlay = document.getElementById("skill-overlay");
        if (!overlay || overlay.hidden) {
            return;
        }

        overlay.classList.remove("is-open");
        overlay.hidden = true;
        document.body.classList.remove("skill-overlay-open");
        setModalBackgroundInert(overlay, false);
        if (activeSkillTrigger) {
            activeSkillTrigger.focus({ preventScroll: true });
        }
        activeSkillTrigger = null;
    }

    function setupSkillOverlay(data) {
        var overlay = document.getElementById("skill-overlay");
        if (!overlay || overlay.dataset.ready === "true") {
            return;
        }

        overlay.dataset.ready = "true";
        document.addEventListener("click", function (event) {
            var pill = event.target.closest("[data-skill-label]");
            if (pill) {
                event.preventDefault();
                openSkillOverlay(data, pill.getAttribute("data-skill-label"), pill);
                return;
            }

            if (event.target.closest("[data-skill-overlay-close]")) {
                closeSkillOverlay();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (overlay.hidden) {
                return;
            }

            if (event.key === "Escape") {
                event.preventDefault();
                closeSkillOverlay();
                return;
            }

            trapModalFocus(event, overlay, document.getElementById("skill-overlay-panel"));
        });
    }

    var activeProjectMediaTrigger = null;
    var projectMediaOverlayTriggers = [];
    var projectMediaOverlayIndex = 0;

    function setProjectMediaOverlayAction(link, url, label) {
        if (!link) {
            return;
        }
        if (url) {
            link.href = url;
            link.setAttribute("aria-label", label);
            link.hidden = false;
        } else {
            link.removeAttribute("href");
            link.hidden = true;
        }
    }

    function renderProjectMediaOverlayThumbnails() {
        var thumbnails = document.getElementById("project-media-overlay-thumbnails");
        if (!thumbnails) {
            return;
        }

        thumbnails.hidden = projectMediaOverlayTriggers.length <= 1;
        thumbnails.innerHTML = projectMediaOverlayTriggers.map(function (trigger, index) {
            var sourceImage = trigger.querySelector("img");
            var source = sourceImage ? (sourceImage.currentSrc || sourceImage.src) : "";
            var title = trigger.getAttribute("data-project-media-title") || ("Feature " + (index + 1));
            return '<button type="button" class="project-media-overlay-thumbnail" data-project-media-overlay-index="' + index + '" aria-label="Show feature ' + (index + 1) + ": " + escapeHtml(title) + '">' +
                '<img src="' + escapeHtml(source) + '" alt="" loading="lazy" decoding="async">' +
                "</button>";
        }).join("");
    }

    function showProjectMediaOverlayItem(nextIndex) {
        var image = document.getElementById("project-media-overlay-image");
        var capture = document.getElementById("project-media-overlay-capture");
        var captureStatus = document.getElementById("project-media-overlay-capture-status");
        var captureStatusText = document.getElementById("project-media-overlay-capture-status-text");
        var stage = document.querySelector(".project-media-overlay-stage");
        var project = document.getElementById("project-media-overlay-project");
        var title = document.getElementById("project-media-overlay-title");
        var description = document.getElementById("project-media-overlay-description");
        var count = document.getElementById("project-media-overlay-count");
        var previous = document.querySelector("[data-project-media-previous]");
        var next = document.querySelector("[data-project-media-next]");
        var liveLink = document.getElementById("project-media-overlay-live");
        var sourceLink = document.getElementById("project-media-overlay-source");

        if (!image || !project || !title || !description || !projectMediaOverlayTriggers.length) {
            return;
        }

        projectMediaOverlayIndex = (nextIndex + projectMediaOverlayTriggers.length) % projectMediaOverlayTriggers.length;
        var trigger = projectMediaOverlayTriggers[projectMediaOverlayIndex];
        var sourceImage = trigger.querySelector("img");
        if (!sourceImage) {
            return;
        }

        image.src = trigger.getAttribute("data-project-media-source") || sourceImage.currentSrc || sourceImage.src;
        image.alt = sourceImage.alt;
        project.textContent = trigger.getAttribute("data-project-media-project") || "Project feature";
        title.textContent = trigger.getAttribute("data-project-media-title") || sourceImage.alt;
        description.textContent = trigger.getAttribute("data-project-media-description") || "";

        var captureUrl = trigger.getAttribute("data-project-media-capture-url") || "";
        if (capture && stage && captureUrl) {
            stage.classList.add("is-capture", "is-capture-loading");
            stage.classList.remove("is-capture-ready");
            capture.hidden = false;
            capture.title = title.textContent + " interactive captured interface";
            capture.dataset.currentSource = captureUrl;
            capture.src = captureUrl;
            if (captureStatus) {
                captureStatus.hidden = false;
            }
            if (captureStatusText) {
                captureStatusText.textContent = "Loading scrollable capture";
            }
        } else if (capture && stage) {
            stage.classList.remove("is-capture", "is-capture-loading", "is-capture-ready");
            capture.dataset.currentSource = "";
            capture.src = "about:blank";
            capture.hidden = true;
            capture.title = "Interactive project interface capture";
            if (captureStatus) {
                captureStatus.hidden = true;
            }
        }

        var hasMultipleItems = projectMediaOverlayTriggers.length > 1;
        if (count) {
            count.textContent = "Feature " + (projectMediaOverlayIndex + 1) + " of " + projectMediaOverlayTriggers.length;
            count.hidden = !hasMultipleItems;
        }
        if (previous) {
            previous.hidden = !hasMultipleItems;
        }
        if (next) {
            next.hidden = !hasMultipleItems;
        }

        document.querySelectorAll("[data-project-media-overlay-index]").forEach(function (thumbnail) {
            var isActive = Number(thumbnail.getAttribute("data-project-media-overlay-index")) === projectMediaOverlayIndex;
            thumbnail.classList.toggle("is-active", isActive);
            if (isActive) {
                thumbnail.setAttribute("aria-current", "true");
            } else {
                thumbnail.removeAttribute("aria-current");
            }
        });

        var projectName = project.textContent;
        setProjectMediaOverlayAction(
            liveLink,
            trigger.getAttribute("data-project-media-live-url") || "",
            "Open the live " + projectName + " project in a new tab"
        );
        setProjectMediaOverlayAction(
            sourceLink,
            trigger.getAttribute("data-project-media-source-url") || "",
            "View source for " + projectName + " in a new tab"
        );
    }

    function openProjectMediaOverlay(trigger) {
        var overlay = document.getElementById("project-media-overlay");
        var panel = document.getElementById("project-media-overlay-panel");
        var gallery = trigger ? trigger.closest("[data-project-gallery]") : null;

        if (!overlay || !panel || !trigger || !trigger.querySelector("img")) {
            return;
        }

        activeProjectMediaTrigger = trigger;
        projectMediaOverlayTriggers = gallery
            ? Array.prototype.slice.call(gallery.querySelectorAll("[data-project-media-trigger]"))
            : [trigger];
        projectMediaOverlayIndex = Math.max(0, projectMediaOverlayTriggers.indexOf(trigger));
        renderProjectMediaOverlayThumbnails();
        showProjectMediaOverlayItem(projectMediaOverlayIndex);

        overlay.hidden = false;
        overlay.classList.add("is-open");
        document.body.classList.add("project-media-overlay-open");
        setModalBackgroundInert(overlay, true);
        document.dispatchEvent(new Event("projectmedia:opened"));
        window.requestAnimationFrame(function () {
            var closeButton = overlay.querySelector(".project-media-overlay-close");
            (closeButton || panel).focus({ preventScroll: true });
        });
    }

    function closeProjectMediaOverlay() {
        var overlay = document.getElementById("project-media-overlay");
        var image = document.getElementById("project-media-overlay-image");
        var capture = document.getElementById("project-media-overlay-capture");
        var captureStatus = document.getElementById("project-media-overlay-capture-status");
        var stage = document.querySelector(".project-media-overlay-stage");
        if (!overlay || overlay.hidden) {
            return;
        }

        overlay.classList.remove("is-open");
        overlay.hidden = true;
        document.body.classList.remove("project-media-overlay-open");
        setModalBackgroundInert(overlay, false);
        document.dispatchEvent(new Event("projectmedia:closed"));
        if (image) {
            image.removeAttribute("src");
            image.alt = "";
        }
        if (capture) {
            capture.dataset.currentSource = "";
            capture.src = "about:blank";
            capture.hidden = true;
            capture.title = "Interactive project interface capture";
        }
        if (captureStatus) {
            captureStatus.hidden = true;
        }
        if (stage) {
            stage.classList.remove("is-capture", "is-capture-loading", "is-capture-ready");
        }
        var thumbnails = document.getElementById("project-media-overlay-thumbnails");
        if (thumbnails) {
            thumbnails.innerHTML = "";
        }
        if (activeProjectMediaTrigger) {
            activeProjectMediaTrigger.focus({ preventScroll: true });
        }
        activeProjectMediaTrigger = null;
        projectMediaOverlayTriggers = [];
        projectMediaOverlayIndex = 0;
    }

    function setupProjectMediaOverlay() {
        var overlay = document.getElementById("project-media-overlay");
        if (!overlay || overlay.dataset.ready === "true") {
            return;
        }

        overlay.dataset.ready = "true";
        var capture = document.getElementById("project-media-overlay-capture");
        if (capture) {
            capture.addEventListener("load", function () {
                var stage = capture.closest(".project-media-overlay-stage");
                var captureStatusText = document.getElementById("project-media-overlay-capture-status-text");
                if (!stage || !capture.dataset.currentSource || capture.src === "about:blank") {
                    return;
                }
                var expectedSource = new URL(capture.dataset.currentSource, window.location.href).href;
                if (!capture.contentWindow || capture.contentWindow.location.href !== expectedSource) {
                    return;
                }
                stage.classList.remove("is-capture-loading");
                stage.classList.add("is-capture-ready");
                if (captureStatusText) {
                    captureStatusText.textContent = "Scrollable capture - scroll to explore";
                }
            });
        }

        document.addEventListener("click", function (event) {
            var projectOpen = event.target.closest("[data-project-open]");
            if (projectOpen) {
                var projectCard = document.getElementById(projectOpen.getAttribute("data-project-open"));
                var firstMedia = projectCard && projectCard.querySelector("[data-project-media-trigger]");
                if (firstMedia) {
                    openProjectMediaOverlay(firstMedia);
                    activeProjectMediaTrigger = projectOpen;
                }
                return;
            }
            var mediaTrigger = event.target.closest("[data-project-media-trigger]");
            if (mediaTrigger) {
                event.preventDefault();
                openProjectMediaOverlay(mediaTrigger);
                return;
            }

            if (event.target.closest("[data-project-media-previous]")) {
                showProjectMediaOverlayItem(projectMediaOverlayIndex - 1);
                return;
            }

            if (event.target.closest("[data-project-media-next]")) {
                showProjectMediaOverlayItem(projectMediaOverlayIndex + 1);
                return;
            }

            var overlayThumbnail = event.target.closest("[data-project-media-overlay-index]");
            if (overlayThumbnail) {
                showProjectMediaOverlayItem(Number(overlayThumbnail.getAttribute("data-project-media-overlay-index")));
                return;
            }

            if (event.target.closest("[data-project-media-close]")) {
                closeProjectMediaOverlay();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                event.preventDefault();
                closeProjectMediaOverlay();
                return;
            }

            if (overlay.hidden) {
                return;
            }

            if (event.key === "ArrowLeft" && projectMediaOverlayTriggers.length > 1) {
                event.preventDefault();
                showProjectMediaOverlayItem(projectMediaOverlayIndex - 1);
                return;
            }

            if (event.key === "ArrowRight" && projectMediaOverlayTriggers.length > 1) {
                event.preventDefault();
                showProjectMediaOverlayItem(projectMediaOverlayIndex + 1);
                return;
            }

            trapModalFocus(event, overlay, document.getElementById("project-media-overlay-panel"));
        });
    }

    function getGridColumnCount(grid) {
        var columns = window.getComputedStyle(grid).gridTemplateColumns;
        if (!columns || columns === "none") {
            return 1;
        }
        return columns.split(" ").filter(Boolean).length || 1;
    }

    function resetGridFill(item) {
        item.classList.remove("grid-row-fill");
        item.style.removeProperty("--grid-row-fill-span");
    }

    function balanceCardGrid(grid) {
        var items = Array.prototype.slice.call(grid.children);
        items.forEach(resetGridFill);
        if (items.length < 2) {
            return;
        }

        var columnCount = getGridColumnCount(grid);
        if (columnCount <= 1 || items.length <= columnCount) {
            return;
        }

        var rowTops = items.map(function (item) {
            return Math.round(item.getBoundingClientRect().top);
        });
        var lastRowTop = rowTops[rowTops.length - 1];
        var lastRowCount = rowTops.filter(function (top) {
            return Math.abs(top - lastRowTop) <= 2;
        }).length;
        if (lastRowCount >= columnCount) {
            return;
        }

        var lastItem = items[items.length - 1];
        var span = columnCount - lastRowCount + 1;
        lastItem.classList.add("grid-row-fill");
        lastItem.style.setProperty("--grid-row-fill-span", String(span));
    }

    function balanceCardGrids() {
        document.querySelectorAll(".skills-grid, .project-more-grid").forEach(balanceCardGrid);
    }

    var balanceGridRequest = 0;
    function scheduleBalanceCardGrids() {
        window.cancelAnimationFrame(balanceGridRequest);
        balanceGridRequest = window.requestAnimationFrame(balanceCardGrids);
    }

    function hasPublicRepository(project) {
        return project.githubUrl && project.repositoryVisibility !== "private";
    }

    function getPublicProjectUrl(project) {
        return project.liveUrl || (hasPublicRepository(project) ? project.githubUrl : "");
    }

    function getProjectMedia(project) {
        var media = [];
        if (project.mediaUrl) media.push({
            url: project.mediaUrl,
            alt: project.mediaAlt || (project.title + " interface"),
            title: project.mediaTitle || project.mediaAlt || project.title,
            description: project.mediaDescription || project.siteDescription || "",
            width: project.mediaWidth || 1440,
            height: project.mediaHeight || 900,
            captureUrl: project.mediaCaptureUrl || ""
        });
        (project.mediaAlternates || []).forEach(function (item) {
            if (item.url) media.push(item);
        });
        return media;
    }

    function renderProjectVisual(project, eager) {
        var media = getProjectMedia(project);
        if (!media.length) return "";
        var frames = media.map(function (item, index) {
            var live = project.liveUrl ? ' data-project-media-live-url="' + escapeHtml(project.liveUrl) + '"' : "";
            var source = hasPublicRepository(project) ? ' data-project-media-source-url="' + escapeHtml(project.githubUrl) + '"' : "";
            var capture = item.captureUrl ? ' data-project-media-capture-url="' + escapeHtml(item.captureUrl) + '"' : "";
            var title = item.title || item.alt || project.title;
            return '<button class="project-media-frame' + (index === 0 ? ' is-active' : '') + '" type="button" data-project-media-trigger data-gallery-frame data-gallery-index="' + index + '" data-project-media-source="' + escapeHtml(item.url) + '" data-project-media-project="' + escapeHtml(project.title) + '" data-project-media-title="' + escapeHtml(title) + '" data-project-media-description="' + escapeHtml(item.description || project.siteDescription) + '"' + live + source + capture + ' aria-hidden="' + (index === 0 ? 'false' : 'true') + '" tabindex="' + (index === 0 ? '0' : '-1') + '" aria-haspopup="dialog" aria-label="View project details: ' + escapeHtml(title) + '">' +
                '<img class="project-media-frame-image" src="' + escapeHtml(item.url) + '" alt="' + escapeHtml(item.alt || title) + '" width="' + (item.width || 1440) + '" height="' + (item.height || 900) + '" loading="' + (eager && index === 0 ? 'eager' : 'lazy') + '" decoding="async">' +
                '<span class="project-media-view-cue" aria-hidden="true">Explore project ' + externalLinkIconSvg(15) + '</span></button>';
        }).join("");
        return '<figure class="project-media" data-project-gallery role="group" aria-label="Views of ' + escapeHtml(project.title) + '">' + frames + '</figure>';
    }

    function renderProjectActions(project) {
        var actions = [];
        if (project.liveUrl) actions.push('<a class="project-action" href="' + escapeHtml(project.liveUrl) + '" target="_blank" rel="noopener" aria-label="Open the live ' + escapeHtml(project.title) + ' project in a new tab">Live project ' + externalLinkIconSvg(16) + '</a>');
        if (hasPublicRepository(project)) actions.push('<a class="project-action" href="' + escapeHtml(project.githubUrl) + '" target="_blank" rel="noopener" aria-label="View source for ' + escapeHtml(project.title) + ' in a new tab">Source ' + externalLinkIconSvg(16) + '</a>');
        if (!actions.length) actions.push('<span class="project-private">Private project</span>');
        return '<div class="project-actions">' + actions.join("") + '</div>';
    }

    function renderProjectCard(data, project) {
        var phone = project.mediaPresentation === 'phone';
        var id = 'project-' + slugify(project.title);
        var status = project.siteStatus ? '<span class="project-status">' + escapeHtml(project.siteStatus) + '</span>' : '';
        var context = project.siteCaption ? '<p class="project-context">' + escapeHtml(project.siteCaption) + '</p>' : '';
        var summary = project.siteSummary ? '<p class="project-summary">' + escapeHtml(project.siteSummary) + '</p>' : '';
        var action = '<button class="project-action" type="button" data-project-open="' + id + '" aria-haspopup="dialog" aria-label="View project: ' + escapeHtml(project.displayTitle || project.title) + '">View project ' + externalLinkIconSvg(16) + '</button>';
        var heading = '<h3>' + escapeHtml(project.displayTitle || project.title) + '</h3>';
        var copy = phone
            ? status + '<div class="project-caption">' + heading + '</div>' + summary + action
            : '<div class="project-caption"><div>' + heading + context + '</div>' + action + '</div>' + summary;
        return '<article class="project-card project-card-selected' + (phone ? ' project-card-phone' : '') + '" id="' + id + '">' +
            renderProjectVisual(project, project.siteOrder === 1) + '<div class="project-body">' + copy + '</div></article>';
    }

    function renderAdditionalProject(project) {
        return '<details class="project-row" id="project-' + slugify(project.title) + '"><summary><h3>' + escapeHtml(project.title) + '</h3><span>' + escapeHtml(project.siteIndexLabel || project.siteType) + '</span></summary>' +
            '<div class="project-row-detail"><p>' + escapeHtml(project.siteDescription) + '</p>' + renderProjectActions(project) + renderProjectVisual(project, false) + '</div></details>';
    }

    function renderProjectStructuredData(data) {
        var existingScript = document.getElementById("project-structured-data");
        var script = existingScript || document.createElement("script");
        var featuredProjects = data.projects.filter(function (project) {
            return project.featuredOnSite;
        }).sort(function (first, second) {
            var firstTier = first.siteTier === "selected" ? 0 : 1;
            var secondTier = second.siteTier === "selected" ? 0 : 1;
            if (firstTier !== secondTier) {
                return firstTier - secondTier;
            }
            return (first.siteOrder || 100) - (second.siteOrder || 100);
        });
        var structuredData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": "https://brandontemple.com/#software-projects",
            name: "Brandon Temple software projects",
            itemListElement: featuredProjects.map(function (project, index) {
                var projectId = "project-" + slugify(project.title);
                var projectUrl = getPublicProjectUrl(project) || ("https://brandontemple.com/#" + projectId);
                var item = {
                    "@type": "SoftwareSourceCode",
                    "@id": "https://brandontemple.com/#" + projectId,
                    name: project.title,
                    description: project.siteDescription,
                    url: projectUrl,
                    keywords: project.siteTags || [],
                    isPartOf: {
                        "@id": "https://brandontemple.com/#webpage"
                    },
                    author: {
                        "@id": "https://brandontemple.com/#brandon-temple"
                    }
                };
                var programmingLanguages = (project.siteTags || []).filter(function (tag) {
                    return ["C#", "C++", "JavaScript", "Python", "PowerShell", "Shell", "Swift"].indexOf(tag) !== -1;
                });

                if (hasPublicRepository(project)) {
                    item.codeRepository = project.githubUrl;
                }
                if (programmingLanguages.length) {
                    item.programmingLanguage = programmingLanguages;
                }
                var projectMedia = getProjectMedia(project);
                if (projectMedia.length) {
                    item.image = projectMedia.map(function (mediaItem) {
                        return {
                            "@type": "ImageObject",
                            contentUrl: getAbsoluteSiteUrl(mediaItem.url),
                            caption: mediaItem.title,
                            description: mediaItem.description,
                            width: mediaItem.width,
                            height: mediaItem.height
                        };
                    });
                }

                return {
                    "@type": "ListItem",
                    position: index + 1,
                    item: item
                };
            })
        };

        script.id = "project-structured-data";
        script.type = "application/ld+json";
        script.text = JSON.stringify(structuredData);
        if (!existingScript) {
            document.head.appendChild(script);
        }
    }

    function renderSite() {
        var data = window.profileData;
        var aboutText = document.getElementById("about-text");
        var skillsGrid = document.getElementById("skills-grid");
        var experienceTimeline = document.getElementById("experience-timeline");
        var projectsGrid = document.getElementById("projects-grid");
        var educationGrid = document.getElementById("education-grid");
        var contactIntro = document.getElementById("contact-intro");
        var contactActions = document.getElementById("contact-actions");
        var contactInfo = document.getElementById("contact-info");
        if (!aboutText || !skillsGrid || !experienceTimeline || !projectsGrid || !educationGrid || !contactIntro || !contactActions || !contactInfo) return;

        aboutText.innerHTML = data.site.about.map(function (paragraph) { return '<p>' + escapeHtml(paragraph) + '</p>'; }).join('');
        skillsGrid.innerHTML = data.site.skills.map(function (group) {
            return '<section class="skill-category"><h3>' + escapeHtml(group.title) + '</h3><p>' + group.items.map(escapeHtml).join(', ') + '</p></section>';
        }).join('');
        experienceTimeline.innerHTML = data.experience.professional.map(function (role) {
            var links = role.links ? '<div class="timeline-role-links">' + role.links.map(function (link) {
                return '<a href="' + escapeHtml(link.url) + '" target="_blank" rel="noopener">' + escapeHtml(link.label) + '</a>';
            }).join('') + '</div>' : '';
            return '<details class="experience-row"><summary><h3>' + escapeHtml(role.title) + '</h3><span class="experience-meta">' + escapeHtml(role.organization + ' · ' + role.date) + '</span></summary>' + links + '<ul class="timeline-list">' + renderList(role.bullets) + '</ul></details>';
        }).join('');

        var projects = data.projects.filter(function (project) { return project.featuredOnSite; }).sort(function (a, b) { return (a.siteOrder || 100) - (b.siteOrder || 100); });
        projectsGrid.innerHTML = '<div class="project-showcase">' + projects.filter(function (project) { return project.siteTier === 'selected'; }).map(function (project) { return renderProjectCard(data, project); }).join('') + '</div>' +
            '<section class="project-more" aria-labelledby="more-work-title"><h2 id="more-work-title">More work</h2>' + projects.filter(function (project) { return project.siteTier !== 'selected'; }).map(renderAdditionalProject).join('') + '</section>';
        setupProjectMediaOverlay();

        educationGrid.innerHTML = data.education.map(function (item) {
            return '<div class="education-card"><h3>' + escapeHtml(item.degree) + '</h3><p>' + escapeHtml(item.school) + '</p><p>' + escapeHtml(item.date) + '</p></div>';
        }).join('');
        contactIntro.textContent = data.site.contactIntro;
        contactActions.innerHTML = '<a href="mailto:' + escapeHtml(data.contact.email) + '" class="btn btn-primary">Email me</a><a class="text-link" href="/resume/brandon-temple-resume.pdf" download type="application/pdf">Download resume</a>';
        contactInfo.innerHTML = '<a href="' + escapeHtml(data.contact.githubUrl) + '" target="_blank" rel="me noopener">GitHub</a><a href="' + escapeHtml(data.contact.linkedinUrl) + '" target="_blank" rel="me noopener">LinkedIn</a>';
        renderProjectStructuredData(data);
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
            '<p><a href="' + escapeHtml(data.contact.websiteUrl) + '">' + escapeHtml(data.contact.websiteLabel) + "</a></p>" +
            '<p><a href="' + escapeHtml(data.contact.githubUrl) + '">' + escapeHtml(data.contact.githubLabel) + "</a></p>";

        skills.innerHTML = data.resume.skills.map(function (group) {
            return "<p><span>" + escapeHtml(group.label) + "</span> " + escapeHtml(group.value) + "</p>";
        }).join("");

        experience.innerHTML = data.experience.professional.map(function (role) {
            return '<article class="entry">' +
                '<div class="entry-header">' +
                "<div>" +
                "<h3>" + escapeHtml(role.title) + "</h3>" +
                '<p class="meta">' + escapeHtml(role.organization + " | " + role.location + " | " + role.date) + "</p>" +
                "</div>" +
                "</div>" +
                "<ul>" + renderList(role.bullets) + "</ul>" +
                "</article>";
        }).join("");

        additionalExperience.innerHTML = data.experience.additional.filter(function (role) {
            return role.featuredOnResume !== false;
        }).map(function (role) {
            return '<article class="entry compact">' +
                '<div class="entry-header">' +
                "<div>" +
                "<h3>" + escapeHtml(role.title) + "</h3>" +
                '<p class="meta">' + escapeHtml(role.organization + " | " + role.date) + "</p>" +
                "</div>" +
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
                '<p class="meta">' + escapeHtml(item.school + " | " + item.date) + "</p>" +
                "</div>" +
                "</div>" +
                '<p class="detail">' + escapeHtml(item.location + " | GPA: " + item.gpa) + "</p>" +
                honors +
                "</article>";
        }).join("");

        projects.innerHTML = data.projects.filter(function (project) {
            return project.featuredOnResume;
        }).map(function (project) {
            var href = getPublicProjectUrl(project);
            var linkMarkup = href
                ? '<p class="project-link"><a href="' + escapeHtml(href) + '">' + escapeHtml(href.replace(/^https?:\/\//, "")) + "</a></p>"
                : "";
            return '<article class="project">' +
                "<h3>" + escapeHtml(project.title) + "</h3>" +
                '<p class="project-subtitle">' + escapeHtml(project.resumeSubtitle) + "</p>" +
                "<p>" + escapeHtml(project.resumeDescription) + "</p>" +
                linkMarkup +
                "</article>";
        }).join("");
    }

    if (document.body && document.body.dataset.page === "site") {
        renderSite();
        window.addEventListener("load", scheduleBalanceCardGrids);
        window.addEventListener("resize", scheduleBalanceCardGrids);
    }

    if (document.body && document.body.dataset.page === "resume") {
        renderResume();
    }
})();
