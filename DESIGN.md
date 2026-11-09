---
name: Ilham Kurniawan (KAIRAV)
description: A one-person sticker-and-doodle portfolio. Paper-white page, ink outlines, lemon action colour, cobalt structure, pink delight.
colors:
  primary: "#2a45e6"
  primary-dark-mode: "#7b93ff"
  lemon: "#ffd83d"
  lemon-hover: "#ffe35c"
  lemon-deep: "#f5c400"
  cobalt-deep: "#2336c0"
  pink-sticker: "#ff7ab8"
  pink-deep: "#e0338a"
  paper: "#fbfaff"
  paper-muted: "#f1eefc"
  paper-elevated: "#ffffff"
  paper-accented: "#e4defa"
  ink: "#14122b"
  text-body: "#2a2750"
  text-toned: "#3c3870"
  text-muted: "#5a5688"
  text-dimmed: "#6f6a9f"
  border-muted: "#d9d3f3"
  night: "#12102a"
  night-muted: "#1a1740"
  night-elevated: "#211e4e"
  night-text: "#e8e5ff"
  night-ink: "#fffdf0"
typography:
  display:
    fontFamily: "Bagel Fat One, Arial Rounded MT Bold, Trebuchet MS, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Bagel Fat One, Arial Rounded MT Bold, Trebuchet MS, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bagel Fat One, Arial Rounded MT Bold, Trebuchet MS, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
  annotation:
    fontFamily: "Caveat, cursive"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
rounded:
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  sticker: "1.25rem"
  panel: "1.5rem"
  frame: "2.25rem"
  pill: "9999px"
spacing:
  sm: "16px"
  md: "24px"
  lg: "48px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.lemon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "8px 8px 8px 24px"
  button-primary-hover:
    backgroundColor: "{colors.lemon-hover}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "8px 8px 8px 24px"
  button-ink-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-secondary:
    backgroundColor: "{colors.paper-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "8px 8px 8px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.paper-muted}"
  sticker-card:
    backgroundColor: "{colors.paper-elevated}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.sticker}"
  cta-panel:
    backgroundColor: "{colors.lemon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "48px"
---

# Design System: Ilham Kurniawan (KAIRAV)

## Overview

**Creative North Star: "The Sticker Sheet"**

A white-ish page (paper, faintly violet) onto which a developer has stuck a few loud, outlined things: a tilted portrait on a lemon blob, a pink dot, a cobalt star, a lemon highlighter stroke under key phrases. Everything that is a "thing" carries a 2px ink outline and a generous radius; everything that is text sits on open paper with hairline rules. The mood is friendly, confident, hand-made, never corporate.

Three colours do three jobs and do not trade. Lemon is the action colour and is always paired with ink text. Cobalt is structure: links, focus, selection of the UI primary, the second display line. Pink is delight only: dots, full stops, scrollbar hover. Ink (a deep violet-black) is the outline and text colour; there is no pure black.

Density is open. Sections run in a 4/8 split (sticky title column, content column) and content is organised as ruled index lists rather than card grids.

