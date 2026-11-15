(function () {
    var toggle = document.querySelector('.mobile-menu-toggle');
    var navigation = document.querySelector('.nav-links');
    var navContainer = document.querySelector('.nav-container');
    function setMenu(open, returnFocus) {
        if (!toggle || !navigation) return;
        navigation.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        toggle.textContent = open ? 'Close' : 'Menu';
        if (!open && returnFocus) toggle.focus({ preventScroll: true });
    }
    if (toggle && navigation) {
        toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true', false); });
        navigation.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { setMenu(false, false); }); });
        document.addEventListener('click', function (event) { if (navContainer && !navContainer.contains(event.target)) setMenu(false, false); });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { event.preventDefault(); setMenu(false, true); }
        });
        window.addEventListener('resize', function () { if (window.innerWidth > 700) setMenu(false, false); });
    }
    function openHashProject() {
        var id;
        try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (_) { return; }
        var target = id && document.getElementById(id);
        if (!target) return;
        var details = target.closest('details');
        if (details) details.open = true;
    }
    window.addEventListener('hashchange', openHashProject);
    window.addEventListener('load', openHashProject);
    function updateCurrentLocation() {
        if (!navigation) return;
        navigation.querySelectorAll('a[href^="#"]').forEach(function (link) {
            if (link.getAttribute('href') === window.location.hash) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }
    window.addEventListener('hashchange', updateCurrentLocation);
    window.addEventListener('load', updateCurrentLocation);
    var skip = document.querySelector('.skip-link');
    if (skip) skip.addEventListener('click', function () { var main = document.getElementById('main-content'); if (main) main.focus({ preventScroll: true }); });
})();
