document.addEventListener("DOMContentLoaded", () => {
  // Static user profile (fictive data for demo purposes)
  const userProfile = {
    firstName: "Dana",
    lastName: "Levi",
    phone: "0521234567",
    street: "Herzl",
    building: "12",
    city: "Tel Aviv"
  };

  // Get DOM elements
  const editBtn = document.getElementById("edit-btn");
  const ordersBtn = document.getElementById("orders-btn");
  const form = document.getElementById("edit-form");
  const ordersSection = document.getElementById("orders-section");
  const noOrdersMsg = document.getElementById("no-orders-msg");
  const profileModal = new bootstrap.Modal(document.getElementById("profileSavedModal"));

  // When "Edit Profile" button is clicked
  editBtn.addEventListener("click", () => {
    // Hide open orders and clear content
    ordersSection.classList.add("hidden");
    ordersSection.innerHTML = "";
    noOrdersMsg.classList.add("hidden");

    // Show the edit profile form
    form.classList.remove("hidden");

    // Fill the form fields with user data
    document.getElementById("first-name").value = userProfile.firstName;
    document.getElementById("last-name").value = userProfile.lastName;
    document.getElementById("phone").value = userProfile.phone;
    document.getElementById("street").value = userProfile.street;
    document.getElementById("building").value = userProfile.building;
    document.getElementById("city").value = userProfile.city;
  });

  // When the profile form is submitted
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Create updated profile object
    const updatedProfile = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      phone: document.getElementById("phone").value,
      street: document.getElementById("street").value,
      building: document.getElementById("building").value,
      city: document.getElementById("city").value
    };

    // Log updated profile to console (can be replaced with real API)
    console.log("Updated profile:", updatedProfile);

    // Show confirmation modal
    profileModal.show();

    // Hide form after submission
    form.classList.add("hidden");
    editBtn.classList.remove("hidden");
  });

  // When "View My Open Orders" button is clicked
  ordersBtn.addEventListener("click", () => {
    // Hide the edit form
    form.classList.add("hidden");

    // Mock orders data (static for now)
    const mockOrders = [
      {
        id: 1012,
        lastUpdated: "May 21, 2025",
        currentTotal: 87.5,
        deliveryDate: "May 24, 2025"
      },
      {
        id: 1013,
        lastUpdated: "May 20, 2025",
        currentTotal: 42.9,
        deliveryDate: "May 26, 2025"
      }
    ];

    // Clear the orders section before adding new cards
    ordersSection.innerHTML = "";

    // If no orders, show message
    if (mockOrders.length === 0) {
      ordersSection.classList.add("hidden");
      noOrdersMsg.classList.remove("hidden");
      return;
    }

    // For each order, create a card with details and a button
    mockOrders.forEach(order => {
      const card = document.createElement("div");
      card.className = "order-card";
      card.innerHTML = `
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Last Updated:</strong> ${order.lastUpdated}</p>
        <p><strong>Current Total:</strong> ₪${order.currentTotal.toFixed(2)}</p>
        <p><strong>Delivery Date:</strong> ${order.deliveryDate}</p>
        <button class="update-btn btn btn-danger mt-2" data-id="${order.id}">Update Items</button>
      `;
      ordersSection.appendChild(card);
    });

    // Add event listeners to "Update Items" buttons
    document.querySelectorAll(".update-btn").forEach(button => {
      button.addEventListener("click", () => {
        const orderId = button.getAttribute("data-id");

        // Redirect to catalog page with order ID as query param
        window.location.href = `catalog.html?orderId=${orderId}`;
      });
    });

    // Show the orders section and hide the no-orders message
    ordersSection.classList.remove("hidden");
    noOrdersMsg.classList.add("hidden");
  });
});
