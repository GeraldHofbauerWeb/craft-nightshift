# Changelog

All notable changes to Nightshift are documented here. This project adheres to
[Semantic Versioning](https://semver.org/) and
[Keep a Changelog](https://keepachangelog.com/).

## 1.0.0 - Unreleased

### Added

- Initial release: a dark theme for the Craft 5 control panel.
- One-click sun/moon toggle in the CP header, pinned next to the account menu.
- Preference persisted in `localStorage['cp-theme']`, applied before first paint
  (no flash of light on reload).
- Theming for the global sidebar, header, panes, cards, inputs, dropdown menus,
  HUDs, data tables, secondary buttons, and the Plugin Store (Vue/Tailwind),
  including its category sidebar.
- Asset bundle depends on `CpAsset` so overrides load after Craft's core CP CSS.
