/* Selo de Qualidade — lógica da página */
(function () {
  'use strict';

  const { W, H, TEMPLATES, renderCert, fitCert, esc } = window.CERT;
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const DEFAULT_MESSAGES = [
    'Pelo desempenho exemplar ao atingir 100% de qualidade em todas as inspeções realizadas em {mes} de {ano}. Seu comprometimento faz a diferença!',
    'Em reconhecimento à excelência e à atenção aos detalhes demonstradas em {mes} de {ano}, alcançando o índice máximo de qualidade.',
    'Qualidade não é um ato, é um hábito. Parabéns por alcançar 100% de qualidade no mês de {mes}!',
    'Certificamos que {nome} concluiu o mês de {mes} de {ano} com zero defeitos, sendo exemplo de dedicação e profissionalismo para toda a equipe.',
    'Pelo compromisso com a qualidade, a segurança e a satisfação dos nossos clientes, refletido no resultado de 100% em {mes} de {ano}.',
    'Seu trabalho impecável em {mes} elevou o padrão da nossa equipe. Obrigado por fazer certo desde a primeira vez!',
    'Em reconhecimento ao resultado de 100% de conformidade nas auditorias de qualidade do mês de {mes} de {ano}.',
    'Excelência é fazer o comum de forma extraordinária. Parabéns pelo resultado perfeito em {mes}!',
    'Pela consistência, disciplina e cuidado em cada etapa do processo, garantindo qualidade total no mês de {mes} de {ano}.',
    'A {empresa} reconhece e agradece a sua dedicação, que resultou em 100% de qualidade no mês de {mes} de {ano}.',
    'Pelo destaque no setor {setor}, entregando um trabalho sem retrabalho e sem não conformidades durante {mes} de {ano}.',
    'Quem faz com qualidade inspira quem está ao lado. Obrigado por ser referência em {mes} de {ano}!'
  ];

  const SIG_FONTS = [['Great Vibes', 'Elegante'], ['Allura', 'Clássica'], ['Dancing Script', 'Espontânea'], ['Sacramento', 'Fina']];

  const STORE = 'selo_qualidade_v1', STORE_MSG = 'selo_qualidade_msgs_v1';
  const now = new Date();
  const DEFAULTS = {
    tpl: TEMPLATES[0].id,
    nomes: 'Maria Aparecida Silva',
    mes: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`,
    empresa: '', setor: '',
    titulo: 'Certificado', subtitulo: 'Qualidade 100%', lead: 'Conferido a', dataLabel: 'Mês de referência',
    mensagem: DEFAULT_MESSAGES[0],
    inspetor: '', cargo: 'Inspetor de Qualidade',
    sigMode: 'typed', sigFont: 'Great Vibes', sigText: '', sigColor: 'auto',
    sigStrokes: [], sigImage: null, logo: null, idx: 0
  };

  /* ---------- Persistência (localStorage é opcional) ---------- */
  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(STORE) || 'null') || {}); }
    catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); }
    catch (e) {
      try { const { logo, sigImage, ...rest } = state; localStorage.setItem(STORE, JSON.stringify(rest)); } catch (_) { /* sem armazenamento */ }
    }
  }
  function loadMsgs() { try { return JSON.parse(localStorage.getItem(STORE_MSG) || '[]'); } catch (e) { return []; } }
  function saveMsgs() { try { localStorage.setItem(STORE_MSG, JSON.stringify(customMsgs)); } catch (e) { /* ignore */ } }

  let state = load();
  let customMsgs = loadMsgs();
  if (!TEMPLATES.some(t => t.id === state.tpl)) state.tpl = TEMPLATES[0].id;

  /* ---------- Dados ---------- */
  const tplById = id => TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
  function names() {
    const a = String(state.nomes || '').split('\n').map(s => s.trim()).filter(Boolean);
    return a.length ? a : ['Nome do colaborador'];
  }
  function monthParts() {
    const [y, m] = String(state.mes || '').split('-').map(Number);
    return y && m ? { mes: MESES[m - 1], ano: String(y) } : { mes: '', ano: '' };
  }
  function fill(text, nome) {
    const { mes, ano } = monthParts();
    const map = { nome, mes, ano, empresa: state.empresa || 'nossa empresa', setor: state.setor || '', inspetor: state.inspetor || '' };
    return String(text || '').replace(/\{(\w+)\}/g, (m, k) => (k in map ? map[k] : m));
  }

  /* ---------- Assinatura ---------- */
  let sigVersion = 0;
  const sigCache = new Map();
  function sigColorFor(t) {
    if (state.sigColor === 'preto') return '#111111';
    if (state.sigColor === 'azul') return '#1f3a93';
    return t.dark ? t.accentText : '#1f3a93';
  }
  function drawnURL(color) {
    if (!state.sigStrokes || !state.sigStrokes.length) return null;
    const key = color + '|' + sigVersion;
    if (sigCache.has(key)) return sigCache.get(key);
    const c = document.createElement('canvas');
    c.width = 600; c.height = 200;
    const ctx = c.getContext('2d');
    strokeAll(ctx, color);
    const url = c.toDataURL('image/png');
    sigCache.set(key, url);
    return url;
  }
  function strokeAll(ctx, color) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 3.4; ctx.strokeStyle = color;
    state.sigStrokes.forEach(st => {
      if (!st.length) return;
      ctx.beginPath();
      ctx.moveTo(st[0][0], st[0][1]);
      if (st.length === 1) ctx.lineTo(st[0][0] + 0.1, st[0][1] + 0.1);
      for (let i = 1; i < st.length; i++) {
        const [x0, y0] = st[i - 1], [x1, y1] = st[i];
        ctx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      }
      ctx.stroke();
    });
  }
  function sigHTML(t) {
    let inner = '';
    if (state.sigMode === 'typed') {
      const txt = state.sigText || state.inspetor;
      if (txt) inner = `<span class="sig-typed" style="font-family:'${state.sigFont}', cursive">${esc(txt)}</span>`;
    } else if (state.sigMode === 'draw') {
      const u = drawnURL(sigColorFor(t));
      if (u) inner = `<img src="${u}" alt="">`;
    } else if (state.sigMode === 'image' && state.sigImage) {
      inner = `<img src="${state.sigImage}" alt="">`;
    }
    return `<div class="sig-img">${inner}</div>`;
  }

  /* ---------- Renderização ---------- */
  function certFor(t, nome) {
    const { mes, ano } = monthParts();
    return renderCert(t, {
      nome, empresa: state.empresa, setor: state.setor,
      titulo: state.titulo, subtitulo: state.subtitulo, lead: state.lead,
      mensagemHTML: esc(fill(state.mensagem, nome)).replace(/\n/g, '<br>'),
      inspetor: state.inspetor, cargo: state.cargo,
      periodo: mes ? `${mes} de ${ano}` : '',
      dataLabel: state.dataLabel,
      logo: state.logo, sigHTML: sigHTML(t), sigColor: sigColorFor(t)
    });
  }
  const fitIn = root => root.querySelectorAll('.cert').forEach(fitCert);

  function renderPreview() {
    const t = tplById(state.tpl), ns = names();
    if (state.idx >= ns.length) state.idx = 0;
    $('#preview').innerHTML = `<div class="scaler">${certFor(t, ns[state.idx])}</div>`;
    fitIn($('#preview'));
    $('#tplName').textContent = t.nome;
    $('#tplCount').textContent = `(${TEMPLATES.indexOf(t) + 1}/${TEMPLATES.length})`;
    const sel = $('#personSel');
    $('#personWrap').hidden = ns.length < 2;
    sel.innerHTML = ns.map((n, i) => `<option value="${i}" ${i === state.idx ? 'selected' : ''}>${esc(n)}</option>`).join('');
    updateScales();
  }
  function renderGallery() {
    const n = names()[state.idx] || names()[0];
    $('#gallery').innerHTML = TEMPLATES.map(t => `<button type="button" class="thumb${t.id === state.tpl ? ' active' : ''}" data-id="${t.id}">
<div class="thumb-frame"><div class="scaler">${certFor(t, n)}</div></div><span>${esc(t.nome)}</span></button>`).join('');
    fitIn($('#gallery'));
    $('#galleryCount').textContent = `(${TEMPLATES.length} modelos)`;
    updateScales();
  }
  function updateScales() {
    const p = $('#preview');
    if (p.clientWidth) p.style.setProperty('--s', p.clientWidth / W);
    const f = document.querySelector('.thumb-frame');
    if (f && f.clientWidth) $('#gallery').style.setProperty('--ts', f.clientWidth / W);
  }
  function renderAll() { renderPreview(); renderGallery(); }

  let timer = null;
  function schedule() { clearTimeout(timer); timer = setTimeout(() => { save(); renderAll(); }, 120); }

  /* ---------- Formulário ---------- */
  function syncForm() {
    $$('[data-k]').forEach(el => { el.value = state[el.dataset.k] ?? ''; });
    $$('input[name="sigMode"]').forEach(r => { r.checked = r.value === state.sigMode; });
    showSigPanel();
    buildMsgSelect();
    redrawPad();
  }
  function bindForm() {
    $$('[data-k]').forEach(el => {
      const ev = el.tagName === 'SELECT' || el.type === 'month' ? 'change' : 'input';
      el.addEventListener(ev, () => {
        state[el.dataset.k] = el.value;
        if (el.dataset.k === 'mensagem') markMsgSelect();
        if (el.dataset.k === 'nomes') state.idx = 0;
        schedule();
      });
      if (el.type === 'month') el.addEventListener('input', () => { state.mes = el.value; schedule(); });
    });
    $$('input[name="sigMode"]').forEach(r => r.addEventListener('change', () => {
      state.sigMode = r.value; showSigPanel(); schedule();
    }));
  }
  function showSigPanel() {
    $$('.sig-panel').forEach(p => { p.hidden = p.dataset.mode !== state.sigMode; });
    if (state.sigMode === 'draw') requestAnimationFrame(redrawPad);
  }

  /* Mensagens padrão */
  function allMsgs() {
    return DEFAULT_MESSAGES.map((m, i) => ({ id: 'd' + i, text: m, label: `Padrão ${i + 1}` }))
      .concat(customMsgs.map((m, i) => ({ id: 'c' + i, text: m, label: `★ Minha ${i + 1}` })));
  }
  function buildMsgSelect() {
    const sel = $('#msgSel');
    const opts = allMsgs().map(m => {
      const short = m.text.length > 70 ? m.text.slice(0, 70) + '…' : m.text;
      return `<option value="${m.id}">${esc(m.label)} — ${esc(short)}</option>`;
    });
    sel.innerHTML = `<option value="">— Personalizada —</option>` + opts.join('');
    markMsgSelect();
  }
  function markMsgSelect() {
    const m = allMsgs().find(x => x.text === state.mensagem);
    $('#msgSel').value = m ? m.id : '';
    $('#msgDel').hidden = !(m && m.id[0] === 'c');
  }

  /* ---------- Quadro de assinatura ---------- */
  const pad = $('#sigPad');
  const pctx = pad.getContext('2d');
  let drawing = null;
  function redrawPad() {
    pctx.clearRect(0, 0, pad.width, pad.height);
    pctx.save();
    pctx.strokeStyle = '#cbd5e1'; pctx.lineWidth = 1; pctx.setLineDash([6, 6]);
    pctx.beginPath(); pctx.moveTo(30, 160); pctx.lineTo(570, 160); pctx.stroke();
    pctx.restore();
    strokeAll(pctx, '#1f3a93');
  }
  function padPoint(e) {
    const r = pad.getBoundingClientRect();
    return [Math.round((e.clientX - r.left) * pad.width / r.width), Math.round((e.clientY - r.top) * pad.height / r.height)];
  }
  pad.addEventListener('pointerdown', e => {
    e.preventDefault();
    pad.setPointerCapture(e.pointerId);
    drawing = [padPoint(e)];
    state.sigStrokes.push(drawing);
    redrawPad();
  });
  pad.addEventListener('pointermove', e => {
    if (!drawing) return;
    e.preventDefault();
    drawing.push(padPoint(e));
    redrawPad();
  });
  const endStroke = () => { if (!drawing) return; drawing = null; sigVersion++; sigCache.clear(); schedule(); };
  pad.addEventListener('pointerup', endStroke);
  pad.addEventListener('pointercancel', endStroke);
  $('#sigClear').addEventListener('click', () => { state.sigStrokes = []; sigVersion++; sigCache.clear(); redrawPad(); schedule(); });

  /* ---------- Imagens ---------- */
  function readImage(file, max) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.onload = () => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const k = Math.min(1, max / Math.max(img.width, img.height));
          const c = document.createElement('canvas');
          c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          resolve(c.toDataURL('image/png'));
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }
  $('#logoFile').addEventListener('change', async e => {
    const f = e.target.files[0]; if (!f) return;
    try { state.logo = await readImage(f, 600); schedule(); toast('Logotipo adicionado'); } catch (_) { toast('Não foi possível ler a imagem'); }
  });
  $('#logoClear').addEventListener('click', () => { state.logo = null; $('#logoFile').value = ''; schedule(); });
  $('#sigFile').addEventListener('change', async e => {
    const f = e.target.files[0]; if (!f) return;
    try { state.sigImage = await readImage(f, 700); schedule(); toast('Assinatura adicionada'); } catch (_) { toast('Não foi possível ler a imagem'); }
  });
  $('#sigImgClear').addEventListener('click', () => { state.sigImage = null; $('#sigFile').value = ''; schedule(); });

  /* ---------- Ações de modelo / mensagens ---------- */
  $('#gallery').addEventListener('click', e => {
    const b = e.target.closest('.thumb'); if (!b) return;
    state.tpl = b.dataset.id; save(); renderAll();
    $('.stage').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  function stepTpl(d) {
    const i = TEMPLATES.findIndex(t => t.id === state.tpl);
    state.tpl = TEMPLATES[(i + d + TEMPLATES.length) % TEMPLATES.length].id;
    save(); renderAll();
  }
  $('#prevTpl').addEventListener('click', () => stepTpl(-1));
  $('#nextTpl').addEventListener('click', () => stepTpl(1));
  $('#personSel').addEventListener('change', e => { state.idx = +e.target.value; save(); renderAll(); });

  $('#msgSel').addEventListener('change', e => {
    const m = allMsgs().find(x => x.id === e.target.value);
    if (!m) return;
    state.mensagem = m.text; $('#msgText').value = m.text; markMsgSelect(); schedule();
  });
  $('#msgSave').addEventListener('click', () => {
    const txt = String(state.mensagem || '').trim();
    if (!txt) return toast('Escreva uma mensagem primeiro');
    if (allMsgs().some(m => m.text === txt)) return toast('Essa mensagem já está na lista');
    customMsgs.push(txt); saveMsgs(); buildMsgSelect(); toast('Mensagem salva nas padrão');
  });
  $('#msgDel').addEventListener('click', () => {
    const i = customMsgs.indexOf(state.mensagem);
    if (i < 0) return;
    customMsgs.splice(i, 1); saveMsgs(); buildMsgSelect(); toast('Mensagem excluída');
  });
  $('#resetAll').addEventListener('click', () => {
    const keep = { tpl: state.tpl, nomes: state.nomes, mes: state.mes, inspetor: state.inspetor };
    state = Object.assign({}, DEFAULTS, keep, { sigStrokes: [] });
    sigVersion++; sigCache.clear(); syncForm(); schedule(); toast('Textos restaurados');
  });

  /* ---------- Exportação ---------- */
  const overlay = (on, msg) => { $('#overlay').hidden = !on; if (msg) $('#overlayMsg').textContent = msg; };
  function waitImages(el) {
    return Promise.all(Array.from(el.querySelectorAll('img')).map(img => img.complete ? null : new Promise(r => { img.onload = img.onerror = r; })));
  }
  async function capture(t, nome) {
    const area = $('#render-area');
    area.innerHTML = certFor(t, nome);
    const el = area.firstElementChild;
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await waitImages(el);
    fitCert(el);
    const canvas = await window.html2canvas(el, {
      scale: 2, backgroundColor: t.bg, logging: false, useCORS: true,
      width: W, height: H, windowWidth: Math.max(W, window.innerWidth), windowHeight: Math.max(H, window.innerHeight),
      scrollX: 0, scrollY: 0
    });
    area.innerHTML = '';
    return canvas;
  }
  const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'certificado';
  function download(blobOrUrl, filename) {
    const a = document.createElement('a');
    const url = typeof blobOrUrl === 'string' ? blobOrUrl : URL.createObjectURL(blobOrUrl);
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    if (typeof blobOrUrl !== 'string') setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  async function exportPDF() {
    const t = tplById(state.tpl), ns = names();
    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
      for (let i = 0; i < ns.length; i++) {
        overlay(true, `Gerando PDF… ${i + 1} de ${ns.length}`);
        const c = await capture(t, ns[i]);
        if (i) pdf.addPage('a4', 'landscape');
        pdf.addImage(c.toDataURL('image/jpeg', 0.93), 'JPEG', 0, 0, 297, 210);
      }
      const fname = ns.length === 1 ? `certificado-${slug(ns[0])}-${state.mes}.pdf` : `certificados-qualidade-${state.mes}.pdf`;
      pdf.save(fname);
      toast(ns.length === 1 ? 'PDF gerado' : `PDF com ${ns.length} certificados gerado`);
    } catch (e) { console.error(e); toast('Erro ao gerar o PDF'); }
    finally { overlay(false); }
  }
  async function exportPNG() {
    const t = tplById(state.tpl), ns = names();
    try {
      for (let i = 0; i < ns.length; i++) {
        overlay(true, `Gerando imagem… ${i + 1} de ${ns.length}`);
        const c = await capture(t, ns[i]);
        const blob = await new Promise(r => c.toBlob(r, 'image/png'));
        download(blob, `certificado-${slug(ns[i])}-${state.mes}.png`);
        await new Promise(r => setTimeout(r, 350));
      }
      toast(ns.length === 1 ? 'Imagem gerada' : `${ns.length} imagens geradas`);
    } catch (e) { console.error(e); toast('Erro ao gerar a imagem'); }
    finally { overlay(false); }
  }
  async function printAll() {
    const t = tplById(state.tpl), area = $('#print-area');
    area.innerHTML = names().map(n => `<div class="print-page">${certFor(t, n)}</div>`).join('');
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await waitImages(area);
    fitIn(area);
    window.print();
  }
  window.addEventListener('afterprint', () => { $('#print-area').innerHTML = ''; });
  $('#btnPdf').addEventListener('click', exportPDF);
  $('#btnPng').addEventListener('click', exportPNG);
  $('#btnPrint').addEventListener('click', printAll);

  /* ---------- Utilidades ---------- */
  let toastT = null;
  function toast(msg) {
    const el = $('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2600);
  }

  /* ---------- Início ---------- */
  $('#sigFont').innerHTML = SIG_FONTS.map(([f, l]) => `<option value="${f}" style="font-family:'${f}'">${l} (${f})</option>`).join('');
  syncForm();
  bindForm();
  renderAll();
  if ('ResizeObserver' in window) new ResizeObserver(updateScales).observe(document.body);
  else window.addEventListener('resize', updateScales);
  if (document.fonts) {
    document.fonts.ready.then(renderAll);
    let ft = null;
    document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', () => { clearTimeout(ft); ft = setTimeout(renderAll, 200); });
  }
})();
