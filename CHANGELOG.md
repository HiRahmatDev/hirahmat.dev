# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- New `/lab/project-aidah` page

### Changed

- Enhance layout of Murajaah at-Taisir page with logo and author attribution (Ust. Adi Hidayat)

## [0.15.0] - 2026-02-07

### Added

- New hero image in homepage for mobile display

### Changed

- Refactor articles page structure to using streaming fetch
- Update revalidate time home, articles, and article detail pages to 1 minute
- Hide scrollbar and enhance horizontal spacing of overflow in homepage

### Fixed

- Overlapping in article detail page

## [0.14.9] - 2026-02-01

### Removed

- Entrance animation in landing page
- Smooth scrolling

### Changed

- Adjust consistent padding in murajaah-at-taisir page

## [0.14.8] - 2026-02-01

### Changed

- Update typography and spacing

## [0.14.7] - 2026-01-29

### Changed

- Upgrade Next.js to v16.1.6 with running command `pnpx @next/codemod upgrade latest`

## [0.14.6] - 2026-01-25

### Changed

- Update actions/checkout to v6 and pnpm/action-setup to v4 in github workflow file

## [0.14.5] - 2026-01-21

### Changed

- Update container max-widths and spacing for improved layout consistency

## [0.14.4] - 2026-01-17

### Changed

- Update line height for improved readability

## [0.14.3] - 2026-01-17

### Changed

- Update line height in BulletedListItem component for improved readability

### Fixed

- Remove vertical scroll in selected blogs section

## [0.14.2] - 2026-01-17

### Changed

- Adjust padding and gap in `AboutMeSection`, `SelectedBlogsList`, and `SelectedProjectsSection` for improved layout
- Adjust padding in `BottomActionBar`, `MenuButton`, and `QuranPageRenderer` components for improved layout
- Adjust padding and gap in `Callout` component for improved layout
- Update category background color in `ArticlesList` and adjust main container padding in `ArticlesPage`
- Adjust heading and paragraph styles for `Articles` and `ArticleDetail` pages
- Update font weight for `BulletedListItem` component
- Update `Navbar` component layout and adjust button font weight
- Update padding for container utility in `utilities.css`

## [0.14.1] - 2026-01-17

### Changed

- Update header font sizes and tracking for `AboutMeSection`, `SelectedBlogsHeader`, and `SectionHeader` components
- Adjust spacing and typography for various components in `NotionRenderer`

### Removed

- Remove `OrbBackground` component

## [0.14.0] - 2026-01-17

### Changed

- Update copywriting in landing page
- Update typography's font weight in landing page
- Update spacing between contents in landing page
- Update theme accent color
- Update backdrop blur effect in navbar

## [0.13.2] - 2026-01-09

### Fixed

- CVE-2025-66478 (critical): Remote code execution via crafted RSC payload
- CVE-2025-55184 (high): DoS via malicious HTTP request causing server to hang and consume CPU
- CVE-2025-55183 (medium): Compiled Server Action source code can be exposed via malicious request
- CVE-2025-67779 (high): Incomplete fix for CVE-2025-55184 DoS via malicious RSC payload causing infinite loop

## [0.13.1] - 2025-11-23

### Changed

- Update `jsonLd` object in `app/(main)/page.tsx`

## [0.13.0] - 2025-11-23

### Added

- New `/articles` page

### Changed

- Limit selected projects/blogs to 3 and add 'See more' links
- Update category badge's style
- Update code's style

## [0.12.1] - 2025-11-22

### Added

- Images for new blog post

## [0.12.0] - 2025-11-22

### Added

- Animated gradient orb background effect to hero section
- Scroll animations to `AboutMeSection`, `SelectedBlogSection`, and `ContactCTA`

## [0.11.1] - 2025-11-22

### Added

- GitHub Actions workflow for automated Vercel deployment on tags.

## [0.11.0] - 2025-11-16

### Added