**Key Characteristics:**
- 2px ink outline on every object (frames, thumbnails, buttons, cards, CTA panel).
- Lemon + ink for the one primary action per view; cobalt for structure; pink for punctuation.
- Display type is a fat rounded face; the second line of a section title is cobalt with a lemon wavy underline.
- Hand-lettered Caveat for greetings and annotations only.
- Objects tilt a few degrees (portrait 2deg, blob -6deg, thumbnails -2/+1deg on hover); text never does except a one-line greeting (-1deg).
- Dark mode inverts to deep indigo with a cream (#fffdf0) outline and a lighter cobalt.

## Colors

A three-accent palette on a violet-tinted paper, outlined in violet-black ink.

### Primary
- **Cobalt** ({colors.primary}, 600 on the scale): Nuxt UI primary. Links, focus ring (3px), second display line, section full stops, scrollbar thumb (500). Dark mode uses {colors.primary-dark-mode}. Scale runs 50 to 950 in the stylesheet; 700 ({colors.cobalt-deep}) is the ink-button hover.

### Secondary
- **Lemon** ({colors.lemon}): The action colour. Primary button fill, the flat CTA panel, hero blob, selection background, highlighter stroke behind inline emphasis (80% light, 30% dark). Hover steps to {colors.lemon-hover}. Text on lemon is always ink.

### Tertiary
- **Sticker Pink** ({colors.pink-sticker}): The hero dot and other sticker shapes. **Deep Pink** ({colors.pink-deep}) colours the full stop after the wordmark and the scrollbar hover.

### Neutral
- **Paper** ({colors.paper}): page ground. **Paper Muted** ({colors.paper-muted}), **Paper Elevated** ({colors.paper-elevated}, white; cards and footer), **Paper Accented** ({colors.paper-accented}).
- **Ink** ({colors.ink}): outlines, inverted surfaces, text on lemon. Body text is {colors.text-body}; step down through {colors.text-toned}, {colors.text-muted}, {colors.text-dimmed}. Hairline dividers use {colors.border-muted}.
- **Night** ({colors.night}) with {colors.night-muted} / {colors.night-elevated} surfaces, {colors.night-text} text, and {colors.night-ink} (cream) as the dark-mode outline and highlight.

### Named Rules
**The Three Jobs Rule.** Lemon acts, cobalt structures, pink decorates. A lemon fill never carries a link; a cobalt fill never carries the primary CTA; pink never carries words (a full stop is the only pink glyph).
**The Ink Pairing Rule.** Lemon fills take ink text, never white and never cobalt.

## Typography

**Display Font:** Bagel Fat One (with Arial Rounded MT Bold, Trebuchet MS)
**Body Font:** Figtree (with system sans)
**Label Font:** none, labels use Figtree in sentence case (code keeps the system monospace stack); **Annotation Font:** Caveat (600, 700)

**Character:** A chunky single-weight rounded display against a clean humanist sans. The display face does all the shouting so body weights can stay at 400 to 600.

### Hierarchy
- **Display** (400, clamp(2.25rem, 6vw, 4.5rem), 1): section titles in two stacked lines, first ink, second cobalt with lemon wavy underline.
- **Headline** (400, 1.875 to 3rem, 1.25, -0.025em): panel titles such as the CTA.
- **Title** (400, 1.5rem, 1.25): index-list item titles; turns cobalt on hover. Footer wordmark at the same size.
- **Body** (400, 1rem/1.125rem on large, 1.625): paragraphs, muted colour, `text-wrap: pretty`; headings use `text-wrap: balance`.
- **Label** (600, 0.875rem): link columns, outputs line ("A · B · C"), button text (600 to 700).
- **Annotation** (Caveat 700, 1.5rem): hero greeting and the "hover to reveal" doodle note.

### Named Rules
**The Two-Line Title Rule.** Section titles are two lines: plain ink then cobalt with lemon wave, ending in a full stop.
**The Hand Is Rare Rule.** Caveat appears only for a greeting or an annotation, one or two per page.

## Layout

Container max-width 80rem (max-w-7xl), page padding 24px mobile to 48/80px desktop. Sections use 80px vertical padding. Home sections are a 12-column grid: title column spans 4 and is sticky (top 8rem on large screens), content spans 8. Title columns end with a 48px by 4px cobalt bar then a short muted paragraph with lemon-highlighted phrases. Content is a ruled index (hairline `divide-y` with top and bottom border) with a thumbnail column (9rem or 13rem) and text column; a final row is a heavy-font cobalt link with a nudging arrow. The hero is a flex row, portrait right on large screens and above the text on mobile. Footer is a 12-column grid on a white band with a 2px top border and a 5% opacity KAIRAV watermark. Reveal on scroll is GSAP; reduced motion drops travel and loops but keeps colour and opacity changes (150ms).

## Elevation & Depth

Hybrid: outline first, one soft shadow second. Flat elements (index thumbnails, panels, frames, buttons) get depth from the 2px ink outline alone. The sticker card additionally carries one soft drop shadow, tinted ink and offset downward, which reads as a peeled sticker rather than a hard cutout.

### Shadow Vocabulary
- **Sticker rest** (`box-shadow: 0 14px 28px -14px rgb(20 18 43 / 0.35)`; dark `rgb(0 0 0 / 0.6)`): cards and `.sticker`.
- **Sticker lift** (`0 20px 32px -14px rgb(20 18 43 / 0.4)`): linked sticker on hover, with translateY(-3px) and rotate(-1deg).

### Named Rules
**The Outline Before Shadow Rule.** Outline carries structure; the soft shadow is reserved for sticker cards. Shadows are blurred and negatively spread, never hard offsets.

## Shapes

Round and generous, with a tilted-object language. Radii step by object size: thumbnails 1rem, stickers 1.25rem, CTA panel 1.5rem, hero portrait 2.25rem, buttons outer 1rem with a fully round inner icon pill, badges and Nuxt UI buttons full pill, focus ring 0.5rem. The hero blob is an organic asymmetric radius (58% 42% 55% 45% / 48% 55% 45% 52%) rotated -6deg behind a 2deg tilted portrait. All objects carry a 2px outline (ink in light, cream in dark). The star is a filled cobalt SVG with outline.

## Components

### Buttons (ArrowButton)
- **Shape:** 1rem radius, 2px border, label left, circular icon pill right (36 to 40px).
- **Primary:** lemon fill, ink text and border; icon pill ink with lemon arrow. Hover lemon-300.
- **Ink:** ink fill, white text; icon pill lemon. Hover turns cobalt-700 fill and border. Used on lemon surfaces.
- **Secondary:** white fill, ink text, default border; icon pill cobalt with inverted arrow. Hover paper-muted.
- **Hover / Focus:** scale 1.02 on hover, 0.98 on press, arrow nudges 2px; focus is a 3px cobalt outline with 3px offset.

### Cards / Containers
- **Sticker card:** white, 2px ink border, 1.25rem radius, sticker shadow, lifts and tilts on link hover.
- **CTA panel (GetinTouch):** flat lemon, ink text, 2px ink border, 1.5rem radius, padding 24 to 48px, avatar bleeds off the bottom edge on the left, ink and secondary buttons right. No shadow.

### Index list row
Hairline-ruled row, thumbnail with 2px outline and 0.75rem radius that tilts (-2deg services, +1deg projects) and scales 1.03 on hover, Title face heading that turns cobalt, muted description, semibold toned outputs line joined by middle dots.

### Inline emphasis (TextGradient)
Lemon highlighter stroke across the lower 55% of a phrase, bold highlighted text.

### Navigation
Centered wordmark "Ilham Kurniawan." in Bagel Fat One with a deep-pink full stop, hidden under 480px, scrolls away with the page. Theme and language switchers sit left, the full-screen menu on the right. Footer links are quiet link buttons that turn cobalt on hover.

## Do's and Don'ts

### Do:
- **Do** give every standalone object a 2px outline in the ink token.
- **Do** use lemon with ink text for the single primary action in a view.
- **Do** tilt objects by 1 to 6 degrees and keep text straight.
- **Do** build lists as ruled indexes with a small tilting thumbnail.
- **Do** keep 3px cobalt focus rings with 3px offset.
- **Do** honour reduced motion: keep colour and opacity changes, drop travel and loops.

### Don't:
- **Don't** put white or cobalt text on lemon.
- **Don't** use hard offset shadows; the only shadow is the soft negative-spread sticker shadow.
- **Don't** introduce a fourth accent hue.
- **Don't** put pink on text or interactive controls.
- **Don't** set body text in the display face.

## Known Gaps

- Services/portofolio/blogs/gallery/contact/cv pages and the detail pages inherit the sticker tokens, 2px ink outlines and Nuxt UI shape defaults, but only home, services index, portofolio index and about were recomposed (ruled lists, greeting, no stat strip); the rest keep their earlier layouts.
- Spline Sans Mono was removed; plain `font-mono` utilities were stripped from class lists, `prose-code` and code blocks still use the system monospace stack. The OG image title requests Bagel Fat One in inline style; whether Satori actually loads the face is unverified, and pages that pass an explicit image (including home) still serve the older static `/og-image.jpg`.
- Some pages still use same-size icon + heading + text card grids; the ruled index is the intended pattern.
- The OG image palette is hard-coded in Satori markup rather than tokens.
- Contrast ratios have not been measured, including lemon highlight under muted text and dark-mode muted text.
- Hero photo carries a sepia/contrast/brightness filter inline; treated as a one-off, not a rule.

## Navigation Shell (added after the sticker restyle)

- **Header:** one floating pill bar (`app/components/App/Header.vue`, used by the default layout and the error page): name wordmark left, five text links centre with the active route on a lemon pill, then Search (with a Ctrl/Cmd+K shortcut), a two-half ID | EN switch that flips the locale in one tap (no dropdown), the theme toggle (lemon splash grows from the button) and a lemon menu button.
- **Menu:** a centred modal holding a bento of big colour tiles (lemon, pink, cobalt, white) with oversized faded icons and a hover tilt, a full-width ink "Consult Now" pill and a row of social icon buttons.
- **Search:** a modal with an input, filter pills (All, Pages, Services, Projects, Articles) and a dense bento grid of every page, service, project and article. Tiles with an image carry it under an ink gradient; pages are plain colour tiles. The index is fetched with `queryCollection` the first time the modal opens and again after a locale change.
- **Home:** services and recent projects are bento grids of image tiles with an ink gradient, a lemon "Explore all" row and a cobalt "View all" tile.
