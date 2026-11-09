# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: owners of small and medium businesses (UMKM, startups, organisations) in Indonesia who need a website, dashboard or custom system and are deciding whom to trust. They arrive from search, referrals or WhatsApp, usually on a phone, and want to know within seconds what Ilham builds, whether it is credible, and how to start a conversation.

Secondary (not the lead audience): recruiters looking for a Fullstack/Frontend developer, who go to the CV and about pages.

## Product Purpose

Personal portfolio and services site of Ilham Kurniawan, a Fullstack Developer (Nuxt/Vue, Laravel, Flutter, AI/API integration) based in Yogyakarta/Blora. It presents services, case studies, essays and a CV, and converts visitors into consultation conversations. Success: a business visitor clicks the WhatsApp consultation, fills the consultation quiz, or sends a message.

## Positioning

One person who plans, builds, deploys and maintains the whole product (web, Android, backend, AI/API, SEO/GEO), with a personal voice shown through essays and real shipped projects (Kairav Studio, Jurutani, Santap, Qinarian, Ruangnu, Kamaba Yogyakarta, Agrinuclear).

## Operating Context

Bilingual site (Indonesian default, English), light and dark theme toggle already in use. Content lives in Nuxt Content markdown (blog, portofolio, services, id/en). Hosted on Vercel at ilhamkrnwan.my.id. Primary conversion channels: WhatsApp (wa.me link), email, the consultation quiz on /contact.

## Capabilities and Constraints

- Stack: Nuxt 4, Nuxt UI 4, Tailwind 4, GSAP, @nuxt/content, @nuxtjs/i18n, nuxt-og-image.
- Routes: /, /about, /services(/slug), /portofolio(/slug), /blogs(/slug), /gallery, /contact, /cv.
- All UI strings go through i18n keys; both locales must keep working.
- Existing behaviour (consultation quiz, copy link, theme and language switch, menu, SEO and JSON-LD) must be preserved.
- Undecided: whether to keep the 3D avatar illustrations in the new visual world.

## Brand Commitments

- Personal name leads: "Ilham Kurniawan". "Kairav" is the studio/service name under it.
- Existing logo/favicon/OG assets remain until the user supplies replacements.

## Evidence on Hand

Real case studies in `content/portofolio`, essays in `content/blog`, service pages in `content/services`, project screenshots in `public/portofolio` and `public/gallery`, a profile photo set in `public/*.avif`. No client testimonials, metrics or pricing exist in the repo: do not invent them.

## Product Principles

1. Trust before spectacle: a business owner should believe Ilham can deliver before they are impressed by effects.
2. Show real shipped work and a human voice; never fabricate proof.
3. The fastest path from any page to a WhatsApp or consultation start stays one step away.
4. Both languages and both themes are first-class.
5. Motion and effects serve reading and never block it on a phone.

## Accessibility & Inclusion

Target WCAG 2.2 AA: sufficient contrast in light and dark, visible focus, touch targets of 44px, a considered `prefers-reduced-motion` alternative, readable body text sizes.
