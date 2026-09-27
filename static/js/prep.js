// Preparation Hub Controller: Aptitude, Technical Subjects, HR Interview & Interactive Quizzes

const PrepModule = (() => {
  let prepData = {};
  let currentQuiz = [];
  let currentQuizIndex = 0;
  let quizScore = 0;
  let quizStartTime = null;
  let quizTimerInterval = null;

  const init = () => {
    prepData = typeof PREP_DATA !== 'undefined' ? PREP_DATA : {};
    setupSubtabs();
    renderAptitude();
    renderTechnical();
    renderHR();
    initQuizEngine();
  };

  const setupSubtabs = () => {
    const pills = document.querySelectorAll('.prep-subtab-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const target = pill.getAttribute('data-target');
        document.querySelectorAll('.prep-subtab-content').forEach(c => c.style.display = 'none');
        const activeContent = document.getElementById(target);
        if (activeContent) activeContent.style.display = 'block';
      });
    });
  };

  // ==========================================
  // APTITUDE SECTION
  // ==========================================
  const renderAptitude = () => {
    const container = document.getElementById('aptitudeContainer');
    if (!container || !prepData.aptitude) return;

    const { topics, practiceProblems } = prepData.aptitude;

    let html = `
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-calculator" style="color: var(--primary);"></i> Aptitude Formulas & Cheatsheets</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">Core formulas and shortcut techniques for Quantitative Aptitude, Logical Reasoning, and Verbal Ability.</p>

        <div class="prep-accordion">
          ${topics.map((t, idx) => `
            <div class="prep-card">
              <div class="prep-card-header" onclick="PrepModule.toggleCard('apt-topic-${idx}')">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span class="badge-difficulty badge-easy">${t.category}</span>
                  <span style="font-weight: 600; font-size: 1rem;">${t.name}</span>
                </div>
                <i class="fa-solid fa-chevron-down" id="chevron-apt-topic-${idx}"></i>
              </div>

              <div class="prep-card-body" id="body-apt-topic-${idx}" style="display: ${idx === 0 ? 'block' : 'none'};">
                <h5 style="margin-bottom: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em;">Important Formulas</h5>
                <div class="formula-grid">
                  ${t.formulas.map(f => `
                    <div class="formula-box">
                      <div class="formula-name">${f.name}</div>
                      <div class="formula-code">${f.formula}</div>
                    </div>
                  `).join('')}
                </div>

                <h5 style="margin: 1.25rem 0 0.5rem 0; color: var(--text-muted); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em;">Shortcut Tips & Key Rules</h5>
                <pre style="white-space: pre-wrap; font-family: inherit; font-size: 0.9rem; color: var(--text-main); background: var(--bg-subtle); padding: 1rem; border-radius: 8px;">${t.notes.trim()}</pre>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-pen-to-square" style="color: var(--success);"></i> High-Yield Practice Problems</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">Test your knowledge with step-by-step verified math solutions.</p>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${practiceProblems.map((prob, pIdx) => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                <span class="badge-difficulty badge-medium">${prob.category} • ${prob.topic}</span>
                <span style="font-size: 0.8rem; color: var(--text-dim);">Q${pIdx + 1}</span>
              </div>
              <h4 style="font-size: 1rem; font-weight: 600; line-height: 1.5; margin-bottom: 1rem;">${prob.question}</h4>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 1rem;">
                ${prob.options.map((opt, oIdx) => `
                  <div style="padding: 0.65rem 1rem; background: var(--bg-subtle); border-radius: 8px; font-size: 0.9rem; border: 1px solid var(--border-color);">
                    <strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt}
                  </div>
                `).join('')}
              </div>

              <button class="btn btn-outline btn-sm" onclick="PrepModule.toggleExplanation('apt-exp-${prob.id}')">
                <i class="fa-solid fa-lightbulb"></i> View Solution & Explanation
              </button>

              <div id="apt-exp-${prob.id}" style="display: none; margin-top: 1rem; background: var(--bg-subtle); border-left: 4px solid var(--success); padding: 1rem; border-radius: 0 8px 8px 0; font-size: 0.9rem;">
                <div style="font-weight: 700; color: var(--success); margin-bottom: 0.35rem;">
                  Correct Answer: Option ${String.fromCharCode(65 + prob.answer)} (${prob.options[prob.answer]})
                </div>
                <pre style="white-space: pre-wrap; font-family: inherit; line-height: 1.5; color: var(--text-main);">${prob.explanation}</pre>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  // ==========================================
  // TECHNICAL CORE CS SECTION
  // ==========================================
  const renderTechnical = () => {
    const container = document.getElementById('technicalContainer');
    if (!container || !prepData.technical) return;

    const { subjects } = prepData.technical;

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-laptop-code" style="color: var(--primary);"></i> Core Computer Science Engineering Subjects</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Comprehensive notes, diagrams, and frequently asked interview questions for OS, DBMS, Networks, and OOPs.</p>
      </div>

      <div class="prep-accordion">
        ${subjects.map((sub, sIdx) => `
          <div class="prep-card">
            <div class="prep-card-header" onclick="PrepModule.toggleCard('tech-sub-${sub.id}')">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                  <i class="fa-solid ${sub.icon}"></i>
                </div>
                <div>
                  <h4 style="font-size: 1.1rem; font-weight: 700;">${sub.name}</h4>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">${sub.description}</div>
                </div>
              </div>
              <i class="fa-solid fa-chevron-down" id="chevron-tech-sub-${sub.id}"></i>
            </div>

            <div class="prep-card-body" id="body-tech-sub-${sub.id}" style="display: ${sIdx === 0 ? 'block' : 'none'};">
              <h5 style="margin-bottom: 1rem; color: var(--text-muted); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em;">Core Concepts & Theory</h5>
              ${sub.notes.map(n => `
                <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: 10px; margin-bottom: 1rem;">
                  <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--primary);">${n.title}</h4>
                  <div style="font-size: 0.9rem; line-height: 1.6; color: var(--text-main);">
                    ${formatMarkdown(n.content)}
                  </div>
                </div>
              `).join('')}

              <h5 style="margin: 1.5rem 0 1rem 0; color: var(--text-muted); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em;">Top Interview Questions & Answers</h5>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${sub.qa.map((qa, qIdx) => `
                  <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; background: var(--bg-card);">
                    <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem; display: flex; gap: 0.5rem;">
                      <span style="color: var(--primary);">Q${qIdx + 1}:</span>
                      <span>${qa.q}</span>
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; padding-left: 1.8rem; white-space: pre-wrap;">${qa.a}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  };

  // ==========================================
  // HR INTERVIEW PREPARATION
  // ==========================================
  const renderHR = () => {
    const container = document.getElementById('hrContainer');
    if (!container || !prepData.hr) return;

    const { starFramework, topQuestions, interviewerQuestions } = prepData.hr;

    container.innerHTML = `
      <!-- STAR Framework -->
      <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.75rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-star" style="color: #fbbf24;"></i> ${starFramework.title}
        </h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">${starFramework.description}</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          ${starFramework.steps.map(s => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1rem; border-radius: 10px;">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                <span style="background: var(--accent); color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem;">${s.letter}</span>
                <span style="font-weight: 700; font-size: 1rem;">${s.name}</span>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Interactive STAR Response Builder Tool -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.5rem; margin-bottom: 2.5rem;">
        <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--accent);"></i> Interactive STAR Answer Builder
        </h4>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1.25rem;">Draft your behavioral story by filling out the four components below and generate a ready-to-deliver interview response.</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label class="form-label">Situation (Context)</label>
            <input type="text" id="starSituation" class="form-control" placeholder="e.g. During my semester project with 4 members...">
          </div>
          <div>
            <label class="form-label">Task (Your Goal/Challenge)</label>
            <input type="text" id="starTask" class="form-control" placeholder="e.g. We were tasked with building real-time chat with tight deadline...">
          </div>
          <div>
            <label class="form-label">Action (What YOU did)</label>
            <input type="text" id="starAction" class="form-control" placeholder="e.g. I implemented WebSocket protocol and unit tested edge cases...">
          </div>
          <div>
            <label class="form-label">Result (Measurable Outcome)</label>
            <input type="text" id="starResult" class="form-control" placeholder="e.g. Delivered 2 days ahead, zero latency drops, scored grade A...">
          </div>
        </div>

        <button class="btn btn-primary btn-sm" onclick="PrepModule.synthesizeStarAnswer()">Generate Polished Answer</button>

        <div id="starGeneratedOutput" style="display: none; margin-top: 1rem; background: var(--bg-subtle); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--accent); font-size: 0.9rem; line-height: 1.6;"></div>
      </div>

      <!-- Top 5 Core Questions -->
      <h3 style="font-size: 1.3rem; margin-bottom: 1.25rem;"><i class="fa-solid fa-comments" style="color: var(--primary);"></i> Top Frequently Asked HR Questions</h3>
      <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem;">
        ${topQuestions.map((q, idx) => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">
                ${idx + 1}. "${q.question}"
              </h4>
              <span class="badge-difficulty badge-easy">${q.category}</span>
            </div>

            <div style="background: var(--bg-subtle); padding: 0.65rem 1rem; border-radius: 6px; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
              <strong>Framework:</strong> ${q.structure}
            </div>

            <div style="margin-bottom: 1rem;">
              <h5 style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.4rem;">Sample High-Scoring Response:</h5>
              <div style="background: var(--bg-input); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); font-size: 0.9rem; line-height: 1.6;">
                "${q.sampleAnswer}"
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; font-size: 0.85rem;">
              <div style="background: var(--success-light); border: 1px solid rgba(16, 185, 129, 0.2); padding: 0.75rem; border-radius: 8px;">
                <strong style="color: var(--success);"><i class="fa-solid fa-check"></i> Do's:</strong>
                <ul style="padding-left: 1.2rem; margin-top: 0.35rem; color: var(--text-main);">
                  ${q.dos.map(d => `<li>${d}</li>`).join('')}
                </ul>
              </div>
              <div style="background: var(--danger-light); border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.75rem; border-radius: 8px;">
                <strong style="color: var(--danger);"><i class="fa-solid fa-xmark"></i> Don'ts:</strong>
                <ul style="padding-left: 1.2rem; margin-top: 0.35rem; color: var(--text-main);">
                  ${q.donts.map(d => `<li>${d}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Questions to ask the Interviewer -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem;">
        <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-circle-question" style="color: var(--primary);"></i> Questions You Should Ask the Interviewer</h4>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">When the interviewer asks "Do you have any questions for me?", never say "No". Ask thoughtful questions like:</p>
        <ul style="padding-left: 1.25rem; font-size: 0.925rem; line-height: 1.8; color: var(--text-main);">
          ${interviewerQuestions.map(q => `<li>${q}</li>`).join('')}
        </ul>
      </div>
    `;
  };

  const synthesizeStarAnswer = () => {
    const s = document.getElementById('starSituation')?.value.trim();
    const t = document.getElementById('starTask')?.value.trim();
    const a = document.getElementById('starAction')?.value.trim();
    const r = document.getElementById('starResult')?.value.trim();

    if (!s || !t || !a || !r) {
      showToast('Please fill out all 4 STAR fields first!', 'warning');
      return;
    }

    const output = document.getElementById('starGeneratedOutput');
    if (!output) return;

    output.style.display = 'block';
    output.innerHTML = `
      <div style="font-weight: 700; color: var(--accent); margin-bottom: 0.5rem;">Synthesized Interview Response:</div>
      <p>"${s} In that situation, my primary goal was that ${t.toLowerCase()} To accomplish this, ${a.toLowerCase()} As a direct result, ${r.toLowerCase()}"</p>
    `;
  };

  // ==========================================
  // INTERACTIVE QUIZ ENGINE
  // ==========================================
  const initQuizEngine = () => {
    currentQuiz = prepData.quizzes || [];
  };

  const startQuiz = () => {
    currentQuizIndex = 0;
    quizScore = 0;
    quizStartTime = Date.now();

    const startView = document.getElementById('quizStartView');
    const playView = document.getElementById('quizPlayView');
    const resultView = document.getElementById('quizResultView');

    if (startView) startView.style.display = 'none';
    if (resultView) resultView.style.display = 'none';
    if (playView) playView.style.display = 'block';

    renderCurrentQuizQuestion();
  };

  const renderCurrentQuizQuestion = () => {
    if (currentQuizIndex >= currentQuiz.length) {
      finishQuiz();
      return;
    }

    const q = currentQuiz[currentQuizIndex];
    const progressEl = document.getElementById('quizQuestionCounter');
    const catEl = document.getElementById('quizQuestionCategory');
    const textEl = document.getElementById('quizQuestionText');
    const optionsContainer = document.getElementById('quizOptionsContainer');
    const expBox = document.getElementById('quizExplanationBox');
    const nextBtn = document.getElementById('quizNextBtn');

    if (progressEl) progressEl.textContent = `Question ${currentQuizIndex + 1} of ${currentQuiz.length}`;
    if (catEl) catEl.textContent = q.category;
    if (textEl) textEl.textContent = q.question;
    if (expBox) expBox.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    if (optionsContainer) {
      optionsContainer.innerHTML = q.options.map((opt, idx) => `
        <button class="quiz-opt-btn" onclick="PrepModule.handleQuizAnswer(${idx})">
          <span style="font-weight: 700; width: 24px;">${String.fromCharCode(65 + idx)}.</span>
          <span>${opt}</span>
        </button>
      `).join('');
    }
  };

  const handleQuizAnswer = (selectedIndex) => {
    const q = currentQuiz[currentQuizIndex];
    const btns = document.querySelectorAll('.quiz-opt-btn');
    const expBox = document.getElementById('quizExplanationBox');
    const nextBtn = document.getElementById('quizNextBtn');

    // Disable all options
    btns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add('correct');
        btn.innerHTML += ' <i class="fa-solid fa-check" style="margin-left: auto;"></i>';
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
        btn.innerHTML += ' <i class="fa-solid fa-xmark" style="margin-left: auto;"></i>';
      }
    });

    if (selectedIndex === q.correct) {
      quizScore++;
    }

    // Show explanation
    if (expBox) {
      expBox.style.display = 'block';
      expBox.innerHTML = `
        <div style="font-weight: 700; color: ${selectedIndex === q.correct ? 'var(--success)' : 'var(--danger)'}; margin-bottom: 0.35rem;">
          ${selectedIndex === q.correct ? 'Correct! 🎉' : 'Incorrect.'}
        </div>
        <div style="color: var(--text-main); font-size: 0.9rem;">${q.explanation}</div>
      `;
    }

    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent = currentQuizIndex === currentQuiz.length - 1 ? 'Finish Quiz' : 'Next Question';
    }
  };

  const nextQuizQuestion = () => {
    currentQuizIndex++;
    renderCurrentQuizQuestion();
  };

  const finishQuiz = async () => {
    const playView = document.getElementById('quizPlayView');
    const resultView = document.getElementById('quizResultView');
    if (playView) playView.style.display = 'none';
    if (resultView) resultView.style.display = 'block';

    const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);
    const pct = Math.round((quizScore / currentQuiz.length) * 100);

    const scoreText = document.getElementById('quizScoreText');
    const pctText = document.getElementById('quizPctText');
    const timeText = document.getElementById('quizTimeText');
    const feedbackText = document.getElementById('quizFeedbackText');

    if (scoreText) scoreText.textContent = `${quizScore} / ${currentQuiz.length}`;
    if (pctText) pctText.textContent = `${pct}%`;
    if (timeText) timeText.textContent = `${timeTaken}s`;

    if (feedbackText) {
      if (pct >= 80) feedbackText.textContent = '🌟 Outstanding! You have great mastery across topics.';
      else if (pct >= 60) feedbackText.textContent = '👍 Good job! Review the explanations to target weaker areas.';
      else feedbackText.textContent = '📚 Keep practicing! Re-read the technical notes and try again.';
    }

    // Save attempt to server
    try {
      await fetch('/api/quiz/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'Mixed Comprehensive',
          score: quizScore,
          total_questions: currentQuiz.length,
          time_taken_seconds: timeTaken
        })
      });
    } catch (err) {
      console.warn('Could not record quiz to API, caching locally:', err);
    }
  };

  const toggleCard = (id) => {
    const body = document.getElementById(`body-${id}`);
    const chevron = document.getElementById(`chevron-${id}`);
    if (!body) return;

    if (body.style.display === 'none') {
      body.style.display = 'block';
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    } else {
      body.style.display = 'none';
      if (chevron) chevron.style.transform = 'rotate(-90deg)';
    }
  };

  const toggleExplanation = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  };

  const formatMarkdown = (txt) => {
    return txt
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/• (.*?)(?=\n|$)/g, '<li>$1</li>')
      .replace(/<li>/g, '<ul style="padding-left: 1.25rem; margin: 0.5rem 0;"><li>')
      .replace(/<\/li>(?!<li>)/g, '</li></ul>');
  };

  return {
    init,
    toggleCard,
    toggleExplanation,
    synthesizeStarAnswer,
    startQuiz,
    handleQuizAnswer,
    nextQuizQuestion
  };
})();
