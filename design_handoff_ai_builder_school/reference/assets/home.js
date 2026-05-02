(function(){
  function ready(fn){ if (window.ABS_CONTENT) fn(); else setTimeout(()=>ready(fn),20); }
  ready(() => {
    const C = window.ABS_CONTENT;

    // Loop list
    const ll = document.getElementById('loop-list');
    if (ll) {
      ll.innerHTML = C.loop.map(s => `
        <li data-num="${s.num}">
          <span class="n tnum">${s.num}</span>
          <span><strong>${s.title}</strong><small>${s.sub}</small></span>
          <span class="v">${s.verb}</span>
        </li>
      `).join('');
      const lnum = document.getElementById('loop-num');
      const lverb = document.getElementById('loop-verb');
      let cur = 0; let t;
      function set(i){
        cur = i % C.loop.length;
        const lis = ll.querySelectorAll('li');
        if (!lis.length) { stop(); return; }
        lis.forEach((el,idx) => el.classList.toggle('is-active', idx === cur));
        const ln = document.getElementById('loop-num');
        const lv = document.getElementById('loop-verb');
        if (ln) ln.textContent = C.loop[cur].num;
        if (lv) lv.textContent = C.loop[cur].verb;
      }
      function start(){ stop(); t = setInterval(() => set(cur+1), 2800); }
      function stop(){ if (t) clearInterval(t); t = null; }
      ll.querySelectorAll('li').forEach((el,idx) => {
        el.addEventListener('mouseenter', () => { set(idx); stop(); });
      });
      ll.addEventListener('mouseleave', start);
      set(0); start();
    }

    // Week path
    const wp = document.getElementById('weekpath');
    if (wp) {
      const byWeek = C.phases.filter(p => p.week).sort((a,b)=>a.week-b.week);
      wp.innerHTML = byWeek.map(p => `
        <li class="${p.week===8?'is-capstone':''}" onclick="location.href='phase.html?slug=${p.slug}'">
          <div>
            <div class="wk">WEEK ${String(p.week).padStart(2,'0')} · PHASE ${p.num}</div>
            <div class="wp-title">${p.titleKo}</div>
          </div>
          <div class="wp-deliv">${p.deliverables[0] || ''}</div>
        </li>
      `).join('');
    }

    // Tracks
    const tc = document.getElementById('track-cards');
    if (tc) {
      tc.innerHTML = C.tracks.slice(0, 3).map(t => `
        <a href="tracks.html#${t.slug}">
          <div class="tper">${t.weeks}주 · 필수 ${t.required.length} Phase</div>
          <h3>${t.title}</h3>
          <p>${t.learner}</p>
          <p style="color: var(--ink-2); font-weight: 500;">${t.promise}</p>
          <div class="tfoot"><span>자세히 보기</span><span class="arrow mono">→</span></div>
        </a>
      `).join('');
    }
  });
})();
