# Portfolio

Personal portfolio site for Brandon Temple, focused on workflow and data systems: C#/.NET desktop apps, browser-based reporting, Python/SQL automation, API integrations, Excel exports, and AI-assisted tools that turn manual staff workflows into maintainable internal software.

Live site: [brandontemple.com](https://brandontemple.com)

## Highlights

- Professional experience, education, and contact information
- Workflow software and data-quality case studies for `Query`, `MetaTable`, and `Ady Resolver`, with supporting project cards for `Mac Window Arranger`, `HTMLConverter`, and `connect4-ai`
- Static resume PDF download generated from the shared resume page
- Shared portfolio and resume content managed from `assets/js/profile-data.js`
- Responsive single-page layout with a dark theme and art-directed project imagery

## Project Structure

- `index.html` - main portfolio site
- `assets/css/site.css` - site styling
- `assets/js/site.js` - navigation and UI behavior
- `assets/js/profile-data.js` - shared portfolio and resume content source
- `assets/js/profile-render.js` - renders shared content into the site and resume
- `scripts/build-responsive-images.sh` - generates portrait, standard, wide, and square image variants
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

## Responsive Images

Regenerate the illustrated portrait crops and project screenshot variants after replacing a source image:

```bash
./scripts/build-responsive-images.sh
```

The script preserves each source image's proportions, removes output metadata, and composes complete project interfaces into `4:5`, `4:3`, `16:10`, and `1:1` frames.

## Resume PDF

Regenerate the canonical resume PDF from the shared resume page:

```bash
./scripts/build-resume-pdf.sh
```

The script uses Chrome headless without browser headers/footers so the PDF does not include a local preview URL, date, or page number chrome.
