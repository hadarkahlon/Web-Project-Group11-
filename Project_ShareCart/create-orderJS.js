// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-order-form");
  const deliveryDate = document.getElementById("delivery-date");
  const deliveryTime = document.getElementById("delivery-time");
  const closingMsg = document.getElementById("closing-time-msg");

  // Show closing time message when both date and time are selected
  form.addEventListener("change", () => {
    const date = deliveryDate.value;
    const time = deliveryTime.value;

    if (date && time) {
      const delivery = new Date(date + "T" + time);
      const closing = new Date(delivery.getTime() - 12 * 60 * 60 * 1000);
      const msg = `The order will close automatically on ${closing.toLocaleDateString()} at ${closing.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      closingMsg.textContent = msg;
      closingMsg.style.display = "block";
    }
  });

  // Handle form submission and redirect to catalog
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const date = deliveryDate.value;
    const time = deliveryTime.value;

    if (!date || !time) {
      alert("Please fill out all fields.");
      return;
    }

    // Optional: store values in localStorage if needed
    // localStorage.setItem("deliveryDate", date);
    // localStorage.setItem("deliveryTime", time);

    // Redirect to product catalog
    sessionStorage.setItem("resetCatalog", "true");
    window.location.href = "catalog.html";
  });
});
