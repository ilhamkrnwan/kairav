---
name: Ilham Kurniawan (Kairav)
description: A quiet monochrome portfolio set in one grotesk, with cobalt as the only accent, hairline structure and scroll-driven motion.
colors:
  ink: "#0f0f0f"
  paper: "#f0f0f0"
  paper-muted: "#e6e6e6"
  paper-elevated: "#fafafa"
  paper-accented: "#dcdcdc"
  paper-rule: "#cdcdcd"
  paper-rule-strong: "#8a8a8a"
  paper-text: "#1f1f1f"
  paper-muted-text: "#5c5c5c"
  charcoal-muted: "#171717"
  charcoal-elevated: "#1d1d1d"
  charcoal-accented: "#272727"
  charcoal-rule: "#323232"
  charcoal-rule-strong: "#707070"
  charcoal-text: "#dedede"
  charcoal-muted-text: "#ababab"
  cobalt-on-dark: "#a9bdff"
  cobalt-on-light: "#234394"
  mascot-stage: "#263c73"
  mascot-stage-light: "#d8e1f8"
  mascot-mark-light: "#355cc2"
  mascot-ink: "#171923"
typography:
  wordmark:
    fontFamily: "Inter, Helvetica Neue, Arial, ui-sans-serif, sans-serif"
    fontSize: "min(14.2cqw, 14rem)"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Inter, Helvetica Neue, Arial, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.5rem, 5.8vw, 5.75rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  detail-title:
    fontFamily: "Inter, Helvetica Neue, Arial, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.5rem, 5.1vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  statement:
    fontFamily: "Inter, Helvetica Neue, Arial, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.75rem, 9vw, 9.5rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.65
  reading:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.97rem + 0.2vw, 1.125rem)"
    lineHeight: 1.75
  nav:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    letterSpacing: "-0.01em"
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
  section-space: "clamp(3.5rem, 7.8vw, 7.5rem)"
  header-height: "4.25rem"
components:
  button-primary:
    backgroundColor: "{colors.cobalt-on-dark}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "10px 14px"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "10px 14px"
    height: "44px"
  social-link:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    size: "48px"
---

# Design System: Ilham Kurniawan (Kairav)

## Overview

**Creative North Star: "The Quiet Studio"**

The site speaks like a studio that lets the work carry the weight: neutral surfaces, one grotesk, hairline rules and a lot of air. Hierarchy comes from size and weight, never from colour. Cobalt is the single accent and appears only where something can be acted on or is current. The Kairav mascot and the greyscale portrait are the two human, characterful elements; everything around them stays restrained.

Motion follows scroll. Smooth scrolling (Lenis) drives GSAP, titles rise line by line out of masks, bands flip the palette as they arrive, and one pinned moment, the statement, lets a tilted field of words fly toward the viewer before the next section covers it. Each effect earns its scroll distance and is dropped or shortened on phones.

The look is adapted from santalarch.com (structure, motion grammar), then kept honest to a freelance developer who sells to small-business owners: real shipped projects, plain Indonesian copy, a direct WhatsApp path always within reach.

**Key Characteristics:**
- One typeface, Inter, with contrast carried by weight (800 wordmark, 500 headings) and scale.
- Monochrome surfaces in two themes; cobalt as the only hue.
- Hairline rules instead of cards and shadows.
- Palette-inverting bands (light on dark, dark on light) as the section rhythm.
- Scroll-driven motion with a reduced-motion alternative for every effect.

## Colors

A grey scale in two themes with one cobalt accent. Dark is the default theme.

