(() => {
  const body = document.body;
  const caseId = body.dataset.caseId || (location.pathname.includes('chapter-9') ? 'chapter-9-loss-coefficient-hexa-grille' : 'chapter-8-mesh-model-enhancement');
  const prefix = `icepak-${caseId}-`;
  const isChapter9 = document.querySelector('[data-check]') !== null;
  const progressKey = `${prefix}progress`;
  const progressStore = JSON.parse(localStorage.getItem(progressKey) || '{}');
  const progressInputs = () => [...document.querySelectorAll('[data-progress], [data-check]')];
  const records = () => [...document.querySelectorAll('[data-record]')];
  const setStatus = (message) => { const el = document.getElementById('record-status'); if (el) el.textContent = message; };
  function updateProgress() {
    const inputs = progressInputs();
    const done = inputs.filter((input) => input.checked).length;
    const total = inputs.length;
    const text = document.getElementById('progress-text');
    const bar = document.getElementById('progress-bar');
    if (text) text.textContent = `${done} / ${total}`;
    if (bar) { bar.style.width = `${total ? done / total * 100 : 0}%`; bar.parentElement?.setAttribute('aria-valuenow', done); }
    document.querySelectorAll('[data-stage]').forEach((stage) => {
      const stageInputs = [...stage.querySelectorAll('[data-progress], [data-check]')];
      stage.classList.toggle('done', stageInputs.length > 0 && stageInputs.every((input) => input.checked));
    });
  }
  function persist() {
    progressInputs().forEach((input) => {
      const id = input.dataset.progress || `check-${input.dataset.check}`;
      progressStore[id] = input.checked;
    });
    localStorage.setItem(progressKey, JSON.stringify(progressStore));
    records().forEach((input) => localStorage.setItem(`${prefix}${input.dataset.record}`, input.value));
    updateProgress();
  }
  function setupChapter8() {
    const steps = [...document.querySelectorAll('.step')];
    const links = document.getElementById('step-links');
    steps.forEach((step, index) => {
      const stepId = `step-${index + 1}`;
      step.dataset.stepId = stepId; step.id = stepId;
      if (links) { const a = document.createElement('a'); a.href = `#${stepId}`; a.textContent = step.querySelector('summary')?.textContent || stepId; links.appendChild(a); }
      step.querySelector('summary')?.addEventListener('click', () => history.replaceState(null, '', `#${stepId}`));
      step.querySelectorAll('h4').forEach((heading) => { if (heading.textContent.includes('背后逻辑')) heading.classList.add('logic-title'); if (heading.textContent.includes('检查项')) heading.classList.add('check-title'); });
      const body = step.querySelector('.step-body');
      if (!body || body.querySelector('[data-progress]')) return;
      const checklist = document.createElement('div'); checklist.className = 'step-checklist';
      checklist.innerHTML = `<label><input type="checkbox" data-progress="${stepId}-操作"> 我已完成 Icepak 操作</label><label><input type="checkbox" data-progress="${stepId}-逻辑"> 我理解这一设置的原因</label><label><input type="checkbox" data-progress="${stepId}-检查"> 我已检查结果</label>`;
      body.appendChild(checklist);
    });
  }
  if (!isChapter9) setupChapter8();
  progressInputs().forEach((input) => { const id = input.dataset.progress || `check-${input.dataset.check}`; input.checked = progressStore[id] === true || localStorage.getItem(`${prefix}${id}`) === '1'; input.addEventListener('change', persist); });
  records().forEach((input) => { input.value = localStorage.getItem(`${prefix}${input.dataset.record}`) || ''; input.addEventListener('input', persist); });
  updateProgress();

  function collectRecord() {
    return { caseId, version: isChapter9 ? 1 : undefined, exportedAt: new Date().toISOString(), progress: Object.fromEntries(progressInputs().map((input) => [input.dataset.progress || input.dataset.check, input.checked])), values: Object.fromEntries(records().map((input) => [input.dataset.record, input.value])) };
  }
  function applyRecord(record) {
    if (record.caseId !== caseId) throw new Error('案例不匹配（caseId 不一致）');
    const incoming = record.progress || record.checks || {};
    progressInputs().forEach((input) => { const id = input.dataset.progress || input.dataset.check; input.checked = incoming[id] === true; });
    const values = record.values || record.records || {};
    records().forEach((input) => { input.value = typeof values[input.dataset.record] === 'string' ? values[input.dataset.record] : ''; });
    persist(); setStatus('学习记录已导入并保存到当前浏览器。');
  }
  const exportButton = document.getElementById('export-record');
  if (exportButton) exportButton.addEventListener('click', () => { const blob = new Blob([JSON.stringify(collectRecord(), null, 2)], {type: 'application/json'}); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `${caseId}-learning-record.json`; link.click(); URL.revokeObjectURL(url); setStatus('学习记录已导出。'); });
  const importButton = document.getElementById('import-record');
  const fileInput = document.getElementById('record-file') || (importButton?.querySelector('input[type=file]'));
  if (importButton && fileInput === document.getElementById('record-file')) importButton.addEventListener('click', () => fileInput.click());
  fileInput?.addEventListener('change', (event) => { const file = event.target.files[0]; if (!file) return; file.text().then((text) => applyRecord(JSON.parse(text))).catch((error) => setStatus(`导入失败：${error.message}`)); event.target.value = ''; });
  const clearButton = document.getElementById('clear-record');
  clearButton?.addEventListener('click', () => { if (!confirm('确定清除当前案例的本地学习记录吗？')) return; Object.keys(localStorage).filter((key) => key.startsWith(prefix)).forEach((key) => localStorage.removeItem(key)); location.reload(); });

  const lightbox = document.getElementById('lightbox'); const image = document.getElementById('lightbox-image');
  if (lightbox && image) { let caption; if (!lightbox.querySelector('button')) lightbox.insertAdjacentHTML('beforeend', '<button type="button" aria-label="关闭图片">×</button><figcaption id="lightbox-caption"></figcaption>'); caption = lightbox.querySelector('figcaption'); const close = () => { lightbox.classList.remove('open'); image.src = ''; }; lightbox.querySelector('button')?.addEventListener('click', close); document.querySelectorAll('.gallery a').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); const thumbnail = link.querySelector('img'); image.src = link.href; image.alt = thumbnail?.alt || '案例配图'; if (caption) caption.textContent = image.alt; image.classList.remove('zoomed'); lightbox.classList.add('open'); image.focus?.(); })); lightbox.addEventListener('click', (event) => { if (event.target === lightbox) close(); }); image.addEventListener('click', (event) => { event.stopPropagation(); image.classList.toggle('zoomed'); }); document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); }); }
})();
