# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.13.0] - 2025-11-23

### Added

- New `/articles` page

### Changed

- Limit selected projects/blogs to 3 and add 'See more' links
- Update category badge's style
- Update code's style

## [v0.12.1] - 2025-11-22

### Added

- Images for new blog post

## [v0.12.0] - 2025-11-22

### Added

- Animated gradient orb background effect to hero section
- Scroll animations to `AboutMeSection`, `SelectedBlogSection`, and `ContactCTA`

## [v0.11.1] - 2025-11-22

### Added

- GitHub Actions workflow for automated Vercel deployment on tags.

## [v0.11.0] - 2025-11-16

### Added

- Speech-to-text Alquran app in "/lab/stt-alquran" [#1](https://github.com/HiRahmatDev/hirahmat.dev/pull/1), [#6](https://github.com/HiRahmatDev/hirahmat.dev/pull/6)

### Changed

- Splitted layout between home (main) and lab [#5](https://github.com/HiRahmatDev/hirahmat.dev/pull/5)
- Murajaah At-Taisir Mobile UI Optimization [#7](https://github.com/HiRahmatDev/hirahmat.dev/pull/7)
- Release Murajaah At-Taisir app v0.4.0, see details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

## [v0.10.8] - 2025-11-14

### Fixed

- Duplicate ayah detection

## [v0.10.7] - 2025-11-12

### Changed

- Release hotfix Murajaah At-Taisir app v0.3.2, see details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

## [v0.10.6] - 2025-11-11

### Changed

- Release Murajaah At-Taisir app v0.3.1, see details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

## [v0.10.5] - 2025-11-9

### Changed

- Release Murajaah At-Taisir app v0.3.0, see details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

## [v0.10.4] - 2025-11-8

### Fixed

- Improved ayah display logic and layout shifting in murajaah-at-taisir, with refactored code for better readability. See details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

## [v0.10.3] - 2025-11-5

### Added

- Add promotional images for murajaah-at-taisir blog and app in `public/images` to support marketing content.

## [v0.10.2] - 2025-11-5

### Fixed

- Prevent unwanted scroll when navigating to ayah page in `lab/murajaah-at-taisir/layout.tsx` by passing `{ scroll: false }` to `router.replace`.

## [v0.10.1] - 2025-11-4

### Fixed

- Fix ayah highlighting and ornament opacity in QuranPageRenderer for murajaah-at-taisir (see details in app/lab/murajaah-at-taisir/components/QuranPageRenderer.tsx).

## [v0.10.0] - 2025-11-4

### Added

- Initial release of `murajaah-at-taisir` in `lab/murajaah-at-taisir`.  
  See details in [app/lab/murajaah-at-taisir/CHANGELOG.md](app/lab/murajaah-at-taisir/CHANGELOG.md).

### Changed

- Global styles: support Amiri Quran font for RTL in `globals.css`.
- Layout: import and apply Amiri Quran font for RTL in `layout.tsx`.
- Clean up `next.config.ts` by removing unused image remotePatterns.

## [v0.9.1] - 2025-11-2

### Changed

- Update date format in `formatDate` (in `app/lib/dayjs.tsx`) to use "DD MMM YYYY" for consistency.
- Refine article detail page date display (in `app/articles/[slug]/page.tsx`): improved wording and formatting for published/updated dates.

## [v0.9.0] - 2025-11-1

### Added

- Floating and parallax animation for hero section accent images using GSAP.
- Mousemove-based parallax effect for hero section accent images.

### Changed

- Refactor accent image refs and animation logic in `HeroSection` for improved interactivity and code clarity.
- Refactor GSAP animation logic in HeroSection and SectionHeader for improved readability and maintainability.
- Extract project card into its own component and added GSAP animation for image load in SelectedProjectCards.
- Updat cta-button default shadow style in `globals.css` to use `shadow-md` for consistency with hover/active states.
- Adjust heading font sizes in Notion renderer components (`Heading1`, `Heading2`, `Heading3`) for improved visual hierarchy and consistency

## [v0.8.2] - 2025-10-31

### Changed

- Improve layout, typography, and styles for article, hero section, and notion renderer components

## [v0.8.1] - 2025-10-31

### Added

- Images for "Next.js v16 Sudah Rilis Gan!" blog

### Changed

- Better spacing in TOC and `BulletedListItem.tsx`

## [v0.8.0] - 2025-10-31

### Added

- JSON-LD schema script in landing page

### Changed

- Add hover and animation styles in TOC links
- Fix layout shrink issue in selected blog cards

## [v0.7.0] - 2025-10-30

### Added

- Images for "Mengenal Git dan GitHub" blog
- Better favicon.ico, icon.ico, and apple-icon.png

### Changed

- Better style of `Callout.tsx` and `RichText.tsx` component

## [v0.6.1] - 2025-10-29

### Fixed

- Remove unwanted horizontal overflow on the article detail page

## [v0.6.0] - 2025-10-29

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

## [v0.5.2] - 2025-10-25

### Fixed

- Correct the Notion API filter logic in `app/services/notion.ts` to properly filter by `status: "Published"` AND (`category: "Jurnal Proyek"` OR `category: "Blog"`), ensuring accurate post retrieval.

## [v0.5.1] - 2025-10-25

### Fixed

- An issue where the sitemap included only selected projects. The sitemap now correctly lists all articles by using `fetchAllArticles` instead of `fetchSelectedProjects` in `app/sitemap.ts`.

## [v0.5.0] - 2025-10-25

### Added

- Vercel Analytics and Speed Insights

## [v0.4.1] - 2025-10-24

### Fixed

- Hero image too large
- Smooth scroll always trigger between page

## [v0.4.0] - 2025-10-24

### Changed

- Upgrade to Next.js 16, React 19.2, and ESLint 9.38
- Refine ESLint and TypeScript config compatibility
- Remove Turbopack from build/dev scripts

### Added

- Improve accessibility for HeroSection images

### Removed

- Simplify date/time formatting utilities

## [v0.3.0] - 2025-10-24

### Added

- Featured blog section and blog fetch API
- Internal image and GIF parsing support

### Changed

- Improve Notion content rendering and styles
- Update color palette and visual elements
- Enhance article and project metadata handling

## [v0.2.0] - 2025-10-22

### Added

- Table of Contents in article detail page
- `Heading3` component for notion renderer

## [v0.1.5] - 2025-10-21

### Added

- Animation with gsap in landing page

### Fixed

- OG Image for better SEO

## [v0.1.4] - 2025-10-21

### Added

- sitemap.xml

### Removed

- Dark mode

## [v0.1.3] - 2025-10-19

### Changed

- Add `common/Blockquote.tsx` for notion renderer

## [v0.1.2] - 2025-10-19

### Changed

- Better line height and font size for article and landing page

### Fixed

- CTA in contact cta near footer can't be clicked in mobile display

## [v0.1.1] - 2025-10-19

### Changed

- Update page layout and visual styles for better consistency.
- Refactore components and cleaned up code structure.

## [v0.1.0] - 2025-10-17

**Initial release**

### Added

- First public version of the project.
- Core features implemented.
- Basic project setup and documentation.
