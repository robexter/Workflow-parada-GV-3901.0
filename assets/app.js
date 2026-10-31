"use strict";
const OPERATORS = ['Robson Almeida', 'Pedro Dantas'];
const SHIFTS = ['Diurno', 'Noturno', 'Especial'];
const SIM_DAY = '2027-03-25';
const SIM_START = '2027-03-01';
const SIM_END = '2027-04-20';
const VERSION = '0.3.0-DEMO';
const STORAGE = 'gv3901_demo_local_v010';
const activities = [
    { id: 'SIM-01', title: 'Preparação de acessos • exemplo', discipline: 'Acessos', from: '2027-03-01', to: '2027-03-08', total: 20, weight: 12, unit: 'un.', pred: [], critical: false },
    { id: 'SIM-02', title: 'Remoção de componentes • exemplo', discipline: 'Mecânica', from: '2027-03-07', to: '2027-03-18', total: 40, weight: 19, unit: 'un.', pred: ['SIM-01'], critical: true },
    { id: 'SIM-03', title: 'Montagem de suportes • exemplo', discipline: 'Montagem', from: '2027-03-14', to: '2027-03-28', total: 12, weight: 15, unit: 'un.', pred: ['SIM-02'], critical: true },
    { id: 'SIM-04', title: 'Soldagem de teste • exemplo', discipline: 'Soldagem', from: '2027-03-20', to: '2027-04-07', total: 80, weight: 28, unit: 'juntas', pred: ['SIM-03'], critical: true },
    { id: 'SIM-05', title: 'Ensaios demonstrativos • exemplo', discipline: 'Inspeção', from: '2027-04-01', to: '2027-04-12', total: 25, weight: 16, unit: 'ensaios', pred: ['SIM-04'], critical: true },
    { id: 'SIM-06', title: 'Consolidação documental • exemplo', discipline: 'Documentação', from: '2027-04-12', to: '2027-04-20', total: 5, weight: 10, unit: 'marcos', pred: ['SIM-05'], critical: true }
];
const initialState = () => ({
    events: [
        { id: 'EVT-001', at: '2027-03-25T09:25', created: '2027-03-25T09:36', category: 'Operação', title: 'Conferência de frente demonstrativa', body: 'Foi realizada uma conferência fictícia de acessibilidade à frente de trabalho. Registro criado apenas para exercitar a linha do tempo do protótipo.', equip: 'ÁREA DEMO', activity: 'SIM-03', action: 'Manter acompanhamento da frente no cenário simulado.', author: 'Operador DEMO', status: 'Publicado', revision: 1, history: [] },
        { id: 'EVT-002', at: '2027-03-25T11:10', created: '2027-03-25T11:18', category: 'Inspeção', title: 'Inspeção demonstrativa registrada', body: 'Exemplo fictício de inspeção com pendência documental. Não é informação extraída da intervenção real.', equip: 'EQUIPAMENTO FICTÍCIO', activity: 'SIM-05', action: 'Aguardar liberação de documentação no ambiente de teste.', author: 'Operador DEMO', status: 'Publicado', revision: 1, history: [] },
        { id: 'EVT-003', at: '2027-03-24T18:50', created: '2027-03-25T08:05', category: 'Manutenção', title: 'Transição de turno de exemplo', body: 'Ocorrência inventada para demonstrar evento registrado depois de sua data real.', equip: 'ÁREA DEMO', activity: 'SIM-04', action: 'Ponto de atenção transferido ao turno fictício seguinte.', author: 'Operador DEMO', status: 'Publicado', revision: 1, history: [] }
    ],
    measures: [
        { id: 'MED-001', activity: 'SIM-01', date: '2027-03-08', amount: 20, note: 'Exemplo validado fictício', created: '2027-03-08T18:00' },
        { id: 'MED-002', activity: 'SIM-02', date: '2027-03-18', amount: 40, note: 'Exemplo validado fictício', created: '2027-03-18T18:00' },
        { id: 'MED-003', activity: 'SIM-03', date: '2027-03-20', amount: 4, note: 'Demonstração de medição acumulada', created: '2027-03-20T18:00' },
        { id: 'MED-004', activity: 'SIM-03', date: '2027-03-25', amount: 7, note: 'Medição acumulada corrigível', created: '2027-03-25T16:00' },
        { id: 'MED-005', activity: 'SIM-04', date: '2027-03-25', amount: 15, note: 'Exemplo de avanço físico fictício', created: '2027-03-25T18:00' }
    ],
    issues: [
        { id: 'PEN-001', title: 'Confirmar documento de liberação fictício', description: 'Exemplo de pendência para testar o fluxo de passagem de turno.', owner: 'Planejamento DEMO', deadline: '2027-03-27', priority: 'Alta', status: 'Aberta', activity: 'SIM-03' },
        { id: 'PEN-002', title: 'Conferir material de teste', description: 'Impedimento ilustrativo sem relação com a parada verdadeira.', owner: 'Equipe DEMO', deadline: '2027-03-29', priority: 'Média', status: 'Em tratamento', activity: 'SIM-04' },
        { id: 'PEN-003', title: 'Revisar checklist de exemplo', description: 'Tarefa fictícia finalizada para demonstrar o histórico.', owner: 'Operador DEMO', deadline: '2027-03-23', priority: 'Baixa', status: 'Concluída', activity: 'SIM-01' }
    ],
    joints: {},
    evidences: [{ id: 'DOC-001', title: 'Checklist ilustrativo de demonstração', kind: 'Ficha de teste', context: 'SIM-01', date: '2027-03-22' }, { id: 'DOC-002', title: 'Relatório demonstrativo de inspeção', kind: 'Referência fictícia', context: 'SIM-05', date: '2027-03-25' }],
    audit: [{ at: '2027-03-25T18:30', action: 'Base sintética de demonstração iniciada.' }], scenario: 'base', theme: 'claro', jointRow: 1, dayFilter: '', selectedActivity: '', activeOperator: '', reportDate: SIM_DAY, reportShift: 'Diurno', reportAssignments: {}
});
function loadState() { try {
    const s = localStorage.getItem(STORAGE);
    if (s) {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed.events) && Array.isArray(parsed.measures) && Array.isArray(parsed.issues))
            return { ...initialState(), ...parsed };
    }
}
catch { } return initialState(); }
let st = loadState();
let page = 'painel';
let modal = '';
let editId = '';
let toastTimer = 0;
let searchText = '';
let statusFilter = 'Todas';
let ganttMode = 'vigente';
let reportMode = 'turno';
let chartMode = 'consolidado';
let navMobileMore = false;
let deferredInstallPrompt = null;
let installedThisSession = false;
function isAppInstalled() { return Boolean(installedThisSession || window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true); }
function isLocalFile() { return location.protocol === 'file:'; }
function installBtn() { return isAppInstalled() ? '' : `<button type="button" class="btn btn-install install-top-btn" data-action="install" aria-label="Instalar GV-3901 parada" title="Instalar GV-3901 parada">${ico('download', 16)}<span class="install-label-desktop">Instalar app</span><span class="install-label-mobile">Instalar</span></button>`; }
function updateInstallControls() { if (!modal)
    render(); }
