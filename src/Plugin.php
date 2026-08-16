<?php
/**
 * Nightshift plugin for Craft CMS.
 *
 * A dark theme for the Craft control panel, with a one-click sun/moon toggle
 * in the header and a remembered preference (no flash of light on load).
 *
 * @author    Gerald Hofbauer
 * @copyright Copyright (c) 2026 Gerald Hofbauer
 * @license   MIT
 * @link      https://geraldhofbauer.net
 */

namespace geraldhofbauerweb\nightshift;

use Craft;
use craft\base\Plugin as BasePlugin;
use craft\web\View;
use geraldhofbauerweb\nightshift\web\assets\nightshift\NightshiftAsset;

/**
 * Nightshift.
 *
 * On every control-panel web request this injects:
 *   1. a tiny inline <head> script that applies the persisted theme before first
 *      paint (so a returning dark-mode user never sees a flash of the light UI);
 *   2. the theme stylesheet (scoped to `html[data-theme="dark"]`) and the toggle
 *      button script, published + cache-busted by Craft's asset pipeline.
 *
 * The preference lives client-side in `localStorage['cp-theme']` — no settings,
 * no database, no per-user config. Dropping the plugin in "just works".
 */
class Plugin extends BasePlugin
{
    public string $schemaVersion = '1.0.0';
    public bool $hasCpSettings = false;

    public function init(): void
    {
        parent::init();

        // Only ever touch control-panel web requests.
        $request = Craft::$app->getRequest();
        if ($request->getIsConsoleRequest() || !$request->getIsCpRequest()) {
            return;
        }

        // …but not the Yii debug module's own pages (…/actions/debug/…).
        //
        // They are served as CP requests, so without this they would get the
        // <head> script and the stylesheet like any other page. Nothing in the
        // theme reaches their markup, though: yii2-debug ships its own palette,
        // built for a light page. The result was the worst of both — a dark
        // surface underneath, dark type on top, and log tables nobody can read.
        //
        // Staying out gives the debugger back its own design, fully legible,
        // and spares us a second third-party UI to chase across releases. The
        // toolbar strip on normal CP pages is unaffected; it is part of the CP
        // document, not a debug action, and brings its own dark styling.
        if (($request->getActionSegments()[0] ?? null) === 'debug') {
            return;
        }

        // Defer until the app is fully initialized so the view + other CP asset
        // bundles are ready; our bundle depends on CpAsset so it loads last and
        // its overrides win specificity ties.
        Craft::$app->onInit(function () {
            $this->_injectDarkMode();
        });
    }

    private function _injectDarkMode(): void
    {
        $view = Craft::$app->getView();

        // Resolve the theme before first paint (avoids a flash of the wrong one):
        // an explicit choice wins; otherwise follow the OS `prefers-color-scheme`.
        $view->registerJs(
            "try{var t=localStorage.getItem('cp-theme');"
            . "if(t==='dark'||(t!=='light'&&window.matchMedia&&"
            . "matchMedia('(prefers-color-scheme: dark)').matches))"
            . "document.documentElement.setAttribute('data-theme','dark');}catch(e){}",
            View::POS_HEAD
        );

        $view->registerAssetBundle(NightshiftAsset::class);
    }
}
