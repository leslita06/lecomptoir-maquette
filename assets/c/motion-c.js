/* Le Comptoir · version C · micro-animations au défilement */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('DOMContentLoaded', function () {
    // carte : la photo suit la catégorie ouverte
    var pics = document.querySelectorAll('[data-pics] img');
    document.querySelectorAll('.cat').forEach(function (c) {
      c.addEventListener('toggle', function () {
        if (!c.open) return;
        document.querySelectorAll('.cat').forEach(function (o) { if (o !== c) o.open = false; });
        pics.forEach(function (p, i) { p.classList.toggle('on', i === +c.dataset.pic); });
      });
    });
    if (reduce) return;
    var par = [].slice.call(document.querySelectorAll('[data-par]'));
    var slide = [].slice.call(document.querySelectorAll('[data-x]'));
    var tick = false;
    function frame() {
      tick = false;
      var vh = innerHeight;
      par.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(0,' + (p * -100 * (+el.dataset.par)) + '%,0)';
      });
      slide.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(' + (p * 100 * (+el.dataset.x)) + 'vw,0,0)';
      });
    }
    function onScroll() { if (!tick) { tick = true; requestAnimationFrame(frame); } }
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); frame();
  });
})();
