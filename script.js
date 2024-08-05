window.addEventListener("load", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  
  const productContainer = document.getElementById("product-section");

  productContainer.innerHTML = products
    .map((product) => {
      return `<div class="product">
        <div class="product-img-container">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="product-img"
          />
        </div>
        <div class="product-info">
          <h2 class="product-name">
            ${product.title}
          </h2>
          <div class="product-pricing">
            <p class="product-old-price">R$ ${(
              product.price +
              product.price * 2
            ).toFixed(2)}</p>
            <p class="product-price">R$ ${product.price}</p>
          </div>
          <p class="product-delivery">Frete Grátis</p>
          <button class="buy-button" data-product="${
            product.id
          }">Adicionar ao Carrinho</button>
        </div>
      </div>`;
    })
    .join("");

  const addToCartButtons = document.querySelectorAll(".buy-button");
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-product");
      const currentProduct = products.find(
        (product) => product.id == productId
      );

      let cart = JSON.parse(window.localStorage.getItem("cart") ?? "[]");

      cart.push({
        quantity: 1,
        product: currentProduct
      });
      window.localStorage.setItem("cart", JSON.stringify(cart));

      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;

      setTimeout(() => {
        btn.innerHTML = "Adicionar ao Carrinho";
      }, 1000);
    });
  });
});
