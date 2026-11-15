# Portfolio vertical layout QA

Date: 2026-11-15

## Sources and target

- Selected user reference: `/tmp/codex-remote-attachments/01a1e018-3698-7701-afc7-62a56fe44b09/C8919CE9-4FF7-4E26-B347-1B71D0F59DEB/1-Photo-1.jpg` (607 × 1280).
- Revised ImageGen target, incorporating the requested white shirt and reduced clutter before implementation: `/Users/brandont/.codex/generated_images/01a1e018-3698-7701-afc7-62a56fe44b09/exec-26b36cea-9753-4b48-a3a4-da59b89482c7.png`.
- Requested direction: vertically flowing projects, very little decorative UI, the user's own portrait in a modern white ribbed shirt, no glasses.
- Implementation: `index.html`, `assets/css/portfolio.css`, shared profile data and renderer.

## Screenshot evidence

Evidence directory: `/Users/brandont/Developer/output/portfolio-editorial-20261115/`.

| Evidence | Purpose |
| --- | --- |
| `desktop-final.jpg`, `desktop-full-final.jpg` | Final desktop hierarchy, complete vertical flow, real project imagery |
| `implementation-normalized.jpg`, `comparison-final.jpg` | Normalized comparison against the selected reference |
| `comparison-hero.jpg`, `comparison-caption.jpg` | Focused typography, portrait, image and caption comparison |
| `mobile-final.jpg`, `mobile-gallery.jpg` | Narrow layout and usable project dialog |
| `tablet.jpg` | Loaded intermediate-width layout |
| `portrait-400-black.png` | White ribbing, identity, hair, alpha edges, no glasses |
| `gallery-desktop.jpg` | Desktop project preview and captured interface |

Desktop viewport requested: 1440 × 1000. Chrome produced a 1425 × 990 viewport capture. The final full-page capture was cropped from the top to the reference's aspect ratio and resized to 607 × 1280 for the side-by-side comparison; no content was rearranged. The comparison represents the reference's visible opening sequence, rather than the entire longer implementation.

Mobile viewport requested: 390 × 844; final capture: 375 × 812; observed usable layout width and scroll width: 375. Tablet requested: 834 × 1112; capture: 819 × 1092; observed layout and scroll width: 819. The captures include the browser's scrollbar/viewport adjustments. Neither narrow layout overflowed horizontally. An initial unloaded tablet capture was rejected and replaced with the fully loaded view.

## Fidelity review

| Surface | Finding after revision |
| --- | --- |
| Composition and hierarchy | Passed: small header, large left-aligned headline, right portrait, then broad stacked Afternoon Adventure and Query imagery followed by USE. |
| Typography | Passed: Manrope, strong headline weight and tight leading, visibly subordinate captions and metadata. |
| Spacing and alignment | Passed: shared image/text edges, ample hero spacing, thin dividers, short captions, no thumbnail strip or repeated name label. |
| Color and decoration | Passed: near-black canvas, warm white text, muted supporting copy, one restrained upcoming badge. |
| Imagery and content | Passed: real project captures at natural proportions; recognizable user portrait, transparent alpha, white ribbed shirt, no glasses. |

Intentional differences from the selected generated image: the requested white shirt replaces black; USE identifies Up South Entertainment in Starkville and remains explicitly upcoming; its real app capture is shown without an invented device bezel. Supporting work and professional details continue below the reference crop in native disclosures. Copy was shortened to reduce repetition.

## Findings and fixes

| Priority | First-pass finding | Resolution and verification |
| --- | --- | --- |
| P2 | Headline and project captions appeared too small in normalized comparison. | Increased desktop headline and caption scale; reviewed final full and focused comparisons. |
| P2 | Initial generated shirt had isolated white alpha artifacts. | Focused ImageGen edge repair; reviewed final portrait on black at display size. |
| P2 | Closing a gallery opened from a caption returned focus to the image above. | Return focus to the actual caption trigger; rechecked Query on desktop and Afternoon Adventure on mobile. |
| P2 | Back-to-top anchored below the navigation. | Moved the top anchor to the body; checked header position at desktop and mobile widths. |
| P2 | Expandable rows needed a clearer affordance. | Restored native disclosure markers and verified project, experience, technical background, and education expansion. |

No open P0, P1, or P2 findings remain.

## Functional checks

- Desktop: View work, all three featured project dialogs, gallery next/previous, scrollable captured views, close and Escape, focus return, additional project and professional disclosures, and back-to-top passed.
- Mobile: menu open/close and navigation, project dialog sizing and navigation, close, focus return, and horizontal overflow checks passed.
- Tablet: loaded layout, image visibility, and overflow checks passed.
- Browser console after local interactions: no warnings or errors.
- JavaScript syntax, prerender consistency, crawlability, accessibility validation, and whitespace checks passed.

## Final result

passed
