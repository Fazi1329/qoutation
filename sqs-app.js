/**
 * SQS (SADR Quotation System) - Client Logic
 * Handles validation, loading state, password toggle, and Sonner-style toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const submitSpinner = document.getElementById('submitSpinner');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const eyeIcon = document.getElementById('eyeIcon');
  const eyeOffIcon = document.getElementById('eyeOffIcon');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const confirmModalBtn = document.getElementById('confirmModalBtn');
  const toastContainer = document.getElementById('toastContainer');

  // Password Visibility Toggle
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      
      if (isPassword) {
        eyeIcon.classList.add('hidden');
        eyeOffIcon.classList.remove('hidden');
        togglePasswordBtn.setAttribute('aria-label', 'Hide password');
      } else {
        eyeIcon.classList.remove('hidden');
        eyeOffIcon.classList.add('hidden');
        togglePasswordBtn.setAttribute('aria-label', 'Show password');
      }
      passwordInput.focus();
    });
  }

  // Toast Notification System (replicates Next.js Sonner richColors top-center)
  function showToast(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'error') {
      iconSvg = `
        <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" x2="12" y1="8" y2="12"/>
          <line x1="12" x2="12.01" y1="16" y2="16"/>
        </svg>
      `;
    } else if (type === 'success') {
      iconSvg = `
        <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      `;
    } else {
      iconSvg = `
        <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" x2="12" y1="16" y2="12"/>
          <line x1="12" x2="12.01" y1="8" y2="8"/>
        </svg>
      `;
    }

    toast.innerHTML = `
      <div class="toast-content">
        ${iconSvg}
        <span>${message}</span>
      </div>
      <button class="toast-close-btn" aria-label="Dismiss notification">&times;</button>
    `;

    toastContainer.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close-btn');
    const removeToast = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px) scale(0.95)';
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 200);
    };

    closeBtn.addEventListener('click', removeToast);

    if (duration > 0) {
      setTimeout(removeToast, duration);
    }
  }

  // Clear errors on input
  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener('input', () => {
      input.classList.remove('has-error');
    });
  });

  // Form Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Basic Validation
    let hasError = false;
    if (!email) {
      emailInput.classList.add('has-error');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailInput.classList.add('has-error');
      showToast('Please enter a valid email address.', 'error');
      hasError = true;
    }

    if (!password) {
      passwordInput.classList.add('has-error');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Set Loading State (matches `useFormStatus` pending state)
    submitBtn.disabled = true;
    submitSpinner.classList.remove('hidden');
    submitBtnText.textContent = 'Signing in…';

    // Simulate authentication delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitSpinner.classList.add('hidden');
      submitBtnText.textContent = 'Sign in';

      // Demo condition: any valid email format works
      showToast('Successfully signed in. Redirecting to dashboard...', 'success');
    }, 1200);
  });

  // Forgot Password Modal
  if (forgotPasswordLink && forgotPasswordModal) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      forgotPasswordModal.showModal();
    });

    closeModalBtn?.addEventListener('click', () => {
      forgotPasswordModal.close();
    });

    confirmModalBtn?.addEventListener('click', () => {
      forgotPasswordModal.close();
    });

    // Close on click outside modal dialog
    forgotPasswordModal.addEventListener('click', (e) => {
      const rect = forgotPasswordModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        forgotPasswordModal.close();
      }
    });
  }
});
