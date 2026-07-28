<?php
/**
 * Nightshift CP theme asset bundle.
 *
 * @license Proprietary
 */

namespace gerry3010\nightshift\web\assets\nightshift;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * Publishes the dark theme stylesheet + toggle-button script.
 *
 * `depends` on {@see CpAsset} guarantees our CSS is emitted AFTER Craft's own
 * control-panel styles, so `html[data-theme="dark"]` overrides win on equal
 * specificity without needing `!important` everywhere.
 */
class NightshiftAsset extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = __DIR__ . '/dist';
        $this->depends = [CpAsset::class];
        $this->css = ['dark.css'];
        $this->js = ['toggle.js'];

        parent::init();
    }
}
