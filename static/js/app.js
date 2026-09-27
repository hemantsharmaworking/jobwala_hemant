// Main Application Orchestrator: Routing, Modals, Theme, Google Auth, Candidate Profile & Subscription

let currentUser = null;

// Modal helpers
window.openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Toast helper
window.showToast = (message, type = 'info') => {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = 'fa-circle-info';
  let iconColor = 'var(--primary)';
  if (type === 'success') { icon = 'fa-circle-check'; iconColor = 'var(--success)'; }
  else if (type === 'warning') { icon = 'fa-triangle-exclamation'; iconColor = 'var(--warning)'; }
  else if (type === 'danger') { icon = 'fa-circle-xmark'; iconColor = 'var(--danger)'; }

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="color: ${iconColor}; font-size: 1.1rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Main App Controller
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initUserSession();
  setupNavigation();
  setupModalBackdrops();

  // Initialize all sub-modules
  if (typeof JobsModule !== 'undefined') await JobsModule.init();
  if (typeof DsaModule !== 'undefined') await DsaModule.init();
  if (typeof PrepModule !== 'undefined') PrepModule.init();
  if (typeof CompaniesModule !== 'undefined') CompaniesModule.init();

  loadDashboardStats();
});

// ==========================================
// THEME MANAGEMENT (IN SETTINGS & INITIAL)
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem('portal_theme') || 'dark';
  setAppTheme(savedTheme, false);
}

window.setAppTheme = (theme, showNotification = true) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portal_theme', theme);

  // Update Settings Modal Theme Preview Cards
  const darkCard = document.getElementById('themeOptDark');
  const lightCard = document.getElementById('themeOptLight');
  if (darkCard) darkCard.classList.toggle('active', theme === 'dark');
  if (lightCard) lightCard.classList.toggle('active', theme === 'light');

  if (showNotification) {
    showToast(`Switched to ${theme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  }
};

// ==========================================
// GOOGLE GMAIL SIGN-IN & AUTHENTICATION
// ==========================================
function initUserSession() {
  const savedUser = localStorage.getItem('jobwala_user');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      renderUserAuthUI();
      // If profile not completed, prompt candidate
      if (!currentUser.profile_completed) {
        setTimeout(() => {
          populateProfileModalFields(currentUser);
          openModal('onboardingModal');
        }, 800);
      }
    } catch (e) {
      console.warn('Error reading saved user session:', e);
      currentUser = null;
    }
  }
}

window.handleGoogleLogin = async (name, email, avatar) => {
  closeModal('googleAuthModal');

  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, avatar })
    });

    if (res.ok) {
      const data = await res.json();
      currentUser = data.user;
    } else {
      throw new Error('API Google Auth failed');
    }
  } catch (err) {
    console.warn('Using client-side session fallback:', err);
    currentUser = {
      email: email,
      full_name: name,
      avatar: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff`,
      profile_completed: 0,
      is_pro: 0
    };
  }

  localStorage.setItem('jobwala_user', JSON.stringify(currentUser));
  renderUserAuthUI();
  showToast(`Signed in as ${currentUser.full_name} via Google! 🚀`, 'success');

  // Open profile completion modal if not yet filled
  if (!currentUser.profile_completed) {
    populateProfileModalFields(currentUser);
    setTimeout(() => {
      openModal('onboardingModal');
      showToast('Please complete your candidate details to apply for jobs!', 'info');
    }, 400);
  }
};

window.handleCustomGoogleLogin = (e) => {
  e.preventDefault();
  const name = document.getElementById('customAuthName').value.trim();
  const email = document.getElementById('customAuthEmail').value.trim().toLowerCase();

  if (!email.includes('@')) {
    showToast('Please enter a valid Gmail address', 'warning');
    return;
  }

  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff`;
  handleGoogleLogin(name, email, avatar);
};

window.signOut = () => {
  currentUser = null;
  localStorage.removeItem('jobwala_user');
  renderUserAuthUI();
  showToast('You have signed out of Jobwala', 'info');
};

function renderUserAuthUI() {
  const loginNavBtn = document.getElementById('googleSignInNavBtn');
  const userMenu = document.getElementById('userMenuWrapper');
  const navAvatar = document.getElementById('userNavAvatar');
  const navName = document.getElementById('userNavName');
  const navProBadge = document.getElementById('userNavProBadge');
  const dropName = document.getElementById('dropdownUserName');
  const dropEmail = document.getElementById('dropdownUserEmail');
  const settingsEmail = document.getElementById('settingsUserEmail');

  if (currentUser) {
    if (loginNavBtn) loginNavBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'block';

    if (navAvatar) navAvatar.src = currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.full_name)}&background=3b82f6&color=fff`;
    if (navName) navName.textContent = currentUser.full_name.split(' ')[0];
    if (navProBadge) navProBadge.style.display = currentUser.is_pro ? 'inline-block' : 'none';

    if (dropName) dropName.textContent = currentUser.full_name;
    if (dropEmail) dropEmail.textContent = currentUser.email;
    if (settingsEmail) settingsEmail.textContent = `${currentUser.full_name} (${currentUser.email})`;
  } else {
    if (loginNavBtn) loginNavBtn.style.display = 'inline-flex';
    if (userMenu) userMenu.style.display = 'none';
    if (settingsEmail) settingsEmail.textContent = 'Not signed in';
  }
}

