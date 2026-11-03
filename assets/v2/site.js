/* Le Comptoir · outils communs aux versions A et B : langue, apparitions, navigation, statut d'ouverture */
(function () {
  'use strict';
  var KEY = 'lc-lang';
  var orig = new WeakMap();
  window.LC = {
    lang: (function () { try { return localStorage.getItem(KEY) || 'fr'; } catch (e) { return 'fr'; } })(),
    dict: {},
    hooks: [],
    setLang: function (l) {
      var D = this.dict[l] || {};
      this.lang = l; try { localStorage.setItem(KEY, l); } catch (e) {}
      document.documentElement.lang = l;
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        if (!orig.has(el)) orig.set(el, el.innerHTML);
        var k = el.getAttribute('data-i18n');
        el.innerHTML = l === 'fr' ? orig.get(el) : (D[k] != null ? D[k] : orig.get(el));
      });
      document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
        el.getAttribute('data-i18n-attr').split(';').forEach(function (p) {
          var a = p.split(':'), at = a[0], k = a[1], ok = 'o-' + at;
          if (!el.dataset[ok.replace('-', '')]) el.dataset[ok.replace('-', '')] = el.getAttribute(at) || '';
          el.setAttribute(at, l === 'fr' ? el.dataset[ok.replace('-', '')] : (D[k] || el.dataset[ok.replace('-', '')]));
        });
      });
      document.querySelectorAll('[data-l]').forEach(function (b) { b.classList.toggle('on', b.dataset.l === l); b.setAttribute('aria-pressed', b.dataset.l === l); });
      this.hooks.forEach(function (f) { f(l); });
      openNow();
    }
  };
  function openNow() {
    var el = document.querySelectorAll('[data-now]'); if (!el.length) return;
    var d = new Date(), day = d.getDay(), m = d.getHours() * 60 + d.getMinutes();
    var we = day === 0 || day === 6, start = we ? 8 * 60 + 30 : 7 * 60 + 30;
    var fr = LC.lang === 'fr';
    var txt = m >= start ? (fr ? 'Ouvert aujourd\u2019hui depuis ' : 'Open today since ') + (we ? (fr ? '8 h 30' : '8:30 am') : (fr ? '7 h 30' : '7:30 am'))
      : (fr ? 'Ouverture aujourd\u2019hui à ' : 'Opening today at ') + (we ? (fr ? '8 h 30' : '8:30 am') : (fr ? '7 h 30' : '7:30 am'));
    el.forEach(function (e) { e.textContent = txt; });
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-l]').forEach(function (b) { b.addEventListener('click', function () { LC.setLang(b.dataset.l); }); });
    if (LC.lang !== 'fr') LC.setLang(LC.lang); else openNow();
    // apparitions
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' }) : null;
    document.querySelectorAll('.rv').forEach(function (e) { io ? io.observe(e) : e.classList.add('in'); });
    // navigation
    var nav = document.querySelector('[data-nav]');
    if (nav) { var f = function () { nav.classList.toggle('solid', scrollY > 40); }; f(); addEventListener('scroll', f, { passive: true }); }
    var burger = document.querySelector('[data-burger]');
    if (burger) burger.addEventListener('click', function () { document.body.classList.toggle('menu-open'); burger.setAttribute('aria-expanded', document.body.classList.contains('menu-open')); });
    document.querySelectorAll('[data-menu] a').forEach(function (a) { a.addEventListener('click', function () { document.body.classList.remove('menu-open'); }); });
  });
})();
