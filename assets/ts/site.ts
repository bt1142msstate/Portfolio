const mobileMenuToggle = document.querySelector<HTMLButtonElement>(".mobile-menu-toggle");
const navLinks = document.querySelector<HTMLUListElement>(".nav-links");
const navbar = document.querySelector<HTMLElement>(".nav-container");

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
}

const navLinkItems = document.querySelectorAll<HTMLAnchorElement>(".nav-links a");
navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenuToggle?.classList.remove("active");
        navLinks?.classList.remove("active");
    });
});

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        event.preventDefault();

        const href = anchor.getAttribute("href");
        if (!href) {
            return;
        }

        const target = document.querySelector<HTMLElement>(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});

const sections = document.querySelectorAll<HTMLElement>("section[id]");
const navItems = document.querySelectorAll<HTMLAnchorElement>(".nav-links a");

function highlightNavigation(): void {
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (!sectionId) {
            return;
        }

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach((item) => {
                item.classList.remove("active");
                if (item.getAttribute("href") === `#${sectionId}`) {
                    item.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", highlightNavigation);
window.addEventListener("load", highlightNavigation);

const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll<HTMLElement>(
    ".timeline-item, .project-card, .education-card, .skill-category"
);

animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
});

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (!navbar) {
        return;
    }

    if (currentScroll > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.15)";
    } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
});

window.addEventListener("load", () => {
    const heroElements = document.querySelectorAll<HTMLElement>(
        ".hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-social"
    );

    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }, index * 150);
    });
});

const emailLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto"]');
emailLinks.forEach((link) => {
    link.addEventListener("contextmenu", (event) => {
        event.preventDefault();

        const href = link.getAttribute("href");
        if (!href) {
            return;
        }

        const email = href.replace("mailto:", "");
        navigator.clipboard.writeText(email).then(() => {
            const tooltip = document.createElement("span");
            tooltip.textContent = "Email copied!";
            tooltip.style.cssText = `
                position: absolute;
                background: var(--maroon);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 0.875rem;
                pointer-events: none;
                z-index: 1000;
                animation: fadeInUp 0.3s ease;
            `;
            document.body.appendChild(tooltip);

            const rect = link.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;

            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
});

if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const image = entry.target as HTMLImageElement;
                const source = image.dataset.src;
                if (source) {
                    image.src = source;
                    image.removeAttribute("data-src");
                    imageObserver.unobserve(image);
                }
            }
        });
    });

    document.querySelectorAll<HTMLImageElement>("img[data-src]").forEach((image) => {
        imageObserver.observe(image);
    });
}

function debounce<T extends (...args: never[]) => void>(func: T, wait = 10): (...args: Parameters<T>) => void {
    let timeout: number | undefined;

    return (...args: Parameters<T>) => {
        const later = (): void => {
            window.clearTimeout(timeout);
            func(...args);
        };

        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
    };
}

window.addEventListener("scroll", debounce(highlightNavigation, 10));