- Speech-to-text Alquran app in "/lab/stt-alquran" [#1](https://github.com/HiRahmatDev/hirahmat.dev/pull/1), [#6](https://github.com/HiRahmatDev/hirahmat.dev/pull/6)

### Changed

- Splitted layout between home (main) and lab [#5](https://github.com/HiRahmatDev/hirahmat.dev/pull/5)
- Murajaah At-Taisir Mobile UI Optimization [#7](https://github.com/HiRahmatDev/hirahmat.dev/pull/7)
- Release Murajaah At-Taisir app v0.4.0, see details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

## [0.10.8] - 2025-11-14

### Fixed

- Duplicate ayah detection

## [0.10.7] - 2025-11-12

### Changed

- Release hotfix Murajaah At-Taisir app v0.3.2, see details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

## [0.10.6] - 2025-11-11

### Changed

- Release Murajaah At-Taisir app v0.3.1, see details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

## [0.10.5] - 2025-11-9

### Changed

- Release Murajaah At-Taisir app v0.3.0, see details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

## [0.10.4] - 2025-11-8

### Fixed

- Improved ayah display logic and layout shifting in murajaah-at-taisir, with refactored code for better readability. See details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

## [0.10.3] - 2025-11-5

### Added

- Add promotional images for murajaah-at-taisir blog and app in `public/images` to support marketing content.

## [0.10.2] - 2025-11-5

### Fixed

- Prevent unwanted scroll when navigating to ayah page in `lab/murajaah-at-taisir/layout.tsx` by passing `{ scroll: false }` to `router.replace`.

## [0.10.1] - 2025-11-4

### Fixed

- Fix ayah highlighting and ornament opacity in QuranPageRenderer for murajaah-at-taisir (see details in app/lab/murajaah-at-taisir/components/QuranPageRenderer.tsx).

## [0.10.0] - 2025-11-4

### Added

- Initial release of `murajaah-at-taisir` in `lab/murajaah-at-taisir`.  
  See details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

### Changed

- Global styles: support Amiri Quran font for RTL in `globals.css`.
- Layout: import and apply Amiri Quran font for RTL in `layout.tsx`.
- Clean up `next.config.ts` by removing unused image remotePatterns.

## [0.9.1] - 2025-11-2

### Changed

- Update date format in `formatDate` (in `app/lib/dayjs.tsx`) to use "DD MMM YYYY" for consistency.
- Refine article detail page date display (in `app/articles/[slug]/page.tsx`): improved wording and formatting for published/updated dates.

## [0.9.0] - 2025-11-1

### Added

- Floating and parallax animation for hero section accent images using GSAP.
- Mousemove-based parallax effect for hero section accent images.

### Changed

- Refactor accent image refs and animation logic in `HeroSection` for improved interactivity and code clarity.
- Refactor GSAP animation logic in HeroSection and SectionHeader for improved readability and maintainability.
- Extract project card into its own component and added GSAP animation for image load in SelectedProjectCards.
- Updat cta-button default shadow style in `globals.css` to use `shadow-md` for consistency with hover/active states.
- Adjust heading font sizes in Notion renderer components (`Heading1`, `Heading2`, `Heading3`) for improved visual hierarchy and consistency

## [0.8.2] - 2025-10-31

### Changed

- Improve layout, typography, and styles for article, hero section, and notion renderer components

## [0.8.1] - 2025-10-31

### Added

- Images for "Next.js v16 Sudah Rilis Gan!" blog

### Changed

- Better spacing in TOC and `BulletedListItem.tsx`

## [0.8.0] - 2025-10-31

### Added

- JSON-LD schema script in landing page

### Changed

- Add hover and animation styles in TOC links
- Fix layout shrink issue in selected blog cards

## [0.7.0] - 2025-10-30

### Added

- Images for "Mengenal Git dan GitHub" blog
- Better favicon.ico, icon.ico, and apple-icon.png

### Changed

- Better style of `Callout.tsx` and `RichText.tsx` component

## [0.6.1] - 2025-10-29

### Fixed

- Remove unwanted horizontal overflow on the article detail page

## [0.6.0] - 2025-10-29

### Added

- Support articles filtering based on the running environment. New `NEXT_PUBLIC_APP_ENV` env needed.
- Image assets for the "Mengenal Git dan GitHub" blog.
- Support for Notion block renderer of type "code" with `NotionRenderer/common/CodeBlock.tsx` component.
- Support `maxWidth` attribute for <LocalImage> tag in notion.
- Local images for blog with title: "Mengenal Git dan GitHub."
- Handle rendering block type "callout" from Notion.

### Changed

- Smaller text of footer.

### Fixed

- Render titles and descriptions correctly in `SelectedBlogSection.tsx` and on the article detail page.

## [0.5.2] - 2025-10-25

### Fixed

- Correct the Notion API filter logic in `app/services/notion.ts` to properly filter by `status: "Published"` AND (`category: "Jurnal Proyek"` OR `category: "Blog"`), ensuring accurate post retrieval.

## [0.5.1] - 2025-10-25

### Fixed

- An issue where the sitemap included only selected projects. The sitemap now correctly lists all articles by using `fetchAllArticles` instead of `fetchSelectedProjects` in `app/sitemap.ts`.

## [0.5.0] - 2025-10-25

### Added

- Vercel Analytics and Speed Insights

## [0.4.1] - 2025-10-24

### Fixed

- Hero image too large
- Smooth scroll always trigger between page

## [0.4.0] - 2025-10-24

### Changed

- Upgrade to Next.js 16, React 19.2, and ESLint 9.38
- Refine ESLint and TypeScript config compatibility
- Remove Turbopack from build/dev scripts

### Added

- Improve accessibility for HeroSection images

### Removed

- Simplify date/time formatting utilities

## [0.3.0] - 2025-10-24

### Added

- Featured blog section and blog fetch API
- Internal image and GIF parsing support

### Changed

- Improve Notion content rendering and styles
- Update color palette and visual elements
- Enhance article and project metadata handling

## [0.2.0] - 2025-10-22

### Added

- Table of Contents in article detail page
- `Heading3` component for notion renderer

## [0.1.5] - 2025-10-21

### Added

- Animation with gsap in landing page

### Fixed

- OG Image for better SEO

## [0.1.4] - 2025-10-21

### Added

- sitemap.xml

### Removed

- Dark mode

## [0.1.3] - 2025-10-19

### Changed

- Add `common/Blockquote.tsx` for notion renderer

## [0.1.2] - 2025-10-19

### Changed

- Better line height and font size for article and landing page

### Fixed

- CTA in contact cta near footer can't be clicked in mobile display

## [0.1.1] - 2025-10-19

### Changed

- Update page layout and visual styles for better consistency.
- Refactore components and cleaned up code structure.

## [0.1.0] - 2025-10-17

**Initial release**

### Added

- First public version of the project.
- Core features implemented.
- Basic project setup and documentation.