async function requestInstall() {
    if (isAppInstalled()) {
        notify('GV-3901 parada já está aberto como aplicativo instalado.');
        return;
    }
    if (deferredInstallPrompt) {
        const prompt = deferredInstallPrompt;
        deferredInstallPrompt = null;
        try {
            await prompt.prompt();
            const choice = await prompt.userChoice;
            if (choice.outcome === 'accepted') {
                notify('Instalação solicitada. Confirme no navegador.');
            }
            else {
                notify('Instalação cancelada. Você pode tentar pelo menu do navegador.');
            }
        }
        catch {
            openModal('install');
        }
        render();
        return;
    }
    openModal('install');
}
function save(action = '') { if (action)
    st.audit.unshift({ at: new Date().toISOString(), action }); st.audit = st.audit.slice(0, 100); try {
    localStorage.setItem(STORAGE, JSON.stringify(st));
}
catch {
    notify('Falha no salvamento local. Verifique o espaço do navegador.');
} }
const escapeHtml = (v) => String(v ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m));
function authorOpts(selected = '', empty = 'Selecione o operador') { return `<option value="" ${selected ? '' : 'selected'}>${empty}</option>${OPERATORS.map(o => `<option value="${escapeHtml(o)}" ${o === selected ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}${selected && !OPERATORS.includes(selected) ? `<option value="${escapeHtml(selected)}" selected>${escapeHtml(selected)} (histórico DEMO)</option>` : ''}`; }
function assignmentKey(date, shift) { return `${date}|${shift}`; }
function reportResponsible() { return st.reportAssignments[assignmentKey(st.reportDate, st.reportShift)] || ''; }
function dateForEvent(e) { return e.operationalDate || e.at.slice(0, 10); }
function shiftForEvent(e) { return e.shift || 'Não definido'; }
function dayLabels() { return SHIFTS.map(x => `${x}: ${st.reportAssignments[assignmentKey(st.reportDate, x)] || 'a definir'}`).join(' · '); }
const ico = (name, n = 18) => { const paths = { grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>', book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>', power: '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><path d="M12 2v10"/>', calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>', chart: '<path d="M3 3v18h18"/><path d="m7 16 4-6 4 3 5-7"/>', wrench: '<path d="M14.7 6.3a1 1 0 0 0-1.4 0L9 10.6l-5-5a5 5 0 0 0 6.4 6.4l8.4 8.4a2 2 0 0 0 2.8-2.8l-8.4-8.4a5 5 0 0 0 6.4-6.4z"/>', alert: '<path d="m10.3 3.4-8.2 14a2 2 0 0 0 1.7 3h16.4a2 2 0 0 0 1.7-3l-8.2-14a2 2 0 0 0-3.4 0z"/><path d="M12 9v4m0 4h.01"/>', file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>', settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .4 1.9l-1.9 1.9a1.7 1.7 0 0 0-1.9-.4 1.7 1.7 0 0 0-1.1 1.6h-2.7a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.4l-1.9-1.9a1.7 1.7 0 0 0 .4-1.9A1.7 1.7 0 0 0 6 13.9v-2.7a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.4-1.9l1.9-1.9a1.7 1.7 0 0 0 1.9.4A1.7 1.7 0 0 0 12.1 5h2.7a1.7 1.7 0 0 0 1.1 1.6 1.7 1.7 0 0 0 1.9-.4l1.9 1.9a1.7 1.7 0 0 0-.4 1.9 1.7 1.7 0 0 0 1.6 1.1v2.7a1.7 1.7 0 0 0-1.5 1.2z"/>', camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>', plus: '<path d="M12 5v14M5 12h14"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', check: '<path d="m5 12 4 4L19 6"/>', shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>', download: '<path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4"/>', upload: '<path d="M12 16V4m-5 5 5-5 5 5M5 17v4h14v-4"/>', refresh: '<path d="M3 12a9 9 0 0 1 16-5l2 2m0-6v6h-6M21 12a9 9 0 0 1-16 5l-2-2m0 6v-6h6"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', filter: '<path d="M4 7h16M7 12h10M10 17h4"/>', edit: '<path d="M12 20h9M17 3a2 2 0 0 1 3 3L7 19l-4 1 1-4z"/>', close: '<path d="M18 6 6 18M6 6l12 12"/>', dots: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>', info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v5m0-9h.01"/>', database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>', layers: '<path d="m12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/>', trend: '<path d="M3 17 9 11l4 4 8-8M15 7h6v6"/>', eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>', users: '<circle cx="9" cy="8" r="4"/><path d="M2 21v-2a6 6 0 0 1 12 0v2m4-12a4 4 0 0 1 0 8m1 4v-2a5 5 0 0 0-3-5"/>', lock: '<rect x="5" y="11" width="14" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>' }; return `<svg width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.info}</svg>`; };
const NAV = [{ id: 'painel', label: 'Visão geral', icon: 'grid', group: 'CONTROLE' }, { id: 'diario', label: 'Diário de bordo', icon: 'book', group: 'CONTROLE' }, { id: 'operacoes', label: 'Operações / turnos', icon: 'power', group: 'CONTROLE' }, { id: 'planejamento', label: 'Planejamento', icon: 'calendar', group: 'EVOLUÇÃO' }, { id: 'evolucao', label: 'Curva S & projeções', icon: 'chart', group: 'EVOLUÇÃO' }, { id: 'sh2', label: 'SH2 / fornalha', icon: 'wrench', group: 'EVOLUÇÃO' }, { id: 'pendencias', label: 'Pendências e riscos', icon: 'alert', group: 'GESTÃO' }, { id: 'evidencias', label: 'Evidências', icon: 'camera', group: 'GESTÃO' }, { id: 'relatorios', label: 'Relatórios', icon: 'file', group: 'GESTÃO' }, { id: 'administracao', label: 'Configurações', icon: 'settings', group: 'SISTEMA' }];
const dateLong = (d) => d ? new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const dateShort = (d) => d ? new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '—';
const timeShort = (d) => d.includes('T') ? d.slice(11, 16) : '';
const toDate = (s) => new Date(s.slice(0, 10) + 'T12:00:00');
const addDays = (s, n) => { const d = toDate(s); d.setDate(d.getDate() + Math.round(n)); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const daysBetween = (a, b) => Math.round((toDate(b).getTime() - toDate(a).getTime()) / 86400000);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const percent = (x) => `${x.toFixed(1).replace('.', ',')}%`;
const getMeasure = (id, asof = SIM_DAY) => st.measures.filter(m => m.activity === id && m.date <= asof).sort((a, b) => a.date.localeCompare(b.date) || a.created.localeCompare(b.created)).at(-1);
const current = (a, asof = SIM_DAY) => clamp(getMeasure(a.id, asof)?.amount || 0, 0, a.total);
const progress = (asof = SIM_DAY) => { const total = activities.reduce((t, a) => t + a.weight, 0); return 100 * activities.reduce((t, a) => t + a.weight * current(a, asof) / a.total, 0) / total; };
const plannedAt = (a, date) => date < a.from ? 0 : date >= a.to ? 1 : clamp((daysBetween(a.from, date) + 1) / (daysBetween(a.from, a.to) + 1), 0, 1);
const planned = (date) => 100 * activities.reduce((t, a) => t + a.weight * plannedAt(a, date), 0) / activities.reduce((s, a) => s + a.weight, 0);
function forecast(scenario = st.scenario) {
    const factors = { otimista: 1.25, base: 1, conservador: .75 };
    const dates = {};
    let maxFinish = SIM_DAY;
    for (const a of activities) {
        const done = current(a), rem = a.total - done;
        if (rem <= 0) {
            dates[a.id] = { start: SIM_DAY, finish: SIM_DAY, qty: 0 };
            continue;
        }
        const elapsed = Math.max(1, Math.min(28, daysBetween(a.from, SIM_DAY) + 1));
        const obs = done > 0 ? done / elapsed : 0;
        const planRate = a.total / Math.max(1, daysBetween(a.from, a.to) + 1);
        const rate = Math.max(planRate * .35, obs * .8, planRate * .6) * factors[scenario];
        const duration = Math.max(1, Math.ceil(rem / rate));
        const predEnd = a.pred.reduce((best, pid) => dates[pid]?.finish > best ? dates[pid].finish : best, SIM_DAY);
        const start = addDays(predEnd, 1);
        const finish = addDays(start, duration - 1);
        dates[a.id] = { start, finish, qty: rem };
        if (finish > maxFinish)
            maxFinish = finish;
    }
    return { finish: maxFinish, dates, delay: daysBetween(SIM_END, maxFinish) };
}
function htmlPageHeader(title, subtitle, actions = '') { return `<div class="page-head"><div><div class="eyebrow">GV-3901 / SIMULADOR DE INTERFACE</div><h1>${title}</h1><p class="desc">${subtitle}</p></div>${actions ? `<div class="page-actions">${actions}</div>` : ''}</div>`; }
function btn(label, action, kind = 'btn-light', icon = '') { return `<button class="btn ${kind}" type="button" data-action="${action}">${icon ? ico(icon) : ''}${label}</button>`; }
function statusChip(text, kind = 'neutral') { return `<span class="status ${kind}"><i class="dot"></i>${escapeHtml(text)}</span>`; }
function tag(text) { return `<span class="pill">${escapeHtml(text)}</span>`; }
function areaCard(title, content, right = '') { return `<section class="card card-pad"><div class="card-header"><h3>${title}</h3>${right}</div>${content}</section>`; }
function toast(message) { notify(message); }
function notify(message) { const old = document.querySelector('.message'); old?.remove(); const div = document.createElement('div'); div.className = 'message'; div.textContent = message; document.body.appendChild(div); clearTimeout(toastTimer); toastTimer = window.setTimeout(() => div.remove(), 3800); }
const overviewStat = (label, value, foot, icon) => `<div class="card kpi"><div class="kpi-top"><span class="kpi-label">${label}</span><div class="kpi-icon">${ico(icon)}</div></div><div class="kpi-number mono">${value}</div><div class="kpi-foot">${foot}</div></div>`;
function curveSvg(mode = 'full') {
    const start = SIM_START;
    const fc = forecast();
    const end = fc.finish > SIM_END ? fc.finish : SIM_END;
    const count = daysBetween(start, end) + 1;
    const pts = [];
    for (let t = 0; t < count; t++) {
        const date = addDays(start, t), x = 52 + (t / Math.max(1, count - 1)) * 690;
        const plan = planned(date);
        const real = date <= SIM_DAY ? progress(date) : NaN;
        let proj = NaN;
        if (date >= SIM_DAY) {
            const tot = activities.reduce((s, a) => s + a.weight, 0);
            const progressForecast = activities.reduce((s, a) => { const c = current(a); const info = fc.dates[a.id]; let q = c; if (date > SIM_DAY && info && info.qty > 0) {
                let frac = date < info.start ? 0 : date >= info.finish ? 1 : (daysBetween(info.start, date) + 1) / (daysBetween(info.start, info.finish) + 1);
                q += info.qty * clamp(frac, 0, 1);
            } return s + a.weight * q / a.total; }, 0);
            proj = 100 * progressForecast / tot;
        }
        pts.push({ x, date, plan, real, proj });
    }
    const y = (v) => 190 - v * 1.52;
    const poly = (field) => pts.filter(p => Number.isFinite(p[field])).map(p => `${p.x.toFixed(1)},${y(p[field]).toFixed(1)}`).join(' ');
    const tX = 52 + (daysBetween(start, SIM_DAY) / Math.max(1, count - 1)) * 690;
    const ticks = [0, 25, 50, 75, 100].map(v => `<line x1="52" y1="${y(v)}" x2="742" y2="${y(v)}" stroke="#dce6ed" stroke-dasharray="3 6"/><text x="40" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#8295a4">${v}%</text>`).join('');
    const dateTicks = [start, addDays(start, Math.round(count * .25)), addDays(start, Math.round(count * .5)), addDays(start, Math.round(count * .75)), end].map(d => { const x = 52 + (daysBetween(start, d) / Math.max(1, count - 1)) * 690; return `<text x="${x}" y="211" text-anchor="middle" font-size="11" fill="#8295a4">${dateShort(d)}</text>`; }).join('');
    return `<div class="chart-wrap" role="img" aria-label="Curva S de demonstração com planejado, realizado e projetado; dados inteiramente fictícios"><svg class="chart-svg" viewBox="0 0 760 229"><rect x="52" y="38" width="690" height="152" rx="4" fill="#f9fbfd"/>${ticks}${dateTicks}<polyline fill="none" stroke="#438abc" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" points="${poly('plan')}"/><polyline fill="none" stroke="#118f80" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" points="${poly('real')}"/><polyline fill="none" stroke="#cc984e" stroke-dasharray="7 6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${poly('proj')}"/><line x1="${tX}" y1="38" x2="${tX}" y2="190" stroke="#7c919e" stroke-dasharray="4 5"/><text x="${Math.min(tX + 7, 652)}" y="31" font-size="10" font-weight="700" fill="#748996">CORTE DEMO</text><circle cx="${tX}" cy="${y(progress())}" r="4.5" fill="#078d7e" stroke="#fff" stroke-width="2"/></svg><div class="chart-legend"><span><i class="legend-line legend-original"></i>Planejado fictício</span><span><i class="legend-line legend-real"></i>Realizado fictício</span><span><i class="legend-line legend-proj"></i>Projeção ilustrativa</span></div></div>`;
}
function activityCard(a) { const done = current(a); return `<div class="progress-row"><div class="row-between"><strong>${escapeHtml(a.title)}</strong><small>${Math.round(done)}/${a.total} ${escapeHtml(a.unit)}</small></div><div class="progress-track"><div class="progress-fill" style="width:${100 * done / a.total}%"></div></div></div>`; }
function recentEvents(items, limit = 5) { if (!items.length)
    return `<div class="empty">Sem ocorrências para este filtro.</div>`; return `<div class="timeline">${items.slice(0, limit).map(e => `<div class="timeline-item"><div class="timeline-time">${dateShort(e.at)} · ${timeShort(e.at)}</div><div class="timeline-title">${escapeHtml(e.title)}</div><p class="timeline-text">${escapeHtml(e.body)}</p><div class="timeline-tags">${tag(e.category)}${tag(e.equip)}${tag(e.author || 'Sem operador')}<button class="pill" data-action="edit-event" data-id="${e.id}">${ico('edit', 11)} Editar</button></div></div>`).join('')}</div>`; }
