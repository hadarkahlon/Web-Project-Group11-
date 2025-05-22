document.addEventListener("DOMContentLoaded", () => {
  // Grab DOM elements
  const cartSection = document.querySelector(".product-list");
  const summarySection = document.querySelector(".summary");
  const confirmBtn = document.querySelector(".confirm-button");

  // Initialize Bootstrap modal
  const modal = new bootstrap.Modal(document.getElementById("cartModal"));
  const modalBody = document.getElementById("cartModalBody");
  const modalOkBtn = document.getElementById("modalOkBtn");

  // Retrieve cart data from localStorage
  const rawData = localStorage.getItem("cart-data");

  // Handle empty or missing cart data
  if (!rawData) {
    cartSection.innerHTML = '<p>Your cart is empty.</p>';
    summarySection.innerHTML = '<p><strong>Total:</strong> ₪0.00</p>';
    return;
  }

  let cartData;
  try {
    cartData = JSON.parse(rawData);
  } catch (e) {
    console.error("Invalid cart data in localStorage:", e);
    cartSection.innerHTML = '<p>Error loading your cart. Please try again.</p>';
    summarySection.innerHTML = '<p><strong>Total:</strong> ₪0.00</p>';
    return;
  }

  // Handle empty cart array
  if (!cartData.cartItems || cartData.cartItems.length === 0) {
    cartSection.innerHTML = '<p>Your cart is empty.</p>';
    summarySection.innerHTML = '<p><strong>Total:</strong> ₪0.00</p>';
  }

  let total = 0;

  // Update UI based on cart content
  const updateCartUI = () => {
    cartSection.innerHTML = "";
    total = 0;

    if (cartData.cartItems.length === 0) {
      cartSection.innerHTML = '<p>Your cart is empty.</p>';
      summarySection.innerHTML = '<p><strong>Total:</strong> ₪0.00</p>';
      return;
    }

    // Render each item in cart
    cartData.cartItems.forEach(item => {
      if (!item.name || !item.image || isNaN(item.quantity) || isNaN(item.price)) return;

      const subtotal = (item.price * item.quantity).toFixed(2);
      total += parseFloat(subtotal);

      const row = document.createElement("div");
      row.className = "product-row";

      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <span class="product-name">${item.name}</span>
        <span class="product-qty">x${item.quantity}</span>
        <span class="product-subtotal">₪${subtotal}</span>
        <button class="remove-btn" data-name="${item.name}">🗑</button>
      `;

      cartSection.appendChild(row);
    });

    // Update total and note
    summarySection.innerHTML = `
      <p><strong>Total:</strong> ₪${total.toFixed(2)}</p>
      <p class="note">The final price will be calculated automatically after the order closes, based on all items ordered by residents.</p>
    `;
  };

  updateCartUI();

  // Remove item when trash icon is clicked
  cartSection.addEventListener("click", e => {
    if (e.target.classList.contains("remove-btn")) {
      const productName = e.target.getAttribute("data-name");
      cartData.cartItems = cartData.cartItems.filter(item => item.name !== productName);

      // Also clean up related localStorage items
      localStorage.removeItem(productName);
      localStorage.removeItem(`${productName}-price`);
      localStorage.removeItem(`${productName}-image`);

      // Update cart data in localStorage
      localStorage.setItem("cart-data", JSON.stringify({
        cartItems: cartData.cartItems,
        total: total
      }));

      updateCartUI();
    }
  });

  // Handle confirm button click
  confirmBtn.addEventListener("click", () => {
    const isEmpty = !cartData.cartItems || cartData.cartItems.length === 0;

    if (isEmpty) {
      // Show modal for empty cart
      modalBody.innerHTML = `
        <p>Your cart is empty. You cannot be added to the shared order.</p>
        <p><strong>Click OK to return to the catalog and choose products.</strong></p>
      `;
      modalOkBtn.onclick = () => {
        modal.hide();
        window.location.href = "catalog.html";
      };
    } else {
      // Show success modal
      modalBody.innerHTML = `
        <p>Your items have been successfully added to the shared order!</p>
      `;
      modalOkBtn.onclick = () => {
        modal.hide();
        window.location.href = "home.html";
      };
    }

    modal.show();
  });
});
