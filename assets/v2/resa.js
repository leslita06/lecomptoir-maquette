/* Le Comptoir · parcours de réservation (maquette de démonstration)
   Commun aux versions A et B. Aucune donnée n'est transmise : tout reste dans le navigateur. */
(function () {
  'use strict';
  var WA = '2250798974607';
  var ADDR = 'Le Comptoir, Ivoire Trade Center, boulevard Hassan II, Cocody, Abidjan';
  var MAPS = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Le Comptoir Ivoire Trade Center Cocody Abidjan');

  var T = {
    fr: {
      steps: ['Moment', 'Date', 'Heure', 'Couverts', 'Ambiance', 'Occasion', 'Coordonnées'],
      stepOf: 'Étape {n} sur {t}',
      next: 'Continuer', back: 'Retour', send: 'Confirmer ma demande', edit: 'Modifier',
      q: [
        'Quel moment vous ferait plaisir ?',
        'Quel jour venez-vous ?',
        'À quelle heure ?',
        'Combien serez-vous ?',
        'Où aimeriez-vous être installés ?',
        'Une occasion à fêter ?',
        'À quel nom réserver ?'
      ],
      sub: [
        'Du premier café au dernier verre : chaque moment a sa table.',
        'Choisissez un jour sur le calendrier. Les jours grisés ne sont pas ouverts à la réservation pour ce moment.',
        'Les créneaux proposés dépendent du moment et du jour choisis.',
        'Pour un groupe de plus de 12 personnes, écrivez-nous directement sur WhatsApp.',
        'Nous faisons notre possible pour respecter votre préférence, selon les disponibilités du jour.',
        'Dites-le-nous : l\u2019équipe prépare la table en conséquence.',
        'Votre numéro sert uniquement à confirmer cette réservation.'
      ],
      moments: {
        matin: ['Le matin', 'Café & petit-déjeuner'],
        brunch: ['Le brunch', 'Samedi & dimanche'],
        dejeuner: ['Le déjeuner', 'Le midi'],
        diner: ['Le dîner', 'Le soir'],
        soiree: ['Une soirée', 'Les nuits du Comptoir']
      },
      zones: {
        salle: ['En salle', 'Sous les suspensions en osier'],
        fenetre: ['Côté fenêtres', 'À la lumière, entre les palmes'],
        bar: ['Près du bar', 'Pour l\u2019ambiance et les cocktails'],
        egal: ['Sans préférence', 'La meilleure table disponible']
      },
      occ: { aucune: 'Aucune en particulier', anniv: 'Anniversaire', affaires: 'Repas d\u2019affaires', rdv: 'Rendez-vous à deux', amis: 'Entre amis', fete: 'Célébration' },
      allergies: 'Allergies ou régime', alg: { gluten: 'Gluten', arachide: 'Arachides', mer: 'Fruits de mer', lactose: 'Lactose', vege: 'Végétarien', autre: 'Autre' },
      notes: 'Une demande particulière ?', notesPh: 'Chaise bébé, gâteau à prévoir, table au calme, accès facile…',
      name: 'Nom et prénom', phone: 'Téléphone (WhatsApp)', email: 'E-mail (facultatif)', consent: 'Je souhaite recevoir la confirmation sur WhatsApp',
      phonePh: '07 00 00 00 00',
      errName: 'Indiquez votre nom.', errPhone: 'Un numéro à 10 chiffres, par exemple 07 00 00 00 00.', errEmail: 'Cette adresse e-mail ne semble pas complète.',
      needMoment: 'Choisissez un moment pour continuer.', needDate: 'Choisissez un jour sur le calendrier.', needTime: 'Choisissez un créneau.',
      noSlot: 'Plus de créneau disponible ce jour-là pour ce moment. Choisissez un autre jour.',
      guests: 'personnes', guest: 'personne', more: 'Plus de 12 ? Écrivez-nous',
      recap: 'Votre réservation', recapEmpty: 'Vos choix apparaîtront ici, au fil des étapes.',
      rMoment: 'Moment', rDate: 'Date', rTime: 'Heure', rGuests: 'Couverts', rZone: 'Ambiance', rOcc: 'Occasion', rName: 'Au nom de', rNotes: 'Précisions',
      place: 'Le Comptoir · Ivoire Trade Center, Cocody',
      weekdays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      evDay: 'Soirée', today: 'Aujourd\u2019hui',
      soireeHint: 'Pour une soirée, seuls les jours de soirée sont ouverts. Ils sont marqués d\u2019un point doré.',
      brunchHint: 'Le brunch se réserve le samedi et le dimanche.',
      passTitle: 'Table ou entrée ?', passTable: ['Une table', 'Réservée pour votre groupe toute la soirée'], passEntry: ['L\u2019entrée', 'Accès à la soirée, sans table attitrée'],
      passWait: ['Liste d\u2019attente', 'Prévenu en priorité si une table se libère'],
      rType: 'Formule',
      okTitle: 'Votre demande est bien enregistrée',
      okSub: 'L\u2019équipe du Comptoir vous confirme la table sur WhatsApp ou par téléphone.',
      okRef: 'Référence',
      okCal: 'Ajouter à mon agenda', okGcal: 'Google Agenda', okIcs: 'Fichier agenda (.ics)',
      okWa: 'Recevoir le récapitulatif sur WhatsApp', okMap: 'Itinéraire jusqu\u2019à l\u2019ITC', okNew: 'Nouvelle réservation',
      okDemo: 'Démonstration : la demande n\u2019est transmise à personne tant que le site n\u2019est pas relié au restaurant.',
      waHello: 'Bonjour Le Comptoir, voici ma demande de réservation :',
      calTitle: 'Table au Comptoir',
      sending: 'Envoi…',
      months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      prev: 'Mois précédent', nextM: 'Mois suivant',
      seeRecap: 'Voir le récapitulatif', close: 'Fermer'
    },
    en: {
      steps: ['Moment', 'Date', 'Time', 'Guests', 'Setting', 'Occasion', 'Details'],
      stepOf: 'Step {n} of {t}',
      next: 'Continue', back: 'Back', send: 'Confirm my request', edit: 'Edit',
      q: ['Which moment would you like?', 'Which day are you coming?', 'What time?', 'How many of you?', 'Where would you like to sit?', 'Anything to celebrate?', 'Whose name is the booking under?'],
      sub: [
        'From the first coffee to the last drink: every moment has its table.',
        'Pick a day on the calendar. Greyed-out days are not open for booking for this moment.',
        'Available times depend on the moment and the day you chose.',
        'For groups of more than 12, message us directly on WhatsApp.',
        'We do our best to honour your preference, depending on the day\u2019s availability.',
        'Tell us: the team will set the table accordingly.',
        'Your number is only used to confirm this booking.'
      ],
      moments: {
        matin: ['Morning', 'Coffee & breakfast'], brunch: ['Brunch', 'Saturday & Sunday'], dejeuner: ['Lunch', 'Midday'],
        diner: ['Dinner', 'Evening'], soiree: ['A night event', 'Le Comptoir after dark']
      },
      zones: {
        salle: ['Main room', 'Under the wicker pendant lights'], fenetre: ['By the windows', 'In the light, among the palms'],
        bar: ['Near the bar', 'For the buzz and the cocktails'], egal: ['No preference', 'The best table available']
      },
      occ: { aucune: 'Nothing in particular', anniv: 'Birthday', affaires: 'Business meal', rdv: 'Date for two', amis: 'With friends', fete: 'Celebration' },
      allergies: 'Allergies or diet', alg: { gluten: 'Gluten', arachide: 'Peanuts', mer: 'Seafood', lactose: 'Lactose', vege: 'Vegetarian', autre: 'Other' },
      notes: 'Any special request?', notesPh: 'High chair, cake to plan, quiet table, easy access…',
      name: 'Full name', phone: 'Phone (WhatsApp)', email: 'Email (optional)', consent: 'I would like the confirmation on WhatsApp',
      phonePh: '07 00 00 00 00',
      errName: 'Please enter your name.', errPhone: 'A 10-digit number, e.g. 07 00 00 00 00.', errEmail: 'This email address looks incomplete.',
      needMoment: 'Choose a moment to continue.', needDate: 'Pick a day on the calendar.', needTime: 'Choose a time.',
      noSlot: 'No time left that day for this moment. Please pick another day.',
      guests: 'guests', guest: 'guest', more: 'More than 12? Message us',
      recap: 'Your booking', recapEmpty: 'Your choices will appear here, step by step.',
      rMoment: 'Moment', rDate: 'Date', rTime: 'Time', rGuests: 'Guests', rZone: 'Setting', rOcc: 'Occasion', rName: 'Name', rNotes: 'Notes',
      place: 'Le Comptoir · Ivoire Trade Center, Cocody',
      weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      evDay: 'Night event', today: 'Today',
      soireeHint: 'For a night event, only event days are open. They are marked with a gold dot.',
      brunchHint: 'Brunch can be booked on Saturdays and Sundays.',
      passTitle: 'Table or entry?', passTable: ['A table', 'Reserved for your group all night'], passEntry: ['Entry', 'Access to the night, no assigned table'],
      passWait: ['Waiting list', 'First to know if a table frees up'],
      rType: 'Option',
      okTitle: 'Your request is in',
      okSub: 'The Le Comptoir team will confirm your table on WhatsApp or by phone.',
      okRef: 'Reference', okCal: 'Add to my calendar', okGcal: 'Google Calendar', okIcs: 'Calendar file (.ics)',
      okWa: 'Get the summary on WhatsApp', okMap: 'Directions to the ITC', okNew: 'New booking',
      okDemo: 'Demo: the request is not sent to anyone until the site is connected to the restaurant.',
      waHello: 'Hello Le Comptoir, here is my booking request:',
      calTitle: 'Table at Le Comptoir', sending: 'Sending…',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      prev: 'Previous month', nextM: 'Next month', seeRecap: 'See summary', close: 'Close'
    }
  };

  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function hm(t) { var p = t.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmtTime(t, L) { var p = t.split(':'); return L === 'fr' ? (+p[0]) + ' h ' + p[1] : (((+p[0] + 11) % 12) + 1) + ':' + p[1] + (+p[0] < 12 ? ' am' : ' pm'); }

  window.ComptoirResa = function (opt) {
    var root = document.querySelector(opt.root);
    var L = opt.lang || 'fr';
    var events = opt.events || [];
    var imgs = opt.images;
    var pass = !!opt.pass;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var maxDay = new Date(today); maxDay.setDate(maxDay.getDate() + 90);
    var S = { step: 0, moment: null, date: null, time: null, guests: 2, zone: null, occasion: 'aucune', alg: [], notes: '', name: '', phone: '', email: '', consent: true, type: 'table', view: null, done: false, ref: '' };
    var N = 7;

    // pré-remplissage depuis l'URL (?moment=soiree&date=2026-11-28)
    var q = new URLSearchParams(location.search);
    if (q.get('moment') && T.fr.moments[q.get('moment')]) { S.moment = q.get('moment'); S.step = 1; }
    if (q.get('date') && S.moment) { var dq = parse(q.get('date')); if (!isNaN(dq) && dayOk(dq)) { S.date = q.get('date'); S.step = 2; } }
    if (q.get('type') && pass) S.type = q.get('type');
    S.view = S.date ? parse(S.date) : new Date(today.getFullYear(), today.getMonth(), 1);

    function t() { return T[L]; }
    function evOn(s) { for (var i = 0; i < events.length; i++) if (events[i].date === s) return events[i]; return null; }
    function weekend(d) { return d.getDay() === 0 || d.getDay() === 6; }
    function dayOk(d) {
      if (d < today || d > maxDay) return false;
      if (S.moment === 'brunch') return weekend(d);
      if (S.moment === 'soiree') return !!evOn(iso(d));
      return true;
    }
    function slots() {
      if (!S.moment || !S.date) return [];
      var d = parse(S.date), a, b;
      switch (S.moment) {
        case 'matin': a = weekend(d) ? '08:30' : '07:30'; b = '10:30'; break;
        case 'brunch': a = '10:00'; b = '14:00'; break;
        case 'dejeuner': a = '12:00'; b = '14:30'; break;
        case 'diner': a = '19:00'; b = '22:30'; break;
        case 'soiree': a = (evOn(S.date) || {}).from || '22:00'; b = '23:30'; break;
      }
      var out = [], now = new Date(), isToday = S.date === iso(today);
      for (var m = hm(a); m <= hm(b); m += 30) {
        var s = pad(Math.floor(m / 60)) + ':' + pad(m % 60);
        out.push({ t: s, off: isToday && m < now.getHours() * 60 + now.getMinutes() + 60 });
      }
      return out;
    }
    function dateLabel(s, long) {
      var d = parse(s), x = t();
      if (L === 'fr') return (long ? x.days[d.getDay()] + ' ' : x.days[d.getDay()].slice(0, 3) + '. ') + d.getDate() + ' ' + (long ? x.months[d.getMonth()] : x.months[d.getMonth()].slice(0, 4).replace(/\.$/, '') + '.');
      return (long ? x.days[d.getDay()] + ', ' : x.days[d.getDay()].slice(0, 3) + ', ') + (long ? x.months[d.getMonth()] : x.months[d.getMonth()].slice(0, 3)) + ' ' + d.getDate();
    }
    function guestsLabel(n) { return n + ' ' + (n > 1 ? t().guests : t().guest); }
    function phoneOk(p) { var d = p.replace(/\D/g, ''); return /^(01|05|07|21|22|23|24|25|27)\d{8}$/.test(d); }
    function emailOk(e) { return !e || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }
    function valid(step) {
      switch (step) {
        case 0: return !!S.moment;
        case 1: return !!S.date;
        case 2: return !!S.time;
        case 3: return S.guests >= 1 && S.guests <= 12;
        case 4: return !!S.zone;
        case 5: return true;
        case 6: return S.name.trim().length > 1 && phoneOk(S.phone) && emailOk(S.email);
      }
    }
    function need(step) { return [t().needMoment, t().needDate, t().needTime, '', '', '', ''][step]; }

    /* ---------- rendu ---------- */
    function recapRows() {
      var x = t(), r = [];
      if (S.moment) r.push([x.rMoment, x.moments[S.moment][0] + (S.moment === 'soiree' && S.date && evOn(S.date) ? ' · ' + evOn(S.date).name : ''), 0]);
      if (S.moment === 'soiree' && pass) r.push([x.rType, (S.type === 'entree' ? x.passEntry : S.type === 'attente' ? x.passWait : x.passTable)[0], 0]);
      if (S.date) r.push([x.rDate, dateLabel(S.date, true), 1]);
      if (S.time) r.push([x.rTime, fmtTime(S.time, L), 2]);
      if (S.step > 3 || S.done) r.push([x.rGuests, guestsLabel(S.guests), 3]);
      if (S.zone) r.push([x.rZone, x.zones[S.zone][0], 4]);
      if (S.step > 5 || S.done) {
        if (S.occasion !== 'aucune') r.push([x.rOcc, x.occ[S.occasion], 5]);
        var a = S.alg.map(function (k) { return x.alg[k]; }).join(', ');
        var nn = [a, S.notes.trim()].filter(Boolean).join(' · ');
        if (nn) r.push([x.rNotes, nn, 5]);
      }
      if (S.done) r.push([x.rName, S.name.trim(), 6]);
      return r;
    }
    function recapHTML(withEdit) {
      var rows = recapRows();
      if (!rows.length) return '<p class="rs-empty">' + t().recapEmpty + '</p>';
      return '<ul class="rs-recap">' + rows.map(function (r) {
        return '<li><span>' + r[0] + '</span><b>' + esc(r[1]) + '</b>' + (withEdit && !S.done ? '<button type="button" class="rs-edit" data-go="' + r[2] + '" aria-label="' + t().edit + ' ' + r[0] + '">' + t().edit + '</button>' : '') + '</li>';
      }).join('') + '</ul>';
    }
    function shortRecap() {
      var p = [];
      if (S.moment) p.push(t().moments[S.moment][0]);
      if (S.date) p.push(dateLabel(S.date));
      if (S.time) p.push(fmtTime(S.time, L));
      if (S.step > 3) p.push(guestsLabel(S.guests));
      return p.join(' · ') || t().recapEmpty;
    }
    function photo() {
      if (S.zone && imgs.zones[S.zone]) return imgs.zones[S.zone];
      if (S.moment) return imgs.moments[S.moment];
      return imgs.idle;
    }

    function stepBody(i) {
      var x = t(), h = '';
      if (i === 0) {
        h += '<div class="rs-cards rs-cards-m">' + Object.keys(x.moments).map(function (k) {
          return '<button type="button" class="rs-card' + (S.moment === k ? ' on' : '') + '" data-moment="' + k + '" aria-pressed="' + (S.moment === k) + '"><img src="' + imgs.moments[k] + '" alt="" loading="lazy"><span class="rs-card-t"><b>' + x.moments[k][0] + '</b><small>' + x.moments[k][1] + '</small></span><i class="rs-tick" aria-hidden="true"></i></button>';
        }).join('') + '</div>';
        if (pass && S.moment === 'soiree') {
          h += '<p class="rs-label">' + x.passTitle + '</p><div class="rs-cards rs-cards-z rs-cards-pass">' + [['table', x.passTable], ['entree', x.passEntry], ['attente', x.passWait]].map(function (o) {
            return '<button type="button" class="rs-opt' + (S.type === o[0] ? ' on' : '') + '" data-type="' + o[0] + '" aria-pressed="' + (S.type === o[0]) + '"><b>' + o[1][0] + '</b><small>' + o[1][1] + '</small></button>';
          }).join('') + '</div>';
        }
      }
      if (i === 1) {
        var v = S.view, y = v.getFullYear(), m = v.getMonth();
        var first = new Date(y, m, 1), off = (first.getDay() + 6) % 7, nd = new Date(y, m + 1, 0).getDate();
        var canPrev = new Date(y, m, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
        var canNext = new Date(y, m + 1, 1) <= maxDay;
        h += '<div class="rs-cal"><div class="rs-cal-h"><button type="button" class="rs-cal-nav" data-cal="-1" ' + (canPrev ? '' : 'disabled') + ' aria-label="' + x.prev + '">‹</button><b>' + x.months[m].charAt(0).toUpperCase() + x.months[m].slice(1) + ' ' + y + '</b><button type="button" class="rs-cal-nav" data-cal="1" ' + (canNext ? '' : 'disabled') + ' aria-label="' + x.nextM + '">›</button></div>';
        h += '<div class="rs-cal-g" role="grid">' + x.weekdays.map(function (w) { return '<span class="rs-wd">' + w + '</span>'; }).join('');
        for (var k = 0; k < off; k++) h += '<span></span>';
        for (var dd = 1; dd <= nd; dd++) {
          var d = new Date(y, m, dd), s = iso(d), ok = dayOk(d), ev = evOn(s);
          h += '<button type="button" class="rs-day' + (S.date === s ? ' on' : '') + (s === iso(today) ? ' today' : '') + (ev ? ' ev' : '') + '" data-date="' + s + '" ' + (ok ? '' : 'disabled') + ' aria-label="' + dateLabel(s, true) + (ev ? ', ' + ev.name : '') + '">' + dd + (ev ? '<i></i>' : '') + '</button>';
        }
        h += '</div></div>';
        if (S.moment === 'soiree') h += '<p class="rs-hint">' + x.soireeHint + '</p>' + events.filter(function (e) { return parse(e.date) >= today; }).map(function (e) { return '<button type="button" class="rs-evpill' + (S.date === e.date ? ' on' : '') + '" data-date="' + e.date + '"><b>' + esc(e.name) + '</b> · ' + dateLabel(e.date, true) + '</button>'; }).join('');
        if (S.moment === 'brunch') h += '<p class="rs-hint">' + x.brunchHint + '</p>';
      }
      if (i === 2) {
        var sl = slots();
        h += '<p class="rs-hint rs-hint-top">' + dateLabel(S.date, true) + ' · ' + x.moments[S.moment][0] + '</p>';
        if (!sl.some(function (s) { return !s.off; })) h += '<p class="rs-empty">' + x.noSlot + '</p>';
        h += '<div class="rs-slots">' + sl.map(function (s) { return '<button type="button" class="rs-slot' + (S.time === s.t ? ' on' : '') + '" data-time="' + s.t + '" ' + (s.off ? 'disabled' : '') + '>' + fmtTime(s.t, L) + '</button>'; }).join('') + '</div>';
      }
      if (i === 3) {
        h += '<div class="rs-guests"><button type="button" class="rs-gbtn" data-g="-1" aria-label="−" ' + (S.guests <= 1 ? 'disabled' : '') + '>−</button><div class="rs-gnum" aria-live="polite"><b>' + S.guests + '</b><small>' + (S.guests > 1 ? x.guests : x.guest) + '</small></div><button type="button" class="rs-gbtn" data-g="1" aria-label="+" ' + (S.guests >= 12 ? 'disabled' : '') + '>+</button></div>';
        h += '<div class="rs-gpills">' + [1, 2, 3, 4, 5, 6, 8, 10].map(function (n) { return '<button type="button" class="rs-chip' + (S.guests === n ? ' on' : '') + '" data-gs="' + n + '">' + n + '</button>'; }).join('') + '</div>';
        h += '<a class="rs-more" href="https://wa.me/' + WA + '?text=' + encodeURIComponent(L === 'fr' ? 'Bonjour Le Comptoir, je souhaite réserver pour un groupe de plus de 12 personnes.' : 'Hello Le Comptoir, I would like to book for a group of more than 12.') + '" target="_blank" rel="noopener">' + x.more + ' →</a>';
      }
      if (i === 4) {
        h += '<div class="rs-cards rs-cards-z">' + Object.keys(x.zones).map(function (k) {
          return '<button type="button" class="rs-card rs-card-z' + (S.zone === k ? ' on' : '') + '" data-zone="' + k + '" aria-pressed="' + (S.zone === k) + '">' + (imgs.zones[k] ? '<img src="' + imgs.zones[k] + '" alt="" loading="lazy">' : '<span class="rs-noimg" aria-hidden="true">✦</span>') + '<span class="rs-card-t"><b>' + x.zones[k][0] + '</b><small>' + x.zones[k][1] + '</small></span><i class="rs-tick" aria-hidden="true"></i></button>';
        }).join('') + '</div>';
      }
      if (i === 5) {
        h += '<div class="rs-chips">' + Object.keys(x.occ).map(function (k) { return '<button type="button" class="rs-chip' + (S.occasion === k ? ' on' : '') + '" data-occ="' + k + '">' + x.occ[k] + '</button>'; }).join('') + '</div>';
        h += '<p class="rs-label">' + x.allergies + '</p><div class="rs-chips">' + Object.keys(x.alg).map(function (k) { return '<button type="button" class="rs-chip rs-chip-s' + (S.alg.indexOf(k) > -1 ? ' on' : '') + '" data-alg="' + k + '" aria-pressed="' + (S.alg.indexOf(k) > -1) + '">' + x.alg[k] + '</button>'; }).join('') + '</div>';
        h += '<label class="rs-label" for="rs-notes">' + x.notes + '</label><textarea id="rs-notes" class="rs-in" rows="3" maxlength="400" placeholder="' + x.notesPh + '">' + esc(S.notes) + '</textarea>';
      }
      if (i === 6) {
        h += '<div class="rs-f" id="rf-name"><label for="rs-name">' + x.name + '</label><input id="rs-name" class="rs-in" autocomplete="name" value="' + esc(S.name) + '"><span class="rs-err">' + x.errName + '</span></div>';
        h += '<div class="rs-f" id="rf-phone"><label for="rs-phone">' + x.phone + '</label><div class="rs-tel"><span>🇨🇮 +225</span><input id="rs-phone" class="rs-in" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="' + x.phonePh + '" value="' + esc(S.phone) + '"></div><span class="rs-err">' + x.errPhone + '</span></div>';
        h += '<div class="rs-f" id="rf-email"><label for="rs-email">' + x.email + '</label><input id="rs-email" class="rs-in" type="email" inputmode="email" autocomplete="email" value="' + esc(S.email) + '"><span class="rs-err">' + x.errEmail + '</span></div>';
        h += '<label class="rs-check"><input type="checkbox" id="rs-consent" ' + (S.consent ? 'checked' : '') + '><span></span>' + x.consent + '</label>';
      }
      return h;
    }

    function render(dir) {
      var x = t();
      if (S.done) return renderDone();
      var pct = Math.round((S.step) / N * 100);
      var h = '<div class="rs-wrap"><div class="rs-main">';
      h += '<div class="rs-prog" aria-hidden="true"><i style="width:' + Math.max(pct, 4) + '%"></i></div>';
      h += '<ol class="rs-steps">' + x.steps.map(function (s, k) { return '<li class="' + (k < S.step ? 'done' : k === S.step ? 'cur' : '') + '"><button type="button" data-go="' + k + '" ' + (k <= maxReached() ? '' : 'disabled') + '><i>' + (k < S.step ? '✓' : k + 1) + '</i><span>' + s + '</span></button></li>'; }).join('') + '</ol>';
      h += '<div class="rs-pane ' + (dir < 0 ? 'from-l' : 'from-r') + '" id="rs-pane"><p class="rs-of">' + x.stepOf.replace('{n}', S.step + 1).replace('{t}', N) + '</p><h2 class="rs-q" tabindex="-1">' + x.q[S.step] + '</h2><p class="rs-sub">' + x.sub[S.step] + '</p>' + stepBody(S.step) + '</div>';
      h += '<p class="rs-need" id="rs-need" role="alert"></p>';
      h += '<div class="rs-nav">' + (S.step > 0 ? '<button type="button" class="rs-back" data-nav="-1">← ' + x.back + '</button>' : '<span></span>') + '<button type="button" class="rs-next' + (valid(S.step) ? '' : ' dim') + '" data-nav="1">' + (S.step === N - 1 ? x.send : x.next + ' →') + '</button></div>';
      h += '</div>';
      h += '<aside class="rs-side"><div class="rs-ph"><img src="' + photo() + '" alt="" id="rs-ph"><span>' + x.place + '</span></div><div class="rs-side-b"><h3>' + x.recap + '</h3>' + recapHTML(true) + '</div></aside>';
      h += '</div>';
      h += '<div class="rs-mbar"><button type="button" class="rs-mbar-s" data-sheet="1"><small>' + x.recap + ' · ' + (S.step + 1) + '/' + N + '</small><span>' + esc(shortRecap()) + '</span></button><button type="button" class="rs-next rs-next-m' + (valid(S.step) ? '' : ' dim') + '" data-nav="1">' + (S.step === N - 1 ? '✓' : '→') + '</button></div>';
      h += '<div class="rs-sheet" id="rs-sheet" hidden><div class="rs-sheet-b"><div class="rs-sheet-h"><h3>' + x.recap + '</h3><button type="button" data-sheet="0" aria-label="' + x.close + '">✕</button></div>' + recapHTML(true) + '</div></div>';
      root.innerHTML = h;
      var q = root.querySelector('.rs-q'); if (dir) q.focus({ preventScroll: true });
      var cur = root.querySelector('.rs-steps .cur'); if (cur && cur.scrollIntoView && dir) { var ol = root.querySelector('.rs-steps'); ol.scrollLeft = cur.offsetLeft - 20; }
    }
    var reached = S.step;
    function maxReached() { reached = Math.max(reached, S.step); return reached; }

    function renderDone() {
      var x = t();
      var h = '<div class="rs-done"><div class="rs-done-ph" style="background-image:url(' + photo() + ')"></div><div class="rs-done-b">';
      h += '<div class="rs-ok-ic"><svg viewBox="0 0 52 52" width="64" height="64"><circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
      h += '<h2>' + x.okTitle + '</h2><p class="rs-sub">' + x.okSub + '</p>';
      h += '<div class="rs-ref"><small>' + x.okRef + '</small><b>' + S.ref + '</b></div>';
      h += '<div class="rs-ticket"><div class="rs-ticket-h"><b>' + dateLabel(S.date, true) + '</b><span>' + fmtTime(S.time, L) + ' · ' + guestsLabel(S.guests) + '</span></div>' + recapHTML(false) + '</div>';
      h += '<div class="rs-acts"><a class="rs-btn rs-btn-wa" id="rs-wa" target="_blank" rel="noopener" href="' + waLink() + '"><svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor"><path d="M16 3a13 13 0 00-11.2 19.6L3 29l6.6-1.7A13 13 0 1016 3zm0 23.7a10.7 10.7 0 01-5.5-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.7 10.7 0 1116 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.8 8.8 0 01-4.4-3.8c-.3-.6.3-.5.9-1.7a.6.6 0 000-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 00-.9.4 3.7 3.7 0 00-1.1 2.7 6.4 6.4 0 001.3 3.4 14.6 14.6 0 005.6 5c2.1.9 2.9 1 4 .8a3.4 3.4 0 002.2-1.6 2.8 2.8 0 00.2-1.6c-.1-.1-.3-.2-.6-.3z"/></svg>' + x.okWa + '</a>';
      h += '<div class="rs-cal-acts"><small>' + x.okCal + '</small><a class="rs-btn rs-btn-l" target="_blank" rel="noopener" href="' + gcal() + '" id="rs-gcal">' + x.okGcal + '</a><button type="button" class="rs-btn rs-btn-l" id="rs-ics">' + x.okIcs + '</button></div>';
      h += '<a class="rs-btn rs-btn-l" target="_blank" rel="noopener" href="' + MAPS + '" id="rs-map">⌖ ' + x.okMap + '</a>';
      h += '<button type="button" class="rs-link" id="rs-new">' + x.okNew + '</button></div>';
      h += '<p class="rs-demo">' + x.okDemo + '</p></div></div>';
      root.innerHTML = h;
      var h2 = root.querySelector('h2'); h2.setAttribute('tabindex', '-1'); h2.focus({ preventScroll: true });
    }

    function waText() {
      var x = t(), lines = [x.waHello, ''];
      recapRows().forEach(function (r) { lines.push('• ' + r[0] + ' : ' + r[1]); });
      lines.push('• ' + (L === 'fr' ? 'Téléphone' : 'Phone') + ' : +225 ' + S.phone.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1 '));
      if (S.email) lines.push('• E-mail : ' + S.email);
      lines.push('', x.okRef + ' : ' + S.ref);
      return lines.join('\n');
    }
    function waLink() { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(waText()); }
    function stamp(s, t2, addMin) {
      var d = parse(s), m = hm(t2) + (addMin || 0);
      d.setMinutes(m);
      return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
    }
    function dur() { return S.moment === 'soiree' ? 180 : S.moment === 'matin' ? 60 : 120; }
    function gcal() {
      return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(t().calTitle + ' · ' + guestsLabel(S.guests)) +
        '&dates=' + stamp(S.date, S.time) + '/' + stamp(S.date, S.time, dur()) + '&ctz=Africa/Abidjan&location=' + encodeURIComponent(ADDR) +
        '&details=' + encodeURIComponent(t().okRef + ' ' + S.ref + '\nWhatsApp : +225 07 98 97 46 07');
    }
    function ics() {
      var body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Le Comptoir//Reservation//FR', 'BEGIN:VEVENT', 'UID:' + S.ref + '@lecomptoir',
        'DTSTAMP:' + stamp(iso(new Date()), pad(new Date().getHours()) + ':' + pad(new Date().getMinutes())) + 'Z',
        'DTSTART;TZID=Africa/Abidjan:' + stamp(S.date, S.time), 'DTEND;TZID=Africa/Abidjan:' + stamp(S.date, S.time, dur()),
        'SUMMARY:' + t().calTitle + ' · ' + guestsLabel(S.guests), 'LOCATION:' + ADDR.replace(/,/g, '\\,'),
        'DESCRIPTION:' + t().okRef + ' ' + S.ref, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
      a.download = 'le-comptoir-' + S.ref + '.ics'; document.body.appendChild(a); a.click(); a.remove();
    }

    function go(step, dir) {
      S.step = step; render(dir);
      var top = root.getBoundingClientRect().top + scrollY - (opt.offset || 80);
      if (Math.abs(scrollY - top) > 120 && dir) scrollTo({ top: top, behavior: 'smooth' });
    }
    function nextStep() {
      captureInputs();
      if (!valid(S.step)) {
        if (S.step === 6) {
          ['name', 'phone', 'email'].forEach(function (k) {
            var bad = k === 'name' ? S.name.trim().length < 2 : k === 'phone' ? !phoneOk(S.phone) : !emailOk(S.email);
            var f = root.querySelector('#rf-' + k); if (f) f.classList.toggle('bad', bad);
          });
          var fb = root.querySelector('.rs-f.bad input'); if (fb) fb.focus();
        } else {
          var n = root.querySelector('#rs-need'); n.textContent = need(S.step); n.classList.remove('shake'); void n.offsetWidth; n.classList.add('shake');
        }
        return;
      }
      if (S.step === N - 1) return submit();
      go(S.step + 1, 1);
    }
    function submit() {
      var b = root.querySelectorAll('.rs-next'); b.forEach(function (e) { e.textContent = t().sending; e.classList.add('busy'); });
      var d = parse(S.date), c = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', r = '';
      for (var i = 0; i < 3; i++) r += c[Math.floor(Math.random() * c.length)];
      S.ref = 'LC-' + pad(d.getDate()) + pad(d.getMonth() + 1) + '-' + r;
      setTimeout(function () { S.done = true; render(1); var top = root.getBoundingClientRect().top + scrollY - (opt.offset || 80); scrollTo({ top: top, behavior: 'smooth' }); }, 700);
    }
    function captureInputs() {
      var g = function (id) { var e = root.querySelector('#' + id); return e ? e : null; };
      if (g('rs-notes')) S.notes = g('rs-notes').value;
      if (g('rs-name')) S.name = g('rs-name').value;
      if (g('rs-phone')) S.phone = g('rs-phone').value;
      if (g('rs-email')) S.email = g('rs-email').value.trim();
      if (g('rs-consent')) S.consent = g('rs-consent').checked;
    }
    function refreshSide() {
      var s = root.querySelector('.rs-side-b'); if (s) s.innerHTML = '<h3>' + t().recap + '</h3>' + recapHTML(true);
      var ph = root.querySelector('#rs-ph'); if (ph && ph.getAttribute('src') !== photo()) { ph.classList.add('swap'); setTimeout(function () { ph.src = photo(); ph.classList.remove('swap'); }, 220); }
      var m = root.querySelector('.rs-mbar-s span'); if (m) m.textContent = shortRecap();
      root.querySelectorAll('.rs-next').forEach(function (b) { b.classList.toggle('dim', !valid(S.step)); });
      var n = root.querySelector('#rs-need'); if (n && valid(S.step)) n.textContent = '';
      var sh = root.querySelector('#rs-sheet .rs-sheet-b'); if (sh) sh.innerHTML = '<div class="rs-sheet-h"><h3>' + t().recap + '</h3><button type="button" data-sheet="0" aria-label="' + t().close + '">✕</button></div>' + recapHTML(true);
    }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('button, a'); if (!b || !root.contains(b)) return;
      var d = b.dataset;
      if (d.moment) {
        var changed = S.moment !== d.moment; S.moment = d.moment;
        if (changed) { S.time = null; if (S.date && !dayOk(parse(S.date))) S.date = null; if (d.moment === 'soiree' && !S.date) { var up = events.filter(function (x) { return parse(x.date) >= today; })[0]; if (up) S.view = parse(up.date); } }
        if (pass && d.moment === 'soiree') { render(0); refreshSide(); return; }
        refreshSide(); root.querySelectorAll('[data-moment]').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
        setTimeout(function () { go(1, 1); }, 380); return;
      }
      if (d.type) { S.type = d.type; root.querySelectorAll('[data-type]').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); refreshSide(); setTimeout(function () { go(1, 1); }, 380); return; }
      if (d.cal) { S.view = new Date(S.view.getFullYear(), S.view.getMonth() + (+d.cal), 1); render(0); return; }
      if (d.date) { if (S.date !== d.date) S.time = null; S.date = d.date; S.view = parse(d.date); root.querySelectorAll('[data-date]').forEach(function (x) { x.classList.toggle('on', x.dataset.date === d.date); }); refreshSide(); setTimeout(function () { go(2, 1); }, 320); return; }
      if (d.time) { S.time = d.time; root.querySelectorAll('[data-time]').forEach(function (x) { x.classList.toggle('on', x === b); }); refreshSide(); setTimeout(function () { go(3, 1); }, 320); return; }
      if (d.g) { S.guests = Math.min(12, Math.max(1, S.guests + (+d.g))); render(0); refreshSide(); var gn = root.querySelector('.rs-gnum b'); gn.classList.add('pop'); return; }
      if (d.gs) { S.guests = +d.gs; render(0); refreshSide(); root.querySelector('.rs-gnum b').classList.add('pop'); return; }
      if (d.zone) { S.zone = d.zone; root.querySelectorAll('[data-zone]').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); refreshSide(); setTimeout(function () { go(5, 1); }, 380); return; }
      if (d.occ) { S.occasion = d.occ; root.querySelectorAll('[data-occ]').forEach(function (x) { x.classList.toggle('on', x === b); }); captureInputs(); refreshSide(); return; }
      if (d.alg) { var i = S.alg.indexOf(d.alg); if (i > -1) S.alg.splice(i, 1); else S.alg.push(d.alg); b.classList.toggle('on'); b.setAttribute('aria-pressed', i < 0); captureInputs(); refreshSide(); return; }
      if (d.nav) { if (+d.nav > 0) nextStep(); else { captureInputs(); go(S.step - 1, -1); } return; }
      if (d.go !== undefined && b.classList.contains('rs-edit') || (d.go !== undefined && b.closest('.rs-steps'))) { captureInputs(); var sh = root.querySelector('#rs-sheet'); if (sh) sh.hidden = true; document.body.classList.remove('rs-lock'); go(+d.go, +d.go < S.step ? -1 : 1); return; }
      if (d.sheet !== undefined) { var s2 = root.querySelector('#rs-sheet'); s2.hidden = d.sheet === '0'; document.body.classList.toggle('rs-lock', d.sheet === '1'); return; }
      if (b.id === 'rs-ics') { ics(); return; }
      if (b.id === 'rs-new') { S = { step: 0, moment: null, date: null, time: null, guests: 2, zone: null, occasion: 'aucune', alg: [], notes: '', name: S.name, phone: S.phone, email: S.email, consent: true, type: 'table', view: new Date(today.getFullYear(), today.getMonth(), 1), done: false, ref: '' }; reached = 0; go(0, -1); return; }
    });
    root.addEventListener('input', function (e) {
      captureInputs();
      if (e.target.id === 'rs-phone') { var v = e.target.value.replace(/\D/g, '').slice(0, 10); e.target.value = v.replace(/(\d{2})(?=\d)/g, '$1 '); S.phone = e.target.value; }
      var f = e.target.closest('.rs-f'); if (f && f.classList.contains('bad')) {
        var k = f.id.slice(3), ok = k === 'name' ? S.name.trim().length > 1 : k === 'phone' ? phoneOk(S.phone) : emailOk(S.email);
        if (ok) f.classList.remove('bad');
      }
      refreshSide();
    });
    root.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); nextStep(); } });
    root.addEventListener('click', function (e) { if (e.target.id === 'rs-sheet') { e.target.hidden = true; document.body.classList.remove('rs-lock'); } });

    root.classList.add('rs');
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { root.classList.toggle('in-view', en[0].isIntersecting); }, { rootMargin: '-35% 0px -35% 0px' }).observe(root);
    } else root.classList.add('in-view');
    render(0);
    return {
      setLang: function (l) { captureInputs(); L = l; render(0); },
      state: function () { return S; }
    };
  };
})();