### Primary
- **Cobalt Signal** (#a9bdff on dark, #234394 on light): the only accent. Primary button fill, current nav item, status dot, link hover, focus ring, the 2px section rule.

### Neutral
- **Ink** (#0f0f0f) and **Paper** (#f0f0f0): page background in dark and light themes, and each other's text colour.
- **Paper Muted / Elevated / Accented** (#e6e6e6 / #fafafa / #dcdcdc): light-theme surfaces.
- **Charcoal Muted / Elevated / Accented** (#171717 / #1d1d1d / #272727): dark-theme surfaces.
- **Rules** (#cdcdcd light, #323232 dark; strong #8a8a8a and #707070): hairlines and control borders.
- **Text** (#1f1f1f and #5c5c5c light; #dedede and #ababab dark): body and secondary text.
- **Mascot Stage** (#263c73 dark, #d8e1f8 light) with **Mascot Mark** (#355cc2 light): reserved for the Kairav character tile.

### Named Rules
**The One Voice Rule.** Cobalt is the only hue. A second accent colour (a green "available" dot was tried and removed) breaks the monochrome and is not allowed.

**The Inverted Band Rule.** A band is the opposite theme's token set, declared once in `main.css` (`:root:not(.dark), .dark .inverse-band` for light values; `.dark, :root:not(.dark) .inverse-band` for dark). Never copy token values into a component.

## Typography

**Display Font:** Inter (with Helvetica Neue, Arial)
**Body Font:** Inter (with system-ui)

**Character:** A single neutral grotesk used at two voices: heavy, tight and uppercase for the name and footer wordmark; medium weight, sentence case and tightly tracked for headings.

### Hierarchy
- **Wordmark** (800, min(14.2cqw, 14rem), 0.84): the hero name and the footer "KAIRAV"; uppercase, fills the container width.
- **Display** (500, clamp(2.5rem, 5.8vw, 5.75rem), 0.98): section and route titles; sentence case.
- **Detail title** (500, clamp(2.5rem, 5.1vw, 5.25rem), 1): case study, article and service titles.
- **Statement** (500, clamp(2.75rem, 9vw, 9.5rem), 0.95; 15vw on phones): the pinned statement lines only.
- **Body / Reading** (400, 1rem to 1.125rem, 1.65 to 1.75): 65 to 75ch.
- **Nav** (500, 0.8rem, -0.01em): header links.
- **Label** (700, 0.75rem, 0.09em, uppercase): meta strip and small captions.

### Named Rules
**The Tracking Floor Rule.** Letter-spacing never goes below -0.04em.

## Layout

A single centred frame (`min(99rem, 100% - 2 * gutter)`) with a fluid gutter and fluid section spacing. The hero stacks a meta strip, the wordmark and an intro row (copy, portrait, mascot); on wide screens the hero is at least one viewport tall so the call-to-action stays above the fold at 1280x800. Sections are separated by hairlines or by palette-inverting bands that span the full width.

The statement band is `position: sticky` over a `.statement-run` spacer (90svh, 55svh on phones, 60svh on short screens); everything after it lives in `.home-cover`, an opaque layer that slides over the stuck band. Reduced motion removes the stickiness and the spacer.

Persistent consult actions: a fixed WhatsApp bar below 54rem that appears after 480px of scroll. Contact is directly accessible on desktop via the primary navigation.

## Elevation & Depth

Flat. Depth comes from tonal surfaces, hairline borders and the palette-inverting bands, never from shadows. The only decorative "depth" is the perspective of the statement's word field and the portrait/preview tilt on fine pointers.

### Named Rules
**The Flat-By-Default Rule.** No resting shadows. State changes use colour inversion or a small translate (the footer social buttons lift 3px).

## Shapes

Square corners almost everywhere (0 radius on buttons, social links, panels); the shared `--ui-radius` is 0.1875rem for Nuxt UI controls. The one circle is the status dot. Imagery is rectangular, cropped, and either greyscale (portrait) or inside a clip-path reveal (project preview).

## Components

### Buttons
- **Shape:** square, 44px minimum height, 1px border.
- **Primary:** cobalt fill (#a9bdff dark, #234394 light) with inverted text; hover flips to the inverted ink/paper fill.
- **Secondary:** transparent with a strong rule border; hover tints the surface and borders cobalt.

### Navigation
- Text links, 0.8rem weight 500. A hairline draws in above the hovered or current item, siblings dim to 40%, and the current item is cobalt. Below 54rem the links collapse into the Menu panel.

### Footer social links
- 48px square icon buttons (WhatsApp, Email, Instagram, LinkedIn, GitHub) with a strong rule border and an `aria-label`; hover inverts the fill and lifts 3px.

### Statement (signature)
- Sticky 100svh stage with a tilted perspective field of decorative words (`aria-hidden`) and a centred three-line title; the title dissolves as the field flies forward and the next section covers it.

## Do's and Don'ts

### Do:
- **Do** reach for weight and scale before colour to build hierarchy.
- **Do** use cobalt only for actionable or current elements.
- **Do** keep tracking at or above -0.04em.
- **Do** give every effect a reduced-motion alternative and shorten it on phones.
- **Do** keep the WhatsApp path one step away on every page.

### Don't:
- **Don't** number sections (01, 02, 03) or add kicker labels above headings.
- **Don't** introduce a second accent hue.
- **Don't** use cards, resting shadows or gradients as structure.
- **Don't** copy token values into components; use the shared surface tokens.
- **Don't** invent testimonials, metrics or client names; use real shipped work.
