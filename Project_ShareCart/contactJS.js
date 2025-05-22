document.addEventListener("DOMContentLoaded", () => {
  // Get form and modal elements
  const form = document.getElementById("contact-form");
  const successModal = new bootstrap.Modal(document.getElementById("successModal"));
  const successOkBtn = document.getElementById("success-ok-btn");

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    // Get input values
    const fullName = document.getElementById("full-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    let valid = true;

    // Validate full name
    if (!fullName) {
      showError("full-name", "full-name-error", "Full name is required.");
      valid = false;
    }

    // Validate phone number
    if (!phone) {
      showError("phone", "phone-error", "Phone number is required.");
      valid = false;
    } else if (!/^0\d{9}$/.test(phone)) {
      showError("phone", "phone-error", "Phone must start with 0 and be exactly 10 digits.");
      valid = false;
    }

    // Validate subject
    if (!subject) {
      showError("subject", "subject-error", "Subject is required.");
      valid = false;
    }

    // Validate message
    if (!message) {
      showError("message", "message-error", "Message cannot be empty.");
      valid = false;
    }

    // If any validation fails, stop
    if (!valid) return;

    // If all fields are valid, reset form and show modal
    form.reset();
    successModal.show();
  });

  // Redirect to homepage after success modal
  successOkBtn.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  // Show error message for specific input
  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.add("error");
    error.textContent = message;
    error.style.display = "block";
  }

  // Clear all error messages and styles
  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => {
      el.textContent = "";
      el.style.display = "none";
    });
    document.querySelectorAll("input, textarea").forEach(el => el.classList.remove("error"));
  }
});
