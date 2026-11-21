---
name: Ilham Kurniawan (Kairav)
description: A dark-first editorial portfolio with condensed display type, monochrome portraiture and the Kairav mascot.
colors:
  primary: "#a9bdff"
  primary-light: "#234394"
  mascot-stage: "#263c73"
  mascot-stage-light: "#d8e1f8"
  mascot-mark-light: "#355cc2"
  mascot-ink: "#171923"
  charcoal: "#111110"
  charcoal-muted: "#1a1a18"
  charcoal-elevated: "#20201e"
  charcoal-rule: "#373733"
  charcoal-rule-strong: "#74746c"
  charcoal-text: "#dcdad0"
  charcoal-muted-text: "#adaba1"
  ivory: "#f0efe9"
  inverted-ink: "#151513"
  paper: "#eeede8"
  paper-muted: "#e3e1db"
  paper-elevated: "#f8f7f3"
  paper-rule: "#c7c4ba"
  paper-rule-strong: "#8c897f"
  paper-text: "#2d2b27"
  paper-muted-text: "#5e5a51"
  paper-ink: "#171714"
  paper-inverted: "#1b1b19"
typography:
  wordmark:
    fontFamily: "Barlow Condensed, Arial Narrow, ui-sans-serif, sans-serif"
    fontSize: "min(13.8cqw, 14rem)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.028em"
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.6rem, 6.3vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.93
    letterSpacing: "-0.018em"
  route-title:
    fontFamily: "Barlow Condensed, Arial Narrow, ui-sans-serif, sans-serif"
    fontSize: "clamp(3.4rem, 9.2vw, 9.1rem)"
    fontWeight: 800
    lineHeight: 0.93
    letterSpacing: "-0.018em"
  detail-title:
    fontFamily: "Barlow Condensed, Arial Narrow, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.6rem, 5.3vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.015em"
  detail-deck:
    fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.25rem)"
    lineHeight: 1.65
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
  reading:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.97rem + 0.2vw, 1.125rem)"
    lineHeight: 1.75
  reading-heading:
    fontSize: "clamp(1.55rem, 2.8vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.22
  reading-subheading:
    fontSize: "clamp(1.18rem, 1.8vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.22
  reading-minor-heading:
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.22
  reading-technical:
    fontSize: "0.875rem"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "0.09em"
rounded:
  square: "0px"
  ui: "0.1875rem"
  lg: "0.25rem"
  xl: "0.375rem"
spacing:
  site-gutter: "clamp(1.25rem, 4.65vw, 5rem)"
  site-width: "99rem"
  header-height: "4.25rem"
  section: "clamp(3.5rem, 7.8vw, 7.5rem)"
  control-height: "44px"
components:
  button-primary:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.inverted-ink}"
    rounded: "{rounded.square}"
    padding: "0.625rem 0.875rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    rounded: "{rounded.square}"
    padding: "0.625rem 0.875rem"
  header-navigation:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.ivory}"
    height: "{spacing.header-height}"
  navigation-panel:
    backgroundColor: "{colors.charcoal-elevated}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.square}"
    width: "35rem"
  search-field:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.ui}"
    padding: "0.5rem 0.75rem"
    height: "{spacing.control-height}"
  search-filter:
    backgroundColor: "{colors.charcoal-muted}"
    textColor: "{colors.primary}"
    height: "{spacing.control-height}"
  work-card:
    textColor: "{colors.ivory}"
    rounded: "{rounded.square}"
  service-row:
    textColor: "{colors.ivory}"
  mascot-menu:
    backgroundColor: "{colors.charcoal-muted}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.square}"
    height: "{spacing.control-height}"
  mascot-dialogue:
    backgroundColor: "{colors.charcoal-elevated}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.square}"
---

# Design System: Ilham Kurniawan (Kairav)

## Overview

**Creative North Star: "Editorial Portfolio"**

