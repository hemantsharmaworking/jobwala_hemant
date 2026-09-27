// Job Portal Controller: Listings, Search, Filtering, Apply, Post Job & My Applications

const JobsModule = (() => {
  let allJobs = [];
  let filteredJobs = [];
  let userApplications = [];

  const init = async () => {
    await fetchJobs();
    await fetchApplications();
    setupEventListeners();
    renderJobs();
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        allJobs = data.jobs || [];
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      console.warn('Using local jobs data fallback:', err);
      allJobs = typeof INITIAL_JOBS !== 'undefined' ? INITIAL_JOBS : [];
    }
    filteredJobs = [...allJobs];
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications');
      if (res.ok) {
        const data = await res.json();
        userApplications = data.applications || [];
      }
    } catch (err) {
      console.warn('Could not fetch applications from API, using localStorage:', err);
      const saved = localStorage.getItem('portal_applications');
      userApplications = saved ? JSON.parse(saved) : [];
    }
  };

  const setupEventListeners = () => {
    const searchInput = document.getElementById('jobSearchInput');
    const typeFilter = document.getElementById('jobTypeFilter');
    const categoryFilter = document.getElementById('jobCategoryFilter');
    const expFilter = document.getElementById('jobExpFilter');

    if (searchInput) {
      searchInput.addEventListener('input', () => filterJobs());
    }
    if (typeFilter) {
      typeFilter.addEventListener('change', () => filterJobs());
    }
    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => filterJobs());
    }
    if (expFilter) {
      expFilter.addEventListener('change', () => filterJobs());
    }

    // Post Job Button
    const postJobBtn = document.getElementById('postJobBtn');
    if (postJobBtn) {
      postJobBtn.addEventListener('click', () => openPostJobModal());
    }

    // Post Job Form Submit
    const postJobForm = document.getElementById('postJobForm');
    if (postJobForm) {
      postJobForm.addEventListener('submit', handlePostJobSubmit);
    }

    // Apply Job Form Submit
    const applyJobForm = document.getElementById('applyJobForm');
    if (applyJobForm) {
      applyJobForm.addEventListener('submit', handleApplyJobSubmit);
    }
  };

  const filterJobs = () => {
    const search = (document.getElementById('jobSearchInput')?.value || '').toLowerCase().trim();
    const type = document.getElementById('jobTypeFilter')?.value || 'All';
    const category = document.getElementById('jobCategoryFilter')?.value || 'All';
    const exp = document.getElementById('jobExpFilter')?.value || 'All';

    filteredJobs = allJobs.filter(job => {
      const matchSearch = !search || 
        job.title.toLowerCase().includes(search) || 
        job.company.toLowerCase().includes(search) || 
        job.location.toLowerCase().includes(search) ||
        (job.tags && job.tags.some(t => t.toLowerCase().includes(search)));

      const matchType = type === 'All' || job.type === type;
      const matchCategory = category === 'All' || job.category === category;
      const matchExp = exp === 'All' || job.experience.toLowerCase().includes(exp.toLowerCase());

      return matchSearch && matchType && matchCategory && matchExp;
    });

    renderJobs();
  };

  const renderJobs = () => {
    const container = document.getElementById('jobsGrid');
    if (!container) return;

    if (filteredJobs.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-briefcase" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.4;"></i>
          <h3>No matching jobs found</h3>
          <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try adjusting your search terms or filter criteria.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredJobs.map(job => `
      <div class="job-card">
        <div>
          <div class="job-header">
            <img src="${job.logo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(job.company) + '&background=0D8ABC&color=fff'}" 
                 alt="${job.company} logo" class="job-logo" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=0D8ABC&color=fff'">
            <div class="job-header-info">
              <h3 class="job-title">${job.title}</h3>
              <div class="job-company">${job.company}</div>
            </div>
          </div>

          <div class="job-meta-row">
            <div class="job-meta-item"><i class="fa-solid fa-location-dot"></i> ${job.location}</div>
            <div class="job-meta-item"><i class="fa-solid fa-clock"></i> ${job.type}</div>
            <div class="job-meta-item"><i class="fa-solid fa-user-graduate"></i> ${job.experience}</div>
            <div class="job-meta-item job-salary"><i class="fa-solid fa-indian-rupee-sign"></i> ${job.salary}</div>
          </div>

          <p class="job-desc">${job.description}</p>

          <div class="job-tags">
            ${(job.tags || []).slice(0, 4).map(t => `<span class="job-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div class="job-footer">
          <span class="job-deadline"><i class="fa-regular fa-calendar"></i> Deadline: ${job.deadline || 'Open'}</span>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline btn-sm" onclick="JobsModule.openJobDetail(${job.id})">Details</button>
            <button class="btn btn-primary btn-sm" onclick="JobsModule.openApplyModal(${job.id})">Apply Now</button>
          </div>
        </div>
      </div>
    `).join('');
  };

  const openJobDetail = (jobId) => {
    const job = allJobs.find(j => j.id === jobId);
    if (!job) return;

    const modalBody = document.getElementById('jobDetailModalBody');
    const modalTitle = document.getElementById('jobDetailModalTitle');
    if (!modalBody || !modalTitle) return;

    modalTitle.textContent = `${job.title} - ${job.company}`;
    modalBody.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
        <img src="${job.logo}" alt="${job.company}" class="job-logo" style="width: 60px; height: 60px;">
        <div>
          <h2 style="font-size: 1.3rem; font-weight: 700;">${job.title}</h2>
          <div style="color: var(--text-muted); font-size: 1rem;">${job.company} • ${job.location}</div>
          <div style="color: var(--success); font-weight: 700; margin-top: 0.25rem;">${job.salary}</div>
        </div>
      </div>

      <div class="job-meta-row" style="background: var(--bg-subtle); padding: 0.75rem 1rem; border-radius: 8px;">
        <div class="job-meta-item"><i class="fa-solid fa-briefcase"></i> <strong>Type:</strong> ${job.type}</div>
        <div class="job-meta-item"><i class="fa-solid fa-laptop-code"></i> <strong>Category:</strong> ${job.category}</div>
        <div class="job-meta-item"><i class="fa-solid fa-user-clock"></i> <strong>Experience:</strong> ${job.experience}</div>
        <div class="job-meta-item"><i class="fa-regular fa-calendar-check"></i> <strong>Deadline:</strong> ${job.deadline || 'Open'}</div>
      </div>

      <h4 style="margin: 1.5rem 0 0.5rem 0;">Role Overview</h4>
      <p style="color: var(--text-muted); line-height: 1.6;">${job.description}</p>

      <h4 style="margin: 1.5rem 0 0.5rem 0;">Key Requirements & Qualifications</h4>
      <ul style="padding-left: 1.25rem; color: var(--text-muted); line-height: 1.6;">
        ${(job.requirements || []).map(r => `<li>${r}</li>`).join('')}
      </ul>

      <h4 style="margin: 1.5rem 0 0.5rem 0;">Eligibility Criteria</h4>
      <p style="color: var(--text-muted);">${job.eligibility || 'Graduates with relevant degree'}</p>

      <h4 style="margin: 1.5rem 0 0.5rem 0;">Skills & Technologies</h4>
      <div class="job-tags">
        ${(job.tags || []).map(t => `<span class="job-tag" style="font-size: 0.85rem; padding: 0.3rem 0.7rem;">${t}</span>`).join('')}
      </div>
    `;

    const applyBtn = document.getElementById('jobDetailApplyBtn');
    if (applyBtn) {
      applyBtn.onclick = () => {
        closeModal('jobDetailModal');
        openApplyModal(job.id);
      };
    }

    openModal('jobDetailModal');
  };

  const openApplyModal = (jobId) => {
    const job = allJobs.find(j => j.id === jobId);
    if (!job) return;

    const modalTitle = document.getElementById('applyModalTitle');
    const jobIdInput = document.getElementById('applyJobId');
    if (modalTitle) modalTitle.textContent = `Apply for ${job.title} at ${job.company}`;
    if (jobIdInput) jobIdInput.value = job.id;

    // Auto-fill from candidate profile if logged in
    const nameInput = document.getElementById('applicantName');
    const emailInput = document.getElementById('applicantEmail');
    const phoneInput = document.getElementById('applicantPhone');
    const resumeInput = document.getElementById('applicantResume');

    if (typeof currentUser !== 'undefined' && currentUser) {
      if (nameInput) nameInput.value = currentUser.full_name || '';
      if (emailInput) emailInput.value = currentUser.email || '';
      if (phoneInput) phoneInput.value = currentUser.mobile || '';
      if (resumeInput) resumeInput.value = currentUser.cv_link || '';
    }

    openModal('applyModal');
  };

  const handleApplyJobSubmit = async (e) => {
    e.preventDefault();
    const jobId = parseInt(document.getElementById('applyJobId').value);
    const job = allJobs.find(j => j.id === jobId);

    const payload = {
      job_id: jobId,
      applicant_name: document.getElementById('applicantName').value.trim(),
      applicant_email: document.getElementById('applicantEmail').value.trim(),
      applicant_phone: document.getElementById('applicantPhone').value.trim(),
      experience_level: document.getElementById('applicantExp').value,
      resume_link: document.getElementById('applicantResume').value.trim(),
      cover_note: document.getElementById('applicantNote').value.trim()
    };

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast('Application submitted successfully!', 'success');
      } else {
        throw new Error('API error');
      }
    } catch (err) {
      // Offline fallback
      payload.id = Date.now();
      payload.job_title = job ? job.title : 'Job Application';
      payload.job_company = job ? job.company : 'Company';
      payload.status = 'Under Review';
      payload.applied_at = new Date().toISOString();
      userApplications.unshift(payload);
      localStorage.setItem('portal_applications', JSON.stringify(userApplications));
      showToast('Application saved successfully (Local Mode)!', 'success');
    }

    closeModal('applyModal');
    document.getElementById('applyJobForm').reset();
    await fetchApplications();
    renderApplications();
  };

  const openPostJobModal = () => {
    openModal('postJobModal');
  };

  const handlePostJobSubmit = async (e) => {
    e.preventDefault();
    const tagsInput = document.getElementById('postTags').value;
    const reqsInput = document.getElementById('postRequirements').value;

    const newJob = {
      title: document.getElementById('postTitle').value.trim(),
      company: document.getElementById('postCompany').value.trim(),
      location: document.getElementById('postLocation').value.trim(),
      type: document.getElementById('postType').value,
      experience: document.getElementById('postExp').value.trim(),
      salary: document.getElementById('postSalary').value.trim(),
      category: document.getElementById('postCategory').value,
      tags: tagsInput.split(',').map(s => s.trim()).filter(Boolean),
      description: document.getElementById('postDescription').value.trim(),
      requirements: reqsInput.split('\n').map(s => s.trim()).filter(Boolean),
      eligibility: document.getElementById('postEligibility').value.trim(),
      apply_url: document.getElementById('postApplyUrl').value.trim(),
      deadline: document.getElementById('postDeadline').value
    };

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });
      if (res.ok) {
        showToast('Job posted successfully!', 'success');
      } else {
        throw new Error('API error');
      }
    } catch (err) {
      newJob.id = allJobs.length + 1;
      newJob.logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(newJob.company)}&background=0D8ABC&color=fff`;
      allJobs.unshift(newJob);
      showToast('Job posted successfully (Local Mode)!', 'success');
    }

    closeModal('postJobModal');
    document.getElementById('postJobForm').reset();
    await fetchJobs();
    renderJobs();
  };

  const renderApplications = () => {
    const container = document.getElementById('myApplicationsContainer');
    if (!container) return;

    if (userApplications.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <i class="fa-regular fa-paper-plane" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
          <h4>No applications submitted yet</h4>
          <p style="font-size: 0.9rem;">Browse the job listings and apply to kickstart your career!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${userApplications.map(app => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem;">${app.job_title || 'Software Engineer'}</h4>
              <div style="color: var(--text-muted); font-size: 0.9rem;">
                <strong>${app.job_company || 'Tech Company'}</strong> • Applied on ${new Date(app.applied_at || Date.now()).toLocaleDateString()}
              </div>
              <div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.35rem;">
                Applicant: ${app.applicant_name} (${app.applicant_email})
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <span class="badge-difficulty badge-easy" style="font-size: 0.85rem; padding: 0.3rem 0.8rem;">
                <i class="fa-solid fa-spinner fa-spin"></i> ${app.status || 'Under Review'}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  };

  return {
    init,
    openJobDetail,
    openApplyModal,
    openPostJobModal,
    renderApplications,
    filterJobs
  };
})();