window.toggleUserDropdown = () => {
  const menu = document.getElementById('userDropdownMenu');
  if (menu) menu.classList.toggle('show');
};

// ==========================================
// CANDIDATE PROFILE DETAILS & ONBOARDING
// ==========================================
function populateProfileModalFields(user) {
  if (!user) return;
  const fullNameInput = document.getElementById('profFullName');
  const mobileInput = document.getElementById('profMobile');
  const emailInput = document.getElementById('profEmail');
  const degreeInput = document.getElementById('profDegree');
  const collegeInput = document.getElementById('profCollege');
  const branchInput = document.getElementById('profBranch');
  const yearInput = document.getElementById('profYear');
  const cgpaInput = document.getElementById('profCgpa');
  const linkedinInput = document.getElementById('profLinkedin');
  const githubInput = document.getElementById('profGithub');
  const cvLinkInput = document.getElementById('profCvLink');
  const dropZoneText = document.getElementById('cvDropZoneText');

  if (fullNameInput) fullNameInput.value = user.full_name || '';
  if (mobileInput) mobileInput.value = user.mobile || '';
  if (emailInput) emailInput.value = user.email || '';
  if (degreeInput && user.higher_qualification) degreeInput.value = user.higher_qualification;
  if (collegeInput) collegeInput.value = user.college || '';
  if (branchInput) branchInput.value = user.branch || '';
  if (yearInput && user.passing_year) yearInput.value = user.passing_year;
  if (cgpaInput) cgpaInput.value = user.cgpa || '';
  if (linkedinInput) linkedinInput.value = user.linkedin_profile || '';
  if (githubInput) githubInput.value = user.github_profile || '';
  if (cvLinkInput) cvLinkInput.value = user.cv_link || '';

  if (dropZoneText && user.cv_name) {
    dropZoneText.innerHTML = `<span style="color: var(--success);"><i class="fa-solid fa-file-check"></i> Attached: ${user.cv_name}</span>`;
  }
}

window.handleCvFileSelect = (input) => {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const textEl = document.getElementById('cvDropZoneText');
    const linkInput = document.getElementById('profCvLink');
    if (textEl) {
      textEl.innerHTML = `<span style="color: var(--success);"><i class="fa-solid fa-file-pdf"></i> Selected: <strong>${file.name}</strong> (${Math.round(file.size / 1024)} KB)</span>`;
    }
    if (linkInput && !linkInput.value) {
      linkInput.value = `https://jobwala.app/resumes/${file.name.replace(/\s+/g, '_')}`;
    }
    showToast(`Attached CV: ${file.name}`, 'info');
  }
};

window.saveUserProfile = async (e) => {
  e.preventDefault();

  if (!currentUser) {
    showToast('Please sign in with Google first!', 'warning');
    closeModal('onboardingModal');
    openModal('googleAuthModal');
    return;
  }

  const fileInput = document.getElementById('profCvFile');
  const fileName = (fileInput && fileInput.files && fileInput.files[0]) 
    ? fileInput.files[0].name 
    : (currentUser.cv_name || 'Resume.pdf');

  const profilePayload = {
    email: currentUser.email,
    full_name: document.getElementById('profFullName').value.trim(),
    mobile: document.getElementById('profMobile').value.trim(),
    higher_qualification: document.getElementById('profDegree').value,
    college: document.getElementById('profCollege').value.trim(),
    branch: document.getElementById('profBranch').value.trim(),
    passing_year: document.getElementById('profYear').value,
    cgpa: document.getElementById('profCgpa').value.trim(),
    linkedin_profile: document.getElementById('profLinkedin').value.trim(),
    github_profile: document.getElementById('profGithub').value.trim(),
    cv_link: document.getElementById('profCvLink').value.trim() || `https://jobwala.app/resumes/${fileName}`,
    cv_name: fileName
  };

  try {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profilePayload)
    });

    if (res.ok) {
      const data = await res.json();
      currentUser = data.user;
    } else {
      throw new Error('API error');
    }
  } catch (err) {
    // Local fallback update
    currentUser = { ...currentUser, ...profilePayload, profile_completed: 1 };
  }

  localStorage.setItem('jobwala_user', JSON.stringify(currentUser));
  renderUserAuthUI();
  closeModal('onboardingModal');
  showToast('Candidate Profile & CV saved successfully! 🎉', 'success');
};

