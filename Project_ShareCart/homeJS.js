document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const logoContainer = document.getElementById("logo-container");
  const authButtons = document.getElementById("auth-buttons");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const backBtnLogin = document.getElementById("backBtnLogin");
  const backBtnRegister = document.getElementById("backBtnRegister");
  const loginNavbar = document.getElementById("navbar-login");
  const signupNavbar = document.getElementById("navbar-signup");

  // Initial view
  showInitialState();

  // Button event listeners
  loginBtn.addEventListener("click", () => showForm("login"));
  registerBtn.addEventListener("click", () => showForm("register"));
  backBtnLogin.addEventListener("click", showInitialState);
  backBtnRegister.addEventListener("click", showInitialState);

  // Form submissions
  loginForm.addEventListener("submit", handleLogin);
  registerForm.addEventListener("submit", handleRegister);

  // Navbar shortcuts
  loginNavbar?.addEventListener("click", (e) => {
    e.preventDefault();
    showForm("login");
  });

  signupNavbar?.addEventListener("click", (e) => {
    e.preventDefault();
    showForm("register");
  });
});

// Display logo and buttons, hide forms
function showInitialState() {
  showElement(document.getElementById("logo-container"));
  showElement(document.getElementById("auth-buttons"));
  hideElement(document.getElementById("login-form"));
  hideElement(document.getElementById("register-form"));
}

// Display login or register form
function showForm(type) {
  hideElement(document.getElementById("logo-container"));
  hideElement(document.getElementById("auth-buttons"));

  if (type === "login") {
    showElement(document.getElementById("login-form"));
    hideElement(document.getElementById("register-form"));
  } else {
    showElement(document.getElementById("register-form"));
    hideElement(document.getElementById("login-form"));
  }
}

// Show an element
function showElement(element) {
  element.style.display = "block";
}

// Hide an element
function hideElement(element) {
  element.style.display = "none";
}

// Toggle password visibility in inputs
function togglePassword(inputId, toggleElement) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  toggleElement.textContent = isHidden ? "🙈" : "👁";
}

// Show modal message (used for both errors and success)
function showSuccessModal(message, callback = null) {
  const modalBody = document.getElementById("successModalBody");
  modalBody.textContent = message;

  const modal = new bootstrap.Modal(document.getElementById("successModal"));
  modal.show();

  // Optional callback after modal closes
  const modalEl = document.getElementById("successModal");
  modalEl.addEventListener("hidden.bs.modal", function handler() {
    modalEl.removeEventListener("hidden.bs.modal", handler);
    if (typeof callback === "function") callback();
  });
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get("username");
  const password = formData.get("password");

  // Validate required fields
  if (!username || !password) {
    showSuccessModal("Please fill in all fields.");
    return;
  }

  console.log("Login:", { username, password });

  // Show success modal and redirect
  showSuccessModal("Login successful!", () => {
    window.location.href = "orders.html";
  });
}

// Handle register form submission
function handleRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  // Get relevant fields for validation
  const phone = formData.get("phone");
  const creditCard = formData.get("creditCard");
  const buildingNumber = formData.get("buildingNumber");
  const cvv = formData.get("cvv");
  const expMonth = formData.get("expMonth");
  const expYear = formData.get("expYear");
  const password = formData.get("password");

  clearErrors();
  let valid = true;

  // Validate CVV
  if (!/^[0-9]{3}$/.test(cvv)) {
    showError("reg-cvv", "cvv-error", "CVV must be exactly 3 digits.");
    valid = false;
  }

  // Validate expiry date
  if (!expMonth || !expYear) {
    showSuccessModal("Please select card expiry month and year.");
    valid = false;
  }

  // Validate phone number
  if (!/^0\d{9}$/.test(phone)) {
    showError("reg-phone", "phone-error", "Phone must start with 0 and be exactly 10 digits.");
    valid = false;
  }

  // Validate credit card
  if (!/^\d{16}$/.test(creditCard)) {
    showError("reg-creditCard", "creditCard-error", "Credit card must be exactly 16 digits.");
    valid = false;
  }

  // Validate building number
  if (!/^\d+$/.test(buildingNumber)) {
    showError("reg-buildingNumber", "building-error", "Building number must contain digits only.");
    valid = false;
  }

  // Validate password
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    showError("reg-password", "password-error", "Password must be at least 8 characters and contain both letters and numbers.");
    valid = false;
  }

  // Stop if any validation failed
  if (!valid) return;

  console.log("Register:", Object.fromEntries(formData));

  // Show success modal and redirect
  showSuccessModal("Registration successful!", () => {
    window.location.href = "orders.html";
  });
}

// Show error under a specific input field
function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add("error");
  error.textContent = message;
  error.style.display = "block";
}

// Clear all validation error messages
function clearErrors() {
  document.querySelectorAll(".error-message").forEach(el => {
    el.textContent = "";
    el.style.display = "none";
  });

  document.querySelectorAll("input.error").forEach(el => el.classList.remove("error"));
}