Kairav is Ilham Kurniawan’s professional identity. Large condensed titles, a monochrome portrait and a ruled grid establish the visual hierarchy. Project screenshots and work samples keep their original color. The Kairav mascot carries the personal voice in a blue stage and provides a recognizable mark in the header.

The layout gives the role, consultation action and evidence from real work a clear reading order. Dark charcoal is the default. A warm light theme keeps the same hierarchy and interaction cues.

**Key Characteristics:**

- Barlow Condensed display lettering with Inter for readable copy and controls.
- Square media frames, compact buttons and one-pixel section rules.
- Charcoal and ivory field colors with blue for interaction and the mascot.
- Real portrait photography and project imagery.
- Indonesian and English across navigation and interaction states.

## Colors

### Primary

- **Cobalt** (`primary`, `primary-light`) marks links, selection, focus and interactive hover. Dark mode uses pale cobalt and light mode uses a deeper cobalt.
- **Mascot blue** (`mascot-stage`, `mascot-stage-light`, `mascot-mark-light`) gives the interactive mascot its stage and distinguishes its silhouette in the compact menu trigger. The dark theme shares its accent color with the mark. `mascot-ink` draws the face.

### Neutral

- **Charcoal** uses `charcoal` for the canvas and masthead, `charcoal-muted` for quiet bands or selected fills, and `charcoal-elevated` for dialogs. Ivory heads the text hierarchy, with `charcoal-text` for paragraphs and `charcoal-muted-text` for supporting copy.
- **Warm paper** uses `paper` for the canvas, `paper-muted` for quiet bands and `paper-elevated` for dialogs. `paper-ink` highlights text, with `paper-text` and `paper-muted-text` for the reading hierarchy. `paper-inverted` supplies the primary button fill in this theme.
- **Rules** use the theme’s normal border for layout and the stronger border for controls and dialog edges. Semantic `--ui-*` properties resolve the palette for the shared stylesheet and Nuxt UI.

## Typography

Use Barlow Condensed at weight 800 for the wordmark and display headings. Route and section headings are uppercase with tight leading. Detail titles follow the original casing of the content. Inter carries body copy, captions, route links, form controls and article subheadings.

- **Wordmark** uses container-relative sizing and wraps on narrow viewports (40rem and below).
- **Display** and **route title** share the same condensed face. Route titles have a larger scale and wrap for long translations.
- **Reading** uses Inter with a line height of 1.75 and a measure capped at 68ch. Subheadings balance long lines. Inline links are underlined, and wide tables and code blocks scroll within the reading column.
- **Label** uses uppercase Inter at 0.75rem, weight 700 and 0.09em tracking for roles, categories and compact section labels.

## Layout

The masthead and sections share a 99rem frame and fluid edge gutters. Section dividers establish the vertical rhythm. Catalogue introductions pair a display title with supporting copy and optional actions. Catalogue filters, featured content and lists inherit the same alignment. Detail pages pair title and metadata with a cover or mascot before the reading area. Contact methods use ruled rows. The consultation form asks for a service and accepts an optional timeline and budget. Its primary action opens a WhatsApp draft, with email available as a text link.

At 54rem and below, the full menu takes over for the masthead's center navigation, editorial text splits and detail mastheads become single-column, and the footer changes from four columns to two. The footer pairs direct contact with page, service and social links and ends in a condensed Kairav sign-off. Use intrinsic widths and wrap long translated labels, titles and contact values.

## Elevation & Depth

Rules and tonal separation establish hierarchy at rest. Media, action buttons and content sections sit flush with the grid. The menu and search dialog use a raised neutral surface, a stronger rule and a dark scrim to separate the active task from the page. Preserve the scrollable dialog body at short viewport heights.

## Shapes

The media grid, masthead dialog, mascot stage and arrow actions have square edges. The small radius scale softens compact Nuxt UI buttons, badges and content panels. Use straight rules to align reading edges, media and actions. Portraits use a grayscale crop with a neutral ground, while case study and gallery imagery retain their source colors.

