window.addEventListener("load", () => {
  const cartData = JSON.parse(window.localStorage.getItem("cart") ?? "[]");

  renderCartProducts(cartData);

  const checkout = document.getElementById("checkout-btn");
  checkout.addEventListener("click", () => {
    window.localStorage.clear();
    renderCartProducts([]);
  });
});

function renderCartProducts(cartData) {
  const cartList = document.getElementById("cart-list");

  cartList.innerHTML = cartData
    .map((data) => {
      return `<li class="cart-item">
        <img
          src="${data.product.image}"
          alt="${data.product.title}"
          class="item-img"
        />
        <div class="item-info">
          <h2 class="item-name">${data.product.title}</h2>
          <p class="item-price">R$ ${data.product.price}</p>
          <div class="quantity-selector">
            <button
              ${data.quantity === 1 ? "disabled" : ""}
              class="quantity-btn sub-quantity"
              data-product="${data.product.id}"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-minus"
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <input
              disabled
              type="text"
              value="${data.quantity}"
              class="quantity-input"
            />
            <button
              class="quantity-btn add-quantity"
              data-product="${data.product.id}"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </button>
          </div>
          <button class="remove-btn" data-product="${
            data.product.id
          }">Remover</button>
        </div>
      </li>`;
    })
    .join("");

  const addQuantityButtons = document.querySelectorAll(".add-quantity");
  addQuantityButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-product");

      for (let productData of cartData) {
        if (productData.product.id == productId) {
          productData.quantity += 1;
        }
      }

      window.localStorage.setItem("cart", JSON.stringify(cartData));
      renderCartProducts(cartData);
    });
  });

  const subQuantityButtons = document.querySelectorAll(".sub-quantity");
  subQuantityButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-product");

      for (let productData of cartData) {
        if (productData.product.id == productId) {
          productData.quantity -= 1;
        }
      }

      window.localStorage.setItem("cart", JSON.stringify(cartData));
      renderCartProducts(cartData);
    });
  });

  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-product");

      cartData = cartData.filter((data) => data.product.id != productId);

      window.localStorage.setItem("cart", JSON.stringify(cartData));
      renderCartProducts(cartData);
    });
  });

  const total = document.getElementById("total");
  total.innerHTML = cartData.reduce(
    (acc, data) => (acc += (data.product.price * data.quantity)),
    0
  ).toFixed(2);
}
