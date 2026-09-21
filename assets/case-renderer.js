(() => {
  const id = new URLSearchParams(location.search).get('id') || 'chapter-8-mesh-model-enhancement';
  const content = document.getElementById('case-content');
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  const sourceTag = (source) => `<span class="source-tag source-${escapeHtml(source.className)}">${escapeHtml(source.label)}</span>`;
  const list = (items) => `<ul>${(items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  const image = (item) => `<a href="${escapeHtml(item.src)}"><img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}"><span>${escapeHtml(item.caption)}</span></a>`;
  const render = (data) => {
    document.body.dataset.caseId = data.id;
    document.title = `Icepak 案例学习 | ${data.titleZh}`;
    document.getElementById('case-eyebrow').textContent = `${data.source} · ${data.caseType}`;
    document.getElementById('case-title').textContent = data.titleZh;
    document.getElementById('case-summary').textContent = data.summary;
    const nav = document.getElementById('case-nav');
    nav.insertAdjacentHTML('beforeend', '<a href="#overview">案例概览</a><a href="#flow">学习流程</a><a href="#steps">操作步骤</a><a href="#results">结果记录</a><a href="#practice">复现与迁移</a>');
    const steps = data.steps || [];
    content.innerHTML = `
      <section id="overview">
        <h2>案例概览</h2>
        <div class="status-banner"><strong>内容状态：${escapeHtml(data.statusLabel)}</strong><span>来源版本：${escapeHtml(data.version)}</span><span>${escapeHtml(data.versionNote)}</span></div>
        <div class="tags">${(data.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
        <h3>学习目标</h3>${list(data.learningObjectives)}
        <div class="note"><strong>文件准备：</strong>${escapeHtml(data.fileNote || '请先准备本案例所需的模型文件。')}</div>
      </section>
      <section id="flow"><h2>学习流程</h2><div class="flow"><table><thead><tr><th>阶段</th><th>动作</th><th>完成判断</th></tr></thead><tbody>${(data.flow || []).map((row) => `<tr><td>${escapeHtml(row.stage)}</td><td>${escapeHtml(row.action)}</td><td>${escapeHtml(row.check)}</td></tr>`).join('')}</tbody></table></div></section>
      <section id="steps"><h2>操作步骤</h2>${steps.map((step, index) => `
        <details class="step" data-stage="${index + 1}"${index === 0 ? ' open' : ''}>
          <summary>${escapeHtml(step.title)}</summary>
          <div class="step-body">
            <div>${(step.sources || []).map(sourceTag).join('')}</div>
            <h4>操作</h4><p>${escapeHtml(step.operation)}</p>
            <h4 class="logic-title">背后逻辑</h4><p>${escapeHtml(step.logic)}</p>
            <h4 class="check-title">验证方法</h4><p>${escapeHtml(step.check)}</p>
            ${(step.images || []).length ? `<div class="gallery">${step.images.map(image).join('')}</div>` : ''}
            <div class="step-checklist"><label><input type="checkbox" data-progress="step-${index + 1}-done"> 我已完成本步骤</label><label><input type="checkbox" data-progress="step-${index + 1}-understood"> 我理解背后逻辑</label></div>
          </div>
        </details>`).join('')}</section>
      <section id="results"><h2>结果与学习者记录</h2><p>${escapeHtml(data.resultNote || '请记录实际操作结果，并与官方参考进行区分。')}</p><label for="software-version">Icepak 版本</label><input class="actual-input" id="software-version" data-record="software-version" placeholder="例如：2022 R1"><label for="experiment-notes">观察与结论</label><textarea class="notes" id="experiment-notes" data-record="experiment-notes" placeholder="记录实际观察"></textarea></section>
      <section id="practice"><h2>复现与迁移</h2><p class="muted">先独立思考，再展开答案。</p>${(data.practice || []).map((item) => `<details class="answer"><summary>${escapeHtml(item.question)}</summary><div class="answer-body">${sourceTag(item.source)}${escapeHtml(item.answer)}</div></details>`).join('')}</section>`;
    const meta = document.createElement('meta');
    meta.name = 'case-rendered';
    meta.content = 'true';
    document.head.appendChild(meta);
    const app = document.createElement('script');
    app.src = 'assets/app.js';
    document.body.appendChild(app);
  };
  fetch(`content/cases/${encodeURIComponent(id)}.json`).then((response) => {
    if (!response.ok) throw new Error(`案例文件不存在：${id}`);
    return response.json();
  }).then(render).catch((error) => {
    content.innerHTML = `<section><h2>案例加载失败</h2><p>${escapeHtml(error.message)}</p><p class="muted">请使用本地静态服务器打开 case.html，而不是直接双击文件。</p></section>`;
  });
})();
