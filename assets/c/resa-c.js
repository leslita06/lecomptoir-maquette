/* Le Comptoir · version C « Atelier » · parcours de réservation (maquette de démonstration)
   Aucune donnée n'est transmise : tout reste dans le navigateur. */
(function () {
  'use strict';
  var WA = '2250798974607';
  var ADDR = 'Le Comptoir, Ivoire Trade Center, boulevard Hassan II, Cocody, Abidjan';
  var MAPS = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Le Comptoir Ivoire Trade Center Cocody Abidjan');
  var ORDER = ['matin', 'brunch', 'dejeuner', 'afterwork', 'diner', 'soiree'];
  var ZORDER = ['terrasse', 'salle', 'fenetre', 'bar', 'egal'];

  var T = {
    fr: {
      steps: ['Moment', 'Jour', 'Heure', 'Couverts', 'Place', 'Occasion', 'Nom'],
      next: 'Continuer', back: 'Retour', send: 'Envoyer ma demande', edit: 'Modifier',
      q: ['On se voit quand ?', 'Quel jour ?', 'À quelle heure ?', 'Vous serez combien ?', 'Où vous installer ?', 'On fête quelque chose ?', 'À quel nom ?'],
      sub: [
        'Du premier café au dernier verre, choisissez votre moment.',
        'Les jours barrés ne sont pas ouverts à la réservation pour ce moment.',
        'Les créneaux suivent le moment et le jour choisis.',
        'Plus de 12 personnes ? Écrivez-nous directement sur WhatsApp.',
        'On fait de notre mieux pour respecter votre choix, selon les places du jour.',
        'Dites-le-nous, l\u2019équipe prépare la table en conséquence.',
        'Votre numéro sert uniquement à confirmer cette réservation.'
      ],
      moments: {
        matin: ['Le matin', 'Café & petit-déjeuner'],
        brunch: ['Le brunch', 'Samedi & dimanche'],
        dejeuner: ['Le déjeuner', 'Le midi'],
        afterwork: ['L\u2019afterwork', 'En fin de journée'],
        diner: ['Le dîner', 'Le soir'],
        soiree: ['Une soirée', 'Les nuits du Comptoir']
      },
      mHours: { matin: 'dès 7 h 30 · 8 h 30 le week-end', brunch: 'sam. & dim.', dejeuner: 'midi', afterwork: 'fin de journée', diner: 'soir', soiree: 'dès 22 h' },
      zones: {
        terrasse: ['La terrasse', 'Dehors, plus grande, pour s\u2019isoler un peu'],
        salle: ['En salle', 'Sous les suspensions en osier'],
        fenetre: ['Côté fenêtres', 'À la lumière, entre les palmes'],
        bar: ['Au bar', 'Pour l\u2019ambiance et les cocktails'],
        egal: ['Peu importe', 'La meilleure place du moment']
      },
      occ: { aucune: 'Rien de spécial', anniv: 'Anniversaire', affaires: 'Repas d\u2019affaires', rdv: 'En amoureux', amis: 'Entre amis', equipe: 'Afterwork d\u2019équipe', fete: 'Célébration' },
      allergies: 'Allergies ou régime', alg: { gluten: 'Gluten', arachide: 'Arachides', mer: 'Fruits de mer', lactose: 'Lactose', vege: 'Végétarien', autre: 'Autre' },
      notes: 'Une demande particulière ?', notesPh: 'Chaise bébé, gâteau à prévoir, table au calme, accès facile…',
      name: 'Nom et prénom', phone: 'Téléphone (WhatsApp)', email: 'E-mail (facultatif)', consent: 'Je veux recevoir la confirmation sur WhatsApp',
      phonePh: '07 00 00 00 00',
      errName: 'Indiquez votre nom.', errPhone: 'Un numéro à 10 chiffres, par exemple 07 00 00 00 00.', errEmail: 'Cette adresse e-mail ne semble pas complète.',
      needMoment: 'Choisissez un moment pour continuer.', needDate: 'Choisissez un jour.', needTime: 'Choisissez une heure.', needZone: 'Choisissez une place.',
      noSlot: 'Plus de créneau ce jour-là pour ce moment. Essayez un autre jour.',
      guests: 'personnes', guest: 'personne', more: 'Plus de 12 ? Écrivez-nous',
      ticket: 'Votre billet', empty: '—',
      rMoment: 'Moment', rDate: 'Jour', rTime: 'Heure', rGuests: 'Couverts', rZone: 'Place', rOcc: 'Occasion', rName: 'Nom', rNotes: 'Précisions', rType: 'Formule',
      weekdays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      today: 'Aujourd\u2019hui', tomorrow: 'Demain', sat: 'Samedi', nextEv: 'Prochaine soirée',
      soireeHint: 'Pour une soirée, seuls les jours de soirée sont ouverts (marqués d\u2019un point).',
      brunchHint: 'Le brunch se réserve le samedi et le dimanche.',
      passTitle: 'Table, entrée ou liste d\u2019attente ?', pass: { table: ['Une table', 'Pour votre groupe, toute la soirée'], entree: ['L\u2019entrée', 'Accès à la soirée, sans table'], attente: ['Liste d\u2019attente', 'Prévenu si une table se libère'] },
      okEy: 'Demande enregistrée', okTitle: 'C\u2019est noté.<br><em>À très vite.</em>',
      okSub: 'L\u2019équipe du Comptoir vous confirme la table sur WhatsApp ou par téléphone.',
      okRef: 'Référence', okCal: 'Ajouter à mon agenda', okGcal: 'Google Agenda', okIcs: 'Agenda (.ics)',
      okWa: 'Recevoir le récap sur WhatsApp', okMap: 'Itinéraire jusqu\u2019à l\u2019ITC', okNew: 'Nouvelle réservation',
      okDemo: 'Démonstration : la demande n\u2019est transmise à personne tant que le site n\u2019est pas relié au restaurant.',
      waHello: 'Bonjour Le Comptoir, voici ma demande de réservation :', calTitle: 'Table au Comptoir', sending: 'Envoi…',
      months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      prev: 'Mois précédent', nextM: 'Mois suivant', open: 'Voir le billet', close: 'Fermer', step: 'Étape'
    },
    en: {
      steps: ['Moment', 'Day', 'Time', 'Guests', 'Spot', 'Occasion', 'Name'],
      next: 'Continue', back: 'Back', send: 'Send my request', edit: 'Edit',
      q: ['When shall we see you?', 'Which day?', 'What time?', 'How many of you?', 'Where would you like to sit?', 'Celebrating something?', 'Whose name?'],
      sub: [
        'From the first coffee to the last drink, pick your moment.',
        'Crossed-out days are not open for booking for this moment.',
        'Times depend on the moment and day you chose.',
        'More than 12? Message us directly on WhatsApp.',
        'We do our best to honour your choice, depending on the day.',
        'Tell us, the team will set the table accordingly.',
        'Your number is only used to confirm this booking.'
      ],
      moments: {
        matin: ['Morning', 'Coffee & breakfast'], brunch: ['Brunch', 'Saturday & Sunday'], dejeuner: ['Lunch', 'Midday'],
        afterwork: ['Afterwork', 'End of the day'], diner: ['Dinner', 'Evening'], soiree: ['A night event', 'Le Comptoir after dark']
      },
      mHours: { matin: 'from 7:30 am · 8:30 am at weekends', brunch: 'Sat & Sun', dejeuner: 'midday', afterwork: 'end of the day', diner: 'evening', soiree: 'from 10 pm' },
      zones: {
        terrasse: ['The terrace', 'Outdoors, bigger now, a little away from it all'], salle: ['Main room', 'Under the wicker pendant lights'],
        fenetre: ['By the windows', 'In the light, among the palms'], bar: ['At the bar', 'For the buzz and the cocktails'], egal: ['Anywhere', 'The best spot available']
      },
      occ: { aucune: 'Nothing special', anniv: 'Birthday', affaires: 'Business meal', rdv: 'Date night', amis: 'With friends', equipe: 'Team afterwork', fete: 'Celebration' },
      allergies: 'Allergies or diet', alg: { gluten: 'Gluten', arachide: 'Peanuts', mer: 'Seafood', lactose: 'Lactose', vege: 'Vegetarian', autre: 'Other' },
      notes: 'Any special request?', notesPh: 'High chair, cake to plan, quiet table, easy access…',
      name: 'Full name', phone: 'Phone (WhatsApp)', email: 'Email (optional)', consent: 'Send me the confirmation on WhatsApp',
      phonePh: '07 00 00 00 00',
      errName: 'Please enter your name.', errPhone: 'A 10-digit number, e.g. 07 00 00 00 00.', errEmail: 'This email address looks incomplete.',
      needMoment: 'Pick a moment to continue.', needDate: 'Pick a day.', needTime: 'Pick a time.', needZone: 'Pick a spot.',
      noSlot: 'No time left that day for this moment. Try another day.',
      guests: 'guests', guest: 'guest', more: 'More than 12? Message us',
      ticket: 'Your ticket', empty: '—',
      rMoment: 'Moment', rDate: 'Day', rTime: 'Time', rGuests: 'Guests', rZone: 'Spot', rOcc: 'Occasion', rName: 'Name', rNotes: 'Notes', rType: 'Option',
      weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      today: 'Today', tomorrow: 'Tomorrow', sat: 'Saturday', nextEv: 'Next night',
      soireeHint: 'For a night event, only event days are open (marked with a dot).',
      brunchHint: 'Brunch can be booked on Saturdays and Sundays.',
      passTitle: 'Table, entry or waiting list?', pass: { table: ['A table', 'For your group, all night'], entree: ['Entry', 'Access to the night, no table'], attente: ['Waiting list', 'Told first if a table frees up'] },
      okEy: 'Request received', okTitle: 'All set.<br><em>See you soon.</em>',
      okSub: 'The Le Comptoir team will confirm your table on WhatsApp or by phone.',
      okRef: 'Reference', okCal: 'Add to my calendar', okGcal: 'Google Calendar', okIcs: 'Calendar (.ics)',
      okWa: 'Get the summary on WhatsApp', okMap: 'Directions to the ITC', okNew: 'New booking',
      okDemo: 'Demo: the request is not sent to anyone until the site is connected to the restaurant.',
      waHello: 'Hello Le Comptoir, here is my booking request:', calTitle: 'Table at Le Comptoir', sending: 'Sending…',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      prev: 'Previous month', nextM: 'Next month', open: 'See the ticket', close: 'Close', step: 'Step'
    }
  };

  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function hm(t) { var p = t.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmtTime(t, L) { var p = t.split(':'); return L === 'fr' ? (+p[0]) + ' h ' + p[1] : (((+p[0] + 11) % 12) + 1) + ':' + p[1] + (+p[0] < 12 ? ' am' : ' pm'); }
  var ARROW = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  window.AtelierResa = function (opt) {
    var root = document.querySelector(opt.root);
    var L = opt.lang || 'fr';
    var events = opt.events || [];
    var imgs = opt.images;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var maxDay = new Date(today); maxDay.setDate(maxDay.getDate() + 90);
    function fresh(keep) { return { step: 0, moment: null, date: null, time: null, guests: 2, zone: null, occasion: 'aucune', alg: [], notes: '', name: keep ? keep.name : '', phone: keep ? keep.phone : '', email: keep ? keep.email : '', consent: true, type: 'table', view: new Date(today.getFullYear(), today.getMonth(), 1), done: false, ref: '' }; }
    var S = fresh();
    var N = 7, reached = 0;

    var q = new URLSearchParams(location.search);
    if (q.get('moment') && ORDER.indexOf(q.get('moment')) > -1) { S.moment = q.get('moment'); S.step = 1; }
    if (q.get('date') && S.moment) { var dq = parse(q.get('date')); if (!isNaN(dq) && dayOk(dq)) { S.date = q.get('date'); S.view = new Date(dq.getFullYear(), dq.getMonth(), 1); S.step = 2; } }
    if (q.get('zone') && ZORDER.indexOf(q.get('zone')) > -1) S.zone = q.get('zone');
    if (q.get('type') && T.fr.pass[q.get('type')]) S.type = q.get('type');
    if (S.moment === 'soiree' && !S.date) { var up0 = upcoming()[0]; if (up0) S.view = new Date(parse(up0.date).getFullYear(), parse(up0.date).getMonth(), 1); }
    reached = S.step;

    function t() { return T[L]; }
    function upcoming() { return events.filter(function (e) { return parse(e.date) >= today && parse(e.date) <= maxDay; }); }
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
        case 'afterwork': a = '17:30'; b = '19:30'; break;
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
      if (L === 'fr') return long ? x.days[d.getDay()] + ' ' + d.getDate() + ' ' + x.months[d.getMonth()] : x.days[d.getDay()].slice(0, 3) + '. ' + d.getDate() + ' ' + ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'][d.getMonth()];
      return long ? x.days[d.getDay()] + ', ' + x.months[d.getMonth()] + ' ' + d.getDate() : x.days[d.getDay()].slice(0, 3) + ', ' + x.months[d.getMonth()].slice(0, 3) + ' ' + d.getDate();
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
    function need(step) { var x = t(); return [x.needMoment, x.needDate, x.needTime, '', x.needZone, '', ''][step]; }
    function photo() {
      if (S.step >= 4 && S.zone && imgs.zones[S.zone]) return imgs.zones[S.zone];
      if (S.moment) return imgs.moments[S.moment];
      return imgs.idle;
    }

    /* ---------- billet (récapitulatif) ---------- */
    function cells() {
      var x = t();
      var notes = [S.alg.map(function (k) { return x.alg[k]; }).join(', '), S.notes.trim()].filter(Boolean).join(' · ');
      return [
        [x.rMoment, S.moment ? x.moments[S.moment][0] + (S.moment === 'soiree' ? ' · ' + x.pass[S.type][0] : '') : '', 0],
        [x.rDate, S.date ? dateLabel(S.date, false) + (S.moment === 'soiree' && evOn(S.date) ? ' · ' + evOn(S.date).name : '') : '', 1],
        [x.rTime, S.time ? fmtTime(S.time, L) : '', 2],
        [x.rGuests, (reached > 3 || S.done) ? guestsLabel(S.guests) : '', 3],
        [x.rZone, S.zone ? x.zones[S.zone][0] : '', 4],
        [x.rOcc, (reached > 5 || S.done) ? (S.occasion !== 'aucune' ? x.occ[S.occasion] : x.occ.aucune) + (notes ? ' · ' + notes : '') : '', 5],
        [x.rName, S.done || S.step === 6 ? S.name.trim() : '', 6]
      ];
    }
    function ticketHTML(edit) {
      return '<ol class="ct-cells">' + cells().map(function (c, k) {
        var filled = !!c[1];
        var tag = edit && filled && !S.done && k <= reached ? 'button type="button" data-go="' + c[2] + '" aria-label="' + t().edit + ' ' + c[0] + '"' : 'div';
        return '<li class="' + (filled ? 'f' : '') + (k === S.step && !S.done ? ' cur' : '') + '"><' + tag + ' class="ct-cell"><small>' + pad(k + 1) + ' · ' + c[0] + '</small><b>' + (filled ? esc(c[1]) : t().empty) + '</b></' + tag.split(' ')[0] + '></li>';
      }).join('') + '</ol>';
    }
    function shortTicket() {
      var p = [];
      if (S.moment) p.push(t().moments[S.moment][0]);
      if (S.date) p.push(dateLabel(S.date));
      if (S.time) p.push(fmtTime(S.time, L));
      if (reached > 3) p.push(guestsLabel(S.guests));
      if (S.zone) p.push(t().zones[S.zone][0]);
      return p.join(' · ') || t().sub[0];
    }

    /* ---------- étapes ---------- */
    function stepBody(i) {
      var x = t(), h = '';
      if (i === 0) {
        h += '<div class="ca-moments">' + ORDER.map(function (k, n) {
          return '<button type="button" class="ca-mrow' + (S.moment === k ? ' on' : '') + '" data-moment="' + k + '" aria-pressed="' + (S.moment === k) + '"><span class="ca-mn">' + pad(n + 1) + '</span><img src="' + imgs.moments[k] + '" alt="" loading="lazy"><span class="ca-mt"><b>' + x.moments[k][0] + '</b><small>' + x.moments[k][1] + ' · ' + x.mHours[k] + '</small></span><span class="ca-go">' + ARROW + '</span></button>';
        }).join('') + '</div>';
        if (S.moment === 'soiree') {
          h += '<p class="ca-label">' + x.passTitle + '</p><div class="ca-pass">' + ['table', 'entree', 'attente'].map(function (k) {
            return '<button type="button" class="ca-opt' + (S.type === k ? ' on' : '') + '" data-type="' + k + '" aria-pressed="' + (S.type === k) + '"><b>' + x.pass[k][0] + '</b><small>' + x.pass[k][1] + '</small></button>';
          }).join('') + '</div>';
        }
      }
      if (i === 1) {
        var quick = [];
        if (S.moment === 'soiree') upcoming().forEach(function (e) { quick.push([e.date, x.nextEv + ' · ' + esc(e.name)]); });
        else {
          var td = new Date(today), tm = new Date(today); tm.setDate(tm.getDate() + 1);
          var sa = new Date(today); sa.setDate(sa.getDate() + ((6 - sa.getDay() + 7) % 7 || 7));
          [[td, x.today], [tm, x.tomorrow], [sa, x.sat + ' ' + sa.getDate()]].forEach(function (p) { if (dayOk(p[0])) quick.push([iso(p[0]), p[1]]); });
        }
        if (quick.length) h += '<div class="ca-quick">' + quick.map(function (p) { return '<button type="button" class="ca-chip' + (S.date === p[0] ? ' on' : '') + '" data-date="' + p[0] + '">' + p[1] + '</button>'; }).join('') + '</div>';
        var v = S.view, y = v.getFullYear(), m = v.getMonth();
        var first = new Date(y, m, 1), off = (first.getDay() + 6) % 7, nd = new Date(y, m + 1, 0).getDate();
        var canPrev = first > new Date(today.getFullYear(), today.getMonth(), 1), canNext = new Date(y, m + 1, 1) <= maxDay;
        h += '<div class="ca-cal"><div class="ca-cal-h"><b>' + x.months[m] + ' <i>' + y + '</i></b><span><button type="button" data-cal="-1" ' + (canPrev ? '' : 'disabled') + ' aria-label="' + x.prev + '">←</button><button type="button" data-cal="1" ' + (canNext ? '' : 'disabled') + ' aria-label="' + x.nextM + '">→</button></span></div>';
        h += '<div class="ca-grid">' + x.weekdays.map(function (w) { return '<span class="ca-wd">' + w + '</span>'; }).join('');
        for (var k = 0; k < off; k++) h += '<span></span>';
        for (var dd = 1; dd <= nd; dd++) {
          var d = new Date(y, m, dd), s = iso(d), ok = dayOk(d), ev = evOn(s);
          h += '<button type="button" class="ca-day' + (S.date === s ? ' on' : '') + (s === iso(today) ? ' today' : '') + (ev ? ' ev' : '') + (weekend(d) ? ' we' : '') + '" data-date="' + s + '" ' + (ok ? '' : 'disabled') + ' aria-label="' + dateLabel(s, true) + (ev ? ', ' + esc(ev.name) : '') + '">' + dd + (ev ? '<i></i>' : '') + '</button>';
        }
        h += '</div></div>';
        if (S.moment === 'soiree') h += '<p class="ca-hint">' + x.soireeHint + '</p>';
        if (S.moment === 'brunch') h += '<p class="ca-hint">' + x.brunchHint + '</p>';
      }
      if (i === 2) {
        var sl = slots();
        h += '<p class="ca-hint ca-hint-top">' + dateLabel(S.date, true) + ' · ' + x.moments[S.moment][0] + '</p>';
        if (!sl.some(function (s) { return !s.off; })) h += '<p class="ca-empty">' + x.noSlot + '</p>';
        h += '<div class="ca-slots">' + sl.map(function (s) { var p = s.t.split(':'); return '<button type="button" class="ca-slot' + (S.time === s.t ? ' on' : '') + '" data-time="' + s.t + '" ' + (s.off ? 'disabled' : '') + '><b>' + (L === 'fr' ? (+p[0]) + '<i>h</i>' + p[1] : fmtTime(s.t, L)) + '</b></button>'; }).join('') + '</div>';
      }
      if (i === 3) {
        h += '<div class="ca-guests"><button type="button" class="ca-g" data-g="-1" aria-label="−" ' + (S.guests <= 1 ? 'disabled' : '') + '>−</button><div class="ca-gnum" aria-live="polite"><b>' + pad(S.guests) + '</b><small>' + (S.guests > 1 ? x.guests : x.guest) + '</small></div><button type="button" class="ca-g" data-g="1" aria-label="+" ' + (S.guests >= 12 ? 'disabled' : '') + '>+</button></div>';
        h += '<input type="range" class="ca-range" id="ca-range" min="1" max="12" step="1" value="' + S.guests + '" aria-label="' + x.steps[3] + '" style="--p:' + ((S.guests - 1) / 11 * 100) + '%">';
        h += '<div class="ca-ticks">' + [1, 2, 4, 6, 8, 10, 12].map(function (n) { return '<button type="button" data-gs="' + n + '" class="' + (S.guests === n ? 'on' : '') + '">' + n + '</button>'; }).join('') + '</div>';
        h += '<a class="ca-more" href="https://wa.me/' + WA + '?text=' + encodeURIComponent(L === 'fr' ? 'Bonjour Le Comptoir, je souhaite réserver pour un groupe de plus de 12 personnes.' : 'Hello Le Comptoir, I would like to book for a group of more than 12.') + '" target="_blank" rel="noopener">' + x.more + ' ' + ARROW + '</a>';
      }
      if (i === 4) {
        h += '<div class="ca-zones">' + ZORDER.map(function (k) {
          return '<button type="button" class="ca-zone ca-z-' + k + (S.zone === k ? ' on' : '') + '" data-zone="' + k + '" aria-pressed="' + (S.zone === k) + '">' + (imgs.zones[k] ? '<img src="' + imgs.zones[k] + '" alt="" loading="lazy">' : '<span class="ca-noimg" aria-hidden="true">✺</span>') + '<span class="ca-zt"><b>' + x.zones[k][0] + '</b><small>' + x.zones[k][1] + '</small></span><i class="ca-tick" aria-hidden="true"></i></button>';
        }).join('') + '</div>';
      }
      if (i === 5) {
        h += '<div class="ca-chips">' + Object.keys(x.occ).map(function (k) { return '<button type="button" class="ca-chip' + (S.occasion === k ? ' on' : '') + '" data-occ="' + k + '" aria-pressed="' + (S.occasion === k) + '">' + x.occ[k] + '</button>'; }).join('') + '</div>';
        h += '<p class="ca-label">' + x.allergies + '</p><div class="ca-chips ca-chips-s">' + Object.keys(x.alg).map(function (k) { return '<button type="button" class="ca-chip' + (S.alg.indexOf(k) > -1 ? ' on' : '') + '" data-alg="' + k + '" aria-pressed="' + (S.alg.indexOf(k) > -1) + '">' + x.alg[k] + '</button>'; }).join('') + '</div>';
        h += '<label class="ca-label" for="ca-notes">' + x.notes + '</label><textarea id="ca-notes" class="ca-in" rows="3" maxlength="400" placeholder="' + x.notesPh + '">' + esc(S.notes) + '</textarea>';
      }
      if (i === 6) {
        h += '<div class="ca-f" id="cf-name"><label for="ca-name">' + x.name + '</label><input id="ca-name" class="ca-in" autocomplete="name" value="' + esc(S.name) + '"><span class="ca-err">' + x.errName + '</span></div>';
        h += '<div class="ca-f" id="cf-phone"><label for="ca-phone">' + x.phone + '</label><div class="ca-tel"><span>+225</span><input id="ca-phone" class="ca-in" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="' + x.phonePh + '" value="' + esc(S.phone) + '"></div><span class="ca-err">' + x.errPhone + '</span></div>';
        h += '<div class="ca-f" id="cf-email"><label for="ca-email">' + x.email + '</label><input id="ca-email" class="ca-in" type="email" inputmode="email" autocomplete="email" value="' + esc(S.email) + '"><span class="ca-err">' + x.errEmail + '</span></div>';
        h += '<label class="ca-check"><input type="checkbox" id="ca-consent" ' + (S.consent ? 'checked' : '') + '><span></span>' + x.consent + '</label>';
      }
      return h;
    }

    function render(dir) {
      if (S.done) return renderDone();
      var x = t(); reached = Math.max(reached, S.step);
      var h = '<div class="ca">';
      h += '<div class="ca-stage"><div class="ca-ph"><img src="' + photo() + '" alt="" id="ca-ph"></div><div class="ca-stage-t"><span class="ca-big">' + pad(S.step + 1) + '<i>/' + pad(N) + '</i></span><span class="ca-stage-l">' + x.steps[S.step] + '</span></div></div>';
      h += '<div class="ca-main">';
      h += '<ol class="ca-prog">' + x.steps.map(function (s, k) { return '<li class="' + (k < S.step ? 'done' : k === S.step ? 'cur' : '') + '"><button type="button" data-go="' + k + '" ' + (k <= reached ? '' : 'disabled') + ' aria-label="' + x.step + ' ' + (k + 1) + ' : ' + s + '"><i></i><span>' + s + '</span></button></li>'; }).join('') + '</ol>';
      h += '<div class="ca-pane ' + (dir < 0 ? 'from-l' : 'from-r') + '"><h2 class="ca-q" tabindex="-1">' + x.q[S.step] + '</h2><p class="ca-sub">' + x.sub[S.step] + '</p>' + stepBody(S.step) + '</div>';
      h += '<p class="ca-need" id="ca-need" role="alert"></p>';
      h += '<div class="ca-nav">' + (S.step > 0 ? '<button type="button" class="ca-back" data-nav="-1">← ' + x.back + '</button>' : '<span></span>') + '<button type="button" class="ca-next' + (valid(S.step) ? '' : ' dim') + '" data-nav="1"><span>' + (S.step === N - 1 ? x.send : x.next) + '</span>' + ARROW + '</button></div>';
      h += '<div class="ca-ticket"><div class="ca-ticket-h"><span>' + x.ticket + '</span><img src="' + imgs.logo + '" alt=""></div>' + ticketHTML(true) + '</div>';
      h += '</div></div>';
      h += '<div class="ca-mbar"><button type="button" class="ca-mbar-s" data-sheet="1"><small>' + x.ticket + ' · ' + (S.step + 1) + '/' + N + '</small><span>' + esc(shortTicket()) + '</span></button><button type="button" class="ca-next ca-next-m' + (valid(S.step) ? '' : ' dim') + '" data-nav="1" aria-label="' + (S.step === N - 1 ? x.send : x.next) + '">' + ARROW + '</button></div>';
      h += '<div class="ca-sheet" id="ca-sheet" hidden><div class="ca-sheet-b"><div class="ca-sheet-h"><b>' + x.ticket + '</b><button type="button" data-sheet="0" aria-label="' + x.close + '">✕</button></div>' + ticketHTML(true) + '</div></div>';
      root.innerHTML = h;
      if (dir) { var qq = root.querySelector('.ca-q'); qq.focus({ preventScroll: true }); }
    }

    function renderDone() {
      var x = t();
      var h = '<div class="cd"><div class="cd-ph" style="background-image:url(' + photo() + ')"><span class="cd-ey">' + x.okEy + '</span><h2 tabindex="-1">' + x.okTitle + '</h2><p>' + x.okSub + '</p></div>';
      h += '<div class="cd-b"><div class="cd-ticket"><div class="cd-stub"><img src="' + imgs.logo + '" alt=""><small>' + x.okRef + '</small><b>' + S.ref + '</b></div><div class="cd-main"><div class="cd-when"><b>' + dateLabel(S.date, true) + '</b><span>' + fmtTime(S.time, L) + ' · ' + guestsLabel(S.guests) + '</span></div>' + ticketHTML(false) + '</div></div>';
      h += '<div class="cd-acts"><a class="cd-btn cd-wa" id="ca-wa" target="_blank" rel="noopener" href="' + waLink() + '"><svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3a13 13 0 00-11.2 19.6L3 29l6.6-1.7A13 13 0 1016 3zm0 23.7a10.7 10.7 0 01-5.5-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.7 10.7 0 1116 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.8 8.8 0 01-4.4-3.8c-.3-.6.3-.5.9-1.7a.6.6 0 000-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 00-.9.4 3.7 3.7 0 00-1.1 2.7 6.4 6.4 0 001.3 3.4 14.6 14.6 0 005.6 5c2.1.9 2.9 1 4 .8a3.4 3.4 0 002.2-1.6 2.8 2.8 0 00.2-1.6c-.1-.1-.3-.2-.6-.3z"/></svg>' + x.okWa + '</a>';
      h += '<div class="cd-cal"><small>' + x.okCal + '</small><a class="cd-btn cd-l" target="_blank" rel="noopener" href="' + gcal() + '" id="ca-gcal">' + x.okGcal + '</a><button type="button" class="cd-btn cd-l" id="ca-ics">' + x.okIcs + '</button></div>';
      h += '<a class="cd-btn cd-l" target="_blank" rel="noopener" href="' + MAPS + '" id="ca-map">' + x.okMap + ' ' + ARROW + '</a>';
      h += '<button type="button" class="cd-new" id="ca-new">' + x.okNew + '</button></div>';
      h += '<p class="cd-demo">' + x.okDemo + '</p></div></div>';
      root.innerHTML = h;
      root.querySelector('h2').focus({ preventScroll: true });
    }

    function waText() {
      var x = t(), lines = [x.waHello, ''];
      cells().forEach(function (c) { if (c[1]) lines.push('• ' + c[0] + ' : ' + c[1]); });
      lines.push('• ' + (L === 'fr' ? 'Téléphone' : 'Phone') + ' : +225 ' + S.phone.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1 '));
      if (S.email) lines.push('• E-mail : ' + S.email);
      lines.push('', x.okRef + ' : ' + S.ref);
      return lines.join('\n');
    }
    function waLink() { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(waText()); }
    function stamp(s, t2, addMin) { var d = parse(s); d.setMinutes(hm(t2) + (addMin || 0)); return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00'; }
    function dur() { return S.moment === 'soiree' ? 180 : S.moment === 'matin' ? 60 : S.moment === 'afterwork' ? 90 : 120; }
    function gcal() {
      return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(t().calTitle + ' · ' + guestsLabel(S.guests)) +
        '&dates=' + stamp(S.date, S.time) + '/' + stamp(S.date, S.time, dur()) + '&ctz=Africa/Abidjan&location=' + encodeURIComponent(ADDR) +
        '&details=' + encodeURIComponent(t().okRef + ' ' + S.ref + '\nWhatsApp : +225 07 98 97 46 07');
    }
    function ics() {
      var n = new Date();
      var body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Le Comptoir//Reservation//FR', 'BEGIN:VEVENT', 'UID:' + S.ref + '@lecomptoir',
        'DTSTAMP:' + stamp(iso(n), pad(n.getHours()) + ':' + pad(n.getMinutes())) + 'Z',
        'DTSTART;TZID=Africa/Abidjan:' + stamp(S.date, S.time), 'DTEND;TZID=Africa/Abidjan:' + stamp(S.date, S.time, dur()),
        'SUMMARY:' + t().calTitle + ' · ' + guestsLabel(S.guests), 'LOCATION:' + ADDR.replace(/,/g, '\\,'),
        'DESCRIPTION:' + t().okRef + ' ' + S.ref, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
      a.download = 'le-comptoir-' + S.ref + '.ics'; document.body.appendChild(a); a.click(); a.remove();
    }

    function go(step, dir) {
      S.step = step; render(dir);
      var top = root.getBoundingClientRect().top + scrollY - (opt.offset || 70);
      if (dir && Math.abs(scrollY - top) > 120) scrollTo({ top: top, behavior: 'smooth' });
    }
    function nextStep() {
      capture();
      if (!valid(S.step)) {
        if (S.step === 6) {
          ['name', 'phone', 'email'].forEach(function (k) {
            var bad = k === 'name' ? S.name.trim().length < 2 : k === 'phone' ? !phoneOk(S.phone) : !emailOk(S.email);
            var f = root.querySelector('#cf-' + k); if (f) f.classList.toggle('bad', bad);
          });
          var fb = root.querySelector('.ca-f.bad input'); if (fb) fb.focus();
        } else {
          var n = root.querySelector('#ca-need'); n.textContent = need(S.step); n.classList.remove('shake'); void n.offsetWidth; n.classList.add('shake');
        }
        return;
      }
      if (S.step === N - 1) return submit();
      go(S.step + 1, 1);
    }
    function submit() {
      root.querySelectorAll('.ca-next span').forEach(function (e) { e.textContent = t().sending; });
      root.querySelectorAll('.ca-next').forEach(function (e) { e.classList.add('busy'); });
      var d = parse(S.date), c = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', r = '';
      for (var i = 0; i < 3; i++) r += c[Math.floor(Math.random() * c.length)];
      S.ref = 'LC-' + pad(d.getDate()) + pad(d.getMonth() + 1) + '-' + r;
      setTimeout(function () { S.done = true; document.body.classList.remove('ca-lock'); render(1); var top = root.getBoundingClientRect().top + scrollY - (opt.offset || 70); scrollTo({ top: top, behavior: 'smooth' }); }, 700);
    }
    function capture() {
      var g = function (id) { return root.querySelector('#' + id); };
      if (g('ca-notes')) S.notes = g('ca-notes').value;
      if (g('ca-name')) S.name = g('ca-name').value;
      if (g('ca-phone')) S.phone = g('ca-phone').value;
      if (g('ca-email')) S.email = g('ca-email').value.trim();
      if (g('ca-consent')) S.consent = g('ca-consent').checked;
    }
    function refresh() {
      root.querySelectorAll('.ca-ticket .ct-cells, .ca-sheet .ct-cells').forEach(function (o) { o.outerHTML = ticketHTML(true); });
      var ph = root.querySelector('#ca-ph'); if (ph && ph.getAttribute('src') !== photo()) { ph.classList.add('swap'); setTimeout(function () { ph.src = photo(); ph.classList.remove('swap'); }, 240); }
      var m = root.querySelector('.ca-mbar-s span'); if (m) m.textContent = shortTicket();
      root.querySelectorAll('.ca-next').forEach(function (b) { b.classList.toggle('dim', !valid(S.step)); });
      var n = root.querySelector('#ca-need'); if (n && valid(S.step)) n.textContent = '';
    }
    function mark(sel, b) { root.querySelectorAll(sel).forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); }
    function setGuests(n) {
      S.guests = Math.min(12, Math.max(1, n));
      var x = t(), gn = root.querySelector('.ca-gnum');
      if (gn) { gn.innerHTML = '<b class="pop">' + pad(S.guests) + '</b><small>' + (S.guests > 1 ? x.guests : x.guest) + '</small>'; }
      var r = root.querySelector('#ca-range'); if (r) { r.value = S.guests; r.style.setProperty('--p', ((S.guests - 1) / 11 * 100) + '%'); }
      root.querySelectorAll('[data-g]').forEach(function (b) { b.disabled = (+b.dataset.g < 0 && S.guests <= 1) || (+b.dataset.g > 0 && S.guests >= 12); });
      root.querySelectorAll('[data-gs]').forEach(function (b) { b.classList.toggle('on', +b.dataset.gs === S.guests); });
      refresh();
    }

    root.addEventListener('click', function (e) {
      if (e.target.id === 'ca-sheet') { e.target.hidden = true; document.body.classList.remove('ca-lock'); return; }
      var b = e.target.closest('button, a'); if (!b || !root.contains(b)) return;
      var d = b.dataset;
      if (d.moment) {
        var changed = S.moment !== d.moment; S.moment = d.moment;
        if (changed) { S.time = null; if (S.date && !dayOk(parse(S.date))) S.date = null; if (d.moment === 'soiree' && !S.date) { var up = upcoming()[0]; if (up) S.view = new Date(parse(up.date).getFullYear(), parse(up.date).getMonth(), 1); } }
        if (d.moment === 'soiree') { render(0); refresh(); return; }
        mark('[data-moment]', b); refresh(); setTimeout(function () { go(1, 1); }, 360); return;
      }
      if (d.type) { S.type = d.type; mark('[data-type]', b); refresh(); setTimeout(function () { go(1, 1); }, 360); return; }
      if (d.cal) { S.view = new Date(S.view.getFullYear(), S.view.getMonth() + (+d.cal), 1); render(0); return; }
      if (d.date) { if (S.date !== d.date) S.time = null; S.date = d.date; var pd = parse(d.date); S.view = new Date(pd.getFullYear(), pd.getMonth(), 1); root.querySelectorAll('[data-date]').forEach(function (x) { x.classList.toggle('on', x.dataset.date === d.date); }); refresh(); setTimeout(function () { go(2, 1); }, 320); return; }
      if (d.time) { S.time = d.time; mark('[data-time]', b); refresh(); setTimeout(function () { go(3, 1); }, 320); return; }
      if (d.g) { setGuests(S.guests + (+d.g)); return; }
      if (d.gs) { setGuests(+d.gs); return; }
      if (d.zone) { S.zone = d.zone; mark('[data-zone]', b); refresh(); setTimeout(function () { go(5, 1); }, 420); return; }
      if (d.occ) { S.occasion = d.occ; mark('[data-occ]', b); capture(); refresh(); return; }
      if (d.alg) { var i = S.alg.indexOf(d.alg); if (i > -1) S.alg.splice(i, 1); else S.alg.push(d.alg); b.classList.toggle('on'); b.setAttribute('aria-pressed', i < 0); capture(); refresh(); return; }
      if (d.nav) { if (+d.nav > 0) nextStep(); else { capture(); go(S.step - 1, -1); } return; }
      if (d.go !== undefined) { capture(); var sh = root.querySelector('#ca-sheet'); if (sh) sh.hidden = true; document.body.classList.remove('ca-lock'); go(+d.go, +d.go < S.step ? -1 : 1); return; }
      if (d.sheet !== undefined) { var s2 = root.querySelector('#ca-sheet'); s2.hidden = d.sheet === '0'; document.body.classList.toggle('ca-lock', d.sheet === '1'); return; }
      if (b.id === 'ca-ics') { ics(); return; }
      if (b.id === 'ca-new') { S = fresh(S); reached = 0; go(0, -1); return; }
    });
    root.addEventListener('input', function (e) {
      if (e.target.id === 'ca-range') { setGuests(+e.target.value); return; }
      capture();
      if (e.target.id === 'ca-phone') { var v = e.target.value.replace(/\D/g, '').slice(0, 10); e.target.value = v.replace(/(\d{2})(?=\d)/g, '$1 '); S.phone = e.target.value; }
      var f = e.target.closest('.ca-f'); if (f && f.classList.contains('bad')) {
        var k = f.id.slice(3), ok = k === 'name' ? S.name.trim().length > 1 : k === 'phone' ? phoneOk(S.phone) : emailOk(S.email);
        if (ok) f.classList.remove('bad');
      }
      refresh();
    });
    root.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox') { e.preventDefault(); nextStep(); } });

    root.classList.add('ca-root');
    render(0);
    return { setLang: function (l) { capture(); L = l; render(0); }, state: function () { return S; } };
  };
})();
