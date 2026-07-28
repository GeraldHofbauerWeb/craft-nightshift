# Changelog

All notable changes to Nightshift are documented here. This project adheres to
[Semantic Versioning](https://semver.org/) and
[Keep a Changelog](https://keepachangelog.com/).

## 1.0.0 - Unreleased

### Added

- Initial release: a dark theme for the Craft 5 control panel.
- One-click sun/moon toggle in the CP header, pinned next to the account menu.
- **Follows the OS setting** (`prefers-color-scheme`) by default and reacts to it
  live; clicking the toggle sets an explicit per-browser override, persisted in
  `localStorage['cp-theme']` and applied before first paint (no flash of the
  wrong theme on load).
- **Token-first theming:** flips Craft's HSL neutral ramp (`--gray-NNN-hsl`) once,
  so surfaces, hairlines and text recolour coherently — covering the global
  sidebar, header, panes, cards, inputs, checkboxes, dropdown menus, date/time
  pickers, HUDs, modals, slideouts (incl. the field-layout designer), data
  tables, and the Plugin Store (Vue/Tailwind).
- Elevation expressed with surface + hairline instead of muddy dark-on-dark drop
  shadows; pop-overs keep only a whisper of shadow.
- Brand/status colours (red/teal/amber/sky) and focus rings left untouched.
- Asset bundle depends on `CpAsset` so overrides load after Craft's core CP CSS.
