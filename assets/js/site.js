(function () {
    var navigation = document.querySelector('.nav-links');
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
