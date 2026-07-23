(function () {
    var projectMediaVersion = "20260723-aa-captures";

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
            externalLink.hidden = false;
        } else {
            externalLink.hidden = true;
        }

        overlay.hidden = false;
        overlay.classList.add("is-open");
        document.body.classList.add("skill-overlay-open");
        window.requestAnimationFrame(function () {
            panel.focus({ preventScroll: true });
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
            if (event.key === "Escape") {
                closeSkillOverlay();
            }
        });
    }

    var activeProjectMediaTrigger = null;

    function openProjectMediaOverlay(trigger) {
        var overlay = document.getElementById("project-media-overlay");
        var panel = document.getElementById("project-media-overlay-panel");
        var image = document.getElementById("project-media-overlay-image");
        var project = document.getElementById("project-media-overlay-project");
        var title = document.getElementById("project-media-overlay-title");
        var description = document.getElementById("project-media-overlay-description");
        var sourceImage = trigger ? trigger.querySelector("img") : null;

        if (!overlay || !panel || !image || !project || !title || !description || !trigger || !sourceImage) {
            return;
        }

        activeProjectMediaTrigger = trigger;
        image.src = trigger.getAttribute("data-project-media-source") || sourceImage.currentSrc || sourceImage.src;
        image.alt = sourceImage.alt;
        project.textContent = trigger.getAttribute("data-project-media-project") || "Project feature";
        title.textContent = trigger.getAttribute("data-project-media-title") || sourceImage.alt;
        description.textContent = trigger.getAttribute("data-project-media-description") || "";

        overlay.hidden = false;
        overlay.classList.add("is-open");
        document.body.classList.add("project-media-overlay-open");
        document.dispatchEvent(new Event("projectmedia:opened"));
        window.requestAnimationFrame(function () {
            panel.focus({ preventScroll: true });
        });
    }

    function closeProjectMediaOverlay() {
        var overlay = document.getElementById("project-media-overlay");
        var image = document.getElementById("project-media-overlay-image");
        if (!overlay || overlay.hidden) {
            return;
        }

        overlay.classList.remove("is-open");
        overlay.hidden = true;
        document.body.classList.remove("project-media-overlay-open");
        document.dispatchEvent(new Event("projectmedia:closed"));
        if (image) {
            image.removeAttribute("src");
            image.alt = "";
        }
        if (activeProjectMediaTrigger) {
            activeProjectMediaTrigger.focus({ preventScroll: true });
        }
        activeProjectMediaTrigger = null;
    }

    function setupProjectMediaOverlay() {
        var overlay = document.getElementById("project-media-overlay");
        if (!overlay || overlay.dataset.ready === "true") {
            return;
        }

        overlay.dataset.ready = "true";
        document.addEventListener("click", function (event) {
            var mediaTrigger = event.target.closest("[data-project-media-trigger]");
            if (mediaTrigger) {
                event.preventDefault();
                openProjectMediaOverlay(mediaTrigger);
                return;
            }

            if (event.target.closest("[data-project-media-close]")) {
                closeProjectMediaOverlay();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeProjectMediaOverlay();
                return;
            }

            if (event.key === "Tab" && !overlay.hidden) {
                var closeButton = overlay.querySelector("[data-project-media-close]");
                if (closeButton) {
                    event.preventDefault();
                    closeButton.focus();
                }
            }
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

    function getProjectMediaVariants(url) {
        var sourcePath = String(url).split("?")[0];
        var stem = sourcePath.replace(/\.webp$/i, "");
        var version = "?v=" + projectMediaVersion;

        return {
            portrait: stem + "--4x5.webp" + version,
            standard: stem + "--4x3.webp" + version,
            wide: stem + "--16x10.webp" + version,
            square: stem + "--1x1.webp" + version
        };
    }

    function getProjectMedia(project) {
        var media = [];

        if (project.mediaUrl) {
            media.push({
                url: project.mediaUrl,
                alt: project.mediaAlt || (project.title + " interface"),
                title: project.mediaTitle || project.mediaAlt || (project.title + " interface"),
                description: project.mediaDescription || project.siteDescription || "",
                width: project.mediaWidth || 1200,
                height: project.mediaHeight || 750,
                fit: project.mediaFit || "cover",
                variants: getProjectMediaVariants(project.mediaUrl)
            });
        }

        (project.mediaAlternates || []).forEach(function (item) {
            if (item.url) {
                media.push({
                    url: item.url,
                    alt: item.alt || (project.title + " project view"),
                    title: item.title || item.alt || (project.title + " project view"),
                    description: item.description || project.siteDescription || "",
                    width: item.width || 1200,
                    height: item.height || 750,
                    fit: item.fit || "cover",
                    variants: getProjectMediaVariants(item.url)
                });
            }
        });

        return media;
    }

    function renderProjectMediaFrame(item, index, project, tier) {
        var activeClass = index === 0 ? " is-active" : "";
        var fitClass = item.fit === "contain" ? " project-media-frame-fit-contain" : "";
        var isLead = tier === "selected" && project.siteOrder === 1;
        var isEditorial = project.mediaEditorial === true;
        var desktopSource;

        if (isEditorial) {
            desktopSource = '<source media="(min-width: 769px)" type="image/webp" srcset="' + escapeHtml(item.variants.portrait) + '">';
        } else if (isLead) {
            desktopSource = '<source media="(min-width: 1280px)" type="image/webp" srcset="' + escapeHtml(item.variants.portrait) + '">';
        } else {
            desktopSource = '<source media="(min-width: 1101px)" type="image/webp" srcset="' + escapeHtml(item.variants.wide) + '">';
        }

        return '<button class="project-media-frame project-media-responsive' + activeClass + fitClass + '" type="button" data-gallery-frame data-gallery-index="' + index + '" data-project-media-trigger data-project-media-source="' + escapeHtml(item.url) + '" data-project-media-project="' + escapeHtml(project.title) + '" data-project-media-title="' + escapeHtml(item.title) + '" data-project-media-description="' + escapeHtml(item.description) + '" aria-hidden="' + (index === 0 ? "false" : "true") + '" aria-haspopup="dialog" aria-label="View feature details: ' + escapeHtml(item.title) + '" tabindex="' + (index === 0 ? "0" : "-1") + '">' +
            '<picture class="project-media-picture">' +
            desktopSource +
            '<source media="(min-width: 481px)" type="image/webp" srcset="' + escapeHtml(item.variants.standard) + '">' +
            '<img class="project-media-frame-image" src="' + escapeHtml(item.variants.square) + '" alt="' + escapeHtml(item.alt) + '" width="960" height="960" loading="lazy" decoding="async">' +
            "</picture>" +
            '<span class="project-media-view-cue" aria-hidden="true">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5"/></svg>' +
            "<span>View feature</span>" +
            "</span>" +
            '<span class="project-media-frame-summary">' + escapeHtml(item.title + ". " + item.description) + "</span>" +
            "</button>";
    }

    function renderProjectVisual(project, tier) {
        var media = getProjectMedia(project);

        if (media.length) {
            var isGallery = media.length > 1;
            var galleryClass = isGallery ? " project-media-gallery" : "";
            var galleryAttributes = isGallery
                ? ' data-project-gallery role="group" aria-label="Rotating views of ' + escapeHtml(project.title) + '"'
                : "";
            var frames = media.map(function (item, index) {
                return renderProjectMediaFrame(item, index, project, tier);
            }).join("");
            var controls = isGallery
                ? '<div class="project-gallery-controls">' +
                    '<span class="project-gallery-count" data-gallery-count aria-hidden="true">1 / ' + media.length + "</span>" +
                    '<span class="project-gallery-dots">' + media.map(function (item, index) {
                        return '<button class="project-gallery-dot' + (index === 0 ? " is-active" : "") + '" type="button" data-gallery-dot="' + index + '" aria-label="Show image ' + (index + 1) + " of " + media.length + ": " + escapeHtml(item.title) + '"' + (index === 0 ? ' aria-current="true"' : "") + "></button>";
                    }).join("") + "</span>" +
                    '<button class="project-gallery-toggle" type="button" data-gallery-toggle aria-pressed="false" aria-label="Pause image rotation for ' + escapeHtml(project.title) + '">' +
                    '<svg class="project-gallery-pause-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2 1h3v10H2zM7 1h3v10H7z"/></svg>' +
                    '<svg class="project-gallery-play-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2.5 1.2 10 6l-7.5 4.8z"/></svg>' +
                    "</button>" +
                    "</div>"
                : "";

            return '<figure class="project-media' + galleryClass + '"' + galleryAttributes + ">" + frames + controls + "</figure>";
        }

        if (project.visualVariant === "local-ai") {
            var bars = [36, 58, 82, 48, 72, 96, 62, 42, 88, 70, 52, 92, 66, 38, 78, 56, 86, 46].map(function (height) {
                return '<span style="--wave-height:' + height + '%"></span>';
            }).join("");
            return '<div class="project-media project-media-local-ai" aria-hidden="true">' +
                '<div class="local-ai-status"><span></span>Private native build</div>' +
                '<div class="local-ai-waveform">' + bars + "</div>" +
                '<div class="local-ai-flow"><strong>Capture</strong><span>Transcript</span><span>Summary</span></div>' +
                '<p>Local processing on Apple silicon</p>' +
                "</div>";
        }

        return "";
    }

    function setupProjectGalleries() {
        var galleries = Array.prototype.slice.call(document.querySelectorAll("[data-project-gallery]"));
        if (!galleries.length) {
            return;
        }

        var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        var states = galleries.map(function (gallery, galleryIndex) {
            var frames = Array.prototype.slice.call(gallery.querySelectorAll("[data-gallery-frame]"));
            var card = gallery.closest(".project-card");
            var title = card && card.querySelector("h3") ? card.querySelector("h3").textContent : "project";
            return {
                gallery: gallery,
                frames: frames,
                dots: Array.prototype.slice.call(gallery.querySelectorAll("[data-gallery-dot]")),
                count: gallery.querySelector("[data-gallery-count]"),
                toggle: gallery.querySelector("[data-gallery-toggle]"),
                title: title,
                index: 0,
                interval: 5200 + ((galleryIndex % 3) * 350),
                timer: 0,
                inViewport: false,
                paused: false
            };
        });

        function clearGalleryTimer(state) {
            if (state.timer) {
                window.clearTimeout(state.timer);
                state.timer = 0;
            }
        }

        function showGalleryFrame(state, nextIndex) {
            state.index = nextIndex;
            state.frames.forEach(function (frame, index) {
                var isActive = index === nextIndex;
                frame.classList.toggle("is-active", isActive);
                frame.setAttribute("aria-hidden", isActive ? "false" : "true");
                frame.tabIndex = isActive ? 0 : -1;
            });
            state.dots.forEach(function (dot, index) {
                var isActive = index === nextIndex;
                dot.classList.toggle("is-active", isActive);
                if (isActive) {
                    dot.setAttribute("aria-current", "true");
                } else {
                    dot.removeAttribute("aria-current");
                }
            });
            if (state.count) {
                state.count.textContent = (nextIndex + 1) + " / " + state.frames.length;
            }
        }

        function scheduleGallery(state) {
            clearGalleryTimer(state);
            if (reduceMotion.matches || state.paused || !state.inViewport || document.hidden || document.body.classList.contains("project-media-overlay-open")) {
                return;
            }

            state.timer = window.setTimeout(function () {
                if (document.body.classList.contains("project-media-overlay-open")) {
                    scheduleGallery(state);
                    return;
                }
                var nextIndex = (state.index + 1) % state.frames.length;
                var nextFrame = state.frames[nextIndex];
                var nextImage = nextFrame.matches("img") ? nextFrame : nextFrame.querySelector("img");
                if (nextImage && nextImage.complete && nextImage.naturalWidth) {
                    showGalleryFrame(state, nextIndex);
                }
                scheduleGallery(state);
            }, state.interval);
        }

        function setGalleryPaused(state, paused) {
            state.paused = paused;
            state.gallery.classList.toggle("is-paused", paused);
            if (state.toggle) {
                state.toggle.setAttribute("aria-pressed", paused ? "true" : "false");
                state.toggle.setAttribute("aria-label", (paused ? "Resume" : "Pause") + " image rotation for " + state.title);
            }
            scheduleGallery(state);
        }

        states.forEach(function (state) {
            state.dots.forEach(function (dot, index) {
                dot.addEventListener("click", function () {
                    showGalleryFrame(state, index);
                    setGalleryPaused(state, true);
                });
            });
            if (state.toggle) {
                state.toggle.addEventListener("click", function () {
                    setGalleryPaused(state, !state.paused);
                });
            }
        });

        if ("IntersectionObserver" in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var state = states.find(function (candidate) {
                        return candidate.gallery === entry.target;
                    });
                    if (!state) {
                        return;
                    }
                    state.inViewport = entry.isIntersecting && entry.intersectionRatio > 0.12;
                    scheduleGallery(state);
                });
            }, { threshold: [0, 0.12, 0.4] });

            states.forEach(function (state) {
                observer.observe(state.gallery);
            });
        } else {
            states.forEach(function (state) {
                state.inViewport = true;
                scheduleGallery(state);
            });
        }

        document.addEventListener("visibilitychange", function () {
            states.forEach(scheduleGallery);
        });
        document.addEventListener("projectmedia:opened", function () {
            states.forEach(clearGalleryTimer);
        });
        document.addEventListener("projectmedia:closed", function () {
            states.forEach(scheduleGallery);
        });

        var handleMotionPreference = function () {
            states.forEach(function (state) {
                if (reduceMotion.matches) {
                    showGalleryFrame(state, 0);
                }
                scheduleGallery(state);
            });
        };
        if (reduceMotion.addEventListener) {
            reduceMotion.addEventListener("change", handleMotionPreference);
        } else if (reduceMotion.addListener) {
            reduceMotion.addListener(handleMotionPreference);
        }
    }

    function renderProjectActions(project) {
        var actions = [];
        if (project.liveUrl) {
            actions.push('<a href="' + escapeHtml(project.liveUrl) + '" target="_blank" rel="noopener" class="project-action">Live site ' + externalLinkIconSvg(16) + "</a>");
        }
        if (hasPublicRepository(project)) {
            actions.push('<a href="' + escapeHtml(project.githubUrl) + '" target="_blank" rel="noopener" class="project-action">Source ' + githubIconSvg(16) + "</a>");
        }
        if (!actions.length && project.repositoryVisibility === "private") {
            actions.push('<span class="project-private">Private project</span>');
        }
        return '<div class="project-actions">' + actions.join("") + "</div>";
    }

    function renderProjectCard(data, project, tier) {
        var isSelected = tier === "selected";
        var projectClass = "project-card project-card-" + tier + (project.caseStudy ? " project-card-case-study" : "");
        var highlights = isSelected && project.siteHighlights ? project.siteHighlights.slice(0, 3) : [];
        var highlightsMarkup = highlights.length
            ? '<ul class="project-highlights">' + renderList(highlights) + "</ul>"
            : "";
        var outcomeMarkup = isSelected && project.caseStudyOutcome
            ? '<p class="project-case-study-outcome">' + escapeHtml(project.caseStudyOutcome) + "</p>"
            : "";
        var tags = (project.siteTags || []).slice(0, isSelected ? 7 : 5);

        return '<article class="' + projectClass + '" id="project-' + slugify(project.title) + '">' +
            renderProjectVisual(project, tier) +
            '<div class="project-body">' +
            '<div class="project-header">' +
            '<div><p class="project-type">' + escapeHtml(project.siteType) + "</p>" +
            "<h3>" + escapeHtml(project.title) + "</h3></div>" +
            renderProjectActions(project) +
            "</div>" +
            '<p class="project-description">' + escapeHtml(project.siteDescription) + "</p>" +
            outcomeMarkup +
            highlightsMarkup +
            '<div class="project-tags">' + tags.map(function (tag) {
                return renderSkillPill(data, tag, "project-tag");
            }).join("") + "</div>" +
            "</div>" +
            "</article>";
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
        var heroProof = document.getElementById("hero-proof");
        var aboutText = document.getElementById("about-text");
        var skillsGrid = document.getElementById("skills-grid");
        var experienceTimeline = document.getElementById("experience-timeline");
        var projectsGrid = document.getElementById("projects-grid");
        var educationGrid = document.getElementById("education-grid");
        var contactIntro = document.getElementById("contact-intro");
        var contactActions = document.getElementById("contact-actions");
        var contactInfo = document.getElementById("contact-info");
        if (!aboutText || !skillsGrid || !experienceTimeline || !projectsGrid || !educationGrid || !contactIntro || !contactActions || !contactInfo) {
            return;
        }

        aboutText.innerHTML = data.site.about.map(function (paragraph) {
            return "<p>" + escapeHtml(paragraph) + "</p>";
        }).join("");

        if (heroProof && data.site.proofPoints) {
            heroProof.innerHTML = data.site.proofPoints.map(function (point) {
                return '<li class="hero-proof-item">' +
                    "<strong>" + escapeHtml(point.value) + "</strong>" +
                    "<span>" + escapeHtml(point.label) + "</span>" +
                    "</li>";
            }).join("");
        }

        skillsGrid.innerHTML = data.site.skills.map(function (group) {
            return '<div class="skill-category">' +
                "<h3>" + escapeHtml(group.title) + "</h3>" +
                '<div class="skill-tags">' +
                group.items.map(function (item) {
                    return renderSkillPill(data, item, "skill-pill");
                }).join("") +
                "</div>" +
                "</div>";
        }).join("");

        setupSkillOverlay(data);

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

        var featuredProjects = data.projects.filter(function (project) {
            return project.featuredOnSite;
        });
        var selectedProjects = featuredProjects.filter(function (project) {
            return project.siteTier === "selected";
        }).sort(function (first, second) {
            return (first.siteOrder || 100) - (second.siteOrder || 100);
        });
        var additionalProjects = featuredProjects.filter(function (project) {
            return project.siteTier !== "selected";
        });
        projectsGrid.innerHTML =
            '<div class="project-showcase">' + selectedProjects.map(function (project) {
                return renderProjectCard(data, project, "selected");
            }).join("") + "</div>" +
            '<div class="project-more">' +
            '<div class="project-more-heading"><p class="section-kicker">More Work</p><h3>Additional products and experiments</h3></div>' +
            '<div class="project-more-grid">' + additionalProjects.map(function (project) {
                return renderProjectCard(data, project, "additional");
            }).join("") + "</div>" +
            "</div>";

        setupProjectGalleries();
        setupProjectMediaOverlay();

        educationGrid.innerHTML = data.education.map(function (item) {
            var inlineHonors = item.inlineHonors ? '<p class="education-honors">' + escapeHtml(item.inlineHonors) + "</p>" : "";
            var honorsList = item.honorsLines ? '<p class="education-honors-list">' + item.honorsLines.map(escapeHtml).join("<br>") + "</p>" : "";
            return '<div class="education-card">' +
                '<div class="education-main"><h3>' + escapeHtml(item.degree) + "</h3>" + inlineHonors +
                '<p class="education-school">' + escapeHtml(item.school) + "</p></div>" +
                '<div class="education-meta"><p class="education-date">' + escapeHtml(item.date) + "</p>" +
                '<p class="education-location">' + escapeHtml(item.location) + "</p>" +
                '<p class="education-gpa">GPA: ' + escapeHtml(item.gpa) + "</p></div>" +
                '<div class="education-details">' + honorsList + "</div>" +
                "</div>";
        }).join("");

        contactIntro.textContent = data.site.contactIntro;
        contactActions.innerHTML =
            '<a href="mailto:' + escapeHtml(data.contact.email) + '" class="btn btn-primary">Email Me</a>' +
            '<a href="/resume/brandon-temple-resume.pdf" class="btn btn-secondary" download type="application/pdf">Download Resume</a>';
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
            "<span>GitHub</span>" +
            "</a>" +
            '<a href="' + escapeHtml(data.contact.linkedinUrl) + '" target="_blank" rel="me noopener" class="contact-item">' +
            linkedinIconSvg(24) +
            "<span>LinkedIn</span>" +
            "</a>" +
            '<a href="' + escapeHtml(data.contact.instagramUrl) + '" target="_blank" rel="me noopener" class="contact-item">' +
            instagramIconSvg(24) +
            "<span>Instagram</span>" +
            "</a>" +
            '<a href="' + escapeHtml(data.contact.redditUrl) + '" target="_blank" rel="me noopener" class="contact-item">' +
            redditIconSvg(24) +
            "<span>Reddit</span>" +
            "</a>" +
            '<a href="' + escapeHtml(data.contact.indeedUrl) + '" target="_blank" rel="me noopener" class="contact-item">' +
            indeedIconSvg(24) +
            "<span>Indeed</span>" +
            "</a>" +
            '<div class="contact-item">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">' +
            '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>' +
            '<circle cx="12" cy="10" r="3"/>' +
            "</svg>" +
            "<span>" + escapeHtml(data.contact.location) + "</span>" +
            "</div>";

        scheduleBalanceCardGrids();
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

        additionalExperience.innerHTML = data.experience.additional.map(function (role) {
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
