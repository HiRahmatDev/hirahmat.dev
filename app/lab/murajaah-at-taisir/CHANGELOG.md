# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Gradient background to `QuranPageRenderer` component for improved visual appearance.

### Changed

- Normalize ayah input value to match with min & max of ayah of selected surah.

### Fixed

- Improved logic for splitting the first word of ayah in murojaah-at-taisir QuranPageRenderer, resulting in more accurate ayah display. See details in `app/lab/murajaah-at-taisir/components/QuranPageRenderer.tsx`.
- Shifting layout of ayah every time random ayah is triggered.
- Fix 404 when generate random ayah.
- [CHORE] refactor code to more readable by splitting code.

## [v0.1.2] - 2025-11-5

### Fixed

- Prevent scroll on ayah page navigation in `layout.tsx` by using `{ scroll: false }` in `router.replace`.

## [v0.1.1] - 2025-11-4

### Fixed

- Fix ayah highlighting and ornament opacity in QuranPageRenderer for improved clarity and selection feedback.

## [v0.1.0] - 2025-11-4

### Added

- Initial release of Murajaah At Taisir App.
