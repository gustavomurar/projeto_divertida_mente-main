// Funções compartilhadas (cards.html e páginas de produto)
function adicionarCarrinho(nome, imagem, preco) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existente = cart.find(i => i.name === nome);
  if (existente) existente.quantity += 1;
  else cart.push({ name: nome, image: imagem, price: preco, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(nome + " adicionado ao carrinho!");
}

function favoritar(nome, imagem, preco, icone) {
  let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
  const i = favs.findIndex(f => f.title === nome);
  if (i >= 0) favs.splice(i, 1);
  else favs.push({ title: nome, image: imagem, price: preco });
  localStorage.setItem("favoritos", JSON.stringify(favs));
  if (icone) {
    icone.classList.toggle("fa-solid", i < 0);
    icone.classList.toggle("fa-regular", i >= 0);
  }
}

// Marca os corações já favoritados ao abrir a página
document.addEventListener("DOMContentLoaded", () => {
  const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
  document.querySelectorAll(".fa-heart[data-nome]").forEach(el => {
    if (favs.some(f => f.title === el.dataset.nome)) {
      el.classList.replace("fa-regular", "fa-solid");
    }
  });
});

// ---------- Troca de imagem F / M (camisa e moletom) ----------
// data-m = imagem do botão F | data-h = imagem do botão M (nomes antigos mantidos)
function mudarSexo(el, sexo) {
  const img = el.closest(".item").querySelector(".imagem-produto");
  const nova = img.dataset[sexo];
  if (!nova) return;
  // se a imagem não existir, volta para a original em vez de mostrar imagem quebrada
  img.onerror = () => { img.onerror = null; img.src = img.dataset.original; };
  img.src = nova;
}

function restaurarImagem(el) {
  const img = el.closest(".item").querySelector(".imagem-produto");
  img.onerror = null;
  if (img.dataset.original) img.src = img.dataset.original;
}

document.addEventListener("DOMContentLoaded", () => {
  // celular/tablet não têm "passar o mouse": nesses aparelhos o toque alterna a imagem
  const semHover = window.matchMedia("(hover: none)").matches;

  document.querySelectorAll(".sexo-options span[data-sexo]").forEach(span => {
    const sexo = span.dataset.sexo;
    const todos = span.closest(".item").querySelectorAll(".sexo-options span[data-sexo]");
    const limpar = () => todos.forEach(s => s.classList.remove("ativo"));
    const mostrar = () => { limpar(); span.classList.add("ativo"); mudarSexo(span, sexo); };
    const voltar = () => { limpar(); restaurarImagem(span); };

    if (semHover) {
      span.addEventListener("click", () => span.classList.contains("ativo") ? voltar() : mostrar());
    } else {
      span.addEventListener("mouseenter", mostrar);
      span.addEventListener("mouseleave", voltar);
      span.addEventListener("focus", mostrar);
      span.addEventListener("blur", voltar);
    }
  });

  // pré-carrega as imagens F/M na primeira vez que o mouse chega no card (evita piscar)
  document.querySelectorAll(".imagem-produto[data-m]").forEach(img => {
    img.closest(".item").addEventListener("pointerenter", () => {
      ["m", "h"].forEach(k => { if (img.dataset[k]) new Image().src = img.dataset[k]; });
    }, { once: true });
  });
});
