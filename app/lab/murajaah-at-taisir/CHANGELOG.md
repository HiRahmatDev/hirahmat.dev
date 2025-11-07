# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Improved logic for splitting the first word of ayah in murojaah-at-taisir QuranPageRenderer, resulting in more accurate ayah display. See details in `app/lab/murajaah-at-taisir/components/QuranPageRenderer.tsx`.

## [v0.1.2] - 2025-11-5

### Fixed

- Prevent scroll on ayah page navigation in `layout.tsx` by using `{ scroll: false }` in `router.replace`.

## [v0.1.1] - 2025-11-4

### Fixed

- Fix ayah highlighting and ornament opacity in QuranPageRenderer for improved clarity and selection feedback.

## [v0.1.0] - 2025-11-4

### Added

- Initial release of Murajaah At Taisir App.
