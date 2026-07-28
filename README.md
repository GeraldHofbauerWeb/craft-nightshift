# Nightshift

**A dark theme for the Craft CMS control panel — with a one-click toggle.**

Nightshift adds a proper dark mode to the Craft 5 control panel. A round sun/moon
button sits in the CP header next to your account menu; click it and the whole
panel switches to a calm, low-glare dark palette. Your choice is remembered per
browser and applied *before* the first paint, so there's no flash of the light UI
when you reload.

- 🌙 **One-click toggle** in the CP header (no settings page to hunt through)
- 💾 **Remembered preference** (`localStorage`) — set it once, it sticks
- ⚡ **No flash of light** — the theme is applied in the `<head>` before render
- 🎨 **Broad coverage** — global nav, panes, inputs, tables, menus, HUDs, and the
  Plugin Store (Vue/Tailwind) are all themed
- 🪶 **Zero config, zero database** — drop it in, it just works
- 🔒 **CP-only** — never touches your site's front end

## Requirements

- Craft CMS **5.0.0** or later
- PHP **8.2** or later

## Installation

From your project directory:

```bash
composer require gerry3010/craft-nightshift
./craft plugin/install nightshift
```

Or install it from the Craft **Plugin Store** (search for *dark mode*, *dark
theme*, or *Nightshift*) and click **Install**.

## Usage

There's nothing to configure. After installing, reload the control panel — a
moon icon appears at the top-right, next to your account menu. Click it to go
dark; click the sun to go back to light. The preference is stored in your
browser, so each user (and each device) chooses independently.

## How it works

Nightshift is deliberately tiny and non-invasive:

- A stylesheet scoped entirely to `html[data-theme="dark"]` overrides Craft's
  design tokens plus the main structural surfaces. It's loaded *after* Craft's
  own CP styles (via an asset bundle that `depends` on `CpAsset`) so its
  overrides win without a wall of `!important`.
- A small script injects the toggle button and flips the `data-theme` attribute,
  persisting the value in `localStorage['cp-theme']`.
- A one-line inline `<head>` script re-applies the saved theme before the page
  renders, eliminating the flash of light on reload.

No data is stored server-side, no user records are touched, and the front end of
your site is never affected.

## License

MIT — see [LICENSE.md](LICENSE.md). Free and open source.

## Credits

Built by [Gerald Hofbauer](https://geraldhofbauer.net).
