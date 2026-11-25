/* Modelos de certificado — Selo de Qualidade
 * Cada modelo = um layout (estrutura/decoração) + uma paleta de cores.
 * Tamanho base: 1123 x 794 px (A4 paisagem a 96 dpi).
 */
(function () {
  'use strict';

  const W = 1123, H = 794;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Layouts ---------- */
  const LAYOUTS = {
    classic:  { title: "'Cinzel', serif",           body: "'Cormorant Garamond', serif", name: "'Great Vibes', cursive",    titleSize: 64, nameSize: 82, msgSize: 23, sealText: 'accent' },
    luxe:     { title: "'Cinzel', serif",           body: "'Cormorant Garamond', serif", name: "'Great Vibes', cursive",    titleSize: 62, nameSize: 82, msgSize: 23, sealText: 'accent', dark: true },
    modern:   { title: "'Montserrat', sans-serif",  body: "'Inter', sans-serif",         name: "'Montserrat', sans-serif",  titleSize: 60, nameSize: 56, msgSize: 18, sealText: 'white', bandSeal: true },
    ribbon:   { title: "'Playfair Display', serif", body: "'Cormorant Garamond', serif", name: "'Allura', cursive",         titleSize: 70, nameSize: 86, msgSize: 23, sealText: 'accent', tails: true },
    geo:      { title: "'Raleway', sans-serif",     body: "'Inter', sans-serif",         name: "'Raleway', sans-serif",     titleSize: 60, nameSize: 56, msgSize: 18, sealText: 'white' },
    wave:     { title: "'Playfair Display', serif", body: "'Inter', sans-serif",         name: "'Dancing Script', cursive", titleSize: 66, nameSize: 70, msgSize: 18, sealText: 'white' },
    minimal:  { title: "'Playfair Display', serif", body: "'Inter', sans-serif",         name: "'Playfair Display', serif", titleSize: 58, nameSize: 60, msgSize: 17, sealText: 'primary' },
    orbita:   { title: "'Montserrat', sans-serif",  body: "'Inter', sans-serif",         name: "'Montserrat', sans-serif",  titleSize: 60, nameSize: 54, msgSize: 18, sealText: 'white', bandSeal: true },
    diagonal: { title: "'Montserrat', sans-serif",  body: "'Inter', sans-serif",         name: "'Montserrat', sans-serif",  titleSize: 58, nameSize: 50, msgSize: 18, sealText: 'white' }
  };

  /* ---------- Modelos (27) ---------- */
  const RAW = [
    ['orbita-indigo',      'Órbita Índigo',        'orbita',   { bg: '#ffffff', primary: '#170b60', ring: '#393187', half: '#ca2d7e', accent: '#ca2d7e', accentText: '#ca2d7e', text: '#170b60', muted: '#6b6894', titleColor: '#170b60', nameColor: '#ca2d7e' }],
    ['orbita-magenta',     'Órbita Magenta',       'orbita',   { bg: '#ffffff', primary: '#ca2d7e', ring: '#e45a9c', half: '#170b60', accent: '#170b60', accentText: '#ca2d7e', text: '#170b60', muted: '#6b6894', titleColor: '#170b60', nameColor: '#393187' }],
    ['orbita-violeta',     'Órbita Violeta',       'orbita',   { bg: '#f6f4fc', primary: '#393187', ring: '#5a52a8', half: '#ca2d7e', accent: '#ca2d7e', accentText: '#ca2d7e', text: '#1e1650', muted: '#6b6894', titleColor: '#170b60', nameColor: '#ca2d7e' }],
    ['classico-dourado',   'Clássico Dourado',     'classic',  { bg: '#fffdf6', primary: '#1f2a44', accent: '#c9a227', accentText: '#9a7716', text: '#1f2a44', muted: '#5b6478' }],
    ['classico-indigo',    'Clássico Índigo',      'classic',  { bg: '#fbfaff', primary: '#170b60', accent: '#ca2d7e', accentText: '#ca2d7e', text: '#170b60', muted: '#6b6894' }],
    ['classico-violeta',   'Clássico Violeta',     'classic',  { bg: '#f6f4fc', primary: '#393187', accent: '#ca2d7e', accentText: '#a51f63', text: '#1e1650', muted: '#6b6894' }],
    ['luxo-noturno',       'Luxo Noturno',         'luxe',     { bg: '#121826', primary: '#0b1020', accent: '#d4af37', accentText: '#d4af37', text: '#f3ead2', muted: '#b9b2a0' }],
    ['luxo-indigo',        'Luxo Índigo Magenta',  'luxe',     { bg: '#170b60', primary: '#0f0745', accent: '#ca2d7e', accentText: '#e86aa9', text: '#ffffff', muted: '#b8b3e0', titleColor: '#ffffff', nameColor: '#e86aa9' }],
    ['luxo-roxo',          'Luxo Roxo',            'luxe',     { bg: '#393187', primary: '#170b60', accent: '#f3c1dc', accentText: '#f3c1dc', text: '#ffffff', muted: '#cfcaf0', titleColor: '#ffffff', nameColor: '#f3c1dc' }],
    ['moderno-azul',       'Moderno Azul',         'modern',   { bg: '#ffffff', primary: '#1e40af', accent: '#f59e0b', accentText: '#b45309', text: '#0f172a', muted: '#64748b' }],
    ['moderno-indigo',     'Moderno Índigo',       'modern',   { bg: '#ffffff', primary: '#170b60', accent: '#ca2d7e', accentText: '#ca2d7e', text: '#170b60', muted: '#6b6894' }],
    ['moderno-magenta',    'Moderno Magenta',      'modern',   { bg: '#ffffff', primary: '#ca2d7e', accent: '#170b60', accentText: '#393187', text: '#170b60', muted: '#6b6894', titleColor: '#170b60', nameColor: '#ca2d7e' }],
    ['faixa-real',         'Faixa Real',           'ribbon',   { bg: '#fdfcf8', primary: '#1e3a8a', accent: '#d4a017', accentText: '#a07a0c', text: '#1e293b', muted: '#64748b' }],
    ['faixa-indigo',       'Faixa Índigo',         'ribbon',   { bg: '#fbfaff', primary: '#170b60', accent: '#ca2d7e', accentText: '#ca2d7e', text: '#170b60', muted: '#6b6894' }],
    ['faixa-violeta',      'Faixa Violeta',        'ribbon',   { bg: '#ffffff', primary: '#393187', accent: '#ca2d7e', accentText: '#ca2d7e', text: '#1e1650', muted: '#6b6894' }],
    ['geo-laranja',        'Geométrico Laranja',   'geo',      { bg: '#ffffff', primary: '#ea580c', accent: '#1e293b', accentText: '#c2410c', text: '#1e293b', muted: '#64748b', titleColor: '#1e293b', nameColor: '#c2410c' }],
    ['geo-indigo',         'Geométrico Índigo',    'geo',      { bg: '#ffffff', primary: '#ca2d7e', accent: '#170b60', accentText: '#ca2d7e', text: '#170b60', muted: '#6b6894', titleColor: '#170b60', nameColor: '#ca2d7e' }],
    ['geo-violeta',        'Geométrico Violeta',   'geo',      { bg: '#ffffff', primary: '#393187', accent: '#170b60', accentText: '#ca2d7e', text: '#170b60', muted: '#6b6894', titleColor: '#170b60', nameColor: '#393187' }],
    ['ondas-oceano',       'Ondas Oceano',         'wave',     { bg: '#ffffff', primary: '#0369a1', accent: '#38bdf8', accentText: '#0369a1', text: '#0c2a3e', muted: '#5b7283' }],
    ['ondas-indigo',       'Ondas Índigo',         'wave',     { bg: '#ffffff', primary: '#170b60', accent: '#393187', accentText: '#ca2d7e', text: '#170b60', muted: '#6b6894' }],
    ['ondas-magenta',      'Ondas Magenta',        'wave',     { bg: '#fffafd', primary: '#393187', accent: '#ca2d7e', accentText: '#ca2d7e', text: '#170b60', muted: '#6b6894' }],
    ['minimal-preto',      'Minimalista Preto',    'minimal',  { bg: '#ffffff', primary: '#111111', accent: '#111111', accentText: '#111111', text: '#111111', muted: '#6b7280' }],
    ['minimal-indigo',     'Minimalista Índigo',   'minimal',  { bg: '#ffffff', primary: '#170b60', accent: '#ca2d7e', accentText: '#ca2d7e', text: '#170b60', muted: '#6b6894' }],
    ['minimal-lavanda',    'Minimalista Lavanda',  'minimal',  { bg: '#f6f4fc', primary: '#393187', accent: '#ca2d7e', accentText: '#393187', text: '#1e1650', muted: '#6b6894' }],
    ['listras-industrial', 'Listras Industrial',   'diagonal', { bg: '#ffffff', primary: '#1f2937', accent: '#facc15', accentText: '#1f2937', text: '#111827', muted: '#6b7280' }],
    ['listras-indigo',     'Listras Índigo',       'diagonal', { bg: '#ffffff', primary: '#170b60', accent: '#ca2d7e', accentText: '#ffffff', text: '#170b60', muted: '#6b6894' }],
    ['listras-violeta',    'Listras Violeta',      'diagonal', { bg: '#fbfaff', primary: '#393187', accent: '#ca2d7e', accentText: '#ffffff', text: '#1e1650', muted: '#6b6894' }]
  ];

  const TEMPLATES = RAW.map(([id, nome, layout, c]) => {
    const L = LAYOUTS[layout];
    const t = Object.assign({ id, nome, layout }, L, c);
    t.titleColor = c.titleColor || (L.dark ? c.accent : c.primary);
    t.nameColor = c.nameColor || (L.dark ? c.accent : c.primary);
    const sealText = L.sealText === 'accent' ? c.accent : L.sealText === 'primary' ? c.primary : '#ffffff';
    t.seal = {
      star: layout === 'minimal' ? c.primary : layout === 'orbita' ? c.half : c.accent,
      center: layout === 'minimal' ? c.bg : c.primary,
      text: sealText
    };
    return t;
  });

  /* ---------- Selo "100%" ---------- */
  function seal(t, tails) {
    const s = t.seal, cx = 75, cy = 75, pts = [];
    for (let i = 0; i < 48; i++) {
      const r = i % 2 ? 63 : 73, a = i * Math.PI / 24 - Math.PI / 2;
      pts.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1));
    }
    const tl = tails ? `<polygon points="52,112 34,162 50,152 62,164 72,120" fill="${s.center}"/><polygon points="98,112 116,162 100,152 88,164 78,120" fill="${s.center}"/>` : '';
    const vb = tails ? '0 0 150 166' : '0 0 150 150';
    const f = "Georgia, 'Times New Roman', serif";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="140" height="${tails ? 155 : 140}">${tl}
<polygon points="${pts.join(' ')}" fill="${s.star}"/>
<circle cx="75" cy="75" r="57" fill="${s.center}"/>
<circle cx="75" cy="75" r="50" fill="none" stroke="${s.text}" stroke-width="1.2" stroke-dasharray="2 3"/>
<text x="75" y="56" text-anchor="middle" font-family="${f}" font-size="10" letter-spacing="2" fill="${s.text}">QUALIDADE</text>
<text x="75" y="89" text-anchor="middle" font-family="${f}" font-size="31" font-weight="bold" fill="${s.text}">100%</text>
<text x="75" y="106" text-anchor="middle" font-family="${f}" font-size="10" fill="${s.text}">&#9733; &#9733; &#9733;</text>
</svg>`;
  }

  /* ---------- Decorações (SVG com cores literais p/ exportação) ---------- */
  const DECO = {
    classic(t) {
      const corner = `<path d="M0 90 V0 H90" fill="none" stroke="${t.accent}" stroke-width="5"/>
<path d="M16 74 Q16 16 74 16" fill="none" stroke="${t.primary}" stroke-width="2"/>
<circle cx="30" cy="30" r="7" fill="${t.accent}"/><circle cx="30" cy="30" r="12" fill="none" stroke="${t.accent}" stroke-width="1"/>`;
      return `<rect x="22" y="22" width="1079" height="750" fill="none" stroke="${t.primary}" stroke-width="8"/>
<rect x="40" y="40" width="1043" height="714" fill="none" stroke="${t.accent}" stroke-width="2"/>
<rect x="48" y="48" width="1027" height="698" fill="none" stroke="${t.accent}" stroke-width="0.8"/>
<g transform="translate(56,56)">${corner}</g>
<g transform="translate(1067,56) scale(-1,1)">${corner}</g>
<g transform="translate(56,738) scale(1,-1)">${corner}</g>
<g transform="translate(1067,738) scale(-1,-1)">${corner}</g>`;
    },
    luxe(t) {
      let rays = '';
      for (let i = 0; i <= 18; i++) {
        const a = Math.PI + i * Math.PI / 18;
        rays += `<line x1="561.5" y1="794" x2="${(561.5 + 1000 * Math.cos(a)).toFixed(1)}" y2="${(794 + 1000 * Math.sin(a)).toFixed(1)}" stroke="${t.accent}" stroke-opacity="0.07" stroke-width="2"/>`;
      }
      const dia = (x, y, s) => `<rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" transform="rotate(45 ${x} ${y})" fill="${t.bg}" stroke="${t.accent}" stroke-width="1.5"/>`;
      const chev = y => {
        const d = y < 400 ? 1 : -1;
        return `<polyline points="501,${y} 561.5,${y + 30 * d} 622,${y}" fill="none" stroke="${t.accent}" stroke-width="1.5"/>
<polyline points="526,${y} 561.5,${y + 18 * d} 597,${y}" fill="none" stroke="${t.accent}" stroke-width="1.5"/>`;
      };
      return `${rays}
<rect x="28" y="28" width="1067" height="738" fill="none" stroke="${t.accent}" stroke-width="2.5"/>
<rect x="42" y="42" width="1039" height="710" fill="none" stroke="${t.accent}" stroke-width="1"/>
${dia(42, 42, 22)}${dia(1081, 42, 22)}${dia(42, 752, 22)}${dia(1081, 752, 22)}
${dia(42, 397, 16)}${dia(1081, 397, 16)}
${chev(42)}${chev(752)}`;
    },
    modern(t) {
      return `<rect x="0" y="0" width="300" height="794" fill="${t.primary}"/>
<rect x="300" y="0" width="9" height="794" fill="${t.accent}"/>
<circle cx="250" cy="-10" r="150" fill="#ffffff" fill-opacity="0.07"/>
<circle cx="40" cy="790" r="170" fill="#ffffff" fill-opacity="0.07"/>
<circle cx="260" cy="700" r="60" fill="none" stroke="#ffffff" stroke-opacity="0.15" stroke-width="2"/>
<rect x="309" y="784" width="814" height="10" fill="${t.primary}" fill-opacity="0.12"/>`;
    },
    ribbon(t) {
      return `<rect x="30" y="30" width="1063" height="724" fill="none" stroke="${t.primary}" stroke-opacity="0.35" stroke-width="1.2"/>
<polygon points="0,0 235,0 0,235" fill="${t.accent}"/>
<polygon points="0,0 195,0 0,195" fill="${t.primary}"/>
<polygon points="1123,0 888,0 1123,235" fill="${t.accent}"/>
<polygon points="1123,0 928,0 1123,195" fill="${t.primary}"/>
<rect x="0" y="764" width="1123" height="5" fill="${t.accent}"/>
<rect x="0" y="772" width="1123" height="22" fill="${t.primary}"/>`;
    },
    geo(t) {
      let dots = '';
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
        dots += `<circle cx="${1000 + i * 18}" cy="${52 + j * 18}" r="3.2" fill="${t.accent}" fill-opacity="0.25"/>`;
        dots += `<circle cx="${70 + i * 18}" cy="${688 + j * 18}" r="3.2" fill="${t.primary}" fill-opacity="0.3"/>`;
      }
      return `<rect x="18" y="18" width="1087" height="758" fill="none" stroke="${t.primary}" stroke-width="1.5"/>
<polygon points="0,0 360,0 0,250" fill="${t.primary}"/>
<polygon points="0,0 230,0 0,340" fill="${t.accent}" fill-opacity="0.92"/>
<polygon points="1123,794 903,794 1123,634" fill="${t.primary}"/>
<polygon points="1123,794 993,794 1123,594" fill="${t.accent}" fill-opacity="0.92"/>
${dots}`;
    },
    wave(t) {
      const waves = `<path d="M0,0 H1123 V98 C900,150 720,48 540,98 C340,148 170,62 0,112 Z" fill="${t.accent}" fill-opacity="0.55"/>
<path d="M0,0 H1123 V72 C930,128 760,22 560,72 C360,120 190,32 0,86 Z" fill="${t.primary}"/>`;
      return `${waves}<g transform="rotate(180 561.5 397)">${waves}</g>`;
    },
    minimal(t) {
      const L = (x, y, dx, dy) => `<path d="M${x} ${y + 40 * dy} V${y} H${x + 40 * dx}" fill="none" stroke="${t.accent}" stroke-width="3"/>`;
      return `<rect x="34" y="34" width="1055" height="726" fill="none" stroke="${t.primary}" stroke-opacity="0.5" stroke-width="1"/>
${L(52, 52, 1, 1)}${L(1071, 52, -1, 1)}${L(52, 742, 1, -1)}${L(1071, 742, -1, -1)}`;
    },
    orbita(t) {
      return `<rect x="0" y="0" width="250" height="794" fill="${t.primary}"/>
<path d="M250,177 A220,220 0 0,0 250,617 Z" fill="${t.ring}"/>
<path d="M250,287 A110,110 0 0,0 250,507 Z" fill="${t.primary}"/>
<path d="M250,287 A110,110 0 0,1 250,507 Z" fill="${t.half}"/>
<rect x="250" y="776" width="873" height="18" fill="${t.primary}"/>
<rect x="250" y="770" width="873" height="6" fill="${t.half}"/>`;
    },
    diagonal(t) {
      let s = '';
      for (let i = 0; i < 6; i++) {
        const c = i % 2 ? t.primary : t.accent, d = 40 + i * 24;
        s += `<line x1="0" y1="${d}" x2="${d}" y2="0" stroke="${c}" stroke-width="11"/>`;
        s += `<line x1="1123" y1="${794 - d}" x2="${1123 - d}" y2="794" stroke="${c}" stroke-width="11"/>`;
      }
      return `${s}
<rect x="16" y="16" width="1091" height="762" fill="none" stroke="${t.primary}" stroke-width="3"/>
<rect x="27" y="27" width="1069" height="740" fill="none" stroke="${t.primary}" stroke-width="1"/>`;
    }
  };

  /* ---------- Montagem do certificado ---------- */
  function renderCert(t, d) {
    const vars = [
      `--bg:${t.bg}`, `--text:${t.text}`, `--muted:${t.muted}`, `--primary:${t.primary}`, `--accent:${t.accent}`,
      `--accent-text:${t.accentText}`, `--title-color:${t.titleColor}`, `--name-color:${t.nameColor}`,
      `--title-font:${t.title}`, `--body-font:${t.body}`, `--name-font:${t.name}`,
      `--title-size:${t.titleSize}px`, `--name-size:${t.nameSize}px`, `--msg-size:${t.msgSize}px`,
      `--sig-color:${d.sigColor}`
    ].join(';');
    const isModern = t.layout === 'modern', bandSeal = !!t.bandSeal;
    const company = [d.empresa, d.setor].filter(Boolean).map(esc).join(' &nbsp;·&nbsp; ');
    return `<div class="cert lay-${t.layout}" style="${vars}">
<svg class="deco" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${DECO[t.layout](t)}</svg>
${bandSeal ? `<div class="band-seal">${seal(t, false)}</div>` : ''}
${isModern ? `<div class="band-label"><div>Excelência</div><div class="band-month">${esc(d.periodo)}</div></div>` : ''}
<div class="content">
  ${d.logo ? `<img class="logo" src="${d.logo}" alt="">` : ''}
  ${company ? `<div class="company">${company}</div>` : ''}
  <div class="title">${esc(d.titulo)}</div>
  ${d.subtitulo ? `<div class="subtitle">${esc(d.subtitulo)}</div>` : ''}
  <div class="rule"></div>
  ${d.lead ? `<div class="lead">${esc(d.lead)}</div>` : ''}
  <div class="name">${esc(d.nome)}</div>
  <div class="name-rule"></div>
  <p class="message">${d.mensagemHTML}</p>
  <div class="footer">
    <div class="sig">${d.sigHTML}<div class="sig-line">${esc(d.inspetor) || '&nbsp;'}</div><div class="sig-role">${esc(d.cargo) || '&nbsp;'}</div></div>
    ${bandSeal ? '' : `<div class="seal">${seal(t, !!t.tails)}</div>`}
    <div class="datebox"><div class="date-val">${esc(d.periodo)}</div><div class="sig-line">${esc(d.dataLabel)}</div><div class="sig-role">&nbsp;</div></div>
  </div>
</div>
</div>`;
  }

  /* Ajusta textos longos para caberem no certificado */
  function fitCert(el) {
    [['.title', 26], ['.subtitle', 12], ['.name', 26]].forEach(([sel, min]) => {
      const n = el.querySelector(sel);
      if (!n) return;
      n.style.fontSize = '';
      let s = parseFloat(getComputedStyle(n).fontSize), g = 0;
      while (n.scrollWidth > n.clientWidth + 1 && s > min && g++ < 80) { s -= 1; n.style.fontSize = s + 'px'; }
    });
    const content = el.querySelector('.content'), msg = el.querySelector('.message');
    if (content && msg) {
      msg.style.fontSize = '';
      let m = parseFloat(getComputedStyle(msg).fontSize), g = 0;
      while (content.scrollHeight > content.clientHeight + 1 && m > 11 && g++ < 40) { m -= 1; msg.style.fontSize = m + 'px'; }
    }
  }

  window.CERT = { W, H, TEMPLATES, renderCert, fitCert, esc };
})();
