var mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
var navLinks = document.querySelector(".nav-links");
var navbar = document.querySelector(".nav-container");

function setMobileMenuState(isOpen, returnFocus) {
    if (!mobileMenuToggle || !navLinks) {
        return;
    }

    mobileMenuToggle.classList.toggle("active", isOpen);
    navLinks.classList.toggle("active", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

    if (!isOpen && returnFocus) {
        mobileMenuToggle.focus({ preventScroll: true });
    }
}

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", function () {
        var isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
        setMobileMenuState(!isExpanded, false);
    });
}

var navLinkItems = document.querySelectorAll(".nav-links a");
navLinkItems.forEach(function (link) {
    link.addEventListener("click", function () {
        setMobileMenuState(false, false);
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mobileMenuToggle && mobileMenuToggle.getAttribute("aria-expanded") === "true") {
        event.preventDefault();
        setMobileMenuState(false, true);
    }
});

document.addEventListener("click", function (event) {
    if (!navbar || !mobileMenuToggle || mobileMenuToggle.getAttribute("aria-expanded") !== "true") {
        return;
    }
    if (!navbar.contains(event.target)) {
        setMobileMenuState(false, false);
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        setMobileMenuState(false, false);
    }
});

var skipLink = document.querySelector(".skip-link");
if (skipLink) {
    skipLink.addEventListener("click", function () {
        var mainContent = document.querySelector("#main-content");
        if (mainContent) {
            window.setTimeout(function () {
                mainContent.focus({ preventScroll: true });
            }, 0);
        }
    });
}
var navItems = document.querySelectorAll('.nav-links a[href^="#"]');
var sections = Array.from(navItems).reduce(function (trackedSections, item) {
    var sectionId = item.getAttribute("href");
    if (!sectionId || sectionId === "#top") {
        return trackedSections;
    }
    var section = document.querySelector(sectionId);
    if (section) {
        trackedSections.push(section);
    }
    return trackedSections;
}, []);
function setActiveNavItem(activeSectionId) {
    navItems.forEach(function (item) {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
        if (activeSectionId && item.getAttribute("href") === "#".concat(activeSectionId)) {
            item.classList.add("active");
            item.setAttribute("aria-current", "location");
        }
    });
}
function highlightNavigation() {
    if (!sections.length) {
        setActiveNavItem("");
        return;
    }

    var navHeight = navbar ? navbar.offsetHeight : 0;
    var viewportTop = navHeight + 24;
    var viewportBottom = window.innerHeight;
    var firstSectionTop = sections[0].getBoundingClientRect().top;
    if (firstSectionTop > viewportTop) {
        setActiveNavItem("");
        return;
    }

    var activeSectionId = "";
    var bestVisibleArea = 0;
    sections.forEach(function (section) {
        var sectionId = section.getAttribute("id");
        if (!sectionId) {
            return;
        }
        var rect = section.getBoundingClientRect();
        var visibleTop = Math.max(rect.top, viewportTop);
        var visibleBottom = Math.min(rect.bottom, viewportBottom);
        var visibleArea = Math.max(0, visibleBottom - visibleTop);
        if (visibleArea > bestVisibleArea) {
            bestVisibleArea = visibleArea;
            activeSectionId = sectionId;
        }
    });

    var isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (isAtPageBottom) {
        var lastSection = sections[sections.length - 1];
        activeSectionId = lastSection.getAttribute("id") || activeSectionId;
    }
    setActiveNavItem(activeSectionId);
}
window.addEventListener("load", highlightNavigation);
window.addEventListener("hashchange", highlightNavigation);
var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
var observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};
var observer = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var target = entry.target;
                target.style.opacity = "1";
                target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions)
    : null;
var animatedElements = document.querySelectorAll(".timeline-item, .project-card, .education-card, .skill-category");
function revealAnimatedElement(element) {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
}
animatedElements.forEach(function (element) {
    if (prefersReducedMotion.matches || !observer) {
        revealAnimatedElement(element);
        return;
    }
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
});
function revealVisibleAnimatedElements() {
    animatedElements.forEach(function (element) {
        var rect = element.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            revealAnimatedElement(element);
        }
    });
}
function revealHashSectionAnimatedElements() {
    if (!window.location.hash) {
        return;
    }

    var target = document.getElementById(window.location.hash.slice(1));
    if (!target) {
        return;
    }

    target.querySelectorAll(".timeline-item, .project-card, .education-card, .skill-category").forEach(revealAnimatedElement);
}
function revealInitialAnimatedElements() {
    window.requestAnimationFrame(function () {
        revealVisibleAnimatedElements();
        revealHashSectionAnimatedElements();
    });
}
window.addEventListener("load", revealInitialAnimatedElements);
window.addEventListener("hashchange", revealInitialAnimatedElements);
function updateNavbarState() {
    if (!navbar) {
        return;
    }
    navbar.classList.toggle("is-scrolled", window.pageYOffset > 100);
}
window.addEventListener("scroll", updateNavbarState);
window.addEventListener("load", updateNavbarState);
updateNavbarState();
window.addEventListener("load", function () {
    var heroElements = document.querySelectorAll(".hero-kicker, .hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-proof, .hero-social, .hero-collage");
    heroElements.forEach(function (element, index) {
        if (prefersReducedMotion.matches) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
            return;
        }
        setTimeout(function () {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }, index * 150);
    });
});
if ("IntersectionObserver" in window) {
    var imageObserver_1 = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var image = entry.target;
                var source = image.dataset.src;
                if (source) {
                    image.src = source;
                    image.removeAttribute("data-src");
                    imageObserver_1.unobserve(image);
                }
            }
        });
    });
    document.querySelectorAll("img[data-src]").forEach(function (image) {
        imageObserver_1.observe(image);
    });
}
function debounce(func, wait) {
    if (wait === void 0) { wait = 10; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var later = function () {
            window.clearTimeout(timeout);
            func.apply(void 0, args);
        };
        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
    };
}
window.addEventListener("scroll", debounce(highlightNavigation, 10));
window.addEventListener("resize", debounce(highlightNavigation, 50));
