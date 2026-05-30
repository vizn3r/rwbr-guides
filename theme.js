/* ----------------------------------------------------------------
   THEME TOGGLE – stores preference, switches data-theme attribute
   ---------------------------------------------------------------- */
(function() {
    const STORAGE_KEY = 'rbwr-theme';
    const html = document.documentElement;

    function getPreferredTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'oled') return saved;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    }

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // Apply immediately so the correct CSS variables are used before the first paint
    applyTheme(getPreferredTheme());

    // After DOM is ready, ensure buttons are in sync and add listeners
    document.addEventListener('DOMContentLoaded', function() {
        applyTheme(getPreferredTheme());
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                applyTheme(this.dataset.theme);
            });
        });
    });

    // Listen for OS theme changes if the user hasn't set a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
})();