## Components

### Buttons

Arrow actions pair a semibold Inter label with an arrow in a rectangular control with a 44px minimum height. Primary actions use the current theme’s inverted surface and text, then cobalt on hover. Secondary actions use a transparent fill and defined edge, then a muted fill and cobalt edge on hover. Give keyboard focus a 2px cobalt outline with 3px offset.

### Navigation

A sticky masthead places the logo and Kairav wordmark on the left, primary links in the center on wider screens, and Search plus the mascot Menu on the right. Current masthead links use cobalt and underline, including the appropriate parent link on detail routes. The mascot opens a dialog with a two-column destination list, WhatsApp consultation, social links, theme and language.

Search reuses the dialog and opens with its labeled input focused. The input uses the page surface, a small radius and a defined edge. Ctrl or Cmd+K opens search directly. Destination-type filters expose their pressed state, and compact result rows pair optional thumbnails with a title and content type. Load the index on demand for the selected locale. Preserve empty, loading, failure and retry states, Escape dismissal and focus return to the initiating control.

### Work and service entries

The homepage pairs a ruled project index with one large preview. Select a row, use the previous and next buttons, or drag horizontally across the artwork to change projects. Dragging vertically on a touch display scrolls the page. The case-study link follows the selected project and the navigation buttons keep their focus. On wider screens, the index also shows the selected project’s description. At 40rem and below, full-width rows sit above the preview. Service links pair a thumbnail, title and summary in a ruled row.

### Motion

The app uses three staggered cobalt-edged shutters with the Kairav mark on the center panel. A direct load reveals the current page once. On internal navigation, the shutters cover the old page before the router commits and lift from the new one after scroll is restored. The masthead remains available. A slim indicator reports pending routes, while anchors within the same page keep their normal scroll behavior.

The masthead dialog opens from the top-right edge with a fading backdrop and closes faster than it opens. Menu and Search share the same shell. Switching to Search slides its content in from the right and focuses the search field. Returning to Menu reverses the direction. Closing the dialog returns focus to its opener. Reduced motion bypasses the spatial transitions.

GSAP opens the homepage as an editorial cover. The name blocks rise and straighten, and each moves in an opposite direction under a fine pointer. The portrait follows the pointer and wipes between images when activated. As the visitor scrolls into selected work, the name slides behind its crop, the portrait and mascot follow at different speeds, and a blue rule draws across the incoming section. ScrollTrigger opens the project preview diagonally and briefly pins its frame and controls on tall desktop viewports. Selecting a project activates three shutters and sweeps the artwork in the selection direction. A fine pointer tilts the preview in perspective, and the image follows a horizontal drag until release. Service thumbnails and summaries enter from opposite sides, skill groups enter in order, and a blue wash introduces the contact section. The archive and gallery use brief image crops on entry, and gallery navigation wipes between images.

Render all content in its readable state before scripts run. Scope motion to the mounted surface and clear it when leaving the route or switching to reduced motion. Preserve selector feedback, focus, case-study navigation and lightbox controls when spatial motion is reduced.

### Mascot

Use the Kairav Bot as the site’s expressive character. The full mascot loads when visible on the homepage and uses the blue mark as its fallback. Pointer interaction can select expressions and dialogue. Keyboard activation advances the dialogue in the current language. The visual speech bubble is paired with a status announcement containing the complete line. Honor reduced motion with immediate dialogue text and disabled pointer tracking at mount. The header uses the compact mark as the menu control.

## Do's and Don'ts

### Do:

- **Do** carry Ilham’s professional identity through Kairav and attribute project evidence to the work itself.
- **Do** keep the consultation entry available from the shared navigation.
- **Do** use semantic theme properties and give both themes and locales the same interaction states.
- **Do** keep visible keyboard focus and 44px targets for the shared navigation and main actions.
- **Do** reduce motion for visitors who request it and keep reading and activation available.
