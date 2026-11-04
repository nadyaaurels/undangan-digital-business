/*
 * Ilustrasi SVG (pasangan pengantin & ornamen).
 * Warna diatur lewat CSS variable di tema (--skin, --beskap, --gown, dst.)
 * sehingga satu ilustrasi bisa dipakai banyak tema.
 */
(function () {
  'use strict';

  var counter = 0;
  function uid() { counter += 1; return 'il' + counter; }

  // Deretan manik (untai melati / kalung) di sepanjang kurva kuadratik
  function beads(p0, p1, p2, n, r, cls) {
    var out = '';
    for (var i = 0; i <= n; i++) {
      var t = i / n, a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
      var x = a * p0[0] + b * p1[0] + c * p2[0];
      var y = a * p0[1] + b * p1[1] + c * p2[1];
      out += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r + '" class="' + cls + '"/>';
    }
    return out;
  }

  function face(cx, cy) {
    return '' +
      '<g class="eyes">' +
        '<ellipse cx="' + (cx - 13) + '" cy="' + (cy + 2) + '" rx="3.6" ry="4.6" class="c-eye"/>' +
        '<ellipse cx="' + (cx + 13) + '" cy="' + (cy + 2) + '" rx="3.6" ry="4.6" class="c-eye"/>' +
        '<circle cx="' + (cx - 12) + '" cy="' + cy + '" r="1.3" fill="#fff"/>' +
        '<circle cx="' + (cx + 14) + '" cy="' + cy + '" r="1.3" fill="#fff"/>' +
      '</g>' +
      '<ellipse cx="' + (cx - 21) + '" cy="' + (cy + 12) + '" rx="6" ry="3.4" class="c-blush"/>' +
      '<ellipse cx="' + (cx + 21) + '" cy="' + (cy + 12) + '" rx="6" ry="3.4" class="c-blush"/>' +
      '<path d="M' + (cx - 6) + ' ' + (cy + 14) + ' Q' + cx + ' ' + (cy + 21) + ' ' + (cx + 6) + ' ' + (cy + 14) + '" class="s-mouth"/>';
  }

  function defs(id) {
    return '' +
      '<defs>' +
        // Batik parang (jarik pria)
        '<pattern id="parang-' + id + '" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
          '<rect width="14" height="14" class="c-jarik"/>' +
          '<path d="M0 7 q3.5 -5 7 0 t7 0" class="s-jarik-line"/>' +
          '<circle cx="3.5" cy="11.5" r="1" class="c-jarik-dot"/>' +
        '</pattern>' +
        // Batik kawung (jarik wanita)
        '<pattern id="kawung-' + id + '" width="16" height="16" patternUnits="userSpaceOnUse">' +
          '<rect width="16" height="16" class="c-jarik"/>' +
          '<ellipse cx="8" cy="3.6" rx="2.6" ry="3.4" class="c-jarik-dot"/>' +
          '<ellipse cx="8" cy="12.4" rx="2.6" ry="3.4" class="c-jarik-dot"/>' +
          '<ellipse cx="3.6" cy="8" rx="3.4" ry="2.6" class="c-jarik-dot"/>' +
          '<ellipse cx="12.4" cy="8" rx="3.4" ry="2.6" class="c-jarik-dot"/>' +
          '<circle cx="8" cy="8" r="1" class="c-jarik"/>' +
        '</pattern>' +
      '</defs>';
  }

  /* ---------------- Adat Jawa ---------------- */

  function groomJawa(id) {
    return '' +
      '<g class="fig fig-groom">' +
        '<path d="M66 246 L154 246 L150 318 L70 318 Z" fill="url(#parang-' + id + ')"/>' +
        '<path d="M100 248 L116 248 L112 318 L94 318 Z" class="c-jarik-2"/>' +
        '<path d="M104 252 L99 316 M109 252 L104 316 M114 252 L109 316" class="s-fold"/>' +
        '<ellipse cx="90" cy="321" rx="13" ry="5" class="c-shoe"/>' +
        '<ellipse cx="130" cy="321" rx="13" ry="5" class="c-shoe"/>' +
        '<path d="M72 172 Q58 206 62 236" class="s-arm s-beskap"/>' +
        '<path d="M148 172 Q162 204 160 228" class="s-arm s-beskap"/>' +
        '<path d="M66 190 C66 164 82 152 110 152 C138 152 154 164 154 190 L156 250 L64 250 Z" class="c-beskap"/>' +
        '<path d="M110 157 L134 248" class="s-gold-thin"/>' +
        '<circle cx="117" cy="182" r="2.4" class="c-gold"/>' +
        '<circle cx="122" cy="202" r="2.4" class="c-gold"/>' +
        '<circle cx="127" cy="222" r="2.4" class="c-gold"/>' +
        '<rect x="64" y="237" width="92" height="12" rx="2" class="c-belt"/>' +
        '<rect x="102" y="235" width="16" height="16" rx="3" class="c-gold"/>' +
        beads([90, 156], [110, 236], [130, 156], 18, 2.7, 'c-melati') +
        '<circle cx="62" cy="240" r="7.5" class="c-skin"/>' +
        '<circle cx="160" cy="232" r="7.5" class="c-skin"/>' +
        '<rect x="101" y="134" width="18" height="22" rx="6" class="c-skin-shade"/>' +
        '<rect x="97" y="147" width="26" height="9" rx="2" class="c-beskap s-gold-thin"/>' +
        '<circle cx="71" cy="112" r="7" class="c-skin"/>' +
        '<circle cx="149" cy="112" r="7" class="c-skin"/>' +
        '<circle cx="110" cy="106" r="40" class="c-skin"/>' +
        face(110, 110) +
        '<path d="M68 106 C66 50 154 50 152 106 C140 94 80 94 68 106 Z" class="c-blangkon"/>' +
        '<path d="M72 96 C92 86 128 86 148 96" class="s-gold"/>' +
        '<path d="M84 78 l4 7 M98 71 l3 8 M122 71 l-3 8 M136 78 l-4 7" class="s-gold-thin"/>' +
        '<circle cx="110" cy="72" r="3" class="c-gold"/>' +
      '</g>';
  }

  function brideJawa(id) {
    var mentul = '';
    [[184, 42], [196, 34], [210, 30], [224, 34], [236, 42]].forEach(function (p, i) {
      mentul += '<g class="m m' + i + '"><path d="M210 66 L' + p[0] + ' ' + p[1] + '" class="s-gold-thin"/>' +
        '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4.4" class="c-gold"/>' +
        '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.7" class="c-melati"/></g>';
    });
    return '' +
      '<g class="fig fig-bride">' +
        '<path d="M170 246 L250 246 L262 318 L158 318 Z" fill="url(#kawung-' + id + ')"/>' +
        '<path d="M200 248 L216 248 L220 318 L202 318 Z" class="c-jarik-2"/>' +
        '<path d="M205 252 L208 316 M210 252 L213 316 M215 252 L218 316" class="s-fold"/>' +
        '<ellipse cx="190" cy="321" rx="12" ry="5" class="c-shoe"/>' +
        '<ellipse cx="232" cy="321" rx="12" ry="5" class="c-shoe"/>' +
        '<path d="M176 172 Q164 204 166 228" class="s-arm s-kebaya"/>' +
        '<path d="M244 172 Q258 206 254 234" class="s-arm s-kebaya"/>' +
        '<path d="M172 192 C172 164 186 152 210 152 C234 152 248 164 248 192 L252 252 L168 252 Z" class="c-kebaya"/>' +
        '<path d="M197 153 L210 186 L223 153 Z" class="c-kemben"/>' +
        '<path d="M195 153 L210 190 L225 153" class="s-gold"/>' +
        '<path d="M169 249 L251 249" class="s-gold"/>' +
        '<circle cx="186" cy="204" r="2.2" class="c-gold"/><circle cx="234" cy="204" r="2.2" class="c-gold"/>' +
        '<circle cx="183" cy="226" r="2.2" class="c-gold"/><circle cx="237" cy="226" r="2.2" class="c-gold"/>' +
        '<circle cx="166" cy="228" r="8.5" class="c-gold"/>' +
        '<circle cx="254" cy="234" r="8.5" class="c-gold"/>' +
        '<circle cx="166" cy="232" r="7.5" class="c-skin"/>' +
        '<circle cx="254" cy="238" r="7.5" class="c-skin"/>' +
        '<rect x="202" y="134" width="16" height="22" rx="6" class="c-skin-shade"/>' +
        '<path d="M199 156 Q210 173 221 156" class="s-gold"/>' +
        '<circle cx="210" cy="166" r="3.2" class="c-gold"/>' +
        '<g class="mentul">' + mentul + '</g>' +
        '<ellipse cx="210" cy="72" rx="32" ry="15" class="c-hair"/>' +
        '<circle cx="210" cy="110" r="37" class="c-skin"/>' +
        face(210, 114) +
        '<path d="M173 118 C170 56 250 56 247 118 Q245 100 240 94 Q236 104 228 92 Q210 116 192 92 Q184 104 180 94 Q175 100 173 118 Z" class="c-hair s-paes"/>' +
        '<circle cx="232" cy="76" r="3" class="c-gold"/><circle cx="188" cy="76" r="3" class="c-gold"/>' +
        '<circle cx="174" cy="126" r="3" class="c-gold"/><circle cx="246" cy="126" r="3" class="c-gold"/>' +
        '<g class="roncean">' +
          beads([246, 92], [258, 150], [262, 214], 22, 3.2, 'c-melati s-melati') +
          beads([241, 98], [250, 150], [252, 196], 16, 2.6, 'c-melati s-melati') +
          '<circle cx="262" cy="219" r="3.4" class="c-leaf"/>' +
        '</g>' +
      '</g>';
  }

  /* ---------------- Modern (jas & gaun / hijab) ---------------- */

  function groomModern() {
    return '' +
      '<g class="fig fig-groom">' +
        '<path d="M68 246 L152 246 L150 316 L114 316 L110 262 L106 316 L70 316 Z" class="c-suit-dark"/>' +
        '<ellipse cx="90" cy="319" rx="13" ry="5" class="c-shoe"/>' +
        '<ellipse cx="130" cy="319" rx="13" ry="5" class="c-shoe"/>' +
        '<path d="M72 172 Q58 206 62 236" class="s-arm s-suit"/>' +
        '<path d="M148 172 Q162 204 160 228" class="s-arm s-suit"/>' +
        '<path d="M66 190 C66 164 82 152 110 152 C138 152 154 164 154 190 L156 250 L64 250 Z" class="c-suit"/>' +
        '<path d="M97 153 L110 198 L123 153 Z" class="c-shirt"/>' +
        '<path d="M97 153 L110 198 L88 172 Z" class="c-suit-dark"/>' +
        '<path d="M123 153 L110 198 L132 172 Z" class="c-suit-dark"/>' +
        '<circle cx="110" cy="214" r="2.6" class="c-suit-dark"/>' +
        '<circle cx="110" cy="230" r="2.6" class="c-suit-dark"/>' +
        '<path d="M100 156 L110 161 L100 166 Z M120 156 L110 161 L120 166 Z" class="c-tie"/>' +
        '<circle cx="110" cy="161" r="2.4" class="c-tie"/>' +
        '<ellipse cx="128" cy="182" rx="5" ry="2.4" transform="rotate(-30 128 182)" class="c-leaf"/>' +
        '<circle cx="133" cy="178" r="4.6" class="c-bouquet-1"/>' +
        '<circle cx="62" cy="240" r="7.5" class="c-skin"/>' +
        '<circle cx="160" cy="232" r="7.5" class="c-skin"/>' +
        '<rect x="101" y="134" width="18" height="20" rx="6" class="c-skin-shade"/>' +
        '<circle cx="71" cy="112" r="7" class="c-skin"/>' +
        '<circle cx="149" cy="112" r="7" class="c-skin"/>' +
        '<circle cx="110" cy="106" r="40" class="c-skin"/>' +
        face(110, 112) +
        '<path d="M70 104 C64 52 156 52 150 104 C146 86 128 78 108 84 C96 78 80 86 70 104 Z" class="c-hair"/>' +
        '<path d="M94 72 C104 56 132 58 140 76 C126 66 110 66 94 72 Z" class="c-hair"/>' +
      '</g>';
  }

  function brideModern(hijab) {
    var head;
    if (hijab) {
      head = '' +
        '<path d="M168 112 C166 54 254 54 252 112 C254 144 238 162 210 164 C182 162 166 144 168 112 Z" class="c-hijab"/>' +
        '<ellipse cx="210" cy="115" rx="27" ry="30" class="c-skin"/>' +
        face(210, 116) +
        '<path d="M182 108 C185 80 235 80 238 108 C226 96 194 96 182 108 Z" class="c-hijab s-hijab"/>' +
        '<path d="M176 150 Q210 180 244 150 L248 180 Q210 200 172 180 Z" class="c-hijab s-hijab"/>' +
        '<path d="M192 86 Q210 74 228 86" class="s-gold"/>' +
        '<circle cx="210" cy="78" r="3.4" class="c-gold"/><circle cx="199" cy="82" r="2.2" class="c-gold"/><circle cx="221" cy="82" r="2.2" class="c-gold"/>';
    } else {
      head = '' +
        '<circle cx="210" cy="108" r="36" class="c-skin"/>' +
        face(210, 112) +
        '<path d="M174 112 C168 58 252 58 246 112 C236 90 212 84 200 96 C190 90 178 98 174 112 Z" class="c-hair"/>' +
        '<circle cx="175" cy="124" r="2.6" class="c-gold"/><circle cx="245" cy="124" r="2.6" class="c-gold"/>' +
        '<g class="crown">' +
          '<ellipse cx="190" cy="80" rx="6" ry="2.6" transform="rotate(-40 190 80)" class="c-leaf"/>' +
          '<ellipse cx="230" cy="80" rx="6" ry="2.6" transform="rotate(40 230 80)" class="c-leaf"/>' +
          '<circle cx="186" cy="86" r="4.6" class="c-bouquet-1"/><circle cx="197" cy="77" r="4.2" class="c-bouquet-2"/>' +
          '<circle cx="210" cy="73" r="5" class="c-bouquet-1"/><circle cx="223" cy="77" r="4.2" class="c-bouquet-2"/>' +
          '<circle cx="234" cy="86" r="4.6" class="c-bouquet-1"/>' +
        '</g>';
    }
    var sleeve = hijab ? 's-gown-sleeve' : 's-skin-arm';
    return '' +
      '<g class="fig fig-bride">' +
        '<path d="M180 76 C148 140 150 250 158 316 L262 316 C270 250 272 140 240 76 Z" class="c-veil"/>' +
        (hijab ? '' : '<path d="M174 108 C164 160 172 190 182 198 L238 198 C248 190 256 160 246 108 Z" class="c-hair"/>') +
        '<path d="M184 202 Q210 196 236 202 L270 316 Q210 328 150 316 Z" class="c-gown"/>' +
        '<path d="M160 302 Q176 292 192 302 Q210 292 228 302 Q244 292 260 302" class="s-gown-shade"/>' +
        '<path d="M172 270 Q186 262 200 270 Q214 262 228 270 Q242 262 252 270" class="s-gown-shade"/>' +
        '<path d="M176 172 Q164 204 166 228" class="s-arm ' + sleeve + '"/>' +
        '<path d="M244 172 Q258 206 254 234" class="s-arm ' + sleeve + '"/>' +
        (hijab
          ? '<path d="M182 206 L184 162 C188 152 232 152 236 162 L238 206 Z" class="c-gown"/>'
          : '<path d="M192 140 L228 140 L234 166 L186 166 Z" class="c-skin"/>' +
            '<path d="M186 164 Q198 156 210 168 Q222 156 234 164 L238 206 L182 206 Z" class="c-gown"/>') +
        '<rect x="181" y="198" width="58" height="9" rx="4" class="c-sash"/>' +
        '<circle cx="166" cy="232" r="7.5" class="c-skin"/>' +
        '<circle cx="254" cy="238" r="7.5" class="c-skin"/>' +
        '<g class="bouquet">' +
          '<ellipse cx="244" cy="248" rx="8" ry="3" transform="rotate(-50 244 248)" class="c-leaf"/>' +
          '<ellipse cx="266" cy="246" rx="8" ry="3" transform="rotate(50 266 246)" class="c-leaf"/>' +
          '<circle cx="250" cy="234" r="7" class="c-bouquet-1"/><circle cx="261" cy="229" r="6" class="c-bouquet-2"/>' +
          '<circle cx="260" cy="242" r="6.4" class="c-bouquet-1"/><circle cx="247" cy="245" r="5.4" class="c-bouquet-2"/>' +
          '<path d="M254 250 L250 266 M256 250 L260 266" class="s-ribbon"/>' +
        '</g>' +
        (hijab ? '' : '<rect x="202" y="132" width="16" height="16" rx="6" class="c-skin-shade"/>') +
        head +
      '</g>';
  }

  function hearts() {
    var h = 'M0 3 C0 -1 -6 -1 -6 3 C-6 7 0 10 0 13 C0 10 6 7 6 3 C6 -1 0 -1 0 3 Z';
    return '<g class="hearts">' +
      '<path d="' + h + '" transform="translate(161 132)" class="c-heart h1"/>' +
      '<path d="' + h + '" transform="translate(156 142) scale(.7)" class="c-heart h2"/>' +
      '<path d="' + h + '" transform="translate(166 144) scale(.6)" class="c-heart h3"/>' +
    '</g>';
  }

  function figures(type, id, opts) {
    if (type === 'jawa') return { groom: groomJawa(id), bride: brideJawa(id) };
    return { groom: groomModern(), bride: brideModern(!!(opts && opts.hijab)) };
  }

  function couple(type, opts) {
    var id = uid();
    var f = figures(type, id, opts);
    return '' +
      '<svg class="couple couple-' + type + '" viewBox="0 0 320 340" role="img" aria-label="Ilustrasi kedua mempelai">' +
        defs(id) +
        '<ellipse cx="160" cy="324" rx="122" ry="10" class="c-shadow"/>' +
        f.groom + f.bride + hearts() +
      '</svg>';
  }

  function portrait(type, who, opts) {
    var id = uid();
    var f = figures(type, id, opts);
    var box = who === 'groom' ? '48 24 124 160' : '148 22 124 160';
    return '' +
      '<svg class="couple portrait" viewBox="' + box + '" role="img" aria-label="Ilustrasi mempelai ' + (who === 'groom' ? 'pria' : 'wanita') + '">' +
        defs(id) + f[who] +
      '</svg>';
  }

  function gunungan() {
    return '' +
      '<svg class="gunungan" viewBox="0 0 100 150" aria-hidden="true">' +
        '<path d="M50 4 C60 24 82 56 92 94 C97 112 92 126 84 132 L16 132 C8 126 3 112 8 94 C18 56 40 24 50 4 Z" class="g-fill"/>' +
        '<path d="M50 16 C58 34 76 62 84 94 C88 110 84 120 78 124 L22 124 C16 120 12 110 16 94 C24 62 42 34 50 16 Z" class="g-line"/>' +
        '<path d="M50 34 L50 104" class="g-line"/>' +
        '<path d="M50 54 C42 50 36 42 36 34 C42 36 48 44 50 54 Z M50 54 C58 50 64 42 64 34 C58 36 52 44 50 54 Z" class="g-leaf"/>' +
        '<path d="M50 72 C38 70 30 62 28 52 C38 54 46 62 50 72 Z M50 72 C62 70 70 62 72 52 C62 54 54 62 50 72 Z" class="g-leaf"/>' +
        '<path d="M50 90 C36 90 24 84 20 76 C32 76 44 82 50 90 Z M50 90 C64 90 76 84 80 76 C68 76 56 82 50 90 Z" class="g-leaf"/>' +
        '<circle cx="50" cy="28" r="3" class="g-dot"/>' +
        '<circle cx="30" cy="100" r="2.4" class="g-dot"/><circle cx="70" cy="100" r="2.4" class="g-dot"/>' +
        '<path d="M36 124 L36 106 Q50 94 64 106 L64 124 Z" class="g-gate"/>' +
        '<path d="M50 102 L50 124" class="g-line"/>' +
        '<rect x="12" y="132" width="76" height="8" rx="2" class="g-fill"/>' +
        '<rect x="22" y="140" width="56" height="6" rx="2" class="g-fill"/>' +
      '</svg>';
  }

  window.ILLUSTRATIONS = { couple: couple, portrait: portrait, gunungan: gunungan };
})();
