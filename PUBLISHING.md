# Publishing Nightshift to the Craft Plugin Store

A submission checklist grounded in the official Craft 5 docs (fetched 2026-07-28):
- [Publishing to the Plugin Store](https://craftcms.com/docs/5.x/extend/plugin-store.html)
- [How to Build a Plugin](https://craftcms.com/docs/5.x/extend/plugin-guide.html)
- [Plugin Editions](https://craftcms.com/docs/5.x/extend/plugin-editions.html)

---

## VCS decision — GitHub is REQUIRED (this is the blocker)

> "To register a plugin, it must be pushed to a **public GitHub** repository."
> — Craft docs, *Publishing to the Plugin Store*

The Plugin Store only integrates with **GitHub**. Bitbucket and GitLab are **not**
accepted as the canonical repo — the Store watches the GitHub repo for new release
tags. (The docs even spell out that if you ever change the GitHub URL you must email
support@craftcms.com or "new release tags won't be picked up automatically.")

**Recommendation:** make **GitHub the canonical/public home** for `craft-nightshift`.

- The owner's intended Bitbucket `Gerry3010/GER` repo **cannot** be the Store source.
- Best pattern: create a **public GitHub repo** (e.g. `Gerry3010/craft-nightshift`) as
  canonical, and — if the owner still wants Bitbucket for his workflow — keep Bitbucket
  as an **optional mirror** (push both remotes), never the reverse. Everything the Store
  reads (tags, CHANGELOG, icon, composer.json) must be on GitHub.
- Do **not** register on Packagist under a Bitbucket source either — point Packagist at
  the GitHub URL too.

> Packagist itself is **optional**: "Packagist is *not* a requirement for listing in the
> Plugin Store, but it makes discovery and automation easier for your customers." Register
> it anyway (good for `composer require` discoverability), pointed at the GitHub repo.

---

## Blockers to fix in the current plugin BEFORE submission

1. **Icon in the wrong place.** Docs: icons must be "square SVG files, saved as `icon.svg`
   at the **root of your plugin's source directory** (e.g. `src/`)." The current `icon.svg`
   is at the **repo root** → move it to **`src/icon.svg`**. (The SVG itself is fine: square
   `40×40` viewBox, `currentColor` — no change needed.)
2. **Bitbucket URLs everywhere → must be GitHub.** In `composer.json`:
   - `support.source`, `support.issues`, `support.docs` all point at
     `bitbucket.org/Gerry3010/craft-nightshift`.
   - `extra.documentationUrl` points at Bitbucket.
   Repoint all of these to the new **GitHub** URL once created.
3. **CHANGELOG heading has no release date.** Docs: the release-notes extractor needs a
   "correctly-formatted heading, including the release date," e.g. `## 1.0.0 - 2026-07-28`.
   Current heading is `## 1.0.0 - Unreleased` → set a real date when you tag.
4. **License string:** `"proprietary"` is **correct for a paid Craft-licensed plugin**
   ("Set the `license` value in `composer.json` to `proprietary`"). Keep it **only if** you
   intend to sell (see decision below). If you launch it **free/open-source**, this should
   be `MIT` instead — and note you can't reverse that choice (see Paid section).

Optional polish (recommended, not blocking):
- Add `extra.description` and `extra.developerEmail` (you already have `extra.developer`,
  `developerUrl`, `documentationUrl`, `handle`, `name`, `class`). The Store pre-fills the
  listing from these.
- `type: craft-plugin` ✓, `require.craftcms/cms: ^5.0.0` ✓, `require.php: >=8.2` ✓,
  PSR-4 autoload ✓, `handle: nightshift` (lowercase, starts with a letter) ✓ — all good.
- `keywords` already cover the target search terms (dark mode, darkmode, dark theme, dark,
  night, nightshift, night mode, theme, ui) ✓ — these primarily help **Packagist/Composer**
  discovery. The Plugin Store listing's own name/description/category (edited in Console)
  drive in-Store search, so keep the name "Nightshift" and a description that literally
  contains "dark mode / dark theme" (it does).

---

## Submission checklist (in order)

1. **[GERALD]** Create a **public GitHub repo** `Gerry3010/craft-nightshift` and push the
   plugin to it. (Do not push to any remote until Gerald decides GitHub-canonical.)
2. Fix the blockers above: move `icon.svg` → `src/icon.svg`; repoint all Bitbucket URLs to
   GitHub; confirm `license` matches the free/paid decision.
3. Set the CHANGELOG `1.0.0` heading to `## 1.0.0 - <release date>` (Keep a Changelog format,
   which it already follows).
4. Commit everything, then **create a semver git tag** named after the version, optionally
   prefixed with `v` (e.g. `1.0.0` or `v1.0.0`), and push tags to GitHub. A tagged release is
   required — the plugin won't appear in the in-CP Plugin Store until a release is tagged.
5. **[GERALD — Craft Console login]** Sign in at **console.craftcms.com** (a.k.a.
   id.craftcms.com). Connect his **GitHub account** and set up / select his **organization**.
6. **[GERALD]** Go to **Plugin Store → Plugins → Add a plugin**, select the
   `craft-nightshift` GitHub repo. Details auto-populate from the root `composer.json`; edit
   the **description, screenshots, category, and other listing details**.
7. **[GERALD]** Pick a **Store category** in the listing. The docs don't publish a fixed
   category list in-page; choose the closest fit in the Console UI at submission time — for a
   CP dark theme the natural fit is **"Control Panel" / "User Experience"-type** category
   (confirm the exact label shown in Console). Search in-Store keys off the listing
   name/description/category, so lead with "dark mode / dark theme" wording.
8. **[GERALD]** (Optional but recommended) Register the package on **Packagist** pointed at
   the GitHub URL, so `composer require gerry3010/craft-nightshift` resolves independently.
9. **[GERALD]** Click **Submit for approval** and accept the Store terms. Pixel & Tonic
   reviews it; after approval it appears on **plugins.craftcms.com** and (with the tagged
   release) inside the in-CP Plugin Store.

> Steps marked **[GERALD]** require his Craft Console / GitHub login and are his to do —
> they cannot be automated from here.

---

## Paid plugin (LATER — decide the free/paid question NOW)

Selling is a later step, but **one decision can't be deferred**:

> "If you initially submit your plugin as **free**, you will **not** be allowed to change it
> to commercial later." (You could only add a *separate commercial edition* alongside a
> still-functional free edition.)

So if there's any intent to charge a few euros, either **launch it as commercial now**, or
knowingly accept the free-first constraint. The current `license: "proprietary"` + LICENSE.md
are already aligned with the **paid** path.

How paid works (from the docs):
- **Price + renewal price:** set both in the Console listing. The renewal price (annual, for
  continued updates after year 1) should be ~**20–50%** of the initial price. Craft's rough
  price bands start at **$10–$29** for small utilities — a CP theme sits at the low end.
- **Fee / revenue split:** "Pixel & Tonic takes a **20% processing fee** on all plugin
  sales" — factor it into the price. Payouts via Stripe (US/EU/AU/NZ) or PayPal elsewhere.
- **Trials:** "All plugins (and editions thereof) can be trialed in **development and
  staging** environments, prior to purchase." Craft enforces the license key in production.
- **Editions (optional):** if you ever want free + paid tiers, declare them via the
  `editions()` method on the Plugin class and gate features with `$plugin->is(...)`. Not
  needed for a single-edition paid plugin.
- **License string:** keep `composer.json` `license` = `"proprietary"` for the Craft-licensed
  commercial route (correct as-is). Do **not** switch to MIT if selling.

---

### Quick status of the current repo

| Item | State | Action |
|------|-------|--------|
| Canonical VCS | Bitbucket (local only, no remote) | **Move to public GitHub** |
| `icon.svg` location | repo root | **→ `src/icon.svg`** |
| Bitbucket URLs in composer.json | present (4×) | **→ GitHub URLs** |
| CHANGELOG `1.0.0` date | `Unreleased` | **→ real date, then tag** |
| Git tag | none | **tag `1.0.0` / `v1.0.0`** |
| `license` | `proprietary` | keep (paid) / `MIT` if free |
| `type`, `require`, `extra.handle/name/class`, keywords | correct | — |
| `extra.description` / `developerEmail` | missing | add (recommended) |