const evSorted = () => [...st.events].sort((a, b) => b.at.localeCompare(a.at));
const issuesOpen = () => st.issues.filter(i => i.status !== 'Concluída');
function dashboard() {
    const actual = progress(), plan = planned(SIM_DAY), delta = actual - plan, fc = forecast();
    return `${htmlPageHeader('Visão geral', 'Acompanhamento integrado de uma intervenção inteiramente simulada.', btn('Passagem de turno', 'handover', 'btn-light', 'book') + btn('Novo registro', 'new-event', 'btn-primary', 'plus'))}
 <div class="grid grid-4"><div>${overviewStat('Avanço planejado', percent(plan), 'Linha de base fictícia B0', 'calendar')}</div><div>${overviewStat('Avanço validado', percent(actual), 'Medições locais de exemplo', 'check')}</div><div>${overviewStat('Desvio físico', `${delta >= 0 ? '+' : ''}${delta.toFixed(1).replace('.', ',')} <em>p.p.</em>`, 'Diferença na data de corte DEMO', 'trend')}</div><div>${overviewStat('Término simulado', dateShort(fc.finish), 'Estimativa ilustrativa · baixa confiança', 'clock')}</div></div>
 <div class="layout-main section-space"><div class="grid" style="gap:17px"><section class="card card-pad"><div class="card-header"><div><span class="card-kicker">VISÃO CONSOLIDADA</span><h3 style="margin-top:6px">Curva S — Planejado × Realizado × Projetado</h3></div>${btn('Abrir análise', 'nav:evolucao', 'btn-light', 'arrow')}</div>${curveSvg('compact')}<div class="note note-warn section-space">${ico('info')}Curvas construídas exclusivamente com medições e atividades inventadas. A previsão não é apta a uso operacional.</div></section>
 <section class="card card-pad"><div class="card-header"><h3>Avanço por atividade demonstrativa</h3>${btn('Registrar medição', 'new-measure', 'btn-light', 'plus')}</div>${activities.map(activityCard).join('')}</section></div>
 <div class="grid" style="gap:17px">${areaCard('Prioridades do turno', `${issuesOpen().map(i => `<div class="summary-row"><div class="row-icon">${ico(i.priority === 'Alta' ? 'alert' : 'clock')}</div><div style="flex:1"><div class="row-between"><strong>${escapeHtml(i.title)}</strong>${statusChip(i.priority, i.priority === 'Alta' ? 'bad' : 'warn')}</div><p>${escapeHtml(i.owner)} · vence ${dateShort(i.deadline)}</p></div></div>`).join('')}${btn('Ver pendências', 'nav:pendencias', 'btn-light', 'arrow')}`)}
 ${areaCard('Linha do tempo recente', recentEvents(evSorted(), 3), btn('Ver diário', 'nav:diario', 'btn-plain', 'arrow'))}
 ${areaCard('Atalhos operacionais', `<div class="grid grid-2" style="gap:8px">${btn('Registro', 'new-event', 'btn-light', 'plus')}${btn('Medição', 'new-measure', 'btn-light', 'chart')}${btn('SH2', 'nav:sh2', 'btn-light', 'wrench')}${btn('Relatório', 'nav:relatorios', 'btn-light', 'file')}</div>`)}</div></div>`;
}
function diario() {
    let events = evSorted().filter(e => !searchText || [e.title, e.body, e.equip, e.category, e.author || ''].join(' ').toLowerCase().includes(searchText.toLowerCase()));
    if (statusFilter !== 'Todas')
        events = events.filter(e => e.category === statusFilter);
    return `${htmlPageHeader('Diário de bordo', 'Ocorrências ordenadas pelo horário do fato, com edição rastreada.', btn('Novo registro', 'new-event', 'btn-primary', 'plus'))}
 <section class="card card-pad"><div class="filters"><label class="form-field" style="flex:1;min-width:180px"><span class="field-label">Pesquisar ocorrências</span><input class="input" id="search-events" placeholder="Título, relato, equipamento ou operador..." value="${escapeHtml(searchText)}"/></label><label class="form-field"><span class="field-label">Categoria</span><select class="input" id="category-filter"><option>Todas</option>${['Operação', 'Manutenção', 'Inspeção', 'Segurança', 'Restrição', 'Decisão'].map(x => `<option ${x === statusFilter ? 'selected' : ''}>${x}</option>`).join('')}</select></label></div><div class="row-between" style="margin-bottom:14px"><h3>Histórico cronológico</h3><span class="muted tiny">${events.length} registros demonstrativos</span></div>${events.length ? events.map(e => `<article class="list-card"><div class="row-between"><div class="row" style="flex-wrap:wrap"><strong class="tiny mono">${escapeHtml(e.id)}</strong>${statusChip(e.category, 'blue')}${e.status === 'Retificado' ? statusChip('Retificado', 'warn') : ''}</div><span class="tiny muted">${dateShort(e.at)} às ${timeShort(e.at)}</span></div><h4 style="margin-top:11px">${escapeHtml(e.title)}</h4><p>${escapeHtml(e.body)}</p><div class="list-footer"><div class="mini-meta"><span>${ico('wrench')} ${escapeHtml(e.equip || 'Sem equipamento')}</span><span>${ico('clock')} Lançado: ${dateShort(e.created)} ${timeShort(e.created)}</span><span>${ico('users')} ${escapeHtml(e.author || 'A definir')}</span><span>${escapeHtml(shiftForEvent(e))} · dia operacional ${dateShort(dateForEvent(e))}</span><span>Rev. ${e.revision}</span></div>${btn('Detalhes / editar', `edit-event:${e.id}`, 'btn-light', 'edit')}</div></article>`).join('') : `<div class="empty">${ico('search')}<strong>Nenhum evento encontrado</strong>Ajuste os filtros ou crie um registro de teste.</div>`}</section>`;
}
function operacoes() {
    const events = evSorted().filter(e => e.category === 'Operação' || e.category === 'Segurança');
    return `${htmlPageHeader('Operações & turnos', 'Marcos documentais, passagem de turno e continuidade operacional.', btn('Gerar passagem', 'handover', 'btn-primary', 'book'))}
 <div class="grid grid-3"><div class="card card-pad"><span class="card-kicker">TURNO DEMONSTRATIVO</span><h2 style="margin-top:9px">Turno diurno</h2><p class="muted" style="margin-top:8px;font-size:12px">07:00–19:00 · <strong>somente exemplo</strong></p></div><div class="card card-pad"><span class="card-kicker">DATA OPERACIONAL</span><h2 style="margin-top:9px">25 mar. 2027</h2><p class="muted" style="margin-top:8px;font-size:12px">Calendário de teste, não o real</p></div><div class="card card-pad"><span class="card-kicker">PENDÊNCIAS EM ABERTO</span><h2 style="margin-top:9px">${issuesOpen().length}</h2><p class="muted" style="margin-top:8px;font-size:12px">Fluxo fictício de passagem</p></div></div>
 <div class="card card-pad section-space" style="margin-bottom:15px"><div class="row-between" style="flex-wrap:wrap;gap:12px"><div><span class="card-kicker">IDENTIFICAÇÃO POR REVEZAMENTO</span><h3 style="margin-top:7px">Operador selecionado para novos registros</h3><p class="muted" style="margin-top:6px">${escapeHtml(st.activeOperator || 'Nenhum operador selecionado')} · escolher manualmente; não há escala presumida.</p></div>${btn('Selecionar operador', 'choose-operator', 'btn-primary', 'users')}</div></div><div class="layout-main section-space"><div>${areaCard('Marcos da intervenção · protótipo', `<div class="summary-list">${[['Preparação documental', 'Conferência simulada de documentos', 'ok'], ['Liberação de áreas', 'Depende de confirmações externas; aqui apenas referência', 'warn'], ['Execução de manutenção', 'Representação visual de uma frente de teste', 'blue'], ['Inspeções e ensaios', 'Referências de teste, sem autorizações formais', 'neutral'], ['Devolução operacional', 'Marco demonstrativo ainda não confirmado', 'neutral']].map(([t, sub, s]) => `<div class="summary-row"><div class="row-icon">${ico('power')}</div><div><strong>${t}</strong><p>${sub}</p></div><div class="spacer"></div>${statusChip(s === 'ok' ? 'Exemplo' : s === 'warn' ? 'Referência' : 'Simulado', s)}</div>`).join('')}</div>`)}</div><div class="grid" style="gap:15px">${areaCard('Pendências herdadas', issuesOpen().map(i => `<div class="summary-row"><div class="row-icon">${ico('alert')}</div><div><strong>${escapeHtml(i.title)}</strong><p>${escapeHtml(i.owner)}</p></div></div>`).join(''))}${areaCard('Ocorrências de operação', recentEvents(events, 3))}</div></div>`;
}
function planejamento() {
    const n = activities.length;
    const start = SIM_START, end = SIM_END, total = Math.max(1, daysBetween(start, end) + 1);
    const today = clamp(100 * daysBetween(start, SIM_DAY) / total, 0, 100);
    return `${htmlPageHeader('Planejamento', 'Cronograma ilustrativo e regras de baseline. A importação oficial não está habilitada.', btn('Sobre linhas de base', 'info:baseline', 'btn-light', 'info'))}
 <div class="grid grid-3"><div class="card card-pad"><span class="card-kicker">BASELINE DE SIMULAÇÃO</span><h2 style="margin-top:9px">B0 DEMO</h2><p class="muted" style="margin-top:8px;font-size:11px">Nunca representa planejamento aprovado.</p></div><div class="card card-pad"><span class="card-kicker">ATIVIDADES FICTÍCIAS</span><h2 style="margin-top:9px">${n}</h2><p class="muted" style="margin-top:8px;font-size:11px">Pacotes estruturados de exemplo</p></div><div class="card card-pad"><span class="card-kicker">PESO TOTAL ILUSTRATIVO</span><h2 style="margin-top:9px">100 pt</h2><p class="muted" style="margin-top:8px;font-size:11px">Peso didático, não contratual</p></div></div>
 <section class="card card-pad section-space"><div class="card-header"><h3>Gantt simplificado · calendário sintético</h3>${statusChip('B0 DEMO', 'blue')}</div><div class="note" style="margin-bottom:16px">${ico('info')}As relações de precedência são exclusivamente exemplos de como o aplicativo lerá o planejamento executivo. Não refletem o cronograma real da caldeira.</div><div class="table-scroller"><table><thead><tr><th>Atividade</th><th>Disciplina</th><th>Início</th><th>Fim</th><th>Peso</th><th style="min-width:240px">Linha do tempo · mar–abr/27</th></tr></thead><tbody>${activities.map(a => { const l = 100 * daysBetween(start, a.from) / total; const w = 100 * (daysBetween(a.from, a.to) + 1) / total; return `<tr><td><div class="cell-name">${a.id}</div><div class="cell-sub">${escapeHtml(a.title)}</div></td><td>${escapeHtml(a.discipline)}</td><td>${dateShort(a.from)}</td><td>${dateShort(a.to)}</td><td>${a.weight}</td><td><div class="activity-bar"><div class="planned" style="left:${l}%;width:${w}%"></div><div class="actual" style="left:${l}%;width:${w * (current(a) / a.total)}%"></div><div class="today" style="left:${today}%"></div></div></td></tr>`; }).join('')}</tbody></table></div><div class="chart-legend"><span><i class="legend-line" style="background:#bdd8eb"></i>Duração planejada</span><span><i class="legend-line legend-real"></i>Avanço medido (representação)</span><span><i class="legend-line" style="background:#cc984e"></i>Data de corte</span></div></section>
 ${areaCard('Critérios de versionamento', `<div class="grid grid-3">${[['B0 / original', 'Imutável após aprovação'], ['B1, B2...', 'Revisões com justificativa'], ['Comparação', 'Original × vigente × realizado']].map(([t, d]) => `<div class="soft"><strong>${t}</strong><p class="muted" style="font-size:11px;line-height:1.6;margin-top:5px">${d}</p></div>`).join('')}</div>`)} `;
}
function evolucao() {
    const f = forecast();
    const actual = progress();
    const plan = planned(SIM_DAY);
    return `${htmlPageHeader('Curva S & projeções', 'Medições acumuladas editáveis e simulação de tendência.', btn('Nova medição', 'new-measure', 'btn-primary', 'plus'))}
 <section class="card card-pad"><div class="card-header"><div><div class="card-kicker">EVOLUÇÃO CUMULATIVA</div><h3 style="margin-top:5px">Comparativo físico — base sintética</h3></div>${statusChip('Projeção ilustrativa', 'warn')}</div>${curveSvg('full')}</section>
 <div class="grid grid-4 section-space"><div>${overviewStat('Planejado B0', percent(plan), 'Situação na data de corte', 'calendar')}</div><div>${overviewStat('Realizado', percent(actual), 'Última medição por atividade', 'check')}</div><div>${overviewStat('Desvio', `${(actual - plan >= 0 ? '+' : '') + (actual - plan).toFixed(1).replace('.', ',')} p.p.`, 'Exemplo sem valor operacional', 'trend')}</div><div>${overviewStat('Previsão DEMO', dateShort(f.finish), 'Modelo preliminar ilustrativo', 'clock')}</div></div>
 <div class="layout-main section-space"><div>${areaCard('Controle de medições', `<div class="table-scroller"><table><thead><tr><th>Atividade</th><th>Última data</th><th>Acumulado validado</th><th>Avanço</th><th>Ação</th></tr></thead><tbody>${activities.map(a => { const m = getMeasure(a.id); return `<tr><td><div class="cell-name">${a.id}</div><div class="cell-sub">${escapeHtml(a.title)}</div></td><td>${m ? dateShort(m.date) : '—'}</td><td><strong>${current(a)}/${a.total}</strong> ${escapeHtml(a.unit)}</td><td>${percent(current(a) / a.total * 100)}</td><td>${m ? btn('Editar', `edit-measure:${m.id}`, 'btn-light btn-sm', 'edit') : btn('Medir', 'new-measure', 'btn-light btn-sm', 'plus')}</td></tr>`; }).join('')}</tbody></table></div>`)} </div>
 <div class="grid" style="gap:15px">${areaCard('Cenário de projeção', `<div class="segment" style="margin-bottom:13px">${[['otimista', 'Otimista'], ['base', 'Base'], ['conservador', 'Conservador']].map(([v, l]) => `<button data-action="scenario:${v}" class="${st.scenario === v ? 'active' : ''}">${l}</button>`).join('')}</div><div class="soft"><span class="card-kicker">TÉRMINO ESTIMADO DEMO</span><h2 style="margin-top:7px">${dateLong(f.finish)}</h2><p class="muted" style="font-size:11px;margin-top:7px">${f.delay >= 0 ? `${f.delay} dias após` : `${Math.abs(f.delay)} dias antes de`} prazo fictício ${dateShort(SIM_END)}</p></div><div class="note note-warn" style="margin-top:13px">${ico('alert')}Este cálculo usa taxas e precedências inventadas. Não é a metodologia homologada para previsão real.</div>`)}
 ${areaCard('Metodologia do protótipo', `<p class="muted" style="font-size:11px;line-height:1.8">Avanço físico: soma ponderada das quantidades acumuladas por atividade. Previsão: saldo / taxa ilustrativa, conectado por dependências sintéticas. Um sistema operacional exigirá calendários reais, produtividade suficiente, restrições e aprovação dos pesos.</p><div class="section-space">${btn('Regras funcionais V1.2', 'info:method', 'btn-light', 'info')}</div>`)}</div></div>`;
}
function sh2() {
    const row = st.jointRow;
    const statuses = ['nao-iniciada', 'preparada', 'soldada', 'inspecionada', 'aceita', 'reparo'];
    const label = { 'nao-iniciada': 'Não iniciada', preparada: 'Preparada', soldada: 'Soldada', inspecionada: 'Inspecionada', aceita: 'Aceita', reparo: 'Em reparo' };
    const counts = { 'nao-iniciada': 0, preparada: 0, soldada: 0, inspecionada: 0, aceita: 0, reparo: 0 };
    for (let i = 1; i <= 192; i++)
        counts[st.joints[String(i)] || 'nao-iniciada']++;
    return `${htmlPageHeader('SH2 & fornalha', 'Matriz estrutural de 192 posições para simular registros — nenhum status real pré-carregado.', btn('Sobre o escopo', 'info:sh2', 'btn-light', 'info'))}
 <div class="grid grid-4"><div>${overviewStat('Posições', String(192), 'Estrutura visual de referência', 'grid')}</div><div>${overviewStat('Preparadas', String(counts.preparada), 'Apenas ações locais de teste', 'layers')}</div><div>${overviewStat('Soldadas', String(counts.soldada), 'Não equivale a juntas aceitas', 'wrench')}</div><div>${overviewStat('Aceitas', String(counts.aceita), 'Aceite apenas simulado', 'check')}</div></div>
 <div class="layout-main section-space"><section class="card card-pad"><div class="card-header"><div><span class="card-kicker">MAPA INTERATIVO</span><h3 style="margin-top:6px">Matriz de juntas — protótipo</h3></div>${statusChip('Nenhum dado de campo', 'neutral')}</div><div class="filters"><span class="muted tiny" style="margin-right:9px">Fileira:</span>${Array.from({ length: 6 }, (_, i) => `<button data-action="row:${i + 1}" class="pill ${row === i + 1 ? 'active' : ''}">F${i + 1}</button>`).join('')}</div><div class="joint-grid">${Array.from({ length: 32 }, (_, i) => { const id = (row - 1) * 32 + i + 1; const state = st.joints[String(id)] || 'nao-iniciada'; return `<button class="joint ${state === 'nao-iniciada' ? '' : state}" data-action="joint:${id}" title="Posição de teste ${id} • ${label[state]}">${String(i + 1).padStart(2, '0')}</button>`; }).join('')}</div><div class="chart-legend" style="margin-top:17px">${statuses.map(s => `<span><i class="legend-line" style="background:${{ 'nao-iniciada': '#c5d3de', preparada: '#82b6db', soldada: '#d1a048', inspecionada: '#7698dc', aceita: '#27a87b', reparo: '#dd7272' }[s]}"></i>${label[s]}</span>`).join('')}</div><div class="note note-warn section-space">${ico('alert')}Clique em uma posição para simular uma mudança de situação. Os estados são mantidos somente no navegador deste dispositivo.</div></section>
 <div class="grid" style="gap:15px">${areaCard('Resumo por estado', `<div class="summary-list">${statuses.map(s => `<div class="row-between" style="padding:11px 0;border-bottom:1px solid var(--line)"><span style="font-size:12px">${label[s]}</span><strong>${counts[s]}</strong></div>`).join('')}</div>`)}
 ${areaCard('Fornalha · definição funcional', `<p class="muted" style="line-height:1.75;font-size:11.5px">Estrutura prevista: abas de escopo inicial, inspeções, adicionais aprovados e futuras intervenções. Nenhum metro ou trecho executado foi simulado aqui.</p><div class="grid" style="margin-top:12px;gap:8px">${['Escopo previsto', 'Inspeções', 'Serviços adicionais', 'Escopo futuro'].map(a => `<div class="soft"><strong style="font-size:11px">${a}</strong><p class="tiny muted" style="margin-top:5px">Aguardando dados e homologação</p></div>`).join('')}</div>`)}</div></div>`;
}
function pendencias() {
    const issues = st.issues.filter(i => statusFilter === 'Todas' || i.status === statusFilter).filter(i => !searchText || [i.title, i.description, i.owner].join(' ').toLowerCase().includes(searchText.toLowerCase()));
    return `${htmlPageHeader('Pendências & riscos', 'Registro de ações e restrições com responsáveis e prazos.', btn('Nova pendência', 'new-issue', 'btn-primary', 'plus'))}
 <div class="grid grid-3"><div>${overviewStat('Pendências abertas', String(st.issues.filter(i => i.status === 'Aberta').length), 'Demonstração local', 'alert')}</div><div>${overviewStat('Em tratamento', String(st.issues.filter(i => i.status === 'Em tratamento').length), 'Demonstração local', 'clock')}</div><div>${overviewStat('Concluídas', String(st.issues.filter(i => i.status === 'Concluída').length), 'Demonstração local', 'check')}</div></div>
 <section class="card card-pad section-space"><div class="filters"><label class="form-field" style="flex:1;min-width:180px"><span class="field-label">Buscar</span><input class="input" id="search-issues" placeholder="Pesquisar título ou responsável" value="${escapeHtml(searchText)}"/></label><label class="form-field"><span class="field-label">Situação</span><select class="input" id="issue-filter">${['Todas', 'Aberta', 'Em tratamento', 'Concluída'].map(s => `<option ${s === statusFilter ? 'selected' : ''}>${s}</option>`).join('')}</select></label></div>${issues.length ? issues.map(i => `<div class="list-card"><div class="row-between"><div class="row" style="flex-wrap:wrap"><strong class="mono tiny">${escapeHtml(i.id)}</strong>${statusChip(i.priority, i.priority === 'Alta' ? 'bad' : i.priority === 'Média' ? 'warn' : 'neutral')}</div>${statusChip(i.status, i.status === 'Concluída' ? 'ok' : i.status === 'Aberta' ? 'warn' : 'blue')}</div><h4 style="margin-top:11px">${escapeHtml(i.title)}</h4><p>${escapeHtml(i.description)}</p><div class="list-footer"><div class="mini-meta"><span>${ico('users')} ${escapeHtml(i.owner)}</span><span>${ico('calendar')} ${dateShort(i.deadline)}</span><span>${escapeHtml(i.activity)}</span></div>${btn(i.status === 'Concluída' ? 'Reabrir (teste)' : 'Concluir (teste)', `toggle-issue:${i.id}`, 'btn-light btn-sm', 'check')}</div></div>`).join('') : `<div class="empty">Nenhuma pendência para este filtro.</div>`}</section>`;
}
function evidencias() {
    return `${htmlPageHeader('Evidências', 'Área de navegação para documentos, imagens e registros relacionados.', btn('Sobre anexos', 'info:evidence', 'btn-light', 'info'))}
 <div class="note note-warn" style="margin-bottom:17px">${ico('alert')}O protótipo não envia nem armazena fotos/documentos reais. Os cartões abaixo são apenas metadados fictícios.</div><div class="grid grid-3">${st.evidences.map((d, i) => `<div class="card card-pad"><div class="soft" style="display:grid;place-items:center;height:130px;background:${i % 2 ? '#eaf1f5' : '#edf5f2'}">${ico(d.kind.includes('Ficha') ? 'file' : 'camera', 46)}</div><div style="margin-top:14px"><div class="card-kicker">${escapeHtml(d.kind)}</div><h3 style="margin-top:8px">${escapeHtml(d.title)}</h3><p class="muted" style="margin-top:9px;font-size:11px">${escapeHtml(d.context)} · ${dateShort(d.date)}</p></div><div class="section-space">${btn('Visualizar metadados', `evidence:${d.id}`, 'btn-light', 'eye')}</div></div>`).join('')}</div>${areaCard('Na aplicação operacional', `<p class="muted" style="font-size:12px;line-height:1.75">Haverá upload autorizado com controle de acesso, vínculo a atividades, tratamento de arquivos, limite de tamanho, validação de tipo, versões e trilhas de auditoria. Armazenamento real depende de aprovação organizacional.</p>`)}`;
}
function reportContent() {
    const lines = evSorted().filter(e => { const operational = dateForEvent(e); if (reportMode === 'final')
        return true; if (reportMode === 'semanal')
        return operational >= addDays(st.reportDate, -6) && operational <= st.reportDate; if (operational !== st.reportDate)
        return false; return reportMode === 'turno' ? (st.reportShift === 'Dia completo' || shiftForEvent(e) === st.reportShift) : true; }).slice().reverse();
    const open = issuesOpen();
    const fc = forecast();
    const operator = reportResponsible() || 'NÃO DESIGNADO';
    return `<article class="report-sheet" id="report-print"><div class="report-head"><div class="eyebrow">GV-3901 / TURNAROUND CONTROL</div><h2>Relatório demonstrativo — ${reportMode === 'turno' ? 'turno' : reportMode === 'diario' ? 'diário' : reportMode === 'semanal' ? 'semanal' : 'encerramento'}</h2><p class="muted" style="margin-top:7px">AMBIENTE DEMO • DADOS FICTÍCIOS • SEM VALIDADE OPERACIONAL</p><div class="mini-meta" style="margin-top:12px"><span>${ico('calendar')} Data selecionada: ${dateLong(st.reportDate)}</span><span>${ico('users')} Responsável: ${escapeHtml(operator)}</span><span>${ico('clock')} Período: ${escapeHtml(st.reportShift)}</span><span>${ico('file')} Versão ${VERSION}</span></div></div>
 <div class="soft" style="margin-bottom:15px"><strong>Responsabilidade pelo relatório:</strong> ${escapeHtml(operator)}<br/><span class="muted tiny">Turnos do dia: ${escapeHtml(dayLabels())}</span><br/><span class="muted tiny">Atribuição manual de demonstração, sem login ou confirmação de presença.</span></div><div class="grid grid-3">${[["Planejado", percent(planned(SIM_DAY))], ["Realizado", percent(progress())], ["Projeção ilustrativa", dateShort(fc.finish)]].map(([name, val]) => `<div class="soft"><span class="field-label">${name}</span><h2 style="margin-top:8px">${val}</h2></div>`).join('')}</div>
 <section class="report-section"><h3>01. Resumo executivo</h3><p>Documento gerado automaticamente a partir de registros de treinamento inteiramente sintéticos. Ele demonstra como o relatório consolidará ocorrências, medições e pendências no ambiente real, após homologação.</p></section>
 <section class="report-section"><h3>02. Ocorrências registradas</h3>${lines.map(e => `<p style="margin-bottom:7px"><strong>${dateShort(e.at)} ${timeShort(e.at)} — ${escapeHtml(e.title)} (${escapeHtml(e.author || 'Não identificado')}, ${escapeHtml(shiftForEvent(e))}):</strong> ${escapeHtml(e.body)}</p>`).join('') || '<p>Nenhuma ocorrência no recorte do relatório.</p>'}</section>
 <section class="report-section"><h3>03. Avanço das atividades fictícias</h3><div class="table-scroller"><table><thead><tr><th>Atividade</th><th>Qtd. validada DEMO</th><th>Avanço</th></tr></thead><tbody>${activities.map(a => `<tr><td>${escapeHtml(a.title)}</td><td>${current(a)}/${a.total} ${escapeHtml(a.unit)}</td><td>${percent(current(a) / a.total * 100)}</td></tr>`).join('')}</tbody></table></div></section>
 <section class="report-section"><h3>04. Pendências para continuidade</h3>${open.map(i => `<p style="margin-bottom:6px">• ${escapeHtml(i.title)} — ${escapeHtml(i.owner)}; prazo de exemplo ${dateShort(i.deadline)}.</p>`).join('') || '<p>Sem pendências.</p>'}</section>
 <section class="report-section"><h3>05. Condição de utilização</h3><p>Este relatório é destinado exclusivamente à avaliação visual e funcional do protótipo. Não autoriza manobras, não comprova execução de serviços e não representa documentação da parada da GV-3901.</p></section></article>`;
}
function relatorios() {
    return `${htmlPageHeader('Relatórios', 'Geração de relatórios demonstrativos a partir do conteúdo local editável.', btn('Imprimir / salvar PDF', 'print-report', 'btn-primary', 'file') + btn('Exportar HTML', 'export-report', 'btn-light', 'download'))}
 <section class="card card-pad"><div class="filters"><div class="segment">${[['turno', 'Por turno'], ['diario', 'Diário'], ['semanal', 'Semanal'], ['final', 'Final']].map(([v, t]) => `<button data-action="report:${v}" class="${reportMode === v ? 'active' : ''}">${t}</button>`).join('')}</div>${statusChip('Prévia com atribuição local', 'blue')}</div><div class="form-grid" style="margin-bottom:16px"><label class="form-field"><span class="field-label">Data do relatório (DEMO)</span><input class="input" type="date" id="report-date" value="${escapeHtml(st.reportDate)}"/></label><label class="form-field"><span class="field-label">Período / turno</span><select class="input" id="report-shift">${[...SHIFTS, 'Dia completo'].map(sh => `<option ${sh === st.reportShift ? 'selected' : ''}>${sh}</option>`).join('')}</select></label><div class="span-2 report-operator-panel"><div><span class="field-label">Operador responsável por este relatório</span><strong>${escapeHtml(reportResponsible() || 'Não designado')}</strong><p class="muted tiny">Selecionado por data e período; não atribui automaticamente a autoria de relatos anteriores.</p></div>${btn('Definir responsável', 'assign-report', 'btn-primary', 'users')}</div></div>${reportContent()}</section>`;
}
function administracao() {
    return `${htmlPageHeader('Administração & integridade', 'Configurações e salvamento exclusivo do protótipo, sem servidor.', btn('Exportar JSON DEMO', 'export-data', 'btn-primary', 'download'))}
 <div class="card card-pad" style="margin-bottom:16px"><div class="card-header"><div><h3>Instalação no dispositivo</h3><p class="muted" style="margin-top:6px;font-size:11px">Nome do aplicativo: <strong>GV-3901 parada</strong></p></div>${ico('download', 24)}</div><p class="muted" style="font-size:12px;margin:12px 0">${isAppInstalled() ? 'O aplicativo já está aberto no modo instalado.' : 'Use o botão Instalar app ou consulte as instruções de instalação conforme seu navegador.'}</p>${btn(isAppInstalled() ? 'Ver orientações' : 'Instalar GV-3901 parada', isAppInstalled() ? 'install-help' : 'install', 'btn-primary', 'download')}</div>
 <div class="card card-pad" style="margin-bottom:16px"><div class="card-header"><h3>Operadores cadastrados para seleção</h3>${btn('Trocar operador', 'choose-operator', 'btn-light', 'users')}</div><div class="mini-meta">${OPERATORS.map(o => `<span>${ico('users')} ${escapeHtml(o)}</span>`).join('')}</div><p class="muted" style="font-size:11px;margin-top:10px">Operador ativo: ${escapeHtml(st.activeOperator || 'não selecionado')}. Estes nomes são identificadores demonstrativos, sem autenticação de identidade.</p></div><div class="grid grid-2"><section class="card card-pad"><div class="card-header"><h3>Ambiente de demonstração</h3>${statusChip('Somente local', 'warn')}</div><div class="summary-list">${[['Versão da interface', VERSION], ['Especificação funcional', 'V1.2 · CONGELADA'], ['Armazenamento', 'localStorage do navegador'], ['Sincronização', 'Não implementada'], ['Autenticação', 'Não implementada'], ['Dados de campo', 'Não permitidos nesta demonstração']].map(([l, v]) => `<div class="row-between" style="padding:11px 0;border-bottom:1px solid var(--line)"><span class="muted tiny">${l}</span><strong style="font-size:11px">${v}</strong></div>`).join('')}</div><div class="section-space row" style="flex-wrap:wrap">${btn('Exportar backup DEMO', 'export-data', 'btn-light', 'download')}${btn('Restaurar dados fictícios', 'reset-demo', 'btn-danger', 'refresh')}</div></section>
 <section class="card card-pad"><div class="card-header"><h3>Trilha local de alterações</h3>${ico('shield')}</div>${st.audit.slice(0, 10).map(a => `<div class="audit-record"><strong>${escapeHtml(a.action)}</strong><p>${escapeHtml(a.at.replace('T', ' ').slice(0, 19))}</p></div>`).join('')}<div class="note note-warn section-space">${ico('alert')}Esta trilha é apenas demonstração em armazenamento local e pode ser apagada pelo usuário. Não constitui auditoria corporativa.</div></section></div>
 <section class="card card-pad section-space"><h3>Critérios que permanecem fora deste protótipo</h3><div class="grid grid-3 section-space">${[['Servidor e banco central', 'Exigem infraestrutura e permissão'], ['Login e papéis de acesso', 'Não simulamos autenticação real'], ['Sincronização offline', 'Precisa de regras de conflito e servidor'], ['Importação de cronograma real', 'Depende de dados aprovados'], ['Mecanismo de previsão validado', 'Exige método e dados de referência'], ['Evidências reais', 'Depende de tratamento seguro de arquivos']].map(([title, body]) => `<div class="soft"><strong style="font-size:12px">${title}</strong><p class="muted" style="margin-top:6px;font-size:11px;line-height:1.5">${body}</p></div>`).join('')}</div></section>`;
}
function mainContent() { switch (page) {
    case 'painel': return dashboard();
    case 'diario': return diario();
    case 'operacoes': return operacoes();
    case 'planejamento': return planejamento();
    case 'evolucao': return evolucao();
    case 'sh2': return sh2();
    case 'pendencias': return pendencias();
    case 'evidencias': return evidencias();
    case 'relatorios': return relatorios();
    case 'administracao': return administracao();
} }
function render() {
    const app = document.getElementById('app');
    if (!app)
        return;
    const title = NAV.find(n => n.id === page)?.label || 'Painel';
    let currentGroup = '';
    const side = NAV.map(n => { const lead = n.group !== currentGroup ? `<div class="side-group">${n.group}</div>` : ''; currentGroup = n.group; return `${lead}<button class="nav-item ${page === n.id ? 'active' : ''}" data-action="nav:${n.id}" title="${n.label}">${ico(n.icon)}<span>${n.label}</span>${page === n.id ? '<span class="nav-number">●</span>' : ''}</button>`; }).join('');
    const mobile = [['painel', 'Painel', 'grid'], ['diario', 'Diário', 'book'], ['evolucao', 'Curva S', 'chart'], ['pendencias', 'Pendências', 'alert'], ['administracao', 'Mais', 'dots']].map(([id, label, ic]) => `<button class="mobile-tab ${page === id ? 'active' : ''}" data-action="${id === 'administracao' ? 'mobile-more' : 'nav:' + id}">${ico(ic)}<span>${label}</span></button>`).join('');
    app.innerHTML = `<div class="app-shell"><aside class="sidebar"><div class="logo"><div class="brand-icon">GV</div><div><strong>GV-3901 parada</strong><span>Turnaround Control · V0.3</span></div></div><nav aria-label="Navegação principal">${side}</nav><div class="install-sidebar">${installBtn()}</div><div class="side-bottom"><div class="avatar">${escapeHtml((st.activeOperator || "?").slice(0, 1))}</div><div><strong>${escapeHtml(st.activeOperator || "Selecionar operador")}</strong><span>Identificação manual • sem login</span></div></div></aside><div class="main"><header class="topbar"><div class="top-left"><div class="eyebrow">PROTÓTIPO NAVEGÁVEL / BASE V1.2 CONGELADA</div><strong style="font-size:13px;color:#21384b">${title}</strong><span class="page-subtitle">Demonstração funcional com dados inventados</span></div><div class="top-right"><div class="top-date">${ico('calendar', 14)} Corte: 25 mar 2027 • SIM</div><div class="demo-pill">${ico('alert', 14)} AMBIENTE DEMO</div>${installBtn()}${btn('Novo registro', 'new-event', 'btn-primary new-record-top', 'plus')}</div></header><main class="workspace"><div class="simulation-banner">${ico('shield', 18)}<div><strong>SIMULAÇÃO — SEM DADOS OPERACIONAIS REAIS.</strong> Registros, datas de execução, medições e previsões são fictícios; os nomes dos operadores foram informados para identificação na interface. Não utilize este protótipo para tomada de decisão operacional, PT/PTT ou liberação de equipamento.</div></div>${mainContent()}</main></div></div><nav class="mobile-bottom">${mobile}</nav><button type="button" class="mobile-fab" data-action="new-event" aria-label="Novo registro">${ico('plus')}</button>${modal ? renderModal() : ''}`;
    if (navMobileMore)
        renderMobileMore();
    document.body.classList.toggle('dark-demo', st.theme === 'escuro');
    document.title = `GV-3901 parada | ${title} — DEMO`;
}
function formVal(name) { const el = document.querySelector(`[name="${name}"]`); return el?.value.trim() || ''; }
const field = (label, name, value, kind = 'text', extra = '') => `<label class="form-field"><span class="field-label">${label}</span><input class="input" name="${name}" type="${kind}" value="${escapeHtml(value)}" ${extra}/></label>`;
const txtField = (label, name, value, rows = 3) => `<label class="form-field"><span class="field-label">${label}</span><textarea class="input" name="${name}" rows="${rows}">${escapeHtml(value)}</textarea></label>`;
function modalShell(title, body, footer, subtitle = '') { return `<div class="modal-backdrop" id="backdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}"><div class="modal-head"><div><div class="eyebrow">AMBIENTE DE DEMONSTRAÇÃO</div><h2 style="margin-top:6px">${title}</h2>${subtitle ? `<p class="muted" style="font-size:11px;margin-top:6px">${subtitle}</p>` : ''}</div><button type="button" class="btn btn-plain btn-round" data-action="close-modal" aria-label="Fechar">${ico('close')}</button></div><div class="modal-body">${body}</div><div class="modal-foot">${footer}</div></div></div>`; }
function openModal(mode, id = '') { modal = mode; editId = id; render(); }
function closeModal() { modal = ''; editId = ''; render(); }
function renderModal() {
    if (modal === 'install') {
        const agent = navigator.userAgent || '';
        const ios = /iPhone|iPad|iPod/i.test(agent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const android = /Android/i.test(agent);
        const secure = location.protocol === 'https:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
        const notice = isLocalFile() ? `<div class="note note-warn">${ico('alert')}Você está visualizando um arquivo HTML local. Para instalar, publique os arquivos completos da PWA em HTTPS (por exemplo, GitHub Pages) ou abra em localhost. O HTML independente não é instalável.</div>` : !secure ? `<div class="note note-warn">${ico('alert')}O endereço atual não utiliza HTTPS/localhost. Instalação de PWA normalmente exige uma origem segura.</div>` : '';
        const instructions = ios ? `<strong>iPhone/iPad:</strong> abra no <strong>Safari</strong>, toque em <strong>Compartilhar</strong> e escolha <strong>Adicionar à Tela de Início</strong>, confirmando o nome GV-3901 parada.` :
            android ? `<strong>Android:</strong> no Chrome, abra o menu <strong>⋮</strong>, escolha <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong> e confirme.` :
                `<strong>Computador:</strong> no Chrome ou Edge, procure a opção <strong>Instalar aplicativo</strong> no menu do navegador ou o ícone de instalação na barra de endereço.`;
        return modalShell('Instalar GV-3901 parada', `<div class="install-guide">${notice}<div class="install-guide-name"><img src="./assets/icon-192.png" alt="Ícone do aplicativo" width="68" height="68"/><div><strong>GV-3901 parada</strong><p>Protótipo V0.3 DEMO · apenas dados fictícios</p></div></div><p>O botão inicia a instalação diretamente quando o navegador disponibiliza essa função. Caso contrário, use o procedimento manual:</p><div class="soft">${instructions}</div><p class="muted" style="font-size:11px">O botão pode não abrir uma confirmação se a PWA já estiver instalada, se faltar HTTPS ou se o navegador não permitir instalação direta. Uma atualização de nome em um app já instalado pode exigir reinstalação.</p></div>`, btn('Fechar', 'close-modal', 'btn-primary', 'check'));
    }
    if (modal === 'operator') {
        return modalShell('Selecionar operador (DEMO)', `<div class="note note-warn" style="margin-bottom:15px">Identificação manual para testes. Não há login e esta seleção não comprova quem fez os registros.</div><label class="form-field"><span class="field-label">Operador que está lançando os novos relatos</span><select class="input" name="active-operator">${authorOpts(st.activeOperator)}</select></label>`, `${btn('Cancelar', 'close-modal', 'btn-light')}${btn('Confirmar seleção', 'save-operator', 'btn-primary', 'check')}`);
    }
    if (modal === 'assign-report') {
        return modalShell('Responsável pelo relatório (DEMO)', `<div class="soft" style="margin-bottom:15px"><strong>Data:</strong> ${dateLong(st.reportDate)}<br/><strong>Período:</strong> ${escapeHtml(st.reportShift)}</div><label class="form-field"><span class="field-label">Operador que elaborará este relatório *</span><select class="input" name="report-operator">${authorOpts(reportResponsible())}</select></label><p class="muted tiny" style="margin-top:12px">A escolha fica guardada localmente para esta combinação de data e período. Não comprova presença nem assinatura.</p>`, `${btn('Cancelar', 'close-modal', 'btn-light')}${btn('Salvar responsável', 'save-report-operator', 'btn-primary', 'check')}`);
    }
    if (modal === 'event' || modal === 'event-edit') {
        const e = st.events.find(x => x.id === editId), isEdit = Boolean(e);
        const a = e || { at: st.reportDate + 'T14:30', category: 'Operação', equip: '', title: '', body: '', action: '', activity: '', author: st.activeOperator, shift: st.reportShift === 'Dia completo' ? 'Não definido' : st.reportShift, operationalDate: st.reportDate };
        return modalShell(isEdit ? 'Editar relato fictício' : 'Novo relato fictício', `<div class="note note-warn" style="margin-bottom:18px">${ico('info')}Use apenas conteúdo inventado. A demonstração não é um sistema corporativo de registros.</div>
 <form id="event-form" class="form-grid"><label class="form-field"><span class="field-label">Operador que registra *</span><select class="input" name="author" required>${authorOpts(a.author || '')}</select></label><label class="form-field"><span class="field-label">Turno / período *</span><select class="input" name="shift" required><option value="">Selecione o turno</option>${SHIFTS.map(sh => `<option ${a.shift === sh ? 'selected' : ''}>${sh}</option>`).join('')}</select></label>${field('Data operacional do turno *', 'operationalDate', a.operationalDate || a.at.slice(0, 10), 'date', 'required')}${field('Horário do fato *', 'at', a.at, 'datetime-local', 'required')}<label class="form-field"><span class="field-label">Categoria *</span><select class="input" name="category">${['Operação', 'Manutenção', 'Inspeção', 'Segurança', 'Restrição', 'Decisão'].map(c => `<option ${a.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
 ${field('Título do acontecimento *', 'title', a.title, 'text', 'required')}${field('Equipamento / frente', 'equip', a.equip)}<label class="form-field"><span class="field-label">Atividade associada</span><select class="input" name="activity"><option value="">Não vinculada</option>${activities.map(x => `<option value="${x.id}" ${a.activity === x.id ? 'selected' : ''}>${x.id} — ${escapeHtml(x.title)}</option>`).join('')}</select></label><div></div><div class="span-2">${txtField('Descrição do evento *', 'body', a.body, 5)}</div><div class="span-2">${txtField('Ação / encaminhamento', 'action', a.action, 3)}</div></form>
 ${isEdit ? `<div class="note" style="margin-top:15px">${ico('shield')}Edição de demonstração: a versão textual anterior será preservada no histórico local. Revisão ${e.revision}.</div>${e.history.length ? `<details style="margin-top:12px"><summary class="tiny">Ver ${e.history.length} versões anteriores</summary>${e.history.map(h => `<pre style="white-space:pre-wrap;font-size:10px;color:#718295">${escapeHtml(h)}</pre>`).join('')}</details>` : ''}` : ''}`, `${btn('Cancelar', 'close-modal', 'btn-light')}${btn(isEdit ? 'Salvar retificação DEMO' : 'Publicar registro DEMO', 'submit-event', 'btn-primary', 'check')}`, 'O horário do fato é diferente do momento de lançamento.');
    }
    if (modal === 'measure' || modal === 'measure-edit') {
        const m = st.measures.find(x => x.id === editId), a = m || { activity: st.selectedActivity || activities[0].id, date: SIM_DAY, amount: 0, note: '' };
        return modalShell(m ? 'Corrigir medição fictícia' : 'Registrar medição fictícia', `<div class="note note-warn" style="margin-bottom:16px">${ico('alert')}O valor é <strong>acumulado validado</strong>, não incremento diário. Uma correção substitui a medição original, sem somar em duplicidade.</div><form id="measure-form" class="form-grid"><label class="form-field span-2"><span class="field-label">Atividade demonstrativa *</span><select class="input" name="activity" ${m ? 'disabled' : ''}>${activities.map(x => `<option value="${x.id}" ${a.activity === x.id ? 'selected' : ''}>${x.id} — ${escapeHtml(x.title)} (${x.total} ${x.unit})</option>`).join('')}</select></label>${field('Data fictícia de medição *', 'date', a.date, 'date', 'required')}${field('Quantidade acumulada *', 'amount', String(a.amount), 'number', 'min="0" step="any" required')}<div class="span-2">${txtField('Observação de validação (simulação)', 'note', a.note, 3)}</div></form>`, `${btn('Cancelar', 'close-modal', 'btn-light')}${btn(m ? 'Salvar correção' : 'Salvar medição DEMO', 'submit-measure', 'btn-primary', 'check')}`, 'Os registros alteram os gráficos imediatamente.');
    }
    if (modal === 'issue') {
        return modalShell('Nova pendência fictícia', `<form id="issue-form" class="form-grid">${field('Título *', 'title', '', 'text', 'required')}${field('Responsável (DEMO)', 'owner', 'Equipe DEMO')}<label class="form-field"><span class="field-label">Criticidade</span><select class="input" name="priority"><option>Alta</option><option selected>Média</option><option>Baixa</option></select></label>${field('Prazo de exemplo', 'deadline', addDays(SIM_DAY, 3), 'date')}<label class="form-field span-2"><span class="field-label">Atividade vinculada</span><select class="input" name="activity">${activities.map(a => `<option value="${a.id}">${a.id} — ${escapeHtml(a.title)}</option>`).join('')}</select></label><div class="span-2">${txtField('Descrição da pendência *', 'description', '', 4)}</div></form>`, `${btn('Cancelar', 'close-modal', 'btn-light')}${btn('Cadastrar pendência DEMO', 'submit-issue', 'btn-primary', 'check')}`);
    }
    if (modal === 'joint') {
        const number = Number(editId), selected = st.joints[editId] || 'nao-iniciada';
        const options = [['nao-iniciada', 'Não iniciada'], ['preparada', 'Preparada'], ['soldada', 'Soldada'], ['inspecionada', 'Inspecionada'], ['aceita', 'Aceita'], ['reparo', 'Reparo / reinspeção']];
        return modalShell(`Posição SH2 ${number} — simulação`, `<div class="note note-warn" style="margin-bottom:16px">${ico('alert')}Esta é uma posição de treinamento, não uma ficha de soldagem real. Alterar a condição não valida execução de serviços.</div><div class="form-grid"><div class="soft"><span class="field-label">Fileira</span><h3 style="margin-top:5px">F${Math.ceil(number / 32)}</h3></div><div class="soft"><span class="field-label">Posição na fileira</span><h3 style="margin-top:5px">${((number - 1) % 32) + 1}</h3></div><label class="form-field span-2"><span class="field-label">Novo estado ilustrativo</span><select class="input" name="joint-status">${options.map(([v, l]) => `<option value="${v}" ${v === selected ? 'selected' : ''}>${l}</option>`).join('')}</select></label></div>`, `${btn('Cancelar', 'close-modal', 'btn-light')}${btn('Aplicar status DEMO', 'submit-joint', 'btn-primary', 'check')}`);
    }
    if (modal === 'handover') {
        return modalShell('Passagem de turno — rascunho DEMO', `<div class="note note-warn" style="margin-bottom:17px">${ico('info')}Síntese fictícia editável, elaborada a partir dos dados locais. Não representa recebimento formal de turno.</div><div class="form-grid" style="margin-bottom:15px"><label class="form-field"><span class="field-label">Operador que entrega</span><select class="input" name="handover-from">${authorOpts(reportResponsible() || st.activeOperator)}</select></label><label class="form-field"><span class="field-label">Operador que recebe</span><select class="input" name="handover-to">${authorOpts('', 'Recebedor não informado')}</select></label></div><div class="form-field"><span class="field-label">Resumo de eventos demonstrativos</span><textarea class="input" name="handover-text" rows="11">${escapeHtml(`Turno demonstrativo em ${dateLong(st.reportDate)} (${st.reportShift})\n\nOCORRÊNCIAS:\n${evSorted().slice(0, 3).map(e => `- ${timeShort(e.at)}: ${e.title}`).join('\n')}\n\nPENDÊNCIAS ABERTAS:\n${issuesOpen().map(i => `- ${i.title} — responsável ${i.owner}`).join('\n')}\n\nNota: todos os fatos e responsáveis acima são fictícios.`)}</textarea></div>`, `${btn('Voltar', 'close-modal', 'btn-light')}${btn('Copiar resumo', 'copy-handover', 'btn-primary', 'file')}`);
    }
    if (modal === 'info') {
        const titles = { baseline: ['Linhas de base e controle de mudanças', 'A baseline original B0 permanece imutável. Revisões B1, B2... exigirão motivo, autor, data e aprovação formal. Aqui há apenas um Gantt sintético B0, sem importação nem persistência central.'], method: ['Regras funcionais da Curva S', 'Avanço global = 100 × Σ(peso × fração validada) / Σ(pesos). A projeção real precisará considerar calendário, produtividade confiável, predecessoras e restrições, com indicadores de qualidade dos dados. O cenário deste protótipo é apenas ilustrativo.'], sh2: ['Matriz SH2 / fornalha', 'A estrutura visual de seis fileiras por 32 posições corresponde ao requisito documental da especificação. Nenhuma junta possui situação de campo pré-carregada. A fornalha requer reconciliação do escopo antes de medições oficiais.'], evidence: ['Evidências e arquivos', 'Esta versão não recebe anexos reais. O módulo final deverá implementar upload para ambiente corporativo autorizado, verificações de tipo e tamanho, permissão e vínculo com registros.'] };
        const [title, content] = titles[editId] || ['Informação', 'Módulo ilustrativo de demonstração.'];
        return modalShell(title, `<p style="font-size:13px;line-height:1.85;color:#52687c">${content}</p><div class="note note-warn section-space">${ico('alert')}Consulte a especificação funcional V1.2 congelada incluída no pacote.</div>`, btn('Entendido', 'close-modal', 'btn-primary'));
    }
    return '';
}
function renderMobileMore() { const wrapper = document.createElement('div'); wrapper.className = 'modal-backdrop'; wrapper.innerHTML = `<div class="modal" style="max-width:390px"><div class="modal-head"><h2>Todos os módulos</h2><button class="btn btn-plain btn-round" data-action="mobile-more" aria-label="Fechar">${ico('close')}</button></div><div class="modal-body" style="display:grid;gap:6px">${NAV.map(n => `<button class="btn btn-light" style="justify-content:flex-start" data-action="nav:${n.id}">${ico(n.icon)}${n.label}</button>`).join('')}</div></div>`; document.body.appendChild(wrapper); wrapper.id = 'mobile-more-overlay'; }
function navigate(to) { const next = to; if (!NAV.some(n => n.id === next))
    return; page = next; modal = ''; navMobileMore = false; searchText = ''; statusFilter = 'Todas'; location.hash = '#/' + page; window.scrollTo({ top: 0, behavior: 'instant' }); document.getElementById('mobile-more-overlay')?.remove(); render(); }
function downloadText(content, name, mime = 'application/json') { const b = new Blob([content], { type: mime }); const url = URL.createObjectURL(b); const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 800); }
function exportData() { const exportObj = { _aviso: 'DADOS 100% FICTÍCIOS — sem validade operacional', _version: VERSION, _cutoff: SIM_DAY, activities, records: st }; downloadText(JSON.stringify(exportObj, null, 2), 'GV3901_DEMO_backup_ficticio.json'); notify('Backup fictício exportado para seu dispositivo.'); }
function exportReport() { const content = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/><title>Relatório GV-3901 DEMO</title><style>body{font:14px Arial,sans-serif;color:#234;max-width:850px;margin:30px auto}h2,h3{color:#205670}table{width:100%;border-collapse:collapse}th,td{padding:8px;text-align:left;border-bottom:1px solid #ddd}.soft{background:#f3f6f9;padding:10px;margin:5px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.eyebrow,.muted{color:#677;font-size:12px}.report-section{margin-top:25px}.report-head{border-bottom:3px solid #286b88;padding-bottom:15px}.mini-meta{display:flex;gap:10px}</style></head><body>${reportContent()}<p style="color:#8a5a22">Gerado exclusivamente para testar a interface. Não é documento operacional.</p></body></html>`; downloadText(content, 'GV3901_relatorio_DEMO.html', 'text/html'); }
function resetDemo() { if (!confirm('Restaurar todos os dados FICTÍCIOS do protótipo neste navegador? Suas edições locais serão perdidas.'))
    return; st = initialState(); save('Base de demonstração restaurada.'); notify('Amostras fictícias restauradas.'); render(); }
function submitEvent() { const at = formVal('at'), title = formVal('title'), body = formVal('body'), category = formVal('category'); if (!at || !title || !body) {
    notify('Preencha horário, título e descrição fictícia.');
    return;
} const author = formVal('author'), shift = formVal('shift'), operationalDate = formVal('operationalDate'); if (!OPERATORS.includes(author) && !st.events.some(x => x.id === editId && x.author === author)) {
    notify('Selecione o operador responsável pelo registro.');
    return;
} if (!SHIFTS.includes(shift) || !/^\d{4}-\d{2}-\d{2}$/.test(operationalDate)) {
    notify('Informe o turno e a data operacional.');
    return;
} const e = st.events.find(x => x.id === editId); if (e) {
    e.history.push(JSON.stringify({ at: e.at, title: e.title, body: e.body, action: e.action, equip: e.equip, category: e.category, activity: e.activity, author: e.author, shift: shiftForEvent(e), operationalDate: dateForEvent(e), revision: e.revision }));
    Object.assign(e, { at, title, body, category, equip: formVal('equip'), activity: formVal('activity'), action: formVal('action'), author, shift, operationalDate, revision: e.revision + 1, status: 'Retificado' });
    save(`Relato ${e.id} retificado.`);
    notify(`Retificação ${e.id} salva localmente.`);
}
else {
    const next = String(Math.max(0, ...st.events.map(e => Number(e.id.replace(/[^0-9]/g, '')) || 0)) + 1).padStart(3, '0');
    const id = `EVT-${next}`;
    st.events.push({ id, at, created: new Date().toISOString(), category, title, body, equip: formVal('equip'), activity: formVal('activity'), action: formVal('action'), author, shift, operationalDate, status: 'Publicado', revision: 1, history: [] });
    save(`Relato fictício ${id} incluído.`);
    notify(`${id} criado no navegador.`);
} modal = ''; page = 'diario'; render(); }
function submitMeasure() {
    const id = formVal('activity') || st.measures.find(x => x.id === editId)?.activity || '', a = activities.find(x => x.id === id), date = formVal('date'), amount = Number(formVal('amount'));
    if (!a || !date || !Number.isFinite(amount) || amount < 0 || amount > a.total) {
        notify('Quantidade inválida. Informe valor entre zero e o total da atividade.');
        return;
    }
    const existing = st.measures.find(x => x.id === editId);
    const others = st.measures.filter(m => m.activity === id && m.id !== editId);
    const prior = others.filter(m => m.date < date).sort((a, b) => a.date.localeCompare(b.date)).at(-1);
    const after = others.filter(m => m.date > date).sort((a, b) => a.date.localeCompare(b.date))[0];
    if (prior && amount < prior.amount) {
        notify(`Quantidade menor que a medição anterior (${prior.amount}). Corrija a série para mantê-la cumulativa.`);
        return;
    }
    if (after && amount > after.amount) {
        notify(`Quantidade maior que a medição posterior (${after.amount}). Corrija a série para mantê-la cumulativa.`);
        return;
    }
    if (others.some(m => m.date === date)) {
        notify('Já há uma medição nessa data para a atividade. Edite a existente para evitar duplicidade.');
        return;
    }
    if (existing) {
        Object.assign(existing, { date, amount, note: formVal('note') });
        save(`Medição fictícia ${existing.id} corrigida.`);
        notify('Medição corrigida; avanço recalculado.');
    }
    else {
        const uid = `MED-${String(Math.max(0, ...st.measures.map(m => Number(m.id.replace(/\D/g, '')) || 0)) + 1).padStart(3, '0')}`;
        st.measures.push({ id: uid, activity: id, date, amount, note: formVal('note'), created: new Date().toISOString() });
        save(`Medição fictícia ${uid} inserida.`);
        notify('Medição salva; Curva S atualizada.');
    }
    modal = '';
    page = 'evolucao';
    render();
}
function submitIssue() { const title = formVal('title'), description = formVal('description'); if (!title || !description) {
    notify('Informe título e descrição da pendência fictícia.');
    return;
} const id = `PEN-${String(Math.max(0, ...st.issues.map(x => Number(x.id.replace(/\D/g, '')) || 0)) + 1).padStart(3, '0')}`; st.issues.unshift({ id, title, description, owner: formVal('owner'), deadline: formVal('deadline'), priority: formVal('priority'), status: 'Aberta', activity: formVal('activity') }); save(`Pendência fictícia ${id} adicionada.`); modal = ''; page = 'pendencias'; notify('Pendência demonstrativa criada.'); render(); }
function submitJoint() { const next = formVal('joint-status'); const allowed = ['nao-iniciada', 'preparada', 'soldada', 'inspecionada', 'aceita', 'reparo']; if (!allowed.includes(next))
    return; if (next === 'nao-iniciada')
    delete st.joints[editId];
else
    st.joints[editId] = next; save(`Posição SH2 DEMO ${editId} alterada para ${next}.`); modal = ''; notify('Posição de simulação atualizada.'); render(); }
function actionRouter(action, el) { const [act, id = ''] = action.split(':'); if (act === 'nav') {
    navigate(id);
    return;
} if (act === 'choose-operator')
    return openModal('operator'); if (act === 'assign-report')
    return openModal('assign-report'); if (act === 'save-operator') {
    const name = formVal('active-operator');
    if (!name || !OPERATORS.includes(name)) {
        notify('Selecione Robson Almeida ou Pedro Dantas.');
        return;
    }
    st.activeOperator = name;
    save(`Operador de demonstração selecionado: ${name}.`);
    modal = '';
    notify('Operador selecionado para novos registros.');
    render();
    return;
} if (act === 'save-report-operator') {
    const name = formVal('report-operator');
    if (!name || !OPERATORS.includes(name)) {
        notify('Selecione o responsável pelo relatório.');
        return;
    }
    st.reportAssignments[assignmentKey(st.reportDate, st.reportShift)] = name;
    save(`Responsável pelo relatório de ${st.reportDate}, ${st.reportShift}: ${name}.`);
    modal = '';
    notify('Responsável pelo relatório salvo localmente.');
    render();
    return;
} if (act === 'install')
    return void requestInstall(); if (act === 'install-help')
    return openModal('install'); if (act === 'new-event')
    return openModal('event'); if (act === 'new-measure')
    return openModal('measure'); if (act === 'new-issue')
    return openModal('issue'); if (act === 'edit-event')
    return openModal('event-edit', id || el.dataset.id || ''); if (act === 'edit-measure')
    return openModal('measure-edit', id); if (act === 'handover')
    return openModal('handover'); if (act === 'row') {
    st.jointRow = Number(id);
    save();
    render();
    return;
} if (act === 'joint')
    return openModal('joint', id); if (act === 'close-modal')
    return closeModal(); if (act === 'scenario') {
    st.scenario = id;
    save();
    render();
    return;
} if (act === 'report') {
    reportMode = id;
    if (id === 'diario')
        st.reportShift = 'Dia completo';
    else if (id === 'turno' && st.reportShift === 'Dia completo')
        st.reportShift = 'Diurno';
    save();
    render();
    return;
} if (act === 'submit-event') {
    submitEvent();
    return;
} if (act === 'submit-measure') {
    submitMeasure();
    return;
} if (act === 'submit-issue') {
    submitIssue();
    return;
} if (act === 'submit-joint') {
    submitJoint();
    return;
} if (act === 'toggle-issue') {
    const issue = st.issues.find(i => i.id === id);
    if (!issue)
        return;
    issue.status = issue.status === 'Concluída' ? 'Aberta' : 'Concluída';
    save(`Pendência DEMO ${id} alterada para ${issue.status}.`);
    render();
    notify(`Situação atualizada: ${issue.status}.`);
    return;
} if (act === 'mobile-more') {
    navMobileMore = !navMobileMore;
    document.getElementById('mobile-more-overlay')?.remove();
    render();
    return;
} if (act === 'info') {
    openModal('info', id);
    return;
} if (act === 'reset-demo')
    return resetDemo(); if (act === 'export-data')
    return exportData(); if (act === 'print-report') {
    window.print();
    return;
} if (act === 'export-report')
    return exportReport(); if (act === 'copy-handover') {
    const from = formVal('handover-from') || 'Não definido', to = formVal('handover-to') || 'Não definido';
    const txt = `Operador que entrega: ${from}\nOperador que recebe: ${to}\n\n${formVal('handover-text')}`;
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(txt).then(() => notify('Resumo fictício copiado.')).catch(() => notify('Não foi possível copiar; selecione o texto manualmente.'));
    }
    else
        notify('Selecione o texto do formulário para copiar.');
    return;
} if (act === 'evidence') {
    const e = st.evidences.find(x => x.id === id);
    notify(e ? `${e.title} — metadados fictícios, sem anexo real.` : 'Documento não encontrado.');
    return;
} }
document.addEventListener('click', e => { const element = e.target.closest('[data-action]'); if (element) {
    e.preventDefault();
    actionRouter(element.dataset.action || '', element);
}
else if (e.target.id === 'backdrop') {
    closeModal();
} });
document.addEventListener('change', e => { const target = e.target; if (target.id === 'report-date') {
    if (target.value) {
        st.reportDate = target.value;
        save();
        render();
    }
    return;
} if (target.id === 'report-shift') {
    st.reportShift = target.value;
    save();
    render();
    return;
} if (['category-filter', 'issue-filter'].includes(target.id)) {
    statusFilter = target.value;
    render();
} });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal) {
    closeModal();
} });
document.addEventListener('input', e => { const input = e.target; if (['search-events', 'search-issues'].includes(input.id)) {
    searchText = input.value;
    const point = input.selectionStart;
    render();
    const restored = document.getElementById(input.id);
    restored?.focus();
    if (restored && point !== null)
        restored.setSelectionRange(point, point);
} });
window.addEventListener('hashchange', () => { const parsed = location.hash.replace(/^#\/?/, '').split('/')[0]; if (parsed !== page && NAV.some(n => n.id === parsed)) {
    page = parsed;
    render();
} });
const fromHash = location.hash.replace(/^#\/?/, '').split('/')[0];
if (NAV.some(n => n.id === fromHash))
    page = fromHash;
window.addEventListener('beforeinstallprompt', (ev) => { ev.preventDefault(); deferredInstallPrompt = ev; updateInstallControls(); });
window.addEventListener('appinstalled', () => { installedThisSession = true; deferredInstallPrompt = null; render(); notify('GV-3901 parada instalado com sucesso.'); });
window.matchMedia?.('(display-mode: standalone)').addEventListener?.('change', () => render());
render();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => { }));
}
