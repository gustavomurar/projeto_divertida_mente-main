document.addEventListener("DOMContentLoaded", () => {
    const favoritosContainer = document.getElementById("favoritos-list");
    const totalElement = document.getElementById("favoritos-total");
    const clearButton = document.getElementById("clear-favorites-button");
  
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  
    function renderFavoritos() {
      favoritosContainer.innerHTML = "";
      let total = 0;
  
      favoritos.forEach((item, index) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
  
        const priceNumber = parseFloat(item.price.replace("R$", "").replace(",", "."));
        total += priceNumber;
  
        productElement.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="product-image">
          <div class="product-info">
            <h3>${item.title}</h3>
            <p>${item.price}</p>
            <button onclick="addToCartFromFavorites(${index})">Adicionar ao carrinho</button>
            <button onclick="removeFavorite(${index})">Remover</button>
          </div>
        `;
  
        favoritosContainer.appendChild(productElement);
      });
  
      totalElement.innerText = "R$" + total.toFixed(2).replace(".", ",");
    }
  
    window.addToCartFromFavorites = function(index) {
      const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      const produto = favoritos[index];
  
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(p => p.name === produto.title);
  
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          name: produto.title,
          price: produto.price,
          image: produto.image,
          quantity: 1
        });
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Adicionado ao carrinho!");
    };
  
    window.removeFavorite = function(index) {
      favoritos.splice(index, 1);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      renderFavoritos();
    };
  
    clearButton.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja remover todos os favoritos?")) {
        localStorage.removeItem("favoritos");
        favoritos = [];
        renderFavoritos();
      }
    });
  
    renderFavoritos();
  });
  