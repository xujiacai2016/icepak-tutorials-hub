(() => {
  const list = document.getElementById('case-list');
  const status = document.getElementById('list-status');
  const caseCount = document.getElementById('case-count');
  const verifiedCount = document.getElementById('verified-count');
  const inProgressCount = document.getElementById('in-progress-count');

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
  const statusClass = (value) => ({
    verified: 'status-verified', 'partially-verified': 'status-partial',
    draft: 'status-draft', planned: 'status-planned'
  }[value] || 'status-draft');
  const statusLabel = (item) => item.contentStatusLabel || ({
    verified: '已验证', 'partially-verified': '部分验证', draft: '草稿', planned: '计划中'
  }[item.status] || '待整理');

  const renderCase = (item) => {
    const tags = (item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
    const chapterMatch = item.id.match(/^chapter-(\d+)/i);
    const chapter = chapterMatch ? `Chapter ${chapterMatch[1]}` : 'Case';
    const primaryLink = item.legacyPage || `case.html?id=${encodeURIComponent(item.id)}`;
    const primaryLabel = item.legacyPage ? '打开完整案例' : '开始学习';
    const templateLink = item.legacyPage
      ? `<a class="case-template-link" href="case.html?id=${encodeURIComponent(item.id)}">查看通用页面预览</a>`
      : '';
    return `<article class="case-card">
      <div class="case-card-top"><span class="case-chapter">${escapeHtml(chapter)}</span>
        <span class="case-status ${statusClass(item.status)}">${escapeHtml(statusLabel(item))}</span></div>
      <h3>${escapeHtml(item.titleZh || item.title)}</h3>
      <p class="case-title-en">${escapeHtml(item.title || '')}</p>
      <div class="case-meta"><span>类型：${escapeHtml(item.caseType || '未分类')}</span>
        <span>难度：${escapeHtml(item.difficulty || '未标注')}</span>
        <span>预计：${escapeHtml(item.estimatedTime || '未标注')}</span></div>
      <div class="tags">${tags}</div>
      <p class="case-source">${escapeHtml(item.source || '')}</p>
      ${item.contentNote ? `<p class="case-content-note">${escapeHtml(item.contentNote)}</p>` : ''}
      <div class="case-actions">
        <a class="button primary case-button" href="${escapeHtml(primaryLink)}">${primaryLabel}</a>
        ${templateLink}
      </div>
    </article>`;
  };

  fetch('content/cases/index.json')
    .then((response) => { if (!response.ok) throw new Error(`案例注册表加载失败（${response.status}）`); return response.json(); })
    .then((data) => {
      const cases = Array.isArray(data.cases) ? data.cases : [];
      caseCount.textContent = cases.length;
      verifiedCount.textContent = cases.filter((item) => item.status === 'verified').length;
      inProgressCount.textContent = cases.filter((item) => ['draft', 'partially-verified', 'planned'].includes(item.status)).length;
      list.innerHTML = cases.length ? cases.map(renderCase).join('') : '<p class="muted">暂无可用案例。</p>';
      status.textContent = `${cases.length} 个案例`;
    })
    .catch((error) => {
      list.innerHTML = `<div class="home-error"><strong>案例目录暂时无法加载</strong><p>${escapeHtml(error.message)}</p><p>请使用 Live Server 或其他本地静态服务器打开首页。</p></div>`;
      status.textContent = '加载失败';
    });
})();
