// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Redirect to catalog page when "Join Order" button is clicked
  const joinButtons = document.querySelectorAll(".join-button");
  joinButtons.forEach(button => {
    button.addEventListener("click", () => {
      sessionStorage.setItem("resetCatalog", "true");
      window.location.href = "catalog.html";
    });
  });

  // Redirect to new order creation page
  const createBtn = document.querySelector(".create-button");
  if (createBtn) {
    createBtn.addEventListener("click", () => {
      sessionStorage.setItem("resetCatalog", "true");
      window.location.href = "create-order.html";
    });
  }
});
