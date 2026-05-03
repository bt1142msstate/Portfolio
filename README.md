# Portfolio

Personal portfolio site for Brandon Temple, focused on software engineering work across desktop applications, internal tooling, reporting workflows, and practical machine learning projects.

Live site: [www.brandontemple.com](https://www.brandontemple.com)

## Highlights

- Professional experience, education, and contact information
- Featured project section covering `MetaTable`, `HTMLConverter`, `Query`, `Ady Resolver`, and `connect4-ai`
- Static resume PDF download generated from the shared resume page
- Shared portfolio and resume content managed from `assets/js/profile-data.js`
- Responsive single-page layout with a dark theme

## Project Structure

- `index.html` - main portfolio site
- `assets/css/site.css` - site styling
- `assets/js/site.js` - navigation and UI behavior
- `assets/js/profile-data.js` - shared portfolio and resume content source
- `assets/js/profile-render.js` - renders shared content into the site and resume
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
