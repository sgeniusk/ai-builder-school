/* Shared layout: header, footer. No tweaks panel. */
(function(){
  const NAV = [
    { href:'index.html', label:'홈' },
    { href:'start.html', label:'학습 시작' },
    { href:'curriculum.html', label:'커리큘럼' },
    { href:'tracks.html', label:'트랙' },
    { href:'projects.html', label:'프로젝트' },
    { href:'templates.html', label:'템플릿' },
    { href:'about.html', label:'소개' },
  ];
  function currentPage(){ return (location.pathname.split('/').pop() || 'index.html').toLowerCase(); }

  function renderHeader(){
    const here = currentPage();
    const nav = NAV.map(n => {
      const cur = n.href === here ? ' aria-current="page"' : '';
      return `<a href="${n.href}"${cur}>${n.label}</a>`;
    }).join('');
    return `
      <header class="site-header">
        <div class="wrap row">
          <a class="brand" href="index.html">
            <span class="mark" aria-hidden="true"></span>
            <span>AI Builder School</span>
          </a>
          <nav class="nav">${nav}</nav>
          <a class="btn" href="start.html" style="padding:9px 16px; font-size:13px;">
            학습 시작 <span class="arrow">→</span>
          </a>
        </div>
      </header>
    `;
  }

  function renderFooter(){
    return `
      <footer class="site-footer">
        <div class="wrap">
          <div class="cols">
            <div>
              <div class="brand" style="margin-bottom:16px;">
                <span class="mark" aria-hidden="true"></span>
                <span>AI Builder School</span>
              </div>
              <p style="max-width: 40ch; color: var(--ink-3); font-size: 14px; margin: 0;">
                한국어권 학습자를 위한 실전형 AI 빌더 스쿨. 뉴스가 아닌 산출물을 쌓는 커리큘럼.
              </p>
            </div>
            <div>
              <h4>학습</h4>
              <ul>
                <li><a href="start.html">학습 시작</a></li>
                <li><a href="curriculum.html">12 Phase</a></li>
                <li><a href="tracks.html">5 트랙</a></li>
                <li><a href="projects.html">프로젝트</a></li>
                <li><a href="templates.html">템플릿</a></li>
              </ul>
            </div>
            <div>
              <h4>제품</h4>
              <ul>
                <li><a href="about.html">소개</a></li>
                <li><a href="about.html#principles">원칙</a></li>
                <li><a href="about.html#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>도구</h4>
              <ul>
                <li><a href="#">Codex</a></li>
                <li><a href="#">Claude Code</a></li>
                <li><a href="#">Cursor Agent</a></li>
              </ul>
            </div>
          </div>
          <div class="baseline">
            <span>© 2026 AI Builder School</span>
            <span>Seoul · Build · Verify · Ship</span>
          </div>
        </div>
      </footer>
    `;
  }

  function mount(){
    const h = document.createElement('div'); h.innerHTML = renderHeader();
    document.body.insertBefore(h.firstElementChild, document.body.firstChild);
    if (!document.querySelector('[data-no-footer]')) {
      const f = document.createElement('div'); f.innerHTML = renderFooter();
      document.body.appendChild(f.firstElementChild);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
