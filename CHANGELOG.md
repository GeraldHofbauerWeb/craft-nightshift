# Changelog

All notable changes to Nightshift are documented here. This project adheres to
[Semantic Versioning](https://semver.org/) and
[Keep a Changelog](https://keepachangelog.com/).

## 1.0.2 - 2026-08-16

### Fixed

- **Dropdown fields were unreadable — the real cause.** 1.0.1 painted the native
  `<option>` list, but a Craft Dropdown field never shows one: Selectize hides
  the `<select>` and draws a DOM replica, so those rules landed on an element
  nobody can see. Two hardcoded palettes stack on that replica — Selectize's own
  (`#fff`, `#303030`, `#e8e8e8`) and Craft's restyle on top, which pins every
  label to `#3f4d5a` and paints `.selectize-dropdown-content` a flat `#fff`.
  None of it derives from a Craft token, so the ramp flip could not reach any of
  it. The whole widget is now themed: control, list, group headings, hover and
  selected rows, multi-select chips, and the query highlight that marked the
  ampersand in every option of a label like "Fotografie & Bild".
- **Text selection had no colour of its own.** The CP declares no `::selection`
  outside Prism's code blocks. Selectize makes that constant rather than
  occasional — opening a Dropdown selects the whole label — so the control
  carried the browser's own highlight on every click.
- **Selected rows and cards sat at ~3:1.** `--bg-selection-dark` is always paired
  with white text by Craft; the flip sent it to a mid grey. It is now set
  outright instead of derived.

## 1.0.1 - 2026-08-15

### Fixed

- **CKEditor toolbars stayed white.** Craft's field plugin pins
  `--ck-color-toolbar-background` and `--ck-color-panel-background` to
  `var(--white)` with `!important`, so the flipped ramp could not reach them and
  every rich-text field wore a bright strip. Nightshift now remaps CKEditor's
  `--ck-color-*` layer — toolbar, dropdown panels, balloon inputs, dialogs and
  tooltips — from the same tokens as the rest of the CP.
- **The selected entry/field tab stayed white.** Craft sets
  `background-color: var(--white) !important` on `[role="tab"].sel`.
- **The open `<select>` list was unreadable.** `color-scheme: dark` alone does not
  do it: the `<option>`s carry no background of their own, so Chrome painted the
  popup from its light defaults and the highlighted row came out grey on grey.
  The options are now painted explicitly.

## 1.0.0 - 2026-07-29

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
