/*
 * Mesin undangan digital (statis).
 * Setiap template cukup mendefinisikan `window.INVITATION` (data + pengaturan tema)
 * dan theme.css, lalu memuat illustrations.js dan file ini.
 */
(function () {
  'use strict';

  var C = window.INVITATION;
  var app = document.getElementById('app');
  var ILL = window.ILLUSTRATIONS || {};
  if (!C || !app) return;

  var TZ = C.timeZone || 'Asia/Jakarta';
  var TZ_LABEL = C.timeZoneLabel || 'WIB';
  var STORE_PREFIX = 'undangan:' + (C.slug || location.pathname) + ':';
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var T = Object.assign({
    illustration: 'modern', // 'jawa' | 'modern'
    hijab: false,           // khusus ilustrasi modern
    ornament: 'none',       // 'gunungan' | 'none'
    particles: 14           // jumlah partikel jatuh (0 = mati)
  }, C.theme || {});

  var L = Object.assign({
    coverEyebrow: 'The Wedding of',
    heroEyebrow: 'Kami Akan Menikah',
    openButton: 'Buka Undangan',
    couple: ['Mempelai', 'Bride & Groom'],
    story: ['Kisah Kami', 'Love Story'],
    events: ['Rangkaian Acara', 'Save the Date'],
    gallery: ['Galeri', 'Our Moments'],
    rsvp: ['Doa & Ucapan', 'RSVP'],
    gift: ['Amplop Digital', 'Wedding Gift'],
    closing: ['Terima Kasih', 'Thank You']
  }, C.labels || {});

  /* ---------- Utilitas ---------- */

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function readStore(key, fallback) {
    try {
      var raw = localStorage.getItem(STORE_PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(STORE_PREFIX + key, JSON.stringify(value));
    } catch (e) { /* penyimpanan tidak tersedia: abaikan */ }
  }

  function dateParts(d) {
    var get = function (o) { return d.toLocaleDateString('id-ID', Object.assign({ timeZone: TZ }, o)); };
    return { weekday: get({ weekday: 'long' }), day: get({ day: 'numeric' }), month: get({ month: 'long' }), year: get({ year: 'numeric' }) };
  }

  function fmtDate(d) {
    var p = dateParts(d);
    return p.weekday + ', ' + p.day + ' ' + p.month + ' ' + p.year;
  }

  function fmtShortDate(d) {
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: TZ }).replace(/\//g, ' . ');
  }

  function fmtTime(d) {
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TZ }).replace(':', '.');
  }

  function gcalDate(d) {
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }

  function mapQuery(ev) {
    return ev.mapQuery || (ev.venue + ', ' + ev.address);
  }

  var ICON = {
    calendar: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    map: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    home: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    couple: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    image: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 17l-5-5-9 8"/></svg>',
    message: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H8l-4 4z"/></svg>',
    gift: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13M12 8S10.5 3 8 4s0 4 4 4zm0 0s1.5-5 4-4 0 4-4 4z"/></svg>',
    copy: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>',
    whatsapp: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8.5 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z"/></svg>',
    mail: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    musicOn: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
    musicOff: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/><path d="M3 3l18 18"/></svg>'
  };

  /* ---------- Data turunan ---------- */

  var params = new URLSearchParams(location.search);
  var guest = (params.get('to') || params.get('kepada') || '').trim().slice(0, 80);
  var groomFirst = !!C.groomFirst;
  var first = groomFirst ? C.groom : C.bride;
  var second = groomFirst ? C.bride : C.groom;
  var coupleNames = first.nickname + ' & ' + second.nickname;
  var events = (C.events || []).map(function (ev) {
    return Object.assign({}, ev, { startDate: new Date(ev.start), endDate: new Date(ev.end || ev.start) });
  });
  var mainEvent = events.find(function (e) { return e.main; }) || events[0];
  var mainDate = mainEvent ? mainEvent.startDate : new Date();

  document.title = 'Undangan Pernikahan ' + coupleNames;

  function calLink(ev) {
    var q = new URLSearchParams({
      action: 'TEMPLATE',
      text: ev.name + ' ' + coupleNames,
      dates: gcalDate(ev.startDate) + '/' + gcalDate(ev.endDate),
      details: 'Undangan pernikahan ' + coupleNames + '. ' + location.href.split('?')[0],
      location: ev.venue + ', ' + ev.address
    });
    return 'https://calendar.google.com/calendar/render?' + q.toString();
  }

  /* ---------- Potongan tampilan ---------- */

  function coupleArt() {
    return ILL.couple ? ILL.couple(T.illustration, { hijab: T.hijab }) : '';
  }

  function topOrnament(cls) {
    if (T.ornament === 'gunungan' && ILL.gunungan) {
      return '<div class="top-ornament ' + (cls || '') + '">' + ILL.gunungan() + '</div>';
    }
    return '<div class="top-ornament top-ornament-theme ' + (cls || '') + '" aria-hidden="true"></div>';
  }

  function namesHtml(tag, cls, anim) {
    return '<' + tag + ' class="' + cls + ' script"' + (anim ? ' data-anim="' + anim + '"' : '') + '>' +
      '<span>' + esc(first.nickname) + '</span><span class="amp">&amp;</span><span>' + esc(second.nickname) + '</span></' + tag + '>';
  }

  function heading(pair) {
    return '' +
      '<div class="heading">' +
        '<p class="heading-sub" data-anim="up">' + esc(pair[1]) + '</p>' +
        '<h2 class="heading-title script" data-anim="zoom">' + esc(pair[0]) + '</h2>' +
        '<div class="divider" data-anim="grow" aria-hidden="true"></div>' +
      '</div>';
  }

  function portraitHtml(p, who) {
    if (p.photo) {
      return '<div class="frame"><img src="' + esc(p.photo) + '" alt="' + esc(p.fullName) + '" loading="lazy"></div>';
    }
    return '<div class="frame frame-art">' + (ILL.portrait ? ILL.portrait(T.illustration, who, { hijab: T.hijab }) : '') + '</div>';
  }

  /* ---------- Bagian halaman ---------- */

  function coverHtml() {
    return '' +
      '<section class="cover" id="cover" data-year="' + esc(dateParts(mainDate).year) + '">' +
        '<div class="door door-l" aria-hidden="true"></div>' +
        '<div class="door door-r" aria-hidden="true"></div>' +
        '<div class="cover-inner">' +
          topOrnament('cover-ornament') +
          '<p class="eyebrow">' + esc(L.coverEyebrow) + '</p>' +
          '<div class="cover-art">' + coupleArt() + '</div>' +
          namesHtml('h1', 'cover-names') +
          '<p class="cover-date">' + esc(fmtShortDate(mainDate)) + '</p>' +
          '<div class="guest-box">' +
            '<p class="guest-label">Kepada Yth. Bapak/Ibu/Saudara/i</p>' +
            '<p class="guest-name">' + esc(guest || 'Tamu Undangan') + '</p>' +
          '</div>' +
          '<button type="button" class="btn btn-primary btn-open" id="open-btn">' + ICON.mail + '<span>' + esc(L.openButton) + '</span></button>' +
        '</div>' +
      '</section>';
  }

  function heroHtml() {
    return '' +
      '<section class="section hero" id="home">' +
        '<div class="hero-glow" aria-hidden="true"></div>' +
        topOrnament('hero-ornament') +
        '<p class="eyebrow" data-anim="up">' + esc(L.heroEyebrow) + '</p>' +
        '<div class="arch" data-anim="zoom">' + coupleArt() + '</div>' +
        namesHtml('h2', 'hero-names', 'blur') +
        '<p class="hero-date" data-anim="up">' + esc(fmtDate(mainDate)) + '</p>' +
        '<div class="countdown" id="countdown" aria-live="polite" data-anim="up">' +
          ['Hari', 'Jam', 'Menit', 'Detik'].map(function (label) {
            return '<div class="cd-box"><span class="cd-num" data-unit="' + label + '">00</span><span class="cd-label">' + label + '</span></div>';
          }).join('') +
        '</div>' +
        (mainEvent ? '<a class="btn btn-soft" data-anim="up" href="' + esc(calLink(mainEvent)) + '" target="_blank" rel="noopener">' + ICON.calendar + '<span>Simpan Tanggal</span></a>' : '') +
        '<div class="scroll-hint" aria-hidden="true"><span></span></div>' +
      '</section>';
  }

  function quoteHtml() {
    if (!C.quote) return '';
    return '' +
      '<section class="section quote">' +
        '<div class="quote-card" data-anim="zoom">' +
          '<span class="quote-mark script" aria-hidden="true">“</span>' +
          '<p class="quote-text">' + esc(C.quote.text) + '</p>' +
          (C.quote.translation ? '<p class="quote-translation">' + esc(C.quote.translation) + '</p>' : '') +
          '<cite>' + esc(C.quote.source) + '</cite>' +
        '</div>' +
      '</section>';
  }

  function personHtml(p, who, anim) {
    return '' +
      '<div class="person" data-anim="' + anim + '">' +
        portraitHtml(p, who) +
        '<h3 class="person-nick script">' + esc(p.nickname) + '</h3>' +
        '<p class="person-name">' + esc(p.fullName) + '</p>' +
        '<p class="person-parents">' + esc(p.childOrder) + ' dari<br>' + esc(p.father) + '<br>&amp; ' + esc(p.mother) + '</p>' +
        (p.instagram ? '<a class="chip-link" href="https://instagram.com/' + encodeURIComponent(p.instagram) + '" target="_blank" rel="noopener">@' + esc(p.instagram) + '</a>' : '') +
      '</div>';
  }

  function coupleHtml() {
    var firstWho = groomFirst ? 'groom' : 'bride';
    var secondWho = groomFirst ? 'bride' : 'groom';
    return '' +
      '<section class="section couple" id="mempelai">' +
        heading(L.couple) +
        '<p class="lead" data-anim="up">' + esc(C.greeting || 'Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:') + '</p>' +
        personHtml(first, firstWho, 'left') +
        '<p class="couple-amp script" data-anim="zoom" aria-hidden="true">&amp;</p>' +
        personHtml(second, secondWho, 'right') +
      '</section>';
  }

  function storyHtml() {
    if (!C.story || !C.story.length) return '';
    return '' +
      '<section class="section story">' +
        heading(L.story) +
        '<ol class="timeline">' +
          C.story.map(function (s, i) {
            return '<li data-anim="' + (i % 2 ? 'right' : 'left') + '"><span class="tl-year">' + esc(s.year) + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></li>';
          }).join('') +
        '</ol>' +
      '</section>';
  }

  function eventCard(ev, i) {
    var q = mapQuery(ev);
    var mapLink = ev.mapUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q));
    var time = fmtTime(ev.startDate) + ' – ' + (ev.endText || (fmtTime(ev.endDate) + ' ' + TZ_LABEL));
    var p = dateParts(ev.startDate);
    return '' +
      '<article class="card event-card" data-anim="' + (i % 2 ? 'right' : 'left') + '">' +
        '<h3 class="event-name script">' + esc(ev.name) + '</h3>' +
        '<div class="date-badge">' +
          '<span class="db-side">' + esc(p.weekday) + '</span>' +
          '<span class="db-day">' + esc(p.day) + '</span>' +
          '<span class="db-side">' + esc(p.month) + '<br>' + esc(p.year) + '</span>' +
        '</div>' +
        '<p class="event-meta">' + ICON.clock + '<span>' + esc(time) + '</span></p>' +
        '<p class="event-venue">' + esc(ev.venue) + '</p>' +
        '<p class="event-address">' + esc(ev.address) + '</p>' +
        '<div class="event-actions">' +
          '<a class="btn btn-primary btn-sm" href="' + esc(mapLink) + '" target="_blank" rel="noopener">' + ICON.map + '<span>Lihat Lokasi</span></a>' +
          '<a class="btn btn-soft btn-sm" href="' + esc(calLink(ev)) + '" target="_blank" rel="noopener">' + ICON.calendar + '<span>Kalender</span></a>' +
        '</div>' +
      '</article>';
  }

  function eventsHtml() {
    var mapEv = events.find(function (e) { return e.showMap; }) || events[events.length - 1];
    return '' +
      '<section class="section events" id="acara">' +
        heading(L.events) +
        events.map(eventCard).join('') +
        (mapEv ? '<div class="map-frame" data-anim="zoom"><iframe title="Peta lokasi ' + esc(mapEv.venue) + '" src="https://maps.google.com/maps?q=' + encodeURIComponent(mapQuery(mapEv)) + '&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' : '') +
        (C.notes ? '<p class="notes" data-anim="up">' + esc(C.notes) + '</p>' : '') +
      '</section>';
  }

  function galleryHtml() {
    var items = C.gallery && C.gallery.length ? C.gallery : null;
    var count = items ? items.length : (C.galleryPlaceholders || 6);
    var tiles = [];
    for (var i = 0; i < count; i++) {
      var anim = ['zoom', 'up', 'blur'][i % 3];
      if (items) {
        tiles.push('<figure class="g-tile" data-anim="' + anim + '"><img src="' + esc(items[i].src) + '" alt="' + esc(items[i].alt || 'Foto ' + (i + 1)) + '" loading="lazy"></figure>');
      } else {
        tiles.push('<figure class="g-tile g-placeholder" data-anim="' + anim + '" aria-label="Contoh foto ' + (i + 1) + '">' + ICON.image + '<figcaption>Foto ' + (i + 1) + '</figcaption></figure>');
      }
    }
    return '' +
      '<section class="section gallery" id="galeri">' +
        heading(L.gallery) +
        '<div class="g-grid">' + tiles.join('') + '</div>' +
      '</section>';
  }

  function rsvpHtml() {
    return '' +
      '<section class="section rsvp" id="ucapan">' +
        heading(L.rsvp) +
        '<p class="lead" data-anim="up">Mohon konfirmasi kehadiran dan kirimkan doa terbaik untuk kami.</p>' +
        '<form class="card rsvp-form" id="rsvp-form" novalidate data-anim="up">' +
          '<label>Nama<input name="name" maxlength="60" autocomplete="name" required value="' + esc(guest) + '"></label>' +
          '<fieldset class="attend"><legend>Kehadiran</legend>' +
            '<label class="chip"><input type="radio" name="attending" value="hadir" checked><span>Hadir</span></label>' +
            '<label class="chip"><input type="radio" name="attending" value="ragu"><span>Masih ragu</span></label>' +
            '<label class="chip"><input type="radio" name="attending" value="tidak"><span>Tidak hadir</span></label>' +
          '</fieldset>' +
          '<label class="count-field">Jumlah tamu' +
            '<select name="count">' + [1, 2, 3, 4].map(function (n) { return '<option value="' + n + '">' + n + ' orang</option>'; }).join('') + '</select>' +
          '</label>' +
          '<label>Ucapan &amp; doa<textarea name="message" rows="4" maxlength="500" placeholder="Tulis ucapan untuk kedua mempelai"></textarea></label>' +
          '<button type="submit" class="btn btn-primary">Kirim Ucapan</button>' +
          '<div class="rsvp-thanks" id="rsvp-thanks" hidden></div>' +
        '</form>' +
        '<div class="wish-stats" id="wish-stats" data-anim="up"></div>' +
        '<ul class="wish-list" id="wish-list" data-anim="up"></ul>' +
      '</section>';
  }

  function giftHtml() {
    if (!C.gifts || !C.gifts.length) return '';
    return '' +
      '<section class="section gift" id="hadiah">' +
        heading(L.gift) +
        '<p class="lead" data-anim="up">Doa restu Anda adalah karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih, dapat melalui:</p>' +
        C.gifts.map(function (g, i) {
          return '' +
            '<div class="gift-card" data-anim="' + (i % 2 ? 'right' : 'left') + '">' +
              '<div class="gift-chip" aria-hidden="true"></div>' +
              '<p class="gift-bank">' + esc(g.bank) + '</p>' +
              '<p class="gift-number">' + esc(g.number) + '</p>' +
              '<p class="gift-holder">a.n. ' + esc(g.holder) + '</p>' +
              '<button type="button" class="btn btn-soft btn-sm" data-copy="' + esc(g.number) + '">' + ICON.copy + '<span>Salin</span></button>' +
            '</div>';
        }).join('') +
        (C.giftAddress ? '<div class="card gift-address" data-anim="up"><p class="gift-bank">Kirim Kado</p><p>' + esc(C.giftAddress) + '</p><button type="button" class="btn btn-soft btn-sm" data-copy="' + esc(C.giftAddress) + '">' + ICON.copy + '<span>Salin alamat</span></button></div>' : '') +
      '</section>';
  }

  function closingHtml() {
    return '' +
      '<section class="section closing">' +
        heading(L.closing) +
        '<p class="lead" data-anim="up">' + esc(C.closing || 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.') + '</p>' +
        '<div class="arch arch-sm" data-anim="zoom">' + coupleArt() + '</div>' +
        '<p class="eyebrow" data-anim="up">Kami yang berbahagia</p>' +
        namesHtml('p', 'closing-names', 'blur') +
      '</section>' +
      '<footer class="site-footer">Dibuat dengan ♥ oleh ' + esc(C.brand || 'Undangan Digital') + '</footer>';
  }

  function navHtml() {
    var items = [
      ['home', 'Beranda', ICON.home],
      ['mempelai', 'Mempelai', ICON.couple],
      ['acara', 'Acara', ICON.calendar],
      ['galeri', 'Galeri', ICON.image],
      ['ucapan', 'Ucapan', ICON.message]
    ];
    if (C.gifts && C.gifts.length) items.push(['hadiah', 'Hadiah', ICON.gift]);
    return '<nav class="bottom-nav" id="bottom-nav" aria-label="Navigasi undangan" hidden>' +
      items.map(function (it) {
        return '<a href="#' + it[0] + '" data-target="' + it[0] + '">' + it[2] + '<span>' + it[1] + '</span></a>';
      }).join('') +
      '</nav>';
  }

  document.body.classList.add('theme-' + T.illustration);
  app.innerHTML = coverHtml() +
    '<main class="wrap" id="main">' +
      heroHtml() + quoteHtml() + coupleHtml() + storyHtml() + eventsHtml() +
      galleryHtml() + rsvpHtml() + giftHtml() + closingHtml() +
    '</main>' +
    navHtml() +
    (C.music ? '<button type="button" class="music-btn" id="music-btn" aria-label="Matikan musik" hidden>' + ICON.musicOn + '</button>' : '') +
    '<div class="toast" id="toast" role="status" aria-live="polite"></div>';

  /* ---------- Partikel jatuh (bunga/kelopak/kilau) ---------- */

  if (T.particles && !REDUCED) {
    var field = document.createElement('div');
    field.className = 'particles';
    field.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < T.particles; i++) {
      var s = document.createElement('span');
      var size = 10 + Math.random() * 14;
      s.className = 'particle';
      s.style.left = (Math.random() * 100).toFixed(1) + '%';
      s.style.width = s.style.height = size.toFixed(0) + 'px';
      s.style.setProperty('--drift', ((Math.random() * 80) - 40).toFixed(0) + 'px');
      s.style.animationDuration = (9 + Math.random() * 9).toFixed(1) + 's';
      s.style.animationDelay = (-Math.random() * 18).toFixed(1) + 's';
      s.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
      field.appendChild(s);
    }
    document.body.appendChild(field);
  }

  /* ---------- Interaksi ---------- */

  var toastEl = document.getElementById('toast');
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  var audio = C.music ? new Audio(C.music) : null;
  var musicBtn = document.getElementById('music-btn');
  if (audio) audio.loop = true;

  function setMusic(playing) {
    if (!audio) return;
    if (playing) {
      audio.play().catch(function () { setMusic(false); });
    } else {
      audio.pause();
    }
    musicBtn.innerHTML = playing ? ICON.musicOn : ICON.musicOff;
    musicBtn.setAttribute('aria-label', playing ? 'Matikan musik' : 'Putar musik');
    musicBtn.classList.toggle('playing', playing);
  }

  // Buka undangan: isi sampul memudar, lalu pintu terbuka
  document.getElementById('open-btn').addEventListener('click', function () {
    var cover = document.getElementById('cover');
    window.scrollTo(0, 0);
    cover.classList.add('is-open');
    document.body.classList.remove('locked');
    document.body.classList.add('opened');
    document.getElementById('bottom-nav').hidden = false;
    if (musicBtn) { musicBtn.hidden = false; setMusic(true); }
    setTimeout(function () { cover.hidden = true; }, REDUCED ? 300 : 2000);
  });

  if (musicBtn) {
    musicBtn.addEventListener('click', function () { setMusic(audio.paused); });
  }

  // Hitung mundur
  var cdEl = document.getElementById('countdown');
  function tick() {
    var diff = mainDate.getTime() - Date.now();
    if (diff <= 0) {
      cdEl.innerHTML = '<p class="cd-done">Acara telah berlangsung. Terima kasih atas doa restunya.</p>';
      return false;
    }
    var parts = {
      Hari: Math.floor(diff / 864e5),
      Jam: Math.floor(diff / 36e5) % 24,
      Menit: Math.floor(diff / 6e4) % 60,
      Detik: Math.floor(diff / 1e3) % 60
    };
    Object.keys(parts).forEach(function (k) {
      cdEl.querySelector('[data-unit="' + k + '"]').textContent = String(parts[k]).padStart(2, '0');
    });
    return true;
  }
  if (tick()) {
    var cdTimer = setInterval(function () { if (!tick()) clearInterval(cdTimer); }, 1000);
  }

  // Salin nomor rekening / alamat
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }
  app.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    copyText(btn.getAttribute('data-copy'))
      .then(function () { toast('Berhasil disalin'); })
      .catch(function () { toast('Gagal menyalin, silakan salin manual'); });
  });

  // RSVP & ucapan
  var ATTEND_LABEL = { hadir: 'Hadir', ragu: 'Masih ragu', tidak: 'Tidak hadir' };
  var form = document.getElementById('rsvp-form');
  var countField = form.querySelector('.count-field');
  var thanks = document.getElementById('rsvp-thanks');
  var listEl = document.getElementById('wish-list');
  var statsEl = document.getElementById('wish-stats');

  function allWishes() {
    return readStore('wishes', []).concat(C.wishes || []);
  }

  function renderWishes() {
    var list = allWishes();
    var hadir = list.filter(function (w) { return w.attending === 'hadir'; }).length;
    statsEl.innerHTML = '<span><b>' + list.length + '</b> ucapan</span><span><b>' + hadir + '</b> akan hadir</span>';
    listEl.innerHTML = list.map(function (w) {
      return '' +
        '<li class="wish">' +
          '<span class="wish-avatar" aria-hidden="true">' + esc(String(w.name || '?').trim().charAt(0).toUpperCase()) + '</span>' +
          '<div class="wish-body">' +
            '<div class="wish-head"><span class="wish-name">' + esc(w.name) + '</span>' +
            (w.attending ? '<span class="badge badge-' + esc(w.attending) + '">' + esc(ATTEND_LABEL[w.attending] || '') + '</span>' : '') +
            '</div>' +
            (w.message ? '<p>' + esc(w.message) + '</p>' : '') +
          '</div>' +
        '</li>';
    }).join('');
  }

  form.addEventListener('change', function (e) {
    if (e.target.name === 'attending') countField.hidden = e.target.value === 'tidak';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var entry = {
      name: String(fd.get('name') || '').trim().slice(0, 60),
      attending: fd.get('attending'),
      count: fd.get('attending') === 'tidak' ? 0 : Number(fd.get('count')) || 1,
      message: String(fd.get('message') || '').trim().slice(0, 500),
      at: Date.now()
    };
    if (!entry.name) {
      toast('Mohon isi nama Anda');
      form.elements.name.focus();
      return;
    }
    var saved = readStore('wishes', []);
    saved.unshift(entry);
    writeStore('wishes', saved);
    renderWishes();

    var msg = 'Halo, saya ' + entry.name + '. Konfirmasi kehadiran di pernikahan ' + coupleNames + ': ' +
      ATTEND_LABEL[entry.attending] + (entry.count ? ' (' + entry.count + ' orang)' : '') + '.' +
      (entry.message ? '\n\nUcapan: ' + entry.message : '');
    thanks.hidden = false;
    thanks.innerHTML = '<p>Terima kasih, ' + esc(entry.name) + '! Ucapan Anda sudah terkirim. 💌</p>' +
      (C.rsvpWhatsApp ? '<a class="btn btn-soft btn-sm" target="_blank" rel="noopener" href="https://wa.me/' + encodeURIComponent(C.rsvpWhatsApp) + '?text=' + encodeURIComponent(msg) + '">' + ICON.whatsapp + '<span>Kirim juga via WhatsApp</span></a>' : '');
    form.elements.message.value = '';
  });

  renderWishes();

  // Animasi muncul saat di-scroll (arah bervariasi)
  var animEls = document.querySelectorAll('#main [data-anim]');
  if ('IntersectionObserver' in window && !REDUCED) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.12 });
    animEls.forEach(function (el) { io.observe(el); });
  } else {
    animEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Penanda menu aktif di navigasi bawah
  var navLinks = document.querySelectorAll('.bottom-nav a');
  if ('IntersectionObserver' in window) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-target') === en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) {
      var t = document.getElementById(a.getAttribute('data-target'));
      if (t) navIo.observe(t);
    });
  }
})();
