# Portfolio

Personal portfolio site for Brandon Temple, focused on workflow and data systems: C#/.NET desktop apps, browser-based reporting, Python/SQL automation, API integrations, Excel exports, and AI-assisted tools that turn manual staff workflows into maintainable internal software.

Live site: [brandontemple.com](https://brandontemple.com)

## Highlights

- Professional experience, education, and contact information
- Large, vertically arranged project views for Afternoon Adventure, Query, and the upcoming USE Rideshare app
- Additional projects with visible imagery and descriptions; technical background, education, and experience remain fully visible
- Searchable resume PDF generated from the shared resume page with document metadata and extraction checks
- Shared portfolio and resume content managed from `assets/js/profile-data.js` and pre-rendered into initial HTML for crawlers
- Responsive single-page layout with a dark theme and art-directed project imagery

## Project Structure

- `index.html` - main portfolio site
- `assets/css/portfolio.css` - editorial homepage and project preview styling
- `assets/css/site.css` - privacy and accessibility page styling
- `assets/js/site.js` - navigation and UI behavior
- `assets/js/profile-data.js` - shared portfolio and resume content source
- `assets/js/profile-render.js` - renders shared content into the site and resume
- `scripts/prerender-profile-content.mjs` - writes shared content into the initial HTML response for search and AI crawlers
- `scripts/validate-crawlability.mjs` - checks canonical metadata, generated HTML, JSON-LD, image descriptions, sitemap files, and PDF extraction
- `scripts/build-responsive-images.sh` - generates portrait, standard, wide, and square image variants
- `scripts/set-pdf-metadata.mjs` - applies searchable identity and subject metadata to the generated resume PDF
- `resume/index.html` - printable resume view
- `resume/brandon-temple-resume.pdf` - canonical PDF download
- `resume/resume.css` - resume styling
- `resume/resume-print.css` - print-specific resume styles

## Local Preview

From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000`.

## Project Images

The homepage displays original project captures at their natural proportions. The first capture stays still; selecting the image or "View project" opens the full gallery and available scrollable demonstrations. The hero is typography-led, with no portrait.

The older image-variant generator remains available for other framed uses:

Regenerate portrait crops and framed project screenshot variants after replacing a source image:

```bash
./scripts/build-responsive-images.sh
```

The script preserves each source image's proportions, removes output metadata, and composes complete project interfaces into `4:5`, `4:3`, `16:10`, and `1:1` frames.

## Crawlable Content

After changing `assets/js/profile-data.js` or `assets/js/profile-render.js`, refresh the committed HTML from the same source:

```bash
./scripts/prerender-profile-content.mjs
```

Verify that the generated HTML is current without modifying files:

```bash
./scripts/prerender-profile-content.mjs --check
```

Run the complete local crawlability check:

```bash
./scripts/validate-crawlability.mjs
```

## Resume PDF

Regenerate the canonical resume PDF from the shared resume page:

```bash
./scripts/build-resume-pdf.sh
```

The script uses Chrome headless without browser headers/footers, applies title, author, subject, and keyword metadata, and verifies that the PDF remains valid and text-extractable.
