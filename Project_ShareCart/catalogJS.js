// productCatalog.js

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // Reset quantities if arriving from order creation or join
  if (sessionStorage.getItem("resetCatalog") === "true") {
    Object.keys(localStorage).forEach(key => {
      if (
        !key.includes("-price") &&
        !key.includes("-image") &&
        key !== "cart-data"
      ) {
        localStorage.removeItem(key);
      }
    });
    sessionStorage.removeItem("resetCatalog");
  }
  // Select all product cards
  const productCards = document.querySelectorAll(".product-card");

  // Loop through each product card and set up buttons and localStorage
  productCards.forEach(card => {
    const minusBtn = card.querySelector(".quantity-controls button:first-child");
    const plusBtn = card.querySelector(".quantity-controls button:last-child");
    const quantityDisplay = card.querySelector(".quantity-controls p");
    const productName = card.querySelector("h3").innerText;
    const productImage = card.querySelector("img").getAttribute("src");
    const priceText = card.querySelector("p").innerText; // e.g. "₪5.90 per unit"
    const priceMatch = priceText.match(/₪([\d.]+)/);
    const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

    // Load quantity from localStorage or default to 0
    let quantity = parseInt(localStorage.getItem(productName)) || 0;
    quantityDisplay.textContent = quantity;
    minusBtn.disabled = quantity === 0;

    // Increase quantity and update localStorage
    plusBtn.addEventListener("click", () => {
      quantity++;
      quantityDisplay.textContent = quantity;
      minusBtn.disabled = quantity === 0;
      localStorage.setItem(productName, quantity);
      localStorage.setItem(`${productName}-price`, price.toFixed(2));
      localStorage.setItem(`${productName}-image`, productImage);
    });

    // Decrease quantity and update/remove from localStorage
    minusBtn.addEventListener("click", () => {
      if (quantity > 0) {
        quantity--;
        quantityDisplay.textContent = quantity;
        minusBtn.disabled = quantity === 0;
        if (quantity === 0) {
          localStorage.removeItem(productName);
          localStorage.removeItem(`${productName}-price`);
          localStorage.removeItem(`${productName}-image`);
        } else {
          localStorage.setItem(productName, quantity);
        }
      }
    });
  });

  // When "Go to Cart" button is clicked, build the cart data and navigate
  const cartButton = document.querySelector(".fixed-cart-button");
  if (cartButton) {
    cartButton.addEventListener("click", () => {
      const cartItems = [];
      let total = 0;

      // Build the cartItems array from localStorage
      Object.keys(localStorage).forEach(key => {
        if (
          key === "cart-data" ||
          key.includes("-price") ||
          key.includes("-image")
        ) return;

        const quantity = parseInt(localStorage.getItem(key));
        const price = parseFloat(localStorage.getItem(`${key}-price`));
        const image = localStorage.getItem(`${key}-image`);

        if (!image || isNaN(price) || isNaN(quantity) || quantity <= 0) return;

        const subtotal = (price * quantity).toFixed(2);

        cartItems.push({
          name: key,
          quantity,
          price,
          image,
          subtotal
        });

        total += parseFloat(subtotal);
      });

      // Save full cart to localStorage and go to cart page
      localStorage.setItem("cart-data", JSON.stringify({ cartItems, total }));
      window.location.href = "cart.html";
    });
  }

  // Search functionality
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-bar");
  const noResultsMsg = document.getElementById("no-results-message");

  // Filter products based on input text
  const filterProducts = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const productCards = document.querySelectorAll(".product-card");
    let matchCount = 0;

    productCards.forEach(card => {
      const productName = card.querySelector("h3").innerText.toLowerCase();
      const isMatch = productName.includes(searchTerm) || searchTerm === "";

      card.style.display = isMatch ? "block" : "none";
      if (isMatch) matchCount++;
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = matchCount === 0 ? "block" : "none";
    }
  };

  // Trigger search by button click, Enter key, or typing
  searchButton.addEventListener("click", filterProducts);

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      filterProducts();
    }
  });

  searchInput.addEventListener("input", filterProducts);
});
