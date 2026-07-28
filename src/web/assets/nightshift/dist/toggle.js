/**
 * Nightshift — CP dark-mode toggle.
 *
 * Injects a round sun/moon button into the CP global header, right next to the
 * user account menu. Persists the choice in localStorage ('cp-theme'); the actual
 * <html data-theme> attribute is set as early as possible by a tiny inline head
 * script (registered by the plugin) to avoid a flash of the light theme.
 */
(function () {
  var KEY = 'cp-theme';
  var root = document.documentElement;

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function apply(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    updateButton(theme);
  }

  var MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var SUN  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-13a1 1 0 0 1 1 1V4a1 1 0 0 1-2 0 1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1 1 1 0 0 1-2 0 1 1 0 0 1 1-1zM4 12a1 1 0 0 1-1 1 1 1 0 0 1 0-2 1 1 0 0 1 1 1zm17 0a1 1 0 0 1-1 1 1 1 0 0 1 0-2 1 1 0 0 1 1 1zM5.6 5.6a1 1 0 0 1 1.4 0 1 1 0 1 1-1.4 1.4 1 1 0 0 1 0-1.4zm11.4 11.4a1 1 0 0 1 1.4 0 1 1 0 1 1-1.4 1.4 1 1 0 0 1 0-1.4zM17 6.99a1 1 0 0 1 0-1.4 1 1 0 1 1 1.4 1.4 1 1 0 0 1-1.4 0zM5.6 18.4a1 1 0 0 1 0-1.4 1 1 0 1 1 1.4 1.4 1 1 0 0 1-1.4 0z"/></svg>';

  var btn = null;
  function updateButton(theme) {
    if (!btn) return;
    var dark = theme === 'dark';
    btn.innerHTML = dark ? SUN : MOON;
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', dark ? 'Light mode' : 'Dark mode');
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }

  function makeButton() {
    var b = document.createElement('button');
    b.type = 'button';
    b.id = 'cp-theme-toggle';
    b.addEventListener('click', function () {
      apply(current() === 'dark' ? 'light' : 'dark');
    });
    return b;
  }

  // The account menu trigger, across Craft versions.
  function accountEl() {
    return (
      document.querySelector('#user-info') ||
      document.querySelector('#account-menu') ||
      document.querySelector('#global-header #account') ||
      document.querySelector('.header-nav .account')
    );
  }

  // The button is position:fixed (see dark.css) so it is OUT of the header's
  // flex flow and can never wrap the bar. Pin it vertically centred, just to the
  // LEFT of the account menu; fall back to the CSS top/right if it isn't found.
  function reposition() {
    if (!btn) return;
    var acct = accountEl();
    if (acct) {
      var r = acct.getBoundingClientRect();
      if (r.width && r.height) {
        btn.style.top = Math.round(r.top + r.height / 2 - 16) + 'px';
        btn.style.right = Math.round(window.innerWidth - r.left + 6) + 'px';
        return;
      }
    }
    btn.style.top = '10px';
    btn.style.right = '60px';
  }

  function mount() {
    if (document.getElementById('cp-theme-toggle')) return true;
    if (!document.body) return false;
    btn = makeButton();
    document.body.appendChild(btn); // fixed-positioned; DOM location is irrelevant
    updateButton(current());
    reposition();
    return true;
  }

  function boot() {
    mount();
    // The account menu can render a beat late — settle the position a few times.
    var tries = 0;
    var iv = setInterval(function () {
      if (!btn) mount();
      reposition();
      if (++tries > 20) clearInterval(iv);
    }, 150);
    window.addEventListener('resize', reposition);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
