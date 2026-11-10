document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".mobile-menu");
  const lista = document.querySelector(".nav-list");
  if (!menu || !lista) return;
  const alternar = () => {
    menu.classList.toggle("active");
    lista.classList.toggle("active");
  };
  menu.addEventListener("click", alternar);
  lista.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      menu.classList.remove("active");
      lista.classList.remove("active");
    })
  );
});