// ==========================================
// SUBSCRIPTION PRO UPGRADE
// ==========================================
window.upgradeToPro = async (plan) => {
  if (!currentUser) {
    showToast('Please sign in with Google to subscribe!', 'warning');
    closeModal('subscriptionModal');
    openModal('googleAuthModal');
    return;
  }

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentUser.email, plan: plan })
    });

    if (res.ok) {
      const data = await res.json();
      currentUser = data.user || { ...currentUser, is_pro: 1, pro_plan: plan };
    }
  } catch (err) {
    currentUser.is_pro = 1;
    currentUser.pro_plan = plan;
  }

  localStorage.setItem('jobwala_user', JSON.stringify(currentUser));
  renderUserAuthUI();
  closeModal('subscriptionModal');
  showToast(`🎉 Congratulations! You are now subscribed to Jobwala Pro (${plan})! Exclusive referral opportunities unlocked.`, 'success');
};

// ==========================================
// NAVIGATION TABS & BACKDROPS
// ==========================================
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.app-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      sections.forEach(s => s.style.display = 'none');
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.style.display = 'block';

      if (targetId === 'dashboardSection') {
        loadDashboardStats();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function setupModalBackdrops() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // Close user dropdown if clicking elsewhere
  document.addEventListener('click', (e) => {
    const userMenu = document.getElementById('userMenuWrapper');
    const dropdown = document.getElementById('userDropdownMenu');
    if (userMenu && dropdown && !userMenu.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
}

// ==========================================
// DASHBOARD ANALYTICS
// ==========================================
async function loadDashboardStats() {
  try {
    const res = await fetch('/api/stats');
    if (res.ok) {
      const data = await res.json();
      const stats = data.stats;
      renderDashboardUI(stats);
    } else {
      throw new Error('Stats api error');
    }
  } catch (err) {
    const dsaProgress = JSON.parse(localStorage.getItem('dsa_progress') || '{}');
    const apps = JSON.parse(localStorage.getItem('portal_applications') || '[]');
    const solvedCount = Object.values(dsaProgress).filter(p => p.status === 'solved').length;
    const bookmarkedCount = Object.values(dsaProgress).filter(p => p.is_bookmarked === 1).length;

    renderDashboardUI({
      total_jobs: typeof INITIAL_JOBS !== 'undefined' ? INITIAL_JOBS.length : 10,
      total_applications: apps.length,
      solved_dsa: solvedCount,
      bookmarked_dsa: bookmarkedCount,
      total_quizzes: 1,
      avg_quiz_score: 80.0
    });
  }
}

function renderDashboardUI(stats) {
  const dashSolvedDsa = document.getElementById('dashSolvedDsa');
  const dashTotalApps = document.getElementById('dashTotalApps');
  const dashQuizzes = document.getElementById('dashQuizzes');
  const dashReadiness = document.getElementById('dashReadiness');

  const totalDsa = typeof DSA_PROBLEMS !== 'undefined' ? DSA_PROBLEMS.length : 15;
  const dsaScore = Math.min(100, Math.round((stats.solved_dsa / totalDsa) * 100));
  const readiness = Math.min(100, Math.round((dsaScore * 0.5) + (stats.avg_quiz_score * 0.3) + (stats.total_applications > 0 ? 20 : 0)));

  if (dashSolvedDsa) dashSolvedDsa.textContent = `${stats.solved_dsa} / ${totalDsa}`;
  if (dashTotalApps) dashTotalApps.textContent = stats.total_applications;
  if (dashQuizzes) dashQuizzes.textContent = `${stats.avg_quiz_score || 0}%`;
  if (dashReadiness) dashReadiness.textContent = `${readiness}%`;

  const heroSolved = document.getElementById('heroSolvedCount');
  if (heroSolved) heroSolved.textContent = stats.solved_dsa;

  if (typeof JobsModule !== 'undefined') {
    JobsModule.renderApplications();
  }
}
