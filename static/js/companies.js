// Companies Hiring Process Controller: Exam Patterns, Syllabus, Eligibility & Checker

const CompaniesModule = (() => {
  let companies = [];
  let filteredCompanies = [];

  const init = () => {
    companies = typeof COMPANIES_DATA !== 'undefined' ? COMPANIES_DATA : [];
    filteredCompanies = [...companies];
    setupEventListeners();
    renderCompanies();
  };

  const setupEventListeners = () => {
    const searchInput = document.getElementById('companySearchInput');
    const typeFilter = document.getElementById('companyTypeFilter');

    if (searchInput) {
      searchInput.addEventListener('input', () => filterCompanies());
    }
    if (typeFilter) {
      typeFilter.addEventListener('change', () => filterCompanies());
    }

    // Eligibility Checker Form
    const checkForm = document.getElementById('eligibilityCheckForm');
    if (checkForm) {
      checkForm.addEventListener('submit', handleEligibilityCheck);
    }
  };

  const filterCompanies = () => {
    const search = (document.getElementById('companySearchInput')?.value || '').toLowerCase().trim();
    const type = document.getElementById('companyTypeFilter')?.value || 'All';

    filteredCompanies = companies.filter(c => {
      const matchSearch = !search || 
        c.name.toLowerCase().includes(search) || 
        c.category.toLowerCase().includes(search);

      let matchType = true;
      if (type === 'Product') matchType = c.category.includes('Product') || c.category.includes('FAANG') || c.category.includes('FinTech');
      else if (type === 'Service') matchType = c.category.includes('Service') || c.category.includes('IT Giant');

      return matchSearch && matchType;
    });

    renderCompanies();
  };

  const renderCompanies = () => {
    const container = document.getElementById('companiesGrid');
    if (!container) return;

    if (filteredCompanies.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-building" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.4;"></i>
          <h3>No companies found</h3>
          <p style="font-size: 0.9rem;">Try adjusting your search criteria.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredCompanies.map(c => `
      <div class="company-card" onclick="CompaniesModule.openCompanyDetail('${c.id}')">
        <div class="company-card-header">
          <img src="${c.logo}" alt="${c.name}" class="company-card-logo" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=0D8ABC&color=fff'">
          <div>
            <h3 class="company-card-name">${c.name}</h3>
            <span class="company-card-type">${c.category}</span>
          </div>
        </div>

        <div class="company-specs-row">
          <div class="spec-item">
            <span class="spec-label">Exam Platform</span>
            <span class="spec-val">${c.examPlatform || 'Online'}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Duration</span>
            <span class="spec-val">${c.examDuration || '90 - 120 mins'}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Academic Cutoff</span>
            <span class="spec-val">${c.eligibility.cutoff.split(' ')[0]} ${c.eligibility.cutoff.split(' ')[1] || ''}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Hiring Cadres</span>
            <span class="spec-val">${c.roles.length} Roles</span>
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.35rem; font-weight: 600;">Roles & CTC Packages:</div>
          <div style="display: flex; flex-direction: column; gap: 0.3rem;">
            ${c.roles.slice(0, 2).map(r => `
              <div style="display: flex; justify-content: space-between; font-size: 0.825rem;">
                <span style="color: var(--text-main); font-weight: 500;">${r.title}</span>
                <span style="color: var(--success); font-weight: 600;">${r.ctc}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
          <span style="font-size: 0.8rem; color: var(--primary); font-weight: 600;">
            View Syllabus & Pattern <i class="fa-solid fa-arrow-right"></i>
          </span>
          <span class="badge-difficulty badge-easy" style="font-size: 0.7rem;">Verified 2025-26</span>
        </div>
      </div>
    `).join('');
  };

  const openCompanyDetail = (companyId) => {
    const c = companies.find(item => item.id === companyId);
    if (!c) return;

    const modalTitle = document.getElementById('companyDetailModalTitle');
    const modalBody = document.getElementById('companyDetailModalBody');
    if (!modalTitle || !modalBody) return;

    modalTitle.textContent = `${c.name} - Hiring Process & Syllabus`;

    modalBody.innerHTML = `
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-color);">
        <img src="${c.logo}" alt="${c.name}" style="width: 65px; height: 65px; object-fit: contain; background: #fff; padding: 6px; border-radius: 12px; border: 1px solid var(--border-color);">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 800;">${c.name}</h2>
          <div style="color: var(--primary); font-weight: 600; font-size: 0.95rem;">${c.category}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
            Test Platform: <strong>${c.examPlatform}</strong> • Duration: <strong>${c.examDuration}</strong>
          </div>
        </div>
      </div>

      <!-- Roles & CTC -->
      <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;"><i class="fa-solid fa-id-badge" style="color: var(--primary);"></i> Roles & Salary Packages</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
        ${c.roles.map(r => `
          <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--success);">
            <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.2rem;">${r.title}</div>
            <div style="color: var(--success); font-weight: 700; font-size: 1.1rem; margin-bottom: 0.35rem;">${r.ctc}</div>
            <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${r.desc}</p>
          </div>
        `).join('')}
      </div>

      <!-- Eligibility Criteria -->
      <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;"><i class="fa-solid fa-graduation-cap" style="color: var(--accent);"></i> Eligibility Criteria</h4>
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
        <div><strong>Eligible Degree:</strong> <span style="color: var(--text-muted);">${c.eligibility.degree}</span></div>
        <div><strong>Branches:</strong> <span style="color: var(--text-muted);">${c.eligibility.branches}</span></div>
        <div><strong>Cutoff Marks:</strong> <span style="color: var(--text-main); font-weight: 600;">${c.eligibility.cutoff}</span></div>
        <div><strong>Backlog Policy:</strong> <span style="color: var(--text-muted);">${c.eligibility.backlogs}</span></div>
        <div><strong>Academic Gap:</strong> <span style="color: var(--text-muted);">${c.eligibility.gap}</span></div>
      </div>

      <!-- Detailed Exam Pattern -->
      <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;"><i class="fa-solid fa-list-check" style="color: var(--warning);"></i> Online Exam Pattern</h4>
      <div style="overflow-x: auto; margin-bottom: 1.5rem;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
          <thead>
            <tr style="background: var(--bg-subtle); border-bottom: 2px solid var(--border-color); text-align: left;">
              <th style="padding: 0.65rem 1rem;">Section Name</th>
              <th style="padding: 0.65rem 1rem;">Questions</th>
              <th style="padding: 0.65rem 1rem;">Time</th>
              <th style="padding: 0.65rem 1rem;">Core Topics</th>
            </tr>
          </thead>
          <tbody>
            ${c.examPattern.map(ep => `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.65rem 1rem; font-weight: 600;">${ep.section}</td>
                <td style="padding: 0.65rem 1rem;">${ep.questions} Qs</td>
                <td style="padding: 0.65rem 1rem; color: var(--primary); font-weight: 600;">${ep.time}</td>
                <td style="padding: 0.65rem 1rem; color: var(--text-muted);">${ep.focus}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Complete Syllabus -->
      <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;"><i class="fa-solid fa-book" style="color: var(--primary);"></i> Complete Syllabus</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px;">
          <h5 style="font-size: 0.85rem; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">Cognitive / Aptitude</h5>
          <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
            ${c.syllabus.aptitude.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px;">
          <h5 style="font-size: 0.85rem; color: var(--success); text-transform: uppercase; margin-bottom: 0.5rem;">Coding & Algorithms</h5>
          <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
            ${c.syllabus.coding.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px;">
          <h5 style="font-size: 0.85rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.5rem;">Technical & CS Fundamentals</h5>
          <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
            ${c.syllabus.technical.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Selection Stages Roadmap -->
      <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;"><i class="fa-solid fa-route" style="color: var(--success);"></i> Selection Stages & Roadmap</h4>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
        ${c.rounds.map((r, idx) => `
          <div style="display: flex; gap: 1rem; align-items: flex-start;">
            <div style="background: var(--primary); color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0; margin-top: 2px;">
              ${idx + 1}
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">${r.step}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">${r.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Previously Asked Questions -->
      <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;"><i class="fa-solid fa-clipboard-question" style="color: var(--danger);"></i> Previously Asked Questions</h4>
      <ul style="padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6; color: var(--text-main); margin-bottom: 1.5rem;">
        ${c.sampleQuestions.map(q => `<li>${q}</li>`).join('')}
      </ul>

      <!-- Insider Tips -->
      <div style="background: var(--warning-light); border: 1px solid rgba(245, 158, 11, 0.3); padding: 1.25rem; border-radius: 10px;">
        <h5 style="color: var(--warning); font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-shield-halved"></i> Insider Strategy & Tips
        </h5>
        <ul style="padding-left: 1.25rem; font-size: 0.875rem; line-height: 1.5; color: var(--text-main);">
          ${c.tips.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    `;

    openModal('companyDetailModal');
  };

  const handleEligibilityCheck = (e) => {
    e.preventDefault();
    const cgpa = parseFloat(document.getElementById('checkCgpa').value);
    const perc10th = parseFloat(document.getElementById('check10th').value);
    const perc12th = parseFloat(document.getElementById('check12th').value);
    const backlogs = parseInt(document.getElementById('checkBacklogs').value) || 0;

    const resultsContainer = document.getElementById('eligibilityResults');
    if (!resultsContainer) return;

    const qualified = [];
    const disqualified = [];

    companies.forEach(c => {
      let isEligible = true;
      const reasons = [];

      // Check backlogs
      if (c.eligibility.backlogs.includes('Zero') || c.eligibility.backlogs.includes('No active')) {
        if (backlogs > 0) {
          isEligible = false;
          reasons.push('Requires 0 active backlogs');
        }
      } else if (c.eligibility.backlogs.includes('1 active backlog')) {
        if (backlogs > 1) {
          isEligible = false;
          reasons.push('Max 1 active backlog permitted');
        }
      }

      // Check CGPA cutoff
      const cutoffStr = c.eligibility.cutoff;
      let minCgpa = 6.0;
      let minPct = 60.0;
      if (cutoffStr.includes('7.5') || cutoffStr.includes('7.5+')) { minCgpa = 7.5; minPct = 75; }
      else if (cutoffStr.includes('7.0') || cutoffStr.includes('7.0+')) { minCgpa = 7.0; minPct = 70; }
      else if (cutoffStr.includes('65%') || cutoffStr.includes('6.5')) { minCgpa = 6.5; minPct = 65; }

      if (cgpa < minCgpa) {
        isEligible = false;
        reasons.push(`Minimum CGPA required is ${minCgpa}`);
      }
      if (perc10th < minPct) {
        isEligible = false;
        reasons.push(`10th marks below ${minPct}% cutoff`);
      }
      if (perc12th < minPct) {
        isEligible = false;
        reasons.push(`12th marks below ${minPct}% cutoff`);
      }

      if (isEligible) {
        qualified.push(c);
      } else {
        disqualified.push({ company: c, reasons });
      }
    });

    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = `
      <div style="margin-top: 1.5rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem;">
        <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem; color: var(--success);">
          <i class="fa-solid fa-circle-check"></i> You Qualify for ${qualified.length} out of ${companies.length} Companies!
        </h4>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          ${qualified.map(c => `
            <div style="background: var(--bg-subtle); padding: 0.85rem 1rem; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <img src="${c.logo}" style="width: 32px; height: 32px; object-fit: contain;">
                <div>
                  <strong style="font-size: 0.95rem;">${c.name}</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${c.roles[0]?.ctc || ''}</div>
                </div>
              </div>
              <button class="btn btn-outline btn-sm" onclick="CompaniesModule.openCompanyDetail('${c.id}')">View</button>
            </div>
          `).join('')}
        </div>

        ${disqualified.length > 0 ? `
          <h5 style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.75rem;">Companies requiring higher criteria:</h5>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
            ${disqualified.map(d => `
              <div>• <strong>${d.company.name}</strong>: ${d.reasons.join(', ')}</div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  };

  return {
    init,
    openCompanyDetail,
    filterCompanies
  };
})();
