# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Layout shrink issue in selected blog cards

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
- Added necessary image assets for the "Mengenal Git dan GitHub" blog.
- Added support for Notion block renderer of type "code" with `NotionRenderer/common/CodeBlock.tsx` component.
- Support `maxWidth` attribute for <LocalImage> tag in notion.
- Local images for blog with title: "Mengenal Git dan GitHub."
- Handled rendering block type "callout" from Notion.

### Changed

- Smaller text of footer.

### Fixed

- Rendered titles and descriptions correctly in `SelectedBlogSection.tsx` and on the article detail page.

## [v0.5.2] - 2025-10-25

### Fixed

- Corrected the Notion API filter logic in `app/services/notion.ts` to properly filter by `status: "Published"` AND (`category: "Jurnal Proyek"` OR `category: "Blog"`), ensuring accurate post retrieval.

## [v0.5.1] - 2025-10-25

### Fixed

- Fixed an issue where the sitemap included only selected projects. The sitemap now correctly lists all articles by using `fetchAllArticles` instead of `fetchSelectedProjects` in `app/sitemap.ts`.

## [v0.5.0] - 2025-10-25

### Added

- Integrated Vercel Analytics and Speed Insights

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

- Improved Notion content rendering and styles
- Updated color palette and visual elements
- Enhanced article and project metadata handling

## [v0.2.0] - 2025-10-22

### Added

- Table of Contents in article detail page
- `Heading3` component for notion renderer

## [v0.1.5] - 2025-10-21

### Added

- Added animation with gsap in landing page

### Fixed

- Fixed OG Image for better SEO

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

**UI improvements and code refactor**

### Changed

- Updated page layout and visual styles for better consistency.
- Refactored components and cleaned up code structure.

## [v0.1.0] - 2025-10-17

**Initial release**

### Added

- First public version of the project.
- Core features implemented.
- Basic project setup and documentation.
