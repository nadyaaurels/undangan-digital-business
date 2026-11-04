/*
 * Mesin undangan digital (statis).
 * Setiap template cukup mendefinisikan `window.INVITATION` (data) dan tema CSS,
 * lalu memuat file ini. Semua bagian halaman dirender dari data tersebut.
 */
(function () {
  'use strict';

  var C = window.INVITATION;
  var app = document.getElementById('app');
  if (!C || !app) return;

  var TZ = C.timeZone || 'Asia/Jakarta';
  var TZ_LABEL = C.timeZoneLabel || 'WIB';
  var STORE_PREFIX = 'undangan:' + (C.slug || location.pathname) + ':';

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

  function fmtDate(d) {
    return d.toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ
    });
  }

  function fmtShortDate(d) {
    return d.toLocaleDateString('id-ID', {
      day: '2-digit', month: '2-digit', year: 'numeric', timeZone: TZ
    }).replace(/\//g, ' . ');
  }

  function fmtTime(d) {
    return d.toLocaleTimeString('id-ID', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TZ
    }).replace(':', '.');
  }

  function gcalDate(d) {
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }

  function initials(name) {
    return String(name || '?').trim().charAt(0).toUpperCase();
  }

  function mapQuery(ev) {
    return ev.mapQuery || (ev.venue + ', ' + ev.address);
  }

  var ICON = {
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    couple: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    image: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 17l-5-5-9 8"/></svg>',
    message: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H8l-4 4z"/></svg>',
    gift: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13M12 8S10.5 3 8 4s0 4 4 4zm0 0s1.5-5 4-4 0 4-4 4z"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8.5 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z"/></svg>',
    musicOn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
    musicOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/><path d="M3 3l18 18"/></svg>'
  };

  /* ---------- Data turunan ---------- */

  var params = new URLSearchParams(location.search);
  var guest = (params.get('to') || params.get('kepada') || '').trim().slice(0, 80);
  var first = C.groomFirst ? C.groom : C.bride;
  var second = C.groomFirst ? C.bride : C.groom;
  var coupleNames = first.nickname + ' & ' + second.nickname;
  var events = (C.events || []).map(function (ev) {
    return Object.assign({}, ev, {
      startDate: new Date(ev.start),
      endDate: new Date(ev.end || ev.start)
    });
  });
  var mainDate = events.length ? events[0].startDate : new Date();

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

  /* ---------- Render bagian ---------- */

  function ornament() {
    return '<div class="ornament" aria-hidden="true"></div>';
  }

  function photoHtml(p) {
    if (p.photo) {
      return '<div class="photo"><img src="' + esc(p.photo) + '" alt="' + esc(p.fullName) + '" loading="lazy"></div>';
    }
    return '<div class="photo photo-placeholder" aria-hidden="true"><span>' + esc(initials(p.nickname)) + '</span></div>';
  }

  function coverHtml() {
    return '' +
      '<section class="cover" id="cover" data-year="' + esc(mainDate.toLocaleDateString('id-ID', { year: 'numeric', timeZone: TZ })) + '">' +
        '<div class="cover-inner">' +
          '<p class="eyebrow">The Wedding of</p>' +
          '<h1 class="cover-names script">' + esc(first.nickname) + '<span class="amp">&amp;</span>' + esc(second.nickname) + '</h1>' +
          '<p class="cover-date">' + esc(fmtShortDate(mainDate)) + '</p>' +
          '<div class="guest-box">' +
            '<p class="guest-label">Kepada Yth.<br>Bapak/Ibu/Saudara/i</p>' +
            '<p class="guest-name">' + esc(guest || 'Tamu Undangan') + '</p>' +
            '<p class="guest-note">Mohon maaf apabila ada kesalahan penulisan nama dan gelar</p>' +
          '</div>' +
          '<button type="button" class="btn btn-primary" id="open-btn">' + ICON.message + '<span>Buka Undangan</span></button>' +
        '</div>' +
      '</section>';
  }

  function heroHtml() {
    return '' +
      '<section class="section hero" id="home">' +
        '<p class="eyebrow reveal">Kami Akan Menikah</p>' +
        '<h2 class="hero-names script reveal">' + esc(first.nickname) + '<span class="amp">&amp;</span>' + esc(second.nickname) + '</h2>' +
        ornament() +
        '<p class="hero-date reveal">' + esc(fmtDate(mainDate)) + '</p>' +
        '<div class="countdown reveal" id="countdown" aria-live="polite">' +
          ['Hari', 'Jam', 'Menit', 'Detik'].map(function (label) {
            return '<div class="cd-box"><span class="cd-num" data-unit="' + label + '">00</span><span class="cd-label">' + label + '</span></div>';
          }).join('') +
        '</div>' +
        (events.length ? '<a class="btn btn-outline reveal" href="' + esc(calLink(events[0])) + '" target="_blank" rel="noopener">' + ICON.calendar + '<span>Simpan Tanggal</span></a>' : '') +
      '</section>';
  }

  function quoteHtml() {
    if (!C.quote) return '';
    return '' +
      '<section class="section quote">' +
        '<blockquote class="reveal">' +
          '<p class="quote-text">“' + esc(C.quote.text) + '”</p>' +
          '<cite>' + esc(C.quote.source) + '</cite>' +
        '</blockquote>' +
      '</section>';
  }

  function personHtml(p) {
    return '' +
      '<div class="person reveal">' +
        photoHtml(p) +
        '<h3 class="person-nick script">' + esc(p.nickname) + '</h3>' +
        '<p class="person-name">' + esc(p.fullName) + '</p>' +
        '<p class="person-parents">' + esc(p.childOrder) + ' dari<br>' + esc(p.father) + '<br>&amp; ' + esc(p.mother) + '</p>' +
        (p.instagram ? '<a class="ig-link" href="https://instagram.com/' + encodeURIComponent(p.instagram) + '" target="_blank" rel="noopener">@' + esc(p.instagram) + '</a>' : '') +
      '</div>';
  }

  function coupleHtml() {
    return '' +
      '<section class="section couple" id="mempelai">' +
        '<p class="eyebrow reveal">Bismillahirrahmanirrahim</p>' +
        '<h2 class="section-title reveal">Mempelai</h2>' +
        '<p class="lead reveal">' + esc(C.greeting || 'Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:') + '</p>' +
        personHtml(first) +
        '<p class="couple-amp script reveal" aria-hidden="true">&amp;</p>' +
        personHtml(second) +
      '</section>';
  }

  function storyHtml() {
    if (!C.story || !C.story.length) return '';
    return '' +
      '<section class="section story">' +
        '<h2 class="section-title reveal">Kisah Kami</h2>' +
        ornament() +
        '<ol class="timeline">' +
          C.story.map(function (s) {
            return '<li class="reveal"><span class="tl-year">' + esc(s.year) + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></li>';
          }).join('') +
        '</ol>' +
      '</section>';
  }

  function eventCard(ev) {
    var q = mapQuery(ev);
    var mapLink = ev.mapUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q));
    var time = fmtTime(ev.startDate) + ' – ' + (ev.endText || (fmtTime(ev.endDate) + ' ' + TZ_LABEL));
    return '' +
      '<article class="card event-card reveal">' +
        '<h3 class="event-name">' + esc(ev.name) + '</h3>' +
        '<p class="event-meta">' + ICON.calendar + '<span>' + esc(fmtDate(ev.startDate)) + '</span></p>' +
        '<p class="event-meta">' + ICON.clock + '<span>' + esc(time) + '</span></p>' +
        '<p class="event-venue">' + esc(ev.venue) + '</p>' +
        '<p class="event-address">' + esc(ev.address) + '</p>' +
        '<div class="event-actions">' +
          '<a class="btn btn-primary" href="' + esc(mapLink) + '" target="_blank" rel="noopener">' + ICON.map + '<span>Petunjuk Lokasi</span></a>' +
          '<a class="btn btn-outline" href="' + esc(calLink(ev)) + '" target="_blank" rel="noopener">' + ICON.calendar + '<span>Kalender</span></a>' +
        '</div>' +
      '</article>';
  }

  function eventsHtml() {
    var mapEv = events.find(function (e) { return e.showMap; }) || events[events.length - 1];
    return '' +
      '<section class="section events" id="acara">' +
        '<h2 class="section-title reveal">Rangkaian Acara</h2>' +
        ornament() +
        events.map(eventCard).join('') +
        (mapEv ? '<div class="map-frame reveal"><iframe title="Peta lokasi ' + esc(mapEv.venue) + '" src="https://maps.google.com/maps?q=' + encodeURIComponent(mapQuery(mapEv)) + '&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' : '') +
        (C.notes ? '<p class="notes reveal">' + esc(C.notes) + '</p>' : '') +
      '</section>';
  }

  function galleryHtml() {
    var items = C.gallery && C.gallery.length ? C.gallery : null;
    var count = items ? items.length : (C.galleryPlaceholders || 6);
    var tiles = [];
    for (var i = 0; i < count; i++) {
      if (items) {
        tiles.push('<figure class="g-tile"><img src="' + esc(items[i].src) + '" alt="' + esc(items[i].alt || 'Foto ' + (i + 1)) + '" loading="lazy"></figure>');
      } else {
        tiles.push('<figure class="g-tile g-placeholder" aria-label="Contoh foto ' + (i + 1) + '">' + ICON.image + '<figcaption>Foto ' + (i + 1) + '</figcaption></figure>');
      }
    }
    return '' +
      '<section class="section gallery" id="galeri">' +
        '<h2 class="section-title reveal">Galeri</h2>' +
        ornament() +
        '<div class="g-grid reveal">' + tiles.join('') + '</div>' +
      '</section>';
  }

  function rsvpHtml() {
    return '' +
      '<section class="section rsvp" id="ucapan">' +
        '<h2 class="section-title reveal">RSVP &amp; Ucapan</h2>' +
        ornament() +
        '<p class="lead reveal">Mohon konfirmasi kehadiran Anda dan kirimkan doa terbaik untuk kami.</p>' +
        '<form class="card rsvp-form reveal" id="rsvp-form" novalidate>' +
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
          '<button type="submit" class="btn btn-primary">Kirim</button>' +
          '<div class="rsvp-thanks" id="rsvp-thanks" hidden></div>' +
        '</form>' +
        '<div class="wish-stats reveal" id="wish-stats"></div>' +
        '<ul class="wish-list reveal" id="wish-list"></ul>' +
      '</section>';
  }

  function giftHtml() {
    if (!C.gifts || !C.gifts.length) return '';
    return '' +
      '<section class="section gift" id="hadiah">' +
        '<h2 class="section-title reveal">Amplop Digital</h2>' +
        ornament() +
        '<p class="lead reveal">Doa restu Anda adalah karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih, dapat melalui:</p>' +
        C.gifts.map(function (g) {
          return '' +
            '<div class="card gift-card reveal">' +
              '<p class="gift-bank">' + esc(g.bank) + '</p>' +
              '<p class="gift-number">' + esc(g.number) + '</p>' +
              '<p class="gift-holder">a.n. ' + esc(g.holder) + '</p>' +
              '<button type="button" class="btn btn-outline btn-sm" data-copy="' + esc(g.number) + '">' + ICON.copy + '<span>Salin nomor</span></button>' +
            '</div>';
        }).join('') +
        (C.giftAddress ? '<div class="card gift-card reveal"><p class="gift-bank">Kirim Kado</p><p class="gift-holder">' + esc(C.giftAddress) + '</p><button type="button" class="btn btn-outline btn-sm" data-copy="' + esc(C.giftAddress) + '">' + ICON.copy + '<span>Salin alamat</span></button></div>' : '') +
      '</section>';
  }

  function closingHtml() {
    return '' +
      '<section class="section closing">' +
        '<p class="lead reveal">' + esc(C.closing || 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.') + '</p>' +
        '<p class="eyebrow reveal">Kami yang berbahagia</p>' +
        '<h2 class="closing-names script reveal">' + esc(first.nickname) + '<span class="amp">&amp;</span>' + esc(second.nickname) + '</h2>' +
        ornament() +
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
        return '<a href="#' + it[0] + '" aria-label="' + it[1] + '">' + it[2] + '<span>' + it[1] + '</span></a>';
      }).join('') +
      '</nav>';
  }

  app.innerHTML = coverHtml() +
    '<main class="wrap" id="main">' +
      heroHtml() + quoteHtml() + coupleHtml() + storyHtml() + eventsHtml() +
      galleryHtml() + rsvpHtml() + giftHtml() + closingHtml() +
    '</main>' +
    navHtml() +
    (C.music ? '<button type="button" class="music-btn" id="music-btn" aria-label="Matikan musik" hidden>' + ICON.musicOn + '</button>' : '') +
    '<div class="toast" id="toast" role="status" aria-live="polite"></div>';

  /* ---------- Interaksi ---------- */

  var toastEl = document.getElementById('toast');
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  // Buka undangan
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

  document.getElementById('open-btn').addEventListener('click', function () {
    var cover = document.getElementById('cover');
    cover.classList.add('is-open');
    document.body.classList.remove('locked');
    document.getElementById('bottom-nav').hidden = false;
    if (musicBtn) { musicBtn.hidden = false; setMusic(true); }
    window.scrollTo(0, 0);
    setTimeout(function () { cover.hidden = true; }, 1000);
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
          '<div class="wish-head"><span class="wish-name">' + esc(w.name) + '</span>' +
          (w.attending ? '<span class="badge badge-' + esc(w.attending) + '">' + esc(ATTEND_LABEL[w.attending] || '') + '</span>' : '') +
          '</div>' +
          (w.message ? '<p>' + esc(w.message) + '</p>' : '') +
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
    thanks.innerHTML = '<p>Terima kasih, ' + esc(entry.name) + '! Konfirmasi Anda sudah kami terima.</p>' +
      (C.rsvpWhatsApp ? '<a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="https://wa.me/' + encodeURIComponent(C.rsvpWhatsApp) + '?text=' + encodeURIComponent(msg) + '">' + ICON.whatsapp + '<span>Kirim juga via WhatsApp</span></a>' : '');
    form.elements.message.value = '';
  });

  renderWishes();

  // Animasi muncul saat di-scroll
  var revealEls = document.querySelectorAll('.reveal, .ornament');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
