// Dedicated DSA Prep Controller: Topic-wise Sheet, Progress Tracker, Solution Modal, Notes

const DsaModule = (() => {
  let topics = [];
  let problems = [];
  let userProgress = {}; // problem_id -> { status: 'solved'|'unsolved', is_bookmarked: 0|1, user_notes: '', user_code: '' }
  let activeTopic = 'all';

  const init = async () => {
    topics = typeof DSA_TOPICS !== 'undefined' ? DSA_TOPICS : [];
    problems = typeof DSA_PROBLEMS !== 'undefined' ? DSA_PROBLEMS : [];
    await fetchProgress();
    setupEventListeners();
    renderOverview();
    renderProblems();
  };

  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/dsa/progress');
      if (res.ok) {
        const data = await res.json();
        userProgress = data.progress || {};
      }
    } catch (err) {
      console.warn('API error, reading dsa progress from localStorage:', err);
      const saved = localStorage.getItem('dsa_progress');
      userProgress = saved ? JSON.parse(saved) : {};
    }
  };

  const saveProgressToStorageOrApi = async (problemId) => {
    const data = userProgress[problemId] || {};
    try {
      await fetch(`/api/dsa/progress/${problemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      // Local fallback
      localStorage.setItem('dsa_progress', JSON.stringify(userProgress));
    }
  };

  const setupEventListeners = () => {
    const searchInput = document.getElementById('dsaSearchInput');
    const diffFilter = document.getElementById('dsaDiffFilter');
    const statusFilter = document.getElementById('dsaStatusFilter');
    const topicFilter = document.getElementById('dsaTopicFilter');

    if (searchInput) searchInput.addEventListener('input', () => renderProblems());
    if (diffFilter) diffFilter.addEventListener('change', () => renderProblems());
    if (statusFilter) statusFilter.addEventListener('change', () => renderProblems());
    if (topicFilter) topicFilter.addEventListener('change', (e) => {
      activeTopic = e.target.value;
      renderProblems();
    });

    // Populate topic dropdown
    if (topicFilter) {
      topicFilter.innerHTML = `<option value="all">All Topics (${problems.length})</option>` + 
        topics.map(t => {
          const count = problems.filter(p => p.topic === t.id).length;
          return `<option value="${t.id}">${t.name} (${count})</option>`;
        }).join('');
    }
  };

  const toggleProblemSolved = async (problemId, checkbox) => {
    const isSolved = checkbox.checked;
    if (!userProgress[problemId]) {
      userProgress[problemId] = { status: 'unsolved', is_bookmarked: 0, user_notes: '', user_code: '' };
    }
    userProgress[problemId].status = isSolved ? 'solved' : 'unsolved';
    await saveProgressToStorageOrApi(problemId);

    renderOverview();
    updateTopicProgressBars();
    showToast(isSolved ? 'Problem marked as Solved! 🎉' : 'Problem marked as Unsolved', 'info');
  };

  const toggleBookmark = async (problemId, btn) => {
    if (!userProgress[problemId]) {
      userProgress[problemId] = { status: 'unsolved', is_bookmarked: 0, user_notes: '', user_code: '' };
    }
    const current = userProgress[problemId].is_bookmarked === 1;
    userProgress[problemId].is_bookmarked = current ? 0 : 1;
    await saveProgressToStorageOrApi(problemId);

    btn.classList.toggle('active', !current);
    showToast(!current ? 'Bookmarked for revision 📌' : 'Bookmark removed', 'info');
  };

  const renderOverview = () => {
    const total = problems.length;
    let solvedCount = 0;
    let easySolved = 0, medSolved = 0, hardSolved = 0;
    let easyTotal = 0, medTotal = 0, hardTotal = 0;

    problems.forEach(p => {
      const isSolved = userProgress[p.id] && userProgress[p.id].status === 'solved';
      if (p.difficulty === 'Easy') {
        easyTotal++;
        if (isSolved) easySolved++;
      } else if (p.difficulty === 'Medium') {
        medTotal++;
        if (isSolved) medSolved++;
      } else if (p.difficulty === 'Hard') {
        hardTotal++;
        if (isSolved) hardSolved++;
      }
      if (isSolved) solvedCount++;
    });

    const percent = total > 0 ? Math.round((solvedCount / total) * 100) : 0;

    const totalSolvedEl = document.getElementById('dsaTotalSolved');
    const totalPercentEl = document.getElementById('dsaTotalPercent');
    const progressBarEl = document.getElementById('dsaOverviewBar');
    const easyCountEl = document.getElementById('dsaEasyCount');
    const medCountEl = document.getElementById('dsaMedCount');
    const hardCountEl = document.getElementById('dsaHardCount');

    if (totalSolvedEl) totalSolvedEl.textContent = `${solvedCount} / ${total}`;
    if (totalPercentEl) totalPercentEl.textContent = `${percent}%`;
    if (progressBarEl) progressBarEl.style.width = `${percent}%`;
    if (easyCountEl) easyCountEl.textContent = `${easySolved}/${easyTotal}`;
    if (medCountEl) medCountEl.textContent = `${medSolved}/${medTotal}`;
    if (hardCountEl) hardCountEl.textContent = `${hardSolved}/${hardTotal}`;
  };

  const updateTopicProgressBars = () => {
    topics.forEach(t => {
      const topicProblems = problems.filter(p => p.topic === t.id);
      const solvedInTopic = topicProblems.filter(p => userProgress[p.id] && userProgress[p.id].status === 'solved').length;
      const pct = topicProblems.length > 0 ? Math.round((solvedInTopic / topicProblems.length) * 100) : 0;

      const txt = document.getElementById(`topic-pct-${t.id}`);
      const bar = document.getElementById(`topic-bar-${t.id}`);
      if (txt) txt.textContent = `${solvedInTopic}/${topicProblems.length} (${pct}%)`;
      if (bar) bar.style.width = `${pct}%`;
    });
  };

  const renderProblems = () => {
    const container = document.getElementById('dsaAccordionContainer');
    if (!container) return;

    const search = (document.getElementById('dsaSearchInput')?.value || '').toLowerCase().trim();
    const diff = document.getElementById('dsaDiffFilter')?.value || 'All';
    const status = document.getElementById('dsaStatusFilter')?.value || 'All';

    const displayTopics = activeTopic === 'all' 
      ? topics 
      : topics.filter(t => t.id === activeTopic);

    let html = '';

    displayTopics.forEach(t => {
      let topicProbs = problems.filter(p => p.topic === t.id);

      // Filter by search, difficulty, and status
      topicProbs = topicProbs.filter(p => {
        const matchesSearch = !search || 
          p.title.toLowerCase().includes(search) || 
          (p.companies && p.companies.some(c => c.toLowerCase().includes(search)));

        const matchesDiff = diff === 'All' || p.difficulty === diff;

        const isSolved = userProgress[p.id] && userProgress[p.id].status === 'solved';
        const isBookmarked = userProgress[p.id] && userProgress[p.id].is_bookmarked === 1;

        let matchesStatus = true;
        if (status === 'Solved') matchesStatus = isSolved;
        else if (status === 'Unsolved') matchesStatus = !isSolved;
        else if (status === 'Bookmarked') matchesStatus = isBookmarked;

        return matchesSearch && matchesDiff && matchesStatus;
      });

      if (topicProbs.length === 0 && (search || diff !== 'All' || status !== 'All')) {
        return; // skip empty topic on filter
      }

      const allTopicProbs = problems.filter(p => p.topic === t.id);
      const solvedCount = allTopicProbs.filter(p => userProgress[p.id] && userProgress[p.id].status === 'solved').length;
      const pct = allTopicProbs.length > 0 ? Math.round((solvedCount / allTopicProbs.length) * 100) : 0;

      html += `
        <div class="topic-group">
          <div class="topic-header" onclick="DsaModule.toggleAccordion('${t.id}')">
            <div class="topic-title-area">
              <div class="topic-icon-badge" style="background: ${t.color}">
                <i class="fa-solid ${t.icon}"></i>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="topic-name">${t.name}</span>
                  <span class="topic-count-pill">${allTopicProbs.length} problems</span>
                </div>
                <div class="progress-bar-wrap" style="width: 140px; height: 5px; margin-top: 0.35rem;">
                  <div class="progress-bar-fill" id="topic-bar-${t.id}" style="width: ${pct}%;"></div>
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem;">
              <span class="topic-progress-text" id="topic-pct-${t.id}">${solvedCount}/${allTopicProbs.length} (${pct}%)</span>
              <i class="fa-solid fa-chevron-down" id="topic-chevron-${t.id}" style="transition: transform 0.2s ease;"></i>
            </div>
          </div>

          <div class="problem-list" id="topic-body-${t.id}" style="display: block;">
            ${topicProbs.length === 0 ? `
              <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.875rem;">
                No problems matched current filters in this topic.
              </div>
            ` : topicProbs.map(p => {
              const isSolved = userProgress[p.id] && userProgress[p.id].status === 'solved';
              const isBookmarked = userProgress[p.id] && userProgress[p.id].is_bookmarked === 1;
              const hasNotes = userProgress[p.id] && userProgress[p.id].user_notes;

              return `
                <div class="problem-row">
                  <input type="checkbox" class="problem-checkbox" 
                         ${isSolved ? 'checked' : ''} 
                         onchange="DsaModule.toggleProblemSolved('${p.id}', this)"
                         title="Mark as Solved">

                  <div class="problem-title-cell">
                    <span class="problem-title" onclick="DsaModule.openSolutionModal('${p.id}')">
                      ${p.title}
                    </span>
                    <span class="badge-difficulty badge-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
                    <div class="problem-companies">
                      ${(p.companies || []).slice(0, 3).map(c => `<span class="company-chip">${c}</span>`).join('')}
                    </div>
                  </div>

                  <div class="problem-actions">
                    <button class="action-btn ${isBookmarked ? 'active' : ''}" 
                            onclick="DsaModule.toggleBookmark('${p.id}', this)" 
                            title="Bookmark for Revision">
                      <i class="fa-solid fa-bookmark"></i>
                    </button>

                    <button class="action-btn ${hasNotes ? 'active' : ''}" 
                            onclick="DsaModule.openNotesModal('${p.id}')" 
                            title="My Notes & Code">
                      <i class="fa-regular fa-note-sticky"></i>
                    </button>

                    <button class="action-btn" 
                            onclick="DsaModule.openSolutionModal('${p.id}')" 
                            title="View Optimal Solution">
                      <i class="fa-solid fa-code"></i>
                    </button>

                    ${p.leetcodeUrl ? `
                      <a href="${p.leetcodeUrl}" target="_blank" rel="noopener" class="action-btn" title="Solve on LeetCode">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  };

  const toggleAccordion = (topicId) => {
    const body = document.getElementById(`topic-body-${topicId}`);
    const chevron = document.getElementById(`topic-chevron-${topicId}`);
    if (!body) return;

    if (body.style.display === 'none') {
      body.style.display = 'block';
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    } else {
      body.style.display = 'none';
      if (chevron) chevron.style.transform = 'rotate(-90deg)';
    }
  };

  const openSolutionModal = (problemId) => {
    const p = problems.find(prob => prob.id === problemId);
    if (!p) return;

    const modalTitle = document.getElementById('solutionModalTitle');
    const modalBody = document.getElementById('solutionModalBody');
    if (!modalTitle || !modalBody) return;

    modalTitle.textContent = `${p.title} (${p.difficulty})`;

    modalBody.innerHTML = `
      <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap;">
        <span class="badge-difficulty badge-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
        <span style="font-size: 0.85rem; color: var(--text-muted);">
          <strong>Time Complexity:</strong> <code style="color: var(--primary);">${p.timeComplexity || 'O(N)'}</code>
        </span>
        <span style="font-size: 0.85rem; color: var(--text-muted); margin-left: 1rem;">
          <strong>Space Complexity:</strong> <code style="color: var(--primary);">${p.spaceComplexity || 'O(1)'}</code>
        </span>
      </div>

      <div style="background: var(--bg-subtle); padding: 1rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid var(--primary);">
        <h4 style="font-size: 0.95rem; margin-bottom: 0.35rem;"><i class="fa-solid fa-lightbulb" style="color: var(--warning);"></i> Intuition & Optimal Approach</h4>
        <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-main);">${p.approach || 'Detailed optimal approach using standard algorithmic techniques.'}</p>
      </div>

      <div class="code-container">
        <div class="code-header">
          <div class="lang-selector">
            <button class="lang-btn active" onclick="DsaModule.switchCodeLang('${p.id}', 'cpp', this)">C++</button>
            <button class="lang-btn" onclick="DsaModule.switchCodeLang('${p.id}', 'java', this)">Java</button>
            <button class="lang-btn" onclick="DsaModule.switchCodeLang('${p.id}', 'python', this)">Python</button>
            <button class="lang-btn" onclick="DsaModule.switchCodeLang('${p.id}', 'javascript', this)">JavaScript</button>
          </div>
          <button class="btn btn-outline btn-sm" onclick="DsaModule.copySolutionCode('${p.id}')">
            <i class="fa-regular fa-copy"></i> Copy
          </button>
        </div>
        <pre class="code-pre"><code id="solutionCodeDisplay">${escapeHtml(p.code?.cpp || '// Solution code')}</code></pre>
      </div>

      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; justify-content: flex-end;">
        ${p.leetcodeUrl ? `<a href="${p.leetcodeUrl}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open in LeetCode</a>` : ''}
        ${p.gfgUrl ? `<a href="${p.gfgUrl}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fa-solid fa-book-open"></i> GFG Article</a>` : ''}
      </div>
    `;

    openModal('solutionModal');
  };

  const switchCodeLang = (problemId, lang, btn) => {
    const p = problems.find(prob => prob.id === problemId);
    if (!p || !p.code) return;

    document.querySelectorAll('.lang-selector .lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const display = document.getElementById('solutionCodeDisplay');
    if (display) {
      display.textContent = p.code[lang] || '// No snippet available';
    }
  };

  const copySolutionCode = (problemId) => {
    const display = document.getElementById('solutionCodeDisplay');
    if (!display) return;
    navigator.clipboard.writeText(display.textContent).then(() => {
      showToast('Code copied to clipboard! 📋', 'success');
    });
  };

  const openNotesModal = (problemId) => {
    const p = problems.find(prob => prob.id === problemId);
    if (!p) return;

    const modalTitle = document.getElementById('notesModalTitle');
    const problemIdInput = document.getElementById('notesProblemId');
    const notesArea = document.getElementById('problemNotesText');
    const codeArea = document.getElementById('problemCodeText');

    if (modalTitle) modalTitle.textContent = `Personal Notes: ${p.title}`;
    if (problemIdInput) problemIdInput.value = p.id;

    const currentData = userProgress[p.id] || {};
    if (notesArea) notesArea.value = currentData.user_notes || '';
    if (codeArea) codeArea.value = currentData.user_code || '';

    openModal('notesModal');
  };

  const saveProblemNotes = async () => {
    const problemId = document.getElementById('notesProblemId').value;
    const notes = document.getElementById('problemNotesText').value;
    const code = document.getElementById('problemCodeText').value;

    if (!userProgress[problemId]) {
      userProgress[problemId] = { status: 'unsolved', is_bookmarked: 0, user_notes: '', user_code: '' };
    }
    userProgress[problemId].user_notes = notes;
    userProgress[problemId].user_code = code;

    await saveProgressToStorageOrApi(problemId);
    showToast('Notes saved successfully! 📝', 'success');
    closeModal('notesModal');
    renderProblems();
  };

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  return {
    init,
    toggleProblemSolved,
    toggleBookmark,
    toggleAccordion,
    openSolutionModal,
    switchCodeLang,
    copySolutionCode,
    openNotesModal,
    saveProblemNotes
  };
})();